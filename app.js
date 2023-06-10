let budgetdiv = document.querySelector(".budget");
let editExpenseDiv = document.querySelector("#editExpense");
let expensesListDiv = document.querySelector(".expensesListHeadings");
let expensesAddDiv = document.querySelector(".expensesAdd");
let seeDiv = document.querySelector(".seeDiv");
let totalExpense = document.querySelector("#totalExpense");
let editPaymentAmount = document.querySelector("#editPaymentAmount");
let editCategoryName = document.querySelector("#editCategoryName");
let editDescription = document.querySelector("#editDescription");
let editPaymentDate = document.querySelector("#editPaymentDate");

////////////////////////////Extra for Random color//////////////////////////////
const numberRegex = /^[1-9]\d*(\.\d+)?$/;

// Retrieve ExpenseValue from local storage if available
let expensesArray = localStorage.getItem("expenses") ?  JSON.parse(localStorage.getItem("expenses")) : [];
let totalExpenseValue = 0;

// Retrieve totalExpenseValue from local storage if available
let totalBudgetAmount = localStorage.getItem("totalExpense") ? parseFloat(localStorage.getItem("totalExpense")) : 0;
let currentObjEdit = "";
let currentIndexEdit = "";

// Adding an event listener to the editButton element that calls the replaceObject function with the currentObjEdit and currentIndexEdit as arguments when clicked.
let editButton = document.querySelector("#editButton");
editButton.addEventListener("click", () => replaceObject(currentObjEdit, currentIndexEdit))

let showBudget = () => {
    budgetdiv.style.display = "flex";
    expensesAddDiv.style.display = "none";
    expensesListDiv.style.display = "none";
    editExpenseDiv.style.display = "none";
    seeDiv.style.display = "none";
}

let showExpensesList = () => {
    budgetdiv.style.display = "none";
    expensesAddDiv.style.display = "none";
    expensesListDiv.style.display = "block";
    editExpenseDiv.style.display = "none";
    seeDiv.style.display = "none";
}

let showExpensesAdd = () => {
    budgetdiv.style.display = "none";
    expensesAddDiv.style.display = "block";
    expensesListDiv.style.display = "none";
    editExpenseDiv.style.display = "none";
    seeDiv.style.display = "none";
}

let showExpensesEdit = () => {
    budgetdiv.style.display = "none";
    expensesAddDiv.style.display = "none";
    expensesListDiv.style.display = "none";
    editExpenseDiv.style.display = "block";
    seeDiv.style.display = "none";
}

let showSeeDiv = () => {
    budgetdiv.style.display = "none";
    expensesAddDiv.style.display = "none";
    expensesListDiv.style.display = "none";
    editExpenseDiv.style.display = "none";
    seeDiv.style.display = "block";
}


// Resetting the expensesArray to an empty array and then refreshing the displayed expenses and balance.
let deleteAll = () => {
    expensesArray = [];
    displayExpenses();
    saveExpensesToLocalStorage();
    refreshBalance();
}

// Function to delete the expense object at the specified index from the expensesArray, and then refresh the displayed expenses and balance.
let deleteTable = (indexToDelete) => {
    expensesArray.splice(indexToDelete, 1);
    displayExpenses();
    saveExpensesToLocalStorage();
    refreshBalance();
}

// Function to display the details of the selected expense object in a separate "See" section
let seeTable = (obj) => {
    showSeeDiv();
    let seeCategory = document.querySelector("#seeCategory");
    let seeDescriiption = document.querySelector("#seeDescriiption");
    let seePayment = document.querySelector("#seePayment");
    let seePaymentDate = document.querySelector("#seePaymentDate");
    seeCategory.innerText = "";
    seeDescriiption.innerText = "";
    seePayment.innerText = "";
    seePaymentDate.innerText = "";
    seeCategory.innerText = obj.category;
    seeDescriiption.innerText = obj.description;
    seePayment.innerText = `Rs ${obj.payment}`;
    seePaymentDate.innerText = obj.paymentDate;
}

// Function to update the values of the selected expense object with the edited values from the form, and refresh the balance, display expenses, and show the expenses list.
let replaceObject = (obj, index) => {
    let editPaymentError = document.querySelector("#editPaymentError");
    let editCategoryError = document.querySelector("#editCategoryError");
    let editDateError = document.querySelector("#editDateError");
    let editPaymentAmountValue = editPaymentAmount.value;
    let editCategoryNameValue = editCategoryName.value;
    let editDescriptionValue = editDescription.value;
    let editPaymentDateValue = editPaymentDate.value;
    if (editPaymentAmountValue <= 0 || !editCategoryNameValue || !editPaymentDateValue) {
        if (editPaymentAmountValue <= 0) {
            editPaymentError.classList.remove("hide")
        } else {
            editPaymentError.classList.add("hide")
        }
        if (!editCategoryNameValue) {
            editCategoryError.classList.remove("hide")
        } else {
            editCategoryError.classList.add("hide")
        }
        if (!editPaymentDateValue) {
            editDateError.classList.remove("hide")
        } else {
            editDateError.classList.add("hide")
        }
    } else {
        obj.payment = editPaymentAmountValue;
        obj.category = editCategoryNameValue;
        obj.description = editDescriptionValue;
        obj.paymentDate = editPaymentDateValue;
        expensesArray[index] = obj;
        refreshBalance();
        displayExpenses();
        saveExpensesToLocalStorage();
        showExpensesList();
    }
}

// Function to populate the edit form with the details of the selected expense object and show the expenses edit section.
let editTable = (obj, index) => {
    showExpensesEdit();
    editPaymentAmount.value = "";
    editCategoryName.value = "";
    editDescription.value = "";
    editPaymentDate.value = "";
    editPaymentAmount.value = obj.payment;
    editCategoryName.value = obj.category;
    editDescription.value = obj.description;
    editPaymentDate.value = obj.paymentDate;
    currentObjEdit = "";
    currentIndexEdit = "";
    currentObjEdit = obj;
    currentIndexEdit = index;
}

// Function to refresh the balance amount by calculating the total expenses and updating the balance displayed on the page. It also checks for budget emergencies or alarms based on the remaining funds.
let refreshBalance = () => {
    let balanceAmount = document.querySelector("#balanceAmount");
    let balance = document.querySelector(".balance");
    totalExpenseValue = 0;
    expensesArray.forEach((object) => {
        totalExpenseValue += +object.payment;
    })
    totalBudget.innerText = `Rs ${totalBudgetAmount}`;
    totalExpense.innerText = "";
    totalExpense.innerText = `Rs ${totalExpenseValue}`;
    balanceAmount.innerText = "";
    balanceAmount.innerText = `Rs ${totalBudgetAmount - totalExpenseValue}`;
    let percentage = (totalExpenseValue / totalBudgetAmount) * 100;
    if ((totalBudgetAmount - totalExpenseValue) <= 0) {
        alert("Budget emergency! Your funds have gone into negative territory. Take immediate and drastic measures to rectify your financial situation.");
        balance.style.color = "red"
    } else if (percentage > 80 && percentage < 100) {
        balance.style.color = "yellow"
        alert("Budget alarm! Your funds are running critically low or have dropped below 20%. Take immediate action to address your financial situation.");
    } else {
        balance.style.color = "green"
    }
}

// Function to create an expense object with the provided details and add it to the expensesArray.
let makeobject = (expenseAmount, categoryValue, descriptionValue, paymentDateValue) => {
    const object = {
        payment: expenseAmount,
        category: categoryValue,
        description: descriptionValue,
        paymentDate: paymentDateValue,
    }
    expensesArray.push(object)
}


// Function to display the expenses list by creating table rows for each expense object and adding event listeners for see, edit, and delete buttons.
let displayExpenses = () => {
    let expensesList = document.querySelector(".expensesList");
    expensesList.innerHTML = "";
    expensesArray.forEach((object, index) => {
        let table = document.createElement("table");

        let tr = document.createElement("tr");

        let tdCategory = document.createElement("td");
        let tddate = document.createElement("td");
        let tdPayment = document.createElement("td");

        tdCategory.id = "category";
        tddate.id = "date";
        tdPayment.id = "payment";
        tdPayment.classList = "flex";

        tdCategory.innerText = object.category;
        tddate.innerText = object.paymentDate;
        tdPayment.innerText = `Rs ${object.payment}`;

        let seebtn = document.createElement("button");
        let editbtn = document.createElement("button");
        let deletebtn = document.createElement("button");

        seebtn.className = "see"
        editbtn.className = "edit";
        deletebtn.className = "delete";

        seebtn.innerHTML = `<i class="fa-sharp fa-solid fa-eye"></i>`;
        editbtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        deletebtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

        seebtn.addEventListener("click", () => seeTable(object))
        editbtn.addEventListener("click", () => editTable(object, index))
        deletebtn.addEventListener("click", () => deleteTable(index))

        let div = document.createElement("div");
        div.className = "listButtons";
        tdPayment.appendChild(div)

        div.appendChild(seebtn)
        div.appendChild(editbtn)
        div.appendChild(deletebtn)

        tr.appendChild(tdCategory);
        tr.appendChild(tddate);
        tr.appendChild(tdPayment);

        table.appendChild(tr);
        table.className = "color";
        const colorsCount = 10;


        ///////////////////////////////this is extra work for random color
        Array.from({ length: colorsCount }).forEach((_, index) => {
            table.style.backgroundColor = `rgb(${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100})`;
        });
        ///////////////////////////////////////////////////////////////

        expensesList.appendChild(table);
    })
}

// Function to set the budget and perform validations before updating the total budget amount.
let setBudget = () => {
    let totalBudget = document.querySelector("#totalBudget");
    let budgetAmount = document.querySelector("#budgetAmount");
    let budgetError = document.querySelector("#budgetError");
    if (budgetAmount.value < 0 || !budgetAmount.value || !numberRegex.test(budgetAmount.value)) {
        budgetError.classList.remove("hide");
    } else {
        totalExpense.value = totalExpenseValue;
        budgetError.classList.add("hide");
        showExpensesList();
        totalBudget.innerText = "";
        totalBudgetAmount = 0;
        totalBudgetAmount = +budgetAmount.value;
        budgetAmount.value = "";
        saveTotalExpensesToLocalStorage();
        totalBudget.innerText = `Rs ${totalBudgetAmount}`;
        refreshBalance();
    }
}

// Function to add an expense and perform validations before adding it to the list.
let addExpense = () => {
    let paymentAmount = document.querySelector("#paymentAmount");
    let categoryName = document.querySelector("#categoryName");
    let description = document.querySelector("#description");
    let paymentDate = document.querySelector("#paymentDate");
    let paymentError = document.querySelector("#paymentError");
    let categoryError = document.querySelector("#categoryError");
    let dateError = document.querySelector("#dateError");
    let expenseAmount = paymentAmount.value;
    let categoryValue = categoryName.value;
    let descriptionValue = description.value;
    let paymentDateValue = paymentDate.value;
    if (expenseAmount <= 0 || !categoryValue || !paymentDateValue) {
        if (expenseAmount <= 0) {
            paymentError.classList.remove("hide")
        } else {
            paymentError.classList.add("hide")
        }
        if (!categoryValue) {
            categoryError.classList.remove("hide")
        } else {
            categoryError.classList.add("hide")
        }
        if (!paymentDateValue) {
            dateError.classList.remove("hide")
        } else {
            dateError.classList.add("hide")
        }
    } else {
        paymentError.classList.add("hide")
        categoryError.classList.add("hide")
        dateError.classList.add("hide")

        makeobject(expenseAmount, categoryValue, descriptionValue, paymentDateValue);
        refreshBalance();
        displayExpenses();
        paymentAmount.value = "";
        categoryName.value = "";
        description.value = "";
        paymentDate.value = "";
        showExpensesList();
        saveExpensesToLocalStorage();
    }
}

// Retrieve ExpensesValue from local storage if available
if (localStorage.getItem("expenses")) {
    displayExpenses();
    refreshBalance();
}

// Function to save the expenses array to local storage
let saveExpensesToLocalStorage = () => {
    localStorage.setItem("expenses", JSON.stringify(expensesArray));
}

// Retrieve totalExpenseValue from local storage if available
if (localStorage.getItem("totalExpense")) {
    displayExpenses();
    showExpensesList();
    refreshBalance();
}

// Function to save the Total Budget Amount to local storage
let saveTotalExpensesToLocalStorage = () => {
    localStorage.setItem("totalExpense", totalBudgetAmount.toString());
}
