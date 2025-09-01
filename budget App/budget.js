let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("buget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expanditureValue = document.getElementById("expanditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");

let temAmount = 0;

totalAmountButton.addEventListener("click", () => {
    temAmount = totalAmount.value;

    if (temAmount === "" || temAmount < 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        amount.innerText = temAmount;
        balanceValue.innerText = temAmount - expanditureValue.innerText;
        totalAmount.value = "";
    }
});

const disableButtons = (bool) => {
    let editButton = document.getElementsByClassName("edit");

    Array.from(editButton).forEach((element) => {
        element.disabled = bool;
    });
};

const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement; // sublistcontent list
    let currentBalence = balanceValue.innerText;
    let currentExpance = expanditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;

    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }

    balanceValue.innerText = parseInt(currentBalence) + parseInt(parentAmount);
    expanditureValue.innerText = parseInt(currentExpance) - parseInt(parentAmount);
    parentDiv.remove();
};

checkAmountButton.addEventListener("click", () => {

    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }
    productTitleError.classList.add("hide");
    disableButtons(false);
    let expanditure = parseInt(userAmount.value);
    let sum = parseInt(expanditureValue.innerText) + expanditure;
    expanditureValue.innerText = sum;
    const totalBalance = temAmount - sum;
    balanceValue.innerText = totalBalance;
    listCreator(productTitle.value, userAmount.value);
});


const listCreator = (expanceName, expanceValue) => {

    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class ="product">${expanceName}</p><p class="amount">${expanceValue}</p>`;
   productTitle.value = "";
   userAmount.value = "";

    let editButton = document.createElement("button");
    editButton.className = "edit";
    // editButton.style.fontSize = "12px";

    // Icon element
    let icon = document.createElement("i");
    icon.style.fontSize = "19px"
    icon.classList.add("fa-solid", "fa-pen-to-square");
    editButton.appendChild(icon);

    // Optional: accessible label
    editButton.setAttribute("aria-label", "Edit expense");
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });

    let deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    // deleteButton.style.fontSize = "10px";

    deleteButton.setAttribute("aria-label", "Delete expense");

    // Icon element
    let trashIcon = document.createElement("i");
    trashIcon.style.fontSize = "19px"
    trashIcon.classList.add("fa-solid", "fa-trash-can");
    deleteButton.appendChild(trashIcon);
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });

    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
    list.appendChild(sublistContent);

};
