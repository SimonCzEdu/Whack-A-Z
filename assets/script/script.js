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


/* Current Gary health - must me declared with 'let' as we will later assign new values to it.
Must also be declared before we call the function.*/
let currentZHealth = document.getElementById('zHealthIndicator').style.width = `100%`;
// Make it an actual number
currentZHealth = parseInt(currentZHealth);
console.log(`Gary currently have ${currentZHealth}% health`);
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

//Items

// Use bandage function
const bandage = document.getElementById(`bandageCon`);
bandage.addEventListener(`click`, bandageUse);
let bandageCount = document.getElementById(`bandageCount`).innerHTML;
let bandageNum = parseInt(bandageCount);
/**
 * bandageUse() uses up one bandage and heals player for 25% of their health bar
 */
function bandageUse() {
    // To prevent players from using up their bandages when they are at full health
    if (currentPHealth !== 100) {
        // If players have bandages in their inventory
        if (bandageNum >= 1) {
            // On use lower amount of uses
            const bandageCountAfter = bandageNum -= 1;
            document.getElementById('bandageCount').innerHTML = bandageCountAfter;
            // To prevent health overflow above 100%
            if (currentPHealth <= 75) {
                currentPHealth += 25;
            } else {
                currentPHealth = 100;
            }

            // Now we can apply value of currentPHealth to the players health indicator
            document.getElementById(`pHealthIndicator`).style.width = `${currentPHealth}%`;
            console.log(bandageNum);

            // Combat Log message on bandage use
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `You used a bandage. Do you think this will be enough?`;
            combatLogEntry.setAttribute(`class`, `combatNewEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`Bandage used`);
        }
    }
}

// Sword Check to see if sword is equipped or not
const swordStatus = document.getElementById(`swordCheck`);
document.getElementById('swordCon').addEventListener(`click`, swordOnOff);
/**
 * swordOnOff() equips and unequips sword in player inventory when swordCon is clicked
 */
function swordOnOff() {
    if (swordStatus.checked === true) {
        swordStatus.checked = false;

        // Combat Log message for putting sword away
        const combatLogEntry = document.createElement(`div`);
        combatLogEntry.innerHTML = `You sheath your sword... it was to big anyway`;
        combatLogEntry.setAttribute(`class`, `combatNewEntry`);
        document.getElementById('combatLog').prepend(combatLogEntry);

        // Change Sword icon to show it status change
        document.getElementById(`swordLabel`).innerHTML = `<iconify-icon id="swordIcon" icon="pepicons-pencil:sword-circle"></iconify-icon>`;
    } else {
        swordStatus.checked = true;

        // Combat Log message for pulling out sword
        const combatLogEntry = document.createElement(`div`);
        combatLogEntry.innerHTML = `You pull out your sword... do you feel bigger now?`;
        combatLogEntry.setAttribute(`class`, `combatNewEntry`);
        document.getElementById('combatLog').prepend(combatLogEntry);

        // Change Sword icon to show it status change
        document.getElementById(`swordLabel`).innerHTML = `<iconify-icon id="swordIcon" icon="pepicons-pencil:sword-circle-filled"></iconify-icon>`;
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
    if (swordStatus.checked === true) {
        if (attackRoll >= 10) {
            console.log(`attack bonus active`);
            // Dice roll for the attack strength (aka damage)    
            const attackDmg = Math.floor(Math.random() * 7 + 5);

            // Combat Log message on hit
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `You Whacked Gary! You did ${attackDmg} points of damage!`;
            combatLogEntry.setAttribute(`class`, `combatNewEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`Rolled ${attackDmg} for damage`);

            // Damage applied to the Gary Health Indicator
            currentZHealth = currentZHealth - attackDmg;
            // Zero out Gary health if it drops below zero;
            if (currentZHealth - attackDmg < 0) {
                currentZHealth = 0;
            }
            // Apply damage to the Gary Health Indicator by reducing its width by the dmg done
            document.getElementById(`zHealthIndicator`).style.width = `${currentZHealth}%`;
            console.log(`Gary currently have ${currentZHealth}% health`);
        }
        else {
            console.log(`attack bonus active but still not enough`);
            // Combat Log message on miss
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `HA! You've missed Gary!`;
            combatLogEntry.setAttribute(`class`, `combatMissEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`This was not enough to hit`);

        }
    } else {
        if (attackRoll >= 12) {
            console.log(`attack bonus INACTIVE`)
            // Dice roll for the attack strength (aka damage)    
            const attackDmg = Math.floor(Math.random() * 10)

            // Combat Log message on hit
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `You Whacked Gary! You did ${attackDmg} points of damage!`;
            combatLogEntry.setAttribute(`class`, `combatNewEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`Rolled ${attackDmg} for damage`);

            // Damage applied to the Gary Health Indicator
            currentZHealth = currentZHealth - attackDmg;
            // Zero out Gary health if it drops below zero;
            if (currentZHealth - attackDmg < 0) {
                currentZHealth = 0;
            }
            // Apply damage to the Gary Health Indicator by reducing its width by the dmg done
            document.getElementById(`zHealthIndicator`).style.width = `${currentZHealth}%`;
            console.log(`Gary currently have ${currentZHealth}% health`);
        }
        else {
            console.log(`attack bonus INACTIVE`)
            // Combat Log message on miss
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `HA! You've missed Gary!`;
            combatLogEntry.setAttribute(`class`, `combatMissEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`This was not enough to hit`);

        }
    }

    // End Turn on every second move and run Gary Turn
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


    // End Turn on every second move and run Gary Turn
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

    // End Turn on every second move and run Gary Turn
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



// End/Gary Turn - when player presses on End Turn, this function will calculate Gary's turn.
// We need event listener for that:
document.getElementById('endTurn').addEventListener('click', endTurn);
/**
 * endTurn() function plays out Gary turn, unchecks parry and allow to players to use default actions again
 */
function endTurn() {

    // Win and loose conditions functions
    looseConditions()
    winCondition()

    const parry = document.getElementById('parry');
    const parryCheck = document.getElementById('parryCheck');
    const justIcon = document.getElementById('justIcon');
    /**
    * Dice roll for Garys attack chance value without modifiers. It is random number 1-50
    */
    const zAttackRoll = Math.floor(Math.random() * 50 + 1);
    console.log(`Gary rolled ${zAttackRoll} for attack`);


    //  If parry is active we will apply debuff to the Garys chance to hit and it's damage
    if (parry.checked) {
        // Check if Gary succeeded in landing a hit
        if (zAttackRoll >= 30) {
            // Dice roll for the Garys attack strength (aka damage)    
            const zAttackDmg = Math.floor(Math.random() * 11)

            // Combat Log message on hit
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `Gary swings and hits! You take ${zAttackDmg} points of damage!`;
            combatLogEntry.setAttribute(`class`, `combatZNewEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`Gary rolled ${zAttackDmg} for damage`);

            // Damage applied to the Player Health Indicator
            let pHealthAfterHit = currentPHealth - zAttackDmg;
            // Zero out Player's health if it drops below zero;
            if (currentPHealth - zAttackDmg < 0) {
                pHealthAfterHit = 0;
            }
            // Apply damage to the Player Health Indicator by reducing it's width by the dmg done
            document.getElementById(`pHealthIndicator`).style.width = `${pHealthAfterHit}%`;
            currentPHealth = pHealthAfterHit;
            console.log(`Gary currently have ${currentPHealth}% health`);
        } else {

            // Combat Log message on Gary Miss
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `Gary misses you.`;
            combatLogEntry.setAttribute(`class`, `combatZMissEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`Gary rolled ${zAttackRoll} for attack and missed.`);

        }
    } else {
        if (zAttackRoll >= 5) {
            // Dice roll for the Garys attack strength (aka damage)    
            const zAttackDmg = Math.floor(Math.random() * 11 + 5)

            // Combat Log message on hit
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `Gary Whacks you! You take ${zAttackDmg} points of damage!`;
            combatLogEntry.setAttribute(`class`, `combatZNewEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`Gary rolled ${zAttackDmg} for damage`);

            // Damage applied to the Gary Health Indicator
            let pHealthAfterHit = currentPHealth - zAttackDmg;
            // Zero out Gary health if it drops below zero;
            if (currentPHealth - zAttackDmg < 0) {
                pHealthAfterHit = 0;
            }
            // Apply damage to the Player Health Indicator by reducing it's width by the dmg done
            document.getElementById(`pHealthIndicator`).style.width = `${pHealthAfterHit}%`;
            currentPHealth = pHealthAfterHit;
            console.log(`Gary currently have ${currentPHealth}% health`);
        } else {

            // Combat Log message on Gary Miss
            const combatLogEntry = document.createElement(`div`);
            combatLogEntry.innerHTML = `Gary misses you`;
            combatLogEntry.setAttribute(`class`, `combatZMissEntry`);
            document.getElementById('combatLog').prepend(combatLogEntry);
            console.log(`Gary rolled ${zAttackRoll} for attack and missed.`);

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
function looseConditions() {
    if (currentPHealth == 0) {
        endGameL()
        document.getElementById('endMsg').innerHTML = `You loose because you are dead`;
        console.log('You loose because you are dead');
    }
    if (currentTime == 120) {
        endGameL()
        document.getElementById('endMsg').innerHTML = `You loose because you ran out of time`;
        console.log(`You loose because you ran out of time`);
    }
    if (currentNoiseLvl == 100) {
        endGameL()
        document.getElementById('endMsg').innerHTML = `You loose because you are to noisy!`;
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
/**
 *  endGameL() function is called within looseConditions() function and stops players from continuing and give them an option to start over 
 */
function endGameL() {
    document.getElementById(`endGame`).style.display = `flex`;
    document.getElementById(`endMsg`).style.display = `flex`;
    document.getElementById(`endBtn`).style.display = `flex`;
    document.getElementById(`toolTipCon`).style.display = `none`;
}
/**
 *  endGameW() function is called within winConditions() function and stops players from continuing until they select one of two options: search or play again 
 */
function endGameW() {
    document.getElementById(`endGame`).style.display = `flex`;
    document.getElementById(`endMsg`).style.display = `flex`;
    document.getElementById(`endBtn`).style.display = `flex`;
    document.getElementById(`searchBtn`).style.display = `flex`;
    document.getElementById(`toolTipCon`).style.display = `none`;
}


// Restart (`Play again`)
document.getElementById(`endBtn`).addEventListener(`click`, restart);
/**
 * restart() function simply reloads the page so the player can play again
 */
function restart() {
    location.reload();
}



// Search after win
const searchBtn = document.getElementById(`searchBtn`);
searchBtn.addEventListener(`click`, search);
/**
 * function search() decides on random chance for number of bandages (or any future items) and displays #searchCon
 */
function search() {
    // Hide end game and display search screen
    document.getElementById(`endGame`).style.display = `none`;
    document.getElementById(`endMsg`).style.display = `none`;
    document.getElementById(`endBtn`).style.display = `none`;
    document.getElementById(`searchBtn`).style.display = `none`;
    document.getElementById(`lootCon`).style.display = `flex`;
    document.getElementById(`inv`).style.display = `flex`;

    // Add guaranteed 1 bandage
    const lootBandage = document.createElement(`li`);
    lootBandage.innerHTML = `<strong>Bandage</strong> <br> (click to collect)`;
    lootBandage.setAttribute(`class`, `lootBandage`);
    document.getElementById('lootLi').prepend(lootBandage);

    // Roll for extra loot chance
    const lootBandageChance = Math.ceil(Math.random() * 9)
    if (lootBandageChance>= 3) {
        const lootBandage = document.createElement(`li`);
        lootBandage.innerHTML = `<strong>Bandage</strong> <br> (click to collect)`;
        lootBandage.setAttribute(`class`, `lootBandage`);
        document.getElementById('lootLi').prepend(lootBandage);
    }
    if (lootBandageChance >= 6) {
        const lootBandage = document.createElement(`li`);
        lootBandage.innerHTML = `<strong>Bandage</strong> <br> (click to collect)`;
        lootBandage.setAttribute(`class`, `lootBandage`);
        document.getElementById('lootLi').prepend(lootBandage);
    }
}

// Add new items to players inventory
/**
 * function addToInv() adds items to the player's inventory when item is clicked and removes it from the list
 */
function addToInv() {
    const lootList = document.getElementById(`lootLi`);
    lootList.removeChild(lootList.firstElementChild);
    const bandageAfterPickup = bandageNum +=1;
    document.getElementById('bandageCount').innerHTML = bandageAfterPickup;
}
document.getElementById(`lootLi`).addEventListener(`click`, addToInv);

// New round after search on button click
const newRound = document.getElementById(`newRound`);
/**
 * function startNewRound() resets Gary's health, noise level and timer. Combat log, players health stay the same, and bandages are increased by amount found.
 */
function startNewRound() {
    currentNoiseLvl = 0;
    currentTime = 0;
    currentZHealth = 100;
    document.getElementById(`zHealthIndicator`).style.width = `100%`;
    document.getElementById(`noiseIndicator`).style.height = `0%`;
    document.getElementById(`nrOne`).innerHTML = 0;
    document.getElementById(`lootCon`).style.display = `none`;
    // Restore default Actions buttons
    document.getElementById(`attack`).style.display = `flex`;
    document.getElementById(`wait`).style.display = `flex`;
    document.getElementById(`parryDiv`).style.display = `flex`;
    // Hide End Turn button
    document.getElementById(`endTurn`).style.display = `none`;
    
}
newRound.addEventListener(`click`, startNewRound);



//Settings functions

// Combat Log on/off
/**
 * function combatLogHide() this function will hide combat log on button presses
 */
function combatLogHide() {
    document.getElementById('combatLog').style.display = `none`;
    document.getElementById('combatLogBtnOff').style.display = `none`;
    document.getElementById('combatLogBtnOn').style.display = `flex`;
}
/**
 * combatLogShow() will show combat log again on button press
 */
function combatLogShow() {
    document.getElementById('combatLog').style.display = `flex`;
    document.getElementById('combatLogBtnOff').style.display = `flex`;
    document.getElementById('combatLogBtnOn').style.display = `none`;
}
document.getElementById(`combatLogBtnOff`).addEventListener(`click`, combatLogHide);
document.getElementById(`combatLogBtnOn`).addEventListener(`click`, combatLogShow);

// Tooltips option off
const toolOff = document.getElementById(`toolTipOff`);
const toolOffStyle = window.getComputedStyle(toolOff);
/**
 * function toolTipHide() this function switch to hide tooltips option on button presses
 */
function toolTipHide() {
    document.getElementById(`toolTipOff`).style.display = `none`;
    document.getElementById(`toolTipOn`).style.display = `flex`;
}
// Tooltips option on
/**
 * toolTipShow() will show tooltips option again on button press
 */
function toolTipShow() {
    document.getElementById(`toolTipOff`).style.display = `flex`;
    document.getElementById(`toolTipOn`).style.display = `none`;
}
document.getElementById(`toolTipOff`).addEventListener(`click`, toolTipHide);
document.getElementById(`toolTipOn`).addEventListener(`click`, toolTipShow);

// Tooltips shown onmousemove
/**
 * toolTipO(event) displays toolTipCon div when player is hovering over elements
 */
function toolTipO() {
    if (toolOffStyle.getPropertyValue("display") === 'flex') {

        const toolTip = document.getElementById(`toolTip`);

        // Players health Bar Tip
        document.getElementById("pHealthBar").onmousemove = function (event) { pHealthTip(event) };
        /**
         *  pHealthTip(event) displays tool tip about health bar in toolTipCon div
         */
        function pHealthTip() {
            toolTip.innerHTML = `This is your health bar. If it gets empty... you die.`
            document.getElementById(`toolTipCon`).style.display = `flex`;
        }

        // Gary's health Bar Tip    
        document.getElementById(`zHealthBar`).onmousemove = function (event) { zHealthTip(event) };
        /**
         *  pHealthTip(event) displays tool tip about health bar in toolTipCon div
         */
        function zHealthTip(event) {
            toolTip.innerHTML = `This is Gary's health bar. Your goal is to empty it.`
            document.getElementById(`toolTipCon`).style.display = `flex`;
        }

        // Settings Tip    
        document.getElementById(`settingsBtn`).onmousemove = function (event) { settingsBtnTip(event) };
        /**
         *  settingsBtnTip(event) displays tool tip about settings button in toolTipCon div
         */
        function settingsBtnTip(event) {
            toolTip.innerHTML = `Here you can choose settings options. You can for example hide tool tips.`
            document.getElementById(`toolTipCon`).style.display = `flex`;
        }

        // Noise level Tip    
        document.getElementById(`noiseLevel`).onmousemove = function (event) { noiseLvlTip(event) };
        /**
         *  noiseLvlTip(event) displays tool tip about noise level bar in toolTipCon div
         */
        function noiseLvlTip(event) {
            toolTip.innerHTML = `This is your noise level. If it fills up - you will lose. Certain actions raise and some lower it.`;
            document.getElementById(`toolTipCon`).style.display = `flex`;
        }

        // Inventory button Tip    
        document.getElementById(`invBtn`).onmousemove = function (event) { invBtnTip(event) };
        /**
         *  invBtnTip(event) displays tool tip about noise level bar in toolTipCon div
         */
        function invBtnTip(event) {
            toolTip.innerHTML = `This is your inventory. Here you can use or equip items (it does not use an action! Huzza!).`;
            document.getElementById(`toolTipCon`).style.display = `flex`;
        }

        // Attack button Tip    
        document.getElementById(`attack`).onmousemove = function (event) { attackTip(event) };
        /**
         *  attackTip(event) displays tool tip about attack button in toolTipCon div
         */
        function attackTip(event) {
            toolTip.innerHTML = `Whack! This is Whacking button. Press to Whack Gary and let's make some noise!`;
            document.getElementById(`toolTipCon`).style.display = `flex`;
        }

        // Parry button Tip    
        document.getElementById(`parryDiv`).onmousemove = function (event) { parryTip(event) };
        /**
         *  parryTip(event) displays tool tip about parry button in toolTipCon div
         */
        function parryTip(event) {
            toolTip.innerHTML = `Whit this option selected, Gary has harder time to hit you and does less damage. It stays active till Gary's next turn.`;
            document.getElementById(`toolTipCon`).style.display = `flex`;
        }

        // Wait button Tip    
        document.getElementById(`wait`).onmousemove = function (event) { waitTip(event) };
        /**
         *  waitTip(event) displays tool tip about wait button in toolTipCon div
         */
        function waitTip(event) {
            toolTip.innerHTML = `Whit this option, you can lower your noise level. You do stay still though.`;
            document.getElementById(`toolTipCon`).style.display = `flex`;
        }

        // End turn button Tip    
        document.getElementById(`endTurn`).onmousemove = function (event) { endTurnTip(event) };
        /**
         *  endTurnTip(event) displays tool tip about end turn button in toolTipCon div
         */
        function endTurnTip(event) {
            toolTip.innerHTML = `It ends your turn and allows Gary to take his revenge!`;
            document.getElementById(`toolTipCon`).style.display = `flex`;
        }

        // Clock Tip    
        document.getElementById(`clock`).onmousemove = function (event) { clockTip(event) };
        /**
         *  clockTip(event)displays tool tip on clock in toolTipCon div
         */
        function clockTip(event) {
            toolTip.innerHTML = `This is your moves counter. If it reaches 120, the horde awakens and that is game over (for now). Make sure you do not run out of time, slowpoke.`;
            document.getElementById(`toolTipCon`).style.display = `flex`;
        }

        // Combat Log Tip    
        document.getElementById(`combatLog`).onmousemove = function (event) { combatLogTip(event) };
        /**
         *  combatLogTip(event) displays tool tip on combat log in toolTipCon div
         */
        function combatLogTip(event) {
            toolTip.innerHTML = `Do you want to know what is going on? Then pay attention to this combat log. It displays all actions. Yours and Gary's. You can scroll through it. Newest are at the top.`;
            document.getElementById(`toolTipCon`).style.display = `flex`;
        }

    } else {

        const toolTip = document.getElementById(`toolTip`);

        // Players health Bar Tip
        document.getElementById("pHealthBar").onmousemove = function (event) { pHealthTip(event) };
        /**
         *  pHealthTip(event) displays tool tip about health bar in toolTipCon div
         */
        function pHealthTip() {
            document.getElementById(`toolTipCon`).style.display = `none`;
        }

        // Gary's health Bar Tip    
        document.getElementById(`zHealthBar`).onmousemove = function (event) { zHealthTip(event) };
        /**
         *  pHealthTip(event) displays tool tip about health bar in toolTipCon div
         */
        function zHealthTip(event) {
            document.getElementById(`toolTipCon`).style.display = `none`;
        }

        // Settings Tip    
        document.getElementById(`settingsBtn`).onmousemove = function (event) { settingsBtnTip(event) };
        /**
         *  settingsBtnTip(event) displays tool tip about settings button in toolTipCon div
         */
        function settingsBtnTip(event) {
            document.getElementById(`toolTipCon`).style.display = `none`;
        }

        // Noise level Tip    
        document.getElementById(`noiseLevel`).onmousemove = function (event) { noiseLvlTip(event) };
        /**
         *  noiseLvlTip(event) displays tool tip about noise level bar in toolTipCon div
         */
        function noiseLvlTip(event) {
            document.getElementById(`toolTipCon`).style.display = `none`;
        }

        // Inventory button Tip    
        document.getElementById(`invBtn`).onmousemove = function (event) { invBtnTip(event) };
        /**
         *  invBtnTip(event) displays tool tip about noise level bar in toolTipCon div
         */
        function invBtnTip(event) {
            document.getElementById(`toolTipCon`).style.display = `none`;
        }

        // Attack button Tip    
        document.getElementById(`attack`).onmousemove = function (event) { attackTip(event) };
        /**
         *  attackTip(event) displays tool tip about attack button in toolTipCon div
         */
        function attackTip(event) {
            document.getElementById(`toolTipCon`).style.display = `none`;
        }

        // Parry button Tip    
        document.getElementById(`parryDiv`).onmousemove = function (event) { parryTip(event) };
        /**
         *  parryTip(event) displays tool tip about parry button in toolTipCon div
         */
        function parryTip(event) {
            document.getElementById(`toolTipCon`).style.display = `none`;
        }

        // Wait button Tip    
        document.getElementById(`wait`).onmousemove = function (event) { waitTip(event) };
        /**
         *  waitTip(event) displays tool tip about wait button in toolTipCon div
         */
        function waitTip(event) {
            document.getElementById(`toolTipCon`).style.display = `none`;
        }

        // End turn button Tip    
        document.getElementById(`endTurn`).onmousemove = function (event) { endTurnTip(event) };
        /**
         *  endTurnTip(event) displays tool tip about end turn button in toolTipCon div
         */
        function endTurnTip(event) {
            document.getElementById(`toolTipCon`).style.display = `none`;
        }

        // Clock Tip    
        document.getElementById(`clock`).onmousemove = function (event) { clockTip(event) };
        /**
         *  clockTip(event)displays tool tip on clock in toolTipCon div
         */
        function clockTip(event) {
            document.getElementById(`toolTipCon`).style.display = `none`;
        }

        // Combat Log Tip    
        document.getElementById(`combatLog`).onmousemove = function (event) { combatLogTip(event) };
        /**
         *  combatLogTip(event) displays tool tip on combat log in toolTipCon div
         */
        function combatLogTip(event) {
            document.getElementById(`toolTipCon`).style.display = `none`;
        }
    }
}
document.onmousemove = function (event) { toolTipO(event) };

// Tooltips hidden onmouseout
/**
 * toolTipC(event) hides toolTipCon div when not cursor is moved out of the element player is inspecting 
 */
function toolTipC() {
    const toolTipC = document.getElementById(`toolTip`);
    toolTipC.innerHTML = ``;

    const toolTipCon = document.getElementById(`toolTipCon`);
    toolTipCon.style.display = `none`;
}
document.onmouseout = function (event) { toolTipC(event) };



// Welcome message alert
alert(`Hello! Welcome to Whack-a-Z!
Hope you will enjoy your time with Gary.
To see tutorials just hover over or tap any element you would like to inspect.
Good luck and have fun.
`)