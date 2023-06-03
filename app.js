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

let expensesArray = [];
let totalExpenseValue = 0;
let totalBudgetAmount = 0;
let currentObjEdit = "";
let currentIndexEdit = "";

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

let deleteAll = () => {
    expensesArray = [];
    displayExpenses();
    refreshBalance();
}

let deleteTable = (indexToDelete) => {
    expensesArray.splice(indexToDelete, 1);
    displayExpenses();
    refreshBalance();
}

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
    seePayment.innerText = obj.payment;
    seePaymentDate.innerText = obj.paymentDate;
}

let replaceObject = (obj, index) => {
    obj.payment = editPaymentAmount.value;
    obj.category = editCategoryName.value;
    obj.description = editDescription.value;
    obj.paymentDate = editPaymentDate.value;
    expensesArray[index] = obj;
    refreshBalance();
    displayExpenses();
    showExpensesList();
}

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
        totalBudget.innerText = `Rs ${totalBudgetAmount}`;
        refreshBalance();
    }
}

let refreshBalance = () => {
    let balanceAmount = document.querySelector("#balanceAmount");
    let balance = document.querySelector(".balance");
    totalExpenseValue = 0;
    expensesArray.forEach((object) => {
        totalExpenseValue += +object.payment;

    })
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

let makeobject = (expenseAmount, categoryValue, descriptionValue, paymentDateValue) => {
    const object = {
        payment: expenseAmount,
        category: categoryValue,
        description: descriptionValue,
        paymentDate: paymentDateValue,
    }
    expensesArray.push(object)
}

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

        tdPayment.appendChild(seebtn)
        tdPayment.appendChild(editbtn)
        tdPayment.appendChild(deletebtn)

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
        }
        if (!categoryValue) {
            categoryError.classList.remove("hide")
        }
        if (!paymentDateValue) {
            dateError.classList.remove("hide")
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
    }
}