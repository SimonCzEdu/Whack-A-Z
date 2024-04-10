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
// Current Zombie health - must me declared with let as we will later on assign new values to it
let currentZHealth = document.getElementById('zHealthIndicator').style.width = `100%`;
currentZHealth = parseInt(currentZHealth);
console.log(currentZHealth);

function attack() {

    //Dice roll for the attack chance value without modifiers
    const attackRoll = Math.floor(Math.random() * 20 + 1)
    console.log(attackRoll);

    // Check if player succeeded in landing the hit
    if (attackRoll >= 12) {
        // Dice roll for the attack strength (aka damage)    
        const attackDmg = Math.floor(Math.random() * 11)
        //Message to on hit
        document.getElementById(`combatLog`).innerHTML = `Your hit lands! You did ${attackDmg} points of damage!`;
        // Damage applied to the Zombie Health Indicator
        let zHealthAfterHit = currentZHealth - attackDmg;
        // Zero out Zombie health if it drops below zero;
        if (currentZHealth - attackDmg < 0) {
            zHealthAfterHit = 0;
        }

        document.getElementById(`zHealthIndicator`).style.width = `${zHealthAfterHit}%`;
        currentZHealth = zHealthAfterHit;

    }
    else {
        document.getElementById(`combatLog`).innerHTML = `Oh no! You missed`;
    }

    // Dice roll for the attack strength (aka damage)

}