module escrowave_contract::walrus_seal;
use escrowave_contract::escrowave_contract::{Escrow, get_client, get_custodian, get_status};
use std::string::String;
use sui::dynamic_field as df;
use escrowave_contract::utils::is_prefix;

const EInvalidCap: u64 = 0;
const ENoAccess: u64 = 1;
const EDuplicate: u64 = 2;
const STATUS_DISPUTED: u8 = 3;
const MARKER: u64 = 3;

public struct Allowlist has key {
    id: UID,
    name: String,
    list: vector<address>,
}

public struct Cap has key {
    id: UID,
    allowlist_id: ID,
}

public fun create_allowlist(name: String,escrow: &Escrow, ctx: &mut TxContext): Cap {
    let mut allowlist = Allowlist {
        id: object::new(ctx),
        list: vector::empty(),
        name: name,
    };
    let cap = Cap {
        id: object::new(ctx),
        allowlist_id: object::id(&allowlist),
    };
     // Push client and custodian addresses to the allowlist
     let client = get_client(escrow);
    let custodian = get_custodian(escrow);
    
    allowlist.list.push_back(client);
    if (custodian != client) {
        allowlist.list.push_back(custodian);
    };
    

    transfer::share_object(allowlist);
    cap
}

public fun add(allowlist: &mut Allowlist, cap: &Cap, account: address) {
    assert!(cap.allowlist_id == object::id(allowlist), EInvalidCap);
    assert!(!allowlist.list.contains(&account), EDuplicate);
    allowlist.list.push_back(account);
}
entry fun create_allowlist_entry(name: String,escrow: &Escrow, ctx: &mut TxContext) {
    transfer::transfer(create_allowlist(name,escrow, ctx), ctx.sender());
}

public fun namespace(allowlist: &Allowlist): vector<u8> {
    allowlist.id.to_bytes()
}


fun approve_internal(caller: address, id: vector<u8>, escrow: &Escrow, allowlist: &Allowlist): bool {
    // Check if the id has the right prefix
    let namespace = namespace(allowlist);
    let custodian = get_custodian(escrow);
       if (caller == custodian) {
        // Custodian can ONLY access when status is DISPUTED
        return get_status(escrow) == STATUS_DISPUTED
    };


    if (!is_prefix(namespace, id)) {
        return false
    };

    // Check if user is in the allowlist
    allowlist.list.contains(&caller)
}

entry fun seal_approve(id: vector<u8>, escrow: &Escrow, allowlist: &Allowlist, ctx: &TxContext) {
    // assert!(approve_internal(ctx.sender(),  id, allowlist), ENoAccess);
    assert!(approve_internal(ctx.sender(), id, escrow, allowlist), ENoAccess);
}

/// Encapsulate a blob into a Sui object and attach it to the allowlist
public fun publish(allowlist: &mut Allowlist, cap: &Cap,escrow:&Escrow, blob_id: String) {
     //let client = get_client(escrow);
    assert!(cap.allowlist_id == object::id(allowlist), EInvalidCap);
    df::add(&mut allowlist.id, blob_id, MARKER);
    //transfer::transfer(cap, custodian); try later
    
}