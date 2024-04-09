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
    const attackRoll = Math.floor(Math.random() * 20 + 1)
    console.log(attackRoll);
}