/*#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}
*/
use ic_cdk::export::Principal;
use ic_cdk_macros::{init, update, query, pre_upgrade, post_upgrade};
use ic_cdk::storage;
use std::collections::HashMap;
use candid::{CandidType, Deserialize};
use serde::Serialize;

// Define the state structure
#[deriv(CandidType, Deserialize, Default, Serialize)]
struct State {
    total_supply: u64,
    balances: HashMap<Principal, u64>,
    name: String,
    symbol: String,
    admins: Vec<Principal>,
    icp_to_grin_rate: u64, // Rate to convert ICP to Grin memecoin
}

// Use storage for persistent state
#[init]
fn init(name: String, symbol: String, total_supply: u64, icp_to_grin_rate: u64) {
    let caller = ic_cdk::caller();
    let initial_state = State {
        total_supply,
        balances: {
            let mut balances = HashMap::new();
            balances.insert(caller, total_supply);
            balances
        },
        name,
        symbol,
        admins: vec![caller], // Set the caller as the initial admin
        icp_to_grin_rate, // Initialize conversion rate
    };
    storage::stable_save((initial_state,)).unwrap();
}

#[update]
fn transfer(to: Principal, amount: u64) -> Result<(), String> {
    let caller = ic_cdk::caller();
    let mut state: State = storage::stable_restore().unwrap();
    let caller_balance = state.balances.entry(caller).or_insert(0);

    if *caller_balance < amount {
        return Err("Insufficient balance".into());
    }
    *caller_balance -= amount;
    let recipient_balance = state.balances.entry(to).or_insert(0);
    *recipient_balance += amount;

    storage::stable_save((state,)).unwrap();
    Ok(())
}

#[query]
fn balance_of(owner: Principal) -> u64 {
    let state: State = storage::stable_restore().unwrap();
    *state.balances.get(&owner).unwrap_or(&0)
}

#[query]
fn total_supply() -> u64 {
    let state: State = storage::stable_restore().unwrap();
    state.total_supply
}

#[update]
fn airdrop(recipients: Vec<(Principal, u64)>) -> Result<(), String> {
    let caller = ic_cdk::caller();
    let mut state: State = storage::stable_restore().unwrap();
    let total_airdrop_amount: u64 = recipients.iter().map(|(_, amount)| amount).sum();

    let caller_balance = state.balances.entry(caller).or_insert(0);
    if *caller_balance < total_airdrop_amount {
        return Err("Insufficient balance for airdrop".into());
    }

    for (recipient, amount) in recipients {
        let recipient_balance = state.balances.entry(recipient).or_insert(0);
        *recipient_balance += amount;
    }

    storage::stable_save((state,)).unwrap();
    Ok(())
}

// Governance: Adding admins
#[update]
fn add_admin(new_admin: Principal) -> Result<(), String> {
    let caller = ic_cdk::caller();
    let mut state: State = storage::stable_restore().unwrap();

    if !state.admins.contains(&caller) {
        return Err("Only admins can add new admins".into());
    }

    if !state.admins.contains(&new_admin) {
        state.admins.push(new_admin);
    }

    storage::stable_save((state,)).unwrap();
    Ok(())
}

#[query]
fn is_admin(user: Principal) -> bool {
    let state: State = storage::stable_restore().unwrap();
    state.admins.contains(&user)
}

// Buy function
#[update]
fn buy(amount_in_icp: u64) -> Result<(), String> {
    let caller = ic_cdk::caller();
    let mut state: State = storage::stable_restore().unwrap();
    
    // we Calculate the amount of Grin memecoin to be bought
    let grin_amount = amount_in_icp * state.icp_to_grin_rate;

    // we Ensure the state has enough supply to cover the purchase
    if state.total_supply < grin_amount {
        return Err("Insufficient total supply to cover the purchase".into());
    }

    // we Deduct the purchased amount from the total supply
    state.total_supply -= grin_amount;

    // we Credit the buyer's balance with the purchased Grin memecoin
    let buyer_balance = state.balances.entry(caller).or_insert(0);
    *buyer_balance += grin_amount;

    storage::stable_save((state,)).unwrap();
    Ok(())
}

// we Pre-upgrade and post-upgrade hooks for smooth upgrades
#[pre_upgrade]
fn pre_upgrade() {
    let state: State = storage::stable_restore().unwrap();
    storage::stable_save((state,)).unwrap();
}

#[post_upgrade]
fn post_upgrade() {
    let (state,): (State,) = storage::stable_restore().unwrap();
    storage::stable_save((state,)).unwrap();
}

