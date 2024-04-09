// Inventory Screen functions
/**
 * Function for opening and closing inventory screen
 */
document.getElementById(`invBtn`).addEventListener('click', openInv);

function openInv() {

    const invSwitch = document.getElementById(`invCheck`);

    if (invSwitch.checked) {
        document.getElementById(`inv`).style.display = `none`;
    }
    else {
        document.getElementById(`inv`).style.display = `flex`;
    }
}