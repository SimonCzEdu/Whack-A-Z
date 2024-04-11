// Settings Screen functions
/**
 * Function for opening and closing settings screen. By default it will be closed and when player presses the icon it will open.
 */

function openSettings() {

    const settingsSwitch = document.getElementById(`settingsCheck`);

    if (settingsSwitch.checked) {
        document.getElementById(`settings`).style.display = `block`;
    }
    else {
        document.getElementById(`settings`).style.display = `none`;
    }
}
// Even listener for openSettings()
document.getElementById(`settingsBtn`).addEventListener('click', openSettings);



// Inventory Screen functions
/**
 * Function for opening and closing inventory screen. By default it will be closed and when player presses the icon it will open.
 */
function openInv() {

    const invSwitch = document.getElementById(`invCheck`);

    if (invSwitch.checked) {
        document.getElementById(`inv`).style.display = `flex`;
    }
    else {
        document.getElementById(`inv`).style.display = `none`;
    }
}
// Even listener for openInv()
document.getElementById(`invBtn`).addEventListener('click', openInv);



// Actions functions
// Event listeners
document.getElementById(`attack`).addEventListener(`click`, attack);
document.getElementById(`parry`).addEventListener(`click`, parry);
document.getElementById(`wait`).addEventListener(`click`, wait);
// Moves and noise level count
let move = 0;
let remainder = '';
let noise = 0;
console.log(`Noise level is at: ${noise} Nr. of moves: ${move}`);

// Prep
/* Current Zombie health - must me declared with 'let' as we will later assign new values to it.
Must also be declared before we call the function.*/
let currentZHealth = document.getElementById('zHealthIndicator').style.width = `100%`;
// Now we need to make it an actual number
currentZHealth = parseInt(currentZHealth);
console.log(`Zombie currently have ${currentZHealth}% health`);

// Attack Action Function 
/**
 * attack() function decides what happens when player clicks on Attack button
 */
function attack() {

    // On attack first we will increase the noise and nr. of moves counter
    move += 1;
    remainder = move % 2;
    noise += 1;
    console.log(`Noise level is at: ${noise} Nr. of moves: ${move}`);


    /**
     * Dice roll for the attack chance value without modifiers is random number 1-20
     */
    const attackRoll = Math.floor(Math.random() * 20 + 1)
    console.log(`You rolled ${attackRoll} for an attack`);

    // Check if player succeeded in landing a hit
    if (attackRoll >= 10) {
        // Dice roll for the attack strength (aka damage)    
        const attackDmg = Math.floor(Math.random() * 11)
        //Message on hit
        document.getElementById(`combatLog`).innerHTML = `Your hit lands! You did ${attackDmg} points of damage!`;
        console.log(`You rolled ${attackDmg} for damage`)
        // Damage applied to the Zombie Health Indicator
        let zHealthAfterHit = currentZHealth - attackDmg;
        // Zero out Zombie health if it drops below zero;
        if (currentZHealth - attackDmg < 0) {
            zHealthAfterHit = 0;
        }
        // Apply damage to the Zombie Health Indicator by reducing it's width by the dmg done
        document.getElementById(`zHealthIndicator`).style.width = `${zHealthAfterHit}%`;
        currentZHealth = zHealthAfterHit;
        console.log(`Zombie currently have ${currentZHealth}% health`);
    }
    else {
        // Message on miss
        document.getElementById(`combatLog`).innerHTML = `Oh no! You've missed!`;
        console.log(`This was not enough to hit`);
    }
    console.log(`Move remainder ${remainder}`);
    
    // End Turn on every second move
    if (remainder === 0) {
        document.getElementById(`actions`).innerHTML = `
        <div id="endTurn">End Turn
        <br>
        (Zombie will get an attack)</div>
        `;
    }
    
}

function parry() {

    // On attack first we will increase the noise and nr. of moves counter
    move += 1;
    remainder = move % 2;
    noise += 1;
    console.log(`Noise level is at: ${noise} Nr. of moves: ${move}`);
    console.log(`Move remainder ${remainder}`);

    // End Turn on every second move
    if (remainder === 0) {
        document.getElementById(`actions`).innerHTML = `
        <div id="endTurn">End Turn
        <br>
        (Zombie will get an attack)</div>
        `;
    }
 
}

function wait() {

    // On attack first we will increase the noise and nr. of moves counter
    move += 1;
    remainder = move % 2;
    if (noise > 0) {
        noise -= 1;
    }
    console.log(`Noise level is at: ${noise} Nr. of moves: ${move}`);
    console.log(`Move remainder ${remainder}`);
    
    // End Turn on every second move
    if (remainder === 0) {
        document.getElementById(`actions`).innerHTML = `
        <div id="endTurn">End Turn
        <br>
        (Zombie will get an attack)</div>
        `;
    }
}


// Parry Action Function
// Wait Action Function

// Noise Levels Functions

// Victory Functions
// Search Functions
// Defeat Functions

