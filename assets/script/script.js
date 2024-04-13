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
document.getElementById(`parry`).addEventListener(`click`, hideParryOnSelect);
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
// Current Players health - must me declared with 'let' as we will later assign new values to it.
let currentPHealth = document.getElementById(`pHealthIndicator`).style.width = `100%`
// Now we need to make it an actual number
currentPHealth = parseInt(currentPHealth);
console.log(`You have have ${currentPHealth}% health left`);
// After player already selected parry and we don't want them to deselect it (it is a check box), so we hide it instead
function hideParryOnSelect() {
    const parry = document.getElementById(`parry`);
    if (parry.checked) {
        parry.style.display = `none`;
        document.getElementById('parryCheck').style.display = `none`;
        console.log(`Checked`);
    }
}


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
    console.log(`You rolled ${attackRoll} for attack`);

    // Check if player succeeded in landing a hit
    if (attackRoll >= 10) {
        // Dice roll for the attack strength (aka damage)    
        const attackDmg = Math.floor(Math.random() * 11)

        // Combat Log message on hit
        const combatLogEntry = document.createElement(`div`);
        combatLogEntry.innerHTML = `Your hit lands! You did ${attackDmg} points of damage!`;
        combatLogEntry.setAttribute(`class`, `combatNewEntry`);
        document.getElementById('combatLog').prepend(combatLogEntry);
        console.log(`You rolled ${attackDmg} for damage`);

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

        // Combat Log message on miss
        const combatLogEntry = document.createElement(`div`);
        combatLogEntry.innerHTML = `Oh no! You've missed!`;
        combatLogEntry.setAttribute(`class`, `combatMissEntry`);
        document.getElementById('combatLog').prepend(combatLogEntry);
        console.log(`This was not enough to hit`);

    }
    console.log(`Move remainder ${remainder}`);

    // End Turn on every second move and run Zombie Turn
    if (remainder === 0) {

        // Hide default Actions buttons
        document.getElementsByClassName(`hideActions`)[0].style.display = `none`;
        document.getElementsByClassName(`hideActions`)[1].style.display = `none`;
        document.getElementsByClassName(`hideActions`)[3].style.display = `none`;
        // Display End Turn button
        document.getElementById(`endTurn`).style.display = `block`;
    }
}
// Parry Action Function 
/**
 * parry() function decides what happens when player clicks on Parry button
 */
function parry() {

    // On attack first we will increase the noise and nr. of moves counter
    move += 1;
    remainder = move % 2;
    noise += 1;
    console.log(`Noise level is at: ${noise} Nr. of moves: ${move}`);
    console.log(`Move remainder ${remainder}`);

    // End Turn on every second move and run Zombie Turn
    if (remainder === 0) {

        // Hide default Actions buttons
        document.getElementsByClassName(`hideActions`)[0].style.display = `none`;
        document.getElementsByClassName(`hideActions`)[1].style.display = `none`;
        document.getElementsByClassName(`hideActions`)[3].style.display = `none`;
        // Display End Turn button
        document.getElementById(`endTurn`).style.display = `block`;
    }
}
// Wait Action Function 
/**
 * wait() function decides what happens when player clicks on Wait button
 */
function wait() {

    // On attack first we will increase the noise and nr. of moves counter
    move += 1;
    remainder = move % 2;
    if (noise > 0) {
        noise -= 1;
    }
    console.log(`Noise level is at: ${noise} Nr. of moves: ${move}`);
    console.log(`Move remainder ${remainder}`);

    // End Turn on every second move and run Zombie Turn
    if (remainder === 0) {

        // Hide default Actions buttons
        document.getElementsByClassName(`hideActions`)[0].style.display = `none`;
        document.getElementsByClassName(`hideActions`)[1].style.display = `none`;
        document.getElementsByClassName(`hideActions`)[3].style.display = `none`;
        // Display End Turn button
        document.getElementById(`endTurn`).style.display = `block`;
    }

}

// End/Zombie Turn - when player presses on End Turn, this function will calculate zombies turn.
// We need event listener for that:
document.getElementById('endTurn').addEventListener('click', endTurn);

/**
 * endTurn() function plays out zombie turn, unchecks parry and reso
 */
function endTurn() {
    /**
    * Dice roll for zombies attack chance value without modifiers. It is random number 1-50
    */
    const parry = document.getElementById('parry');
    const zAttackRoll = Math.floor(Math.random() * 50 + 1)
    console.log(`Zombie rolled ${zAttackRoll} for attack`);

    // If parry active we will apply debuff to the Zombies chance to hit and it's damage
    if (parry.checked) {
        // Check if zombie succeeded in landing a hit
        if (zAttackRoll >= 40) {
            // Dice roll for the zombies attack strength (aka damage)    
            const zAttackDmg = Math.floor(Math.random() * 10)

            // Combat Log message on hit
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `Zombie swings and hits! You take ${zAttackDmg} points of damage!`;
            combatLogEntry.setAttribute(`class`, `combatZNewEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`Zombie rolled ${zAttackDmg} for damage`);

            // Damage applied to the Zombie Health Indicator
            let pHealthAfterHit = currentPHealth - zAttackDmg;
            // Zero out Zombie health if it drops below zero;
            if (currentPHealth - zAttackDmg < 0) {
                pHealthAfterHit = 0;
            }
            // Apply damage to the Player Health Indicator by reducing it's width by the dmg done
            document.getElementById(`pHealthIndicator`).style.width = `${pHealthAfterHit}%`;
            currentPHealth = pHealthAfterHit;
            console.log(`Zombie currently have ${currentPHealth}% health`);
        } else {

            // Combat Log message on Zombie Miss
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `Zombie swings and misses. You are safe this time.`;
            combatLogEntry.setAttribute(`class`, `combatZNewEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`Zombie rolled ${zAttackRoll} for attack and missed.`);

        }
    } else {
        if (zAttackRoll >= 5) {
            // Dice roll for the zombies attack strength (aka damage)    
            const zAttackDmg = Math.floor(Math.random() * 10 + 5)

            // Combat Log message on hit
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `Zombie swings and hits! You take ${zAttackDmg} points of damage!`;
            combatLogEntry.setAttribute(`class`, `combatZNewEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`Zombie rolled ${zAttackDmg} for damage`);

            // Damage applied to the Zombie Health Indicator
            let pHealthAfterHit = currentPHealth - zAttackDmg;
            // Zero out Zombie health if it drops below zero;
            if (currentPHealth - zAttackDmg < 0) {
                pHealthAfterHit = 0;
            }
            // Apply damage to the Player Health Indicator by reducing it's width by the dmg done
            document.getElementById(`pHealthIndicator`).style.width = `${pHealthAfterHit}%`;
            currentPHealth = pHealthAfterHit;
            console.log(`Zombie currently have ${currentPHealth}% health`);
        } else {

            // Combat Log message on Zombie Miss
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `Zombie swings and misses. You are safe this time.`;
            combatLogEntry.setAttribute(`class`, `combatZNewEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`Zombie rolled ${zAttackRoll} for attack and missed.`);

        }
    }
    // Restore default Actions buttons
    document.getElementsByClassName(`hideActions`)[0].style.display = `block`;
    document.getElementsByClassName(`hideActions`)[1].style.display = `block`;
    document.getElementsByClassName(`hideActions`)[3].style.display = `block`;
    // Hide End Turn button
    document.getElementById(`endTurn`).style.display = `none`;

    // If parry was checked and hidden we need to uncheck it for the next player round
    function uncheckParry() {
        if (parry.checked) {
            parry.checked = false;
            console.log('Parry Checked - unchecking!')
        } else {
            parry.checked = false;
            console.log(`Parry UnChecked - no change`)
        }
    }
    uncheckParry();
}