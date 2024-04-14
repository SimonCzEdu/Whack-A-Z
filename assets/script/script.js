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

/* Current Greg health - must me declared with 'let' as we will later assign new values to it.
Must also be declared before we call the function.*/
let currentZHealth = document.getElementById('zHealthIndicator').style.width = `100%`;
// Make it an actual number
currentZHealth = parseInt(currentZHealth);
console.log(`Greg currently have ${currentZHealth}% health`);
// Current Players health - must me declared with 'let' as we will later assign new values to it.
let currentPHealth = document.getElementById(`pHealthIndicator`).style.width = `100%`;
// Make it an actual number
currentPHealth = parseInt(currentPHealth);
console.log(`You have have ${currentPHealth}% health left`);
// Current Noise Level - must me declared with 'let' as we will later assign new values to it.
let currentNoiseLvl = document.getElementById(`noiseIndicator`).style.height = `0%`;
// Make it into an actual number
currentNoiseLvl = parseInt(currentNoiseLvl);
// Current seconds timer count
let currentTime = document.getElementById('nrOne').innerHTML = 0;
// Make it into a number
currentTime = parseInt(currentTime);
// After player already selected parry and we don't want them to deselect it (it is a check box), so we hide it instead. Otherwise they will loose a turn.
function hideParryOnSelect() {
    const parry = document.getElementById(`parry`);
    if (parry.checked) {
        parry.style.display = `none`;
        document.getElementById('parryCheck').style.display = `none`;
        document.getElementById('justIcon').style.display = `flex`;
        console.log(`Checked`);
    }
}


// Attack Action Function 
/**
 * attack() function decides what happens when player clicks on Attack button
 */
function attack() {
   
    // Win and loose conditions functions
    looseConditions()
    winCondition()

    // On attack first we will increase the noise and nr. of moves counter
    move += 1;
    // We will need a remainder of move so we can decide if we are on even number move to end the turn
    remainder = move % 2;
    // We also need value for noise increase
    noise = 4;

    // Seconds counter
    currentTime = currentTime + 1;
    // Max out seconds at 120sec
    if (currentTime >= 120) {
        currentTime = 120;
    }
    //Apply timer increase
    document.getElementById('nrOne').innerHTML = currentTime;

    // Noise Level increase
    currentNoiseLvl = currentNoiseLvl + noise;
    // Max out noise level at 100%
    if (currentNoiseLvl >= 96) {
        currentNoiseLvl = 100;
    }
    // Apply noise increase to the Noise Level Indicator by adding to its width value of move
    document.getElementById('noiseIndicator').style.height = `${currentNoiseLvl}%`;
    console.log(`Noise level is at: ${currentNoiseLvl} Nr. of moves: ${move} and move remainder is at ${remainder}`);

    // Attack roll
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
        combatLogEntry.innerHTML = `You Whacked Greg! You did ${attackDmg} points of damage!`;
        combatLogEntry.setAttribute(`class`, `combatNewEntry`);
        document.getElementById('combatLog').prepend(combatLogEntry);
        console.log(`Rolled ${attackDmg} for damage`);

        // Damage applied to the Greg Health Indicator
        currentZHealth = currentZHealth - attackDmg;
        // Zero out Greg health if it drops below zero;
        if (currentZHealth - attackDmg < 0) {
            currentZHealth = 0;
        }
        // Apply damage to the Greg Health Indicator by reducing its width by the dmg done
        document.getElementById(`zHealthIndicator`).style.width = `${currentZHealth}%`;
        console.log(`Greg currently have ${currentZHealth}% health`);
    }
    else {

        // Combat Log message on miss
        const combatLogEntry = document.createElement(`div`);
        combatLogEntry.innerHTML = `You've missed Greg! HA!`;
        combatLogEntry.setAttribute(`class`, `combatMissEntry`);
        document.getElementById('combatLog').prepend(combatLogEntry);
        console.log(`This was not enough to hit`);

    }

    // End Turn on every second move and run Greg Turn
    if (remainder === 0) {

        // Hide default Actions buttons
        document.getElementById(`attack`).style.display = `none`;
        document.getElementById(`parry`).style.display = `none`;
        document.getElementById(`wait`).style.display = `none`;
        document.getElementById(`parryDiv`).style.display = `none`;
        // Display End Turn button
        document.getElementById(`endTurn`).style.display = `flex`;
    }

    // Win and loose conditions and events
    looseConditions()

}
// Parry Action Function 
/**
 * parry() function decides what happens when player clicks on Parry button
 */
function parry() {
    
    // Win and loose conditions functions
    looseConditions()
    winCondition()

    // On attack first we will increase the noise and nr. of moves counter
    move += 1;
    // We will need a remainder of move so we can decide if we are on even number move to end the turn
    remainder = move % 2;
    // We also need value for noise increase
    noise = 1;

    // Seconds counter
    currentTime = currentTime + 1;
    // Max out seconds at 120sec
    if (currentTime >= 120) {
        currentTime = 120;
    }
    //Apply timer increase
    document.getElementById('nrOne').innerHTML = currentTime;

    // Noise Level increase
    currentNoiseLvl = currentNoiseLvl + noise;
    // Max out noise level at 100%
    if (currentNoiseLvl >= 99) {
        currentNoiseLvl = 100;
    }

    // Combat Log message on hit
    const combatLogEntry = document.createElement(`div`);
    combatLogEntry.innerHTML = `You brace for the next attack`;
    combatLogEntry.setAttribute(`class`, `braceEntry`);
    document.getElementById('combatLog').prepend(combatLogEntry);

    // Apply noise increase to the Noise Level Indicator by adding to its width value of move
    document.getElementById('noiseIndicator').style.height = `${currentNoiseLvl}%`;
    console.log(`Noise level is at: ${currentNoiseLvl} Nr. of moves: ${move} and move remainder is at ${remainder}`);


    // End Turn on every second move and run Greg Turn
    if (remainder === 0) {

        // Hide default Actions buttons
        document.getElementById(`attack`).style.display = `none`;
        document.getElementById(`parry`).style.display = `none`;
        document.getElementById(`wait`).style.display = `none`;
        document.getElementById(`parryDiv`).style.display = `none`;
        // Display End Turn button
        document.getElementById(`endTurn`).style.display = `flex`;
    }

    // Win and loose conditions and events
    if (currentPHealth === '0%') {
        console.log('You loose because you are dead');
    } else if (currentNoiseLvl === "100%") {
        console.log(`You loose because you are to noisy!`);
    }
}
// Wait Action Function 
/** 
 * wait() function decides what happens when player clicks on Wait button
 */
function wait() {
    
    // Win and loose conditions functions
    looseConditions()
    winCondition()

    // On attack first we will increase the noise and nr. of moves counter
    move += 1;
    // We will need a remainder of move so we can decide if we are on even number move to end the turn
    remainder = move % 2;
    // We also need value for noise increase
    noise = 3;

    // Seconds counter
    currentTime = currentTime + 1;
    // Max out seconds at 120sec
    if (currentTime >= 120) {
        currentTime = 120;
    }
    //Apply timer increase
    document.getElementById('nrOne').innerHTML = currentTime;

    // Noise level decrease
    currentNoiseLvl = currentNoiseLvl - noise;
    // Stop decreasing noise level if it reaches zero
    if (currentNoiseLvl <= 0) {
        currentNoiseLvl = 0;
    }

    // Combat Log message on hit
    const combatLogEntry = document.createElement(`div`);
    combatLogEntry.innerHTML = `You wait and try to stay quite`;
    combatLogEntry.setAttribute(`class`, `waitEntry`);
    document.getElementById('combatLog').prepend(combatLogEntry);

    // Apply noise decrease to the Noise Level Indicator by decreasing its width value
    document.getElementById('noiseIndicator').style.height = `${currentNoiseLvl}%`;
    console.log(`Noise level is at: ${currentNoiseLvl} Nr. of moves: ${move} and move remainder is at ${remainder}`);

    // End Turn on every second move and run Greg Turn
    if (remainder === 0) {

        // Hide default Actions buttons
        document.getElementById(`attack`).style.display = `none`;
        document.getElementById(`wait`).style.display = `none`;
        document.getElementById(`parry`).style.display = `none`;
        document.getElementById(`parryDiv`).style.display = `none`;
        // Display End Turn button
        document.getElementById(`endTurn`).style.display = `flex`;
    }
}

// End/Greg Turn - when player presses on End Turn, this function will calculate Gregs turn.
// We need event listener for that:
document.getElementById('endTurn').addEventListener('click', endTurn);
/**
 * endTurn() function plays out Greg turn, unchecks parry and allow to players to use default actions again
 */
function endTurn() {
    
    // Win and loose conditions functions
    looseConditions()
    winCondition()

    const parry = document.getElementById('parry');
    const parryCheck = document.getElementById('parryCheck');
    const justIcon = document.getElementById('justIcon');
    /**
    * Dice roll for Gregs attack chance value without modifiers. It is random number 1-50
    */
    const zAttackRoll = Math.floor(Math.random() * 50 + 1);
    console.log(`Greg rolled ${zAttackRoll} for attack`);


    //  If parry is active we will apply debuff to the Gregs chance to hit and it's damage
    if (parry.checked) {
        // Check if Greg succeeded in landing a hit
        if (zAttackRoll >= 40) {
            // Dice roll for the Gregs attack strength (aka damage)    
            const zAttackDmg = Math.floor(Math.random() * 10)

            // Combat Log message on hit
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `Greg swings and hits! You take ${zAttackDmg} points of damage!`;
            combatLogEntry.setAttribute(`class`, `combatZNewEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`Greg rolled ${zAttackDmg} for damage`);

            // Damage applied to the Greg Health Indicator
            let pHealthAfterHit = currentPHealth - zAttackDmg;
            // Zero out Greg health if it drops below zero;
            if (currentPHealth - zAttackDmg < 0) {
                pHealthAfterHit = 0;
            }
            // Apply damage to the Player Health Indicator by reducing it's width by the dmg done
            document.getElementById(`pHealthIndicator`).style.width = `${pHealthAfterHit}%`;
            currentPHealth = pHealthAfterHit;
            console.log(`Greg currently have ${currentPHealth}% health`);
        } else {

            // Combat Log message on Greg Miss
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `Greg misses you.`;
            combatLogEntry.setAttribute(`class`, `combatZMissEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`Greg rolled ${zAttackRoll} for attack and missed.`);

        }
    } else {
        if (zAttackRoll >= 5) {
            // Dice roll for the Gregs attack strength (aka damage)    
            const zAttackDmg = Math.floor(Math.random() * 10 + 5)

            // Combat Log message on hit
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `Greg Whacks you! You take ${zAttackDmg} points of damage!`;
            combatLogEntry.setAttribute(`class`, `combatZNewEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`Greg rolled ${zAttackDmg} for damage`);

            // Damage applied to the Greg Health Indicator
            let pHealthAfterHit = currentPHealth - zAttackDmg;
            // Zero out Greg health if it drops below zero;
            if (currentPHealth - zAttackDmg < 0) {
                pHealthAfterHit = 0;
            }
            // Apply damage to the Player Health Indicator by reducing it's width by the dmg done
            document.getElementById(`pHealthIndicator`).style.width = `${pHealthAfterHit}%`;
            currentPHealth = pHealthAfterHit;
            console.log(`Greg currently have ${currentPHealth}% health`);
        } else {

            // Combat Log message on Greg Miss
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `Greg misses you`;
            combatLogEntry.setAttribute(`class`, `combatZMissEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`Greg rolled ${zAttackRoll} for attack and missed.`);

        }
    }
    // Restore default Actions buttons
    document.getElementById(`attack`).style.display = `flex`;
    document.getElementById(`wait`).style.display = `flex`;
    document.getElementById(`parryDiv`).style.display = `flex`;
    // Hide End Turn button
    document.getElementById(`endTurn`).style.display = `none`;

    // Now we check if parry was checked and hidden
    function uncheckParry() {
        if (parry.checked) {
            // Uncheck parry checkbox
            parry.checked = false;
            // Re-hide checkbox 
            parry.style.display = `none`;
            // Show parry icon
            parryCheck.style.display = `flex`;
            // Hide icon for active parry
            justIcon.style.display = `none`;
            console.log('Parry Checked - unchecking!')
        } else {
            console.log(`Parry UnChecked - no change`)
        }
    }
    // We will call the uncheckParry() function once to make sure it does it's thing
    uncheckParry();
}


// Win and loose conditions and events
/**
 * looseConditions() function is called on every action and checks if you lost and if so, why and displays appropriate message
 */
function looseConditions(){
if (currentPHealth == 0) {
    endGameL()
    document.getElementById('endMsg').innerHTML = `You loose because you are dead`;
    document.getElementById('endMsg').innerHTML = `You (re)killed Gary!<br>You are a monster!<br>Well... you can loot him now... <br> like a grave robber...`;
    console.log('You loose because you are dead');
}
if (currentTime == 120) {
    endGameL()
    document.getElementById('endMsg').innerHTML = `You loose because you ran out of time`;
    document.getElementById('endMsg').innerHTML = `You (re)killed Gary!<br>You are a monster!<br>Well... you can loot him now... <br> like a grave robber...`;
    console.log(`You loose because you ran out of time`);
}    
if (currentNoiseLvl == 100) {
    endGameL()
    document.getElementById('endMsg').innerHTML = `You loose because you are to noisy!`;
    document.getElementById('endMsg').innerHTML = `You (re)killed Gary!<br>You are a monster!<br>Well... you can loot him now... <br> like a grave robber...`;
    console.log(`You loose because you are to noisy!`)
}
}
/**
 * winCondition() function is called on every action and checks if you won and displays appropriate message
 */
function winCondition() {
    if (currentZHealth == 0) {
        endGameW()
        document.getElementById('endMsg').innerHTML = `You (re)killed Gary!<br>You are a monster!<br>Well... you can loot him now... <br> like a grave robber...`;
        console.log(`You won!`)
    }
}
// endGameL() function is called within winConditions() function and stops players from continuing until they select one of two options: search or play again 
function endGameL() {
    document.getElementById('endGame').style.display = `flex`;
    document.getElementById('endMsg').style.display = `flex`;
    document.getElementById('endBtn').style.display = `flex`;
    // Remove it later just for testing!!!!
    document.getElementById('searchBtn').style.display = `flex`;
}
function endGameW() {
    document.getElementById('endGame').style.display = `flex`;
    document.getElementById('endMsg').style.display = `flex`;
    document.getElementById('endBtn').style.display = `flex`;
    document.getElementById('searchBtn').style.display = `flex`;
}