
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
    const STATUS_RESOLVED_CLIENT_REFUNDED: u8 = 4;
    const STATUS_RESOLVED_FREELANCER_REFUNDED: u8 = 5;
    const STATUS_RELEASED: u8 = 6;
  

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
    public struct FreelancerRefunded has copy, drop {
    escrow_id: ID,
    client: address,
    amount: u64,
    timestamp: u64,
    }
    public struct ClientRefunded has copy, drop {
        escrow_id: ID,
        client: address,
        amount: u64,
        timestamp: u64,
    }
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
    public struct PaymentReleased has copy, drop {
    escrow_id: ID,
    client: address,
    freelancer: address,
    amount: u64,
    timestamp: u64,
}

    public fun create_escrow(
    job_title: vector<u8>,
    job_description: vector<u8>,
    payment_amount: u64,
    custodian: address,
    payment_coin: &mut Coin<SUI>,
    clock: &sui::clock::Clock,
    ctx: &mut TxContext
) {
    let client = ctx.sender();
    
    // Split the specified amount from the payment coin
    let payment = coin::split(payment_coin, payment_amount, ctx);
    
    let timestamp = sui::clock::timestamp_ms(clock);
    
    let escrow_uid = object::new(ctx);
    let escrow_id = object::uid_to_inner(&escrow_uid);

    let escrow = Escrow {
        id: escrow_uid,
        job_title,
        client,
        custodian,
        job_description,
        budget: payment_amount,
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
        budget: payment_amount,
        job_description,
        timestamp,
    });

    // Transfer escrow object to shared ownership
    transfer::share_object(escrow);
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
        assert!(freelancer != escrow.client, ENotAuthorized);
        
        
        
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
        assert!(price <= escrow.budget, EInsufficientFunds);
       
       

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
public fun complete_job(
    escrow: &mut Escrow,
    ctx: &mut TxContext
) {
    // Only accepted freelancer can mark job as completed
    let sender = ctx.sender();
    
    // Extract the accepted freelancer address from Option
    assert!(option::is_some(&escrow.accepted_freelancer), ENotAuthorized);
    let accepted_freelancer = *option::borrow(&escrow.accepted_freelancer);
    
    assert!(sender == accepted_freelancer, ENotAuthorized);
    
    // Must be in ACCEPTED state
    assert!(escrow.status == STATUS_ACCEPTED, EInvalidState);
    
    // Update status to COMPLETED
    escrow.status = STATUS_COMPLETED;
}


public fun release_payment(
    escrow: &mut Escrow,
    clock: &sui::clock::Clock,
    ctx: &mut TxContext,
) {
    let sender = ctx.sender();
    
    // Only client can release payment
    assert!(sender == escrow.client, ENotAuthorized);
    
    // Must be in COMPLETED state
    assert!(escrow.status == STATUS_COMPLETED, EInvalidState);
    
    // Must have an accepted freelancer
    assert!(option::is_some(&escrow.accepted_freelancer), EInvalidState);
    
    let freelancer = *option::borrow(&escrow.accepted_freelancer);
    let payment_amount = escrow.accepted_price;
    

    
    // Extract payment from balance
    let payment_balance = balance::split(&mut escrow.balance, payment_amount);
    let payment_coin = coin::from_balance(payment_balance, ctx);
    
    
    // Transfer payment to freelancer
    transfer::public_transfer(payment_coin, freelancer);
    let remaining_balance_value = balance::value(&escrow.balance);
    if (remaining_balance_value > 0) {
        let remaining_balance = balance::withdraw_all(&mut escrow.balance);
        let remaining_coin = coin::from_balance(remaining_balance, ctx);
        transfer::public_transfer(remaining_coin, escrow.client);
    };
    
    // Update status to RELEASED
    escrow.status = STATUS_RELEASED;
    
    event::emit(PaymentReleased {
        escrow_id: object::uid_to_inner(&escrow.id),
        client: escrow.client,
        freelancer,
        amount: payment_amount,
        timestamp: sui::clock::timestamp_ms(clock),
    });

      
}

    public fun dispute_job(
        escrow: &mut Escrow,
        ctx: &mut TxContext
    ) {
        // Only accepted freelancer can mark job as completed
        let sender = ctx.sender();
        
        // Extract the accepted freelancer address from Option

        assert!(option::is_some(&escrow.accepted_freelancer), ENotAuthorized);

        let accepted_freelancer = *option::borrow(&escrow.accepted_freelancer);

        let client = escrow.client;

        assert!( sender == accepted_freelancer || sender == client,  ENotAuthorized);
        
        // Must be in ACCEPTED state
        assert!(escrow.status == STATUS_ACCEPTED || escrow.status ==  STATUS_COMPLETED, EInvalidState);
        
        // Update status to COMPLETED
        escrow.status = STATUS_DISPUTED;
    }




public fun refund_client(
    escrow: &mut Escrow,
    clock: &sui::clock::Clock,
    ctx: &mut TxContext,
) {
    let sender = ctx.sender();
    
    // Only custodian can execute refund
    assert!(sender == escrow.custodian, ENotAuthorized);
    
    // Must be in DISPUTED state
    assert!(escrow.status == STATUS_DISPUTED, ENotInDisputeState);
    
    // Withdraw all balance
    let refund_amount = balance::value(&escrow.balance);
    let refund_balance = balance::withdraw_all(&mut escrow.balance);
    let refund_coin = coin::from_balance(refund_balance, ctx);
    
    // Transfer all funds to client
    transfer::public_transfer(refund_coin, escrow.client);
    
    // Update status to resolved with client refunded
    escrow.status = STATUS_RESOLVED_CLIENT_REFUNDED;
    
    // Emit refund event
    event::emit(ClientRefunded {
        escrow_id: object::uid_to_inner(&escrow.id),
        client: escrow.client,
        amount: refund_amount,
        timestamp: sui::clock::timestamp_ms(clock),
    });
}



  public fun refund_freelancer(
    escrow: &mut Escrow,
    clock: &sui::clock::Clock,
    ctx: &mut TxContext,
) {
    let sender = ctx.sender();
    
    // Only custodian can execute refund
    assert!(sender == escrow.custodian, ENotAuthorized);
    
    // Must be in DISPUTED state
    assert!(escrow.status == STATUS_DISPUTED, ENotInDisputeState);
    
    // Withdraw all balance
    let refund_amount = balance::value(&escrow.balance);
    let refund_balance = balance::withdraw_all(&mut escrow.balance);
    let refund_coin = coin::from_balance(refund_balance, ctx);
     let accepted_freelancer = *option::borrow(&escrow.accepted_freelancer);
    
    // Transfer all funds to client
    transfer::public_transfer(refund_coin, accepted_freelancer);
    
    // Update status to resolved with client refunded
    escrow.status = STATUS_RESOLVED_FREELANCER_REFUNDED;
    
    // Emit refund event
    event::emit(FreelancerRefunded {
        escrow_id: object::uid_to_inner(&escrow.id),
        client: escrow.client,
        amount: refund_amount,
        timestamp: sui::clock::timestamp_ms(clock),
    });
}
  