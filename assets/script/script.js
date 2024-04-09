// Settings Screen functions
/**
 * Function for opening and closing settings screen. By default it will be closed and when player presses the icon it will open.
 */
document.getElementById(`settingsBtn`).addEventListener('click', openSettings);

function openSettings() {

    const settingsSwitch = document.getElementById(`settingsCheck`);

    if (settingsSwitch.checked) {
        document.getElementById(`settings`).style.display = `block`;
    }
    else {
        document.getElementById(`settings`).style.display = `none`;
    }
}


// Inventory Screen functions
/**
 * Function for opening and closing inventory screen. By default it will be closed and when player presses the icon it will open.
 */
document.getElementById(`invBtn`).addEventListener('click', openInv);

function openInv() {

    const invSwitch = document.getElementById(`invCheck`);

    if (invSwitch.checked) {
        document.getElementById(`inv`).style.display = `flex`;
    }
    else {
        document.getElementById(`inv`).style.display = `none`;
    }
}


// Actions functions
/**
 * 
 */
document.getElementById(`attack`).addEventListener(`click`, attack);

function attack() {
    
    //Dice roll for the attack chance value without modifiers
    const attackRoll = Math.floor(Math.random() * 20 + 1)
    console.log(attackRoll);

    // Check if player succeeded in landing the hit
    if (attackRoll >= 12) {
        console.log(`Your hit lands!`)    
    }
    else {
        console.log(`Oh no! You missed!`)
    }
}