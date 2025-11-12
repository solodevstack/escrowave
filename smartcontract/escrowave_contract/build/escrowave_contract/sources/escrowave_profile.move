module escrowave_contract::escrowave_profile;

use sui::event;


// Error codes
const EProfileAlreadyExists: u64 = 100;
const ENotAuthorized: u64 = 101;
const EInvalidRating: u64 = 102;

/// Struct to hold freelancer profile information
public struct EscrowaveProfile has key, store {
    id: UID,
    owner: address,
    pfp: vector<u8>,
    name: vector<u8>,
    skills: vector<vector<u8>>,
    bio: vector<u8>,
    rating: u64,  // Rating out of 100
    total_reviews: u64,
    completed_projects: u64,
    created_at: u64,
}

/// Global registry to track all freelancer profiles
public struct EscrowaveRegistry has key {
    id: UID,
    profiles: vector<EscrowaveProfile>, // List of all freelancer profiles
}

// Events
public struct ProfileCreated has copy, drop {
    profile_id: ID,
    owner: address,
    name: vector<u8>,
    timestamp: u64,
}

public struct ProfileUpdated has copy, drop {
    profile_id: ID,
    owner: address,
    timestamp: u64,
}


/// Initialize the freelancer registry (call once on deployment)
fun init(ctx: &mut TxContext) {
    let registry = EscrowaveRegistry {
        id: object::new(ctx),
        profiles: vector::empty(),
    };
    
    transfer::share_object(registry);
}

/// Registers a new freelancer profile
public fun register_profile(
    registry: &mut EscrowaveRegistry,
    name: vector<u8>,
    pfp: vector<u8>,
    skills: vector<vector<u8>>,
    bio: vector<u8>,
    clock: &sui::clock::Clock,
    ctx: &mut TxContext
) {
    let owner = ctx.sender();

    // Check if freelancer already has a profile
    let profiles_len = vector::length(&registry.profiles);
    let mut i = 0;
    while (i < profiles_len) {
        let existing_profile = vector::borrow(&registry.profiles, i);
        assert!(existing_profile.owner != owner, EProfileAlreadyExists);
        i = i + 1;
    };
    
    let timestamp = sui::clock::timestamp_ms(clock);
    let profile_uid = object::new(ctx);
    let profile_id = object::uid_to_inner(&profile_uid);
    
    let profile = EscrowaveProfile {
        id: profile_uid,
        owner,
        pfp,
        name,
        skills,
        bio,
        rating: 0,
        total_reviews: 0,
        completed_projects: 0,
        created_at: timestamp,
    };
    
    // Emit event
    event::emit(ProfileCreated {
        profile_id,
        owner,
        name,
        timestamp,
    });
    
    // Add profile to registry
    vector::push_back(&mut registry.profiles, profile);
}


 fun check_user(user_address : address, users : &EscrowaveRegistry) : (bool, u64){
        let mut i = 0;
        let num_users = vector::length(&users.profiles);
        while(i < num_users){
            let profile = vector::borrow(&users.profiles, i);
            if (profile.owner == user_address){
                return (true, i)
            };
            i = i + 1;
        };
        return (false, 0)
    }



/// Updates an existing freelancer profile with optional fields
public fun update_profile(
    registry: &mut EscrowaveRegistry,
    mut name: Option<vector<u8>>,
    mut pfp: Option<vector<u8>>,
    mut skills: Option<vector<vector<u8>>>,
    mut bio: Option<vector<u8>>,
    clock: &sui::clock::Clock,
    ctx: &mut TxContext
) {
    let owner = ctx.sender();
    
    // Check if user has a profile and get its index
    let (exists, index) = check_user(owner, registry);
    assert!(exists, ENotAuthorized);
    
    // Get mutable reference to the profile
    let profile = vector::borrow_mut(&mut registry.profiles, index);
    
    // Verify ownership
    assert!(profile.owner == owner, ENotAuthorized);
    
    // Update profile fields only if provided
    if (option::is_some(&name)) {
        profile.name = option::extract(&mut name);
    };
    
    if (option::is_some(&pfp)) {
        profile.pfp = option::extract(&mut pfp);
    };
    
    if (option::is_some(&skills)) {
        profile.skills = option::extract(&mut skills);
    };
    
    if (option::is_some(&bio)) {
        profile.bio = option::extract(&mut bio);
    };
    
    let timestamp = sui::clock::timestamp_ms(clock);
    
    // Emit event
    event::emit(ProfileUpdated {
        profile_id: object::uid_to_inner(&profile.id),
        owner,
        timestamp,
    });
}

//     /// Updates an existing freelancer profile
// public fun update_profile(
//     registry: &mut EscrowaveRegistry,
//     name: vector<u8>,
//     pfp: vector<u8>,
//     skills: vector<vector<u8>>,
//     bio: vector<u8>,
//     clock: &sui::clock::Clock,
//     ctx: &mut TxContext
// ) {
//     let owner = ctx.sender();
    
//     // Check if user has a profile and get its index
//     let (exists, index) = check_user(owner, registry);
//     assert!(exists, ENotAuthorized);
    
//     // Get mutable reference to the profile
//     let profile = vector::borrow_mut(&mut registry.profiles, index);
    
//     // Verify ownership
//     assert!(profile.owner == owner, ENotAuthorized);
    
//     // Update profile fields
//     profile.name = name;
//     profile.pfp = pfp;
//     profile.skills = skills;
//     profile.bio = bio;
    
//     let timestamp = sui::clock::timestamp_ms(clock);
    
//     // Emit event
//     event::emit(ProfileUpdated {
//         profile_id: object::uid_to_inner(&profile.id),
//         owner,
//         timestamp,
//     });
// }