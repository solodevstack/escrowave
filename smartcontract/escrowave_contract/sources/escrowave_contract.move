
module escrowave_contract::escrowave_contract;
   use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;
    use sui::event;



//codes numbers for errors

     const ENotAuthorized: u64 = 1;
    const EInvalidState: u64 = 2;
    const EBidAlreadyExists: u64 = 3;
    const ENoFreelancerAccepted: u64 = 4;
    const EAlreadyAccepted: u64 = 5;
    const ENotInDisputeState: u64 = 6;
    const EInsufficientFunds: u64 = 7;

   
    


    // Represents the current state of the escrow

    const STATUS_PENDING: u8 = 0;     
    const STATUS_ACCEPTED: u8 = 1;     
    const STATUS_COMPLETED: u8 = 2;    
    const STATUS_DISPUTED: u8 = 3; 

  public struct Escrow has key, store {
        id: UID,
        client: address,                    
        custodian: address,                 // change to multisig later
        job_title: vector<u8>,
        job_description: vector<u8>,        
        budget: u64,                        
        balance: Balance<SUI>,             
        status: u8,                         
        bids: vector<Bid>,                  
        accepted_freelancer: Option<address>, 
        accepted_price: u64,                
        created_at: u64,                    
    }

      public struct Bid has store, copy, drop {
        freelancer: address,
        price: u64,
        description: vector<u8>,
        timestamp: u64,
    }

    //EMIT EVENTS
    public struct EscrowCreated has copy, drop {
        escrow_id: ID,
        client: address,
        custodian: address,
        budget: u64,
        job_description: vector<u8>,
        timestamp: u64,
    }
       public struct BidAccepted has copy, drop {
        escrow_id: ID,
        freelancer: address,
        accepted_price: u64,
        timestamp: u64,
    }

     public struct BidPlaced has copy, drop {
        escrow_id: ID,
        freelancer: address,
        price: u64,
        description: vector<u8>,
        timestamp: u64,
    }

    public fun create_escrow(
        job_title: vector<u8>,
        job_description: vector<u8>,
        payment: Coin<SUI>,
        custodian: address,
        clock: &sui::clock::Clock,
        ctx: &mut TxContext
    ) {
        let client = ctx.sender();
        let budget = coin::value(&payment);
        let timestamp = sui::clock::timestamp_ms(clock);
        
        let escrow_uid = object::new(ctx);
        let escrow_id = object::uid_to_inner(&escrow_uid);

        let escrow = Escrow {
            id: escrow_uid,
            job_title,
            client,
            custodian,
            job_description,
            budget,
            balance: coin::into_balance(payment),
            status: STATUS_PENDING,
            bids: vector::empty(),
            accepted_freelancer: option::none(),
            accepted_price: 0,
            created_at: timestamp,
        };

        // Emit creation event
        event::emit(EscrowCreated {
            escrow_id,
            client,
            custodian,
            budget,
            job_description,
            timestamp,
        });

        // Transfer escrow object to shared ownership
      
        transfer::share_object(
            escrow,     
        )
    }
    public fun place_bid(
        escrow: &mut Escrow,
        price: u64,
        description: vector<u8>,
        clock: &sui::clock::Clock,
        ctx: &mut TxContext
    ) {
        let freelancer = ctx.sender();
        
        // Only allow bids in PENDING state
        assert!(escrow.status == STATUS_PENDING, EInvalidState);
        
        // Check if this freelancer already placed a bid
        let bids_len = vector::length(&escrow.bids);
        let mut i = 0;
        while (i < bids_len) {
            let bid = vector::borrow(&escrow.bids, i);
            assert!(bid.freelancer != freelancer, EBidAlreadyExists);
            i = i + 1;
        };

        let timestamp = sui::clock::timestamp_ms(clock);
        
        let bid = Bid {
            freelancer,
            price,
            description,
            timestamp,
        };

        vector::push_back(&mut escrow.bids, bid);

        // Emit bid event
        event::emit(BidPlaced {
            escrow_id: object::uid_to_inner(&escrow.id),
            freelancer,
            price,
            description,
            timestamp,
        });
    }

     public fun accept_bid(
        escrow: &mut Escrow,
        freelancer: address,
        clock: &sui::clock::Clock,
        ctx: &mut TxContext
    ) {
        // Only client can accept bids
        assert!(ctx.sender() == escrow.client, ENotAuthorized);
        
        // Must be in PENDING state
        assert!(escrow.status == STATUS_PENDING, EInvalidState);
        
        // Find the freelancer's bid
        let bids_len = vector::length(&escrow.bids);
        let mut i = 0;
        let mut found = false;
        let mut accepted_price = 0;
        
        while (i < bids_len) {
            let bid = vector::borrow(&escrow.bids, i);
            if (bid.freelancer == freelancer) {
                found = true;
                accepted_price = bid.price;
                break
            };
            i = i + 1;
        };

        assert!(found, ENoFreelancerAccepted);

        // Update escrow state
        escrow.status = STATUS_ACCEPTED;
        escrow.accepted_freelancer = option::some(freelancer);
        escrow.accepted_price = accepted_price;

        let timestamp = sui::clock::timestamp_ms(clock);

        // Emit acceptance event
        event::emit(BidAccepted {
            escrow_id: object::uid_to_inner(&escrow.id),
            freelancer,
            accepted_price,
            timestamp,
        });
    }