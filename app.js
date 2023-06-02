let budgetAmount = document.querySelector("#budgetAmount");
let budgetdiv = document.querySelector(".budget");
let budgetbtn = document.querySelector(".budgetbtn");
let expensesAddDiv = document.querySelector(".expensesAdd");
let budgetError = document.querySelector("#budgetError");
let paymentAmount = document.querySelector("#paymentAmount");
let totalBudget = document.querySelector("#totalBudget");
let balanceAmount = document.querySelector("#balanceAmount");
let balance = document.querySelector(".balance");
let totalExpense = document.querySelector("#totalExpense");
let categoryName = document.querySelector("#categoryName");
let description = document.querySelector("#description");
let paymentDate = document.querySelector("#paymentDate");
let expensesListDiv = document.querySelector(".expensesListHeadings");
let editExpenseDiv = document.querySelector("#editExpense");
let expensesList = document.querySelector(".expensesList");
let paymentError = document.querySelector("#paymentError");
let categoryError = document.querySelector("#categoryError");
let dateError = document.querySelector("#dateError");
const numberRegex = /^[1-9]\d*(\.\d+)?$/;

let expensesArray = [];
let totalExpenseValue = 0;
let totalBudgetAmount = 0;

let showBudget = () => {
    budgetdiv.style.display = "flex";
    expensesAddDiv.style.display = "none";
    expensesListDiv.style.display = "none";
    editExpenseDiv.style.display = "none";
}

let showExpensesList = () => {
    budgetdiv.style.display = "none";
    expensesAddDiv.style.display = "none";
    expensesListDiv.style.display = "block";
    editExpenseDiv.style.display = "none";
}

let showExpensesAdd = () => {
    budgetdiv.style.display = "none";
    expensesAddDiv.style.display = "block";
    expensesListDiv.style.display = "none";
    editExpenseDiv.style.display = "none";
}

let deleteAll = () => {
    expensesArray = [];
    displayExpenses();
    refreshBalance();
}

let deleteTable = (indexToDelete) => {
    expensesArray.splice(indexToDelete, 1);
    console.log(expensesArray);
    displayExpenses();
    refreshBalance();
}

let setBudget = () => {
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
        totalBudget.innerText = totalBudgetAmount;
        balanceAmount.innerText = "";
        balanceAmount.innerText = totalBudgetAmount - totalExpenseValue;
    }
}

let refreshBalance = () => {
    totalExpenseValue = 0;
    expensesArray.forEach((object) => {
        totalExpenseValue += +object.payment;

    })
    totalExpense.innerText = "";
    totalExpense.innerText = totalExpenseValue;
    balanceAmount.innerText = "";
    balanceAmount.innerText = totalBudgetAmount - totalExpenseValue;
    let percentage = (totalExpenseValue /totalBudgetAmount)*100;
    if (balanceAmount.innerText < 0 ) {
        alert("Attention! Your budget is running low. Take a moment to recharge and reorganize your finances.");
        balance.style.color = "red"
    } else if (percentage > 80 && percentage < 100) {
        balance.style.color = "yellow"
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
        tdPayment.innerText = object.payment;

        let seebtn = document.createElement("button");
        let editbtn = document.createElement("button");
        let deletebtn = document.createElement("button");

        seebtn.className = "see"
        editbtn.className = "edit";
        deletebtn.className = "delete";

        seebtn.innerHTML = `<i class="fa-sharp fa-solid fa-eye"></i>`;
        editbtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        deletebtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

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
        // paymentAmount.value = "";
        // categoryName.value = "";
        // description.value = "";
        // paymentDate.value = "";
        showExpensesList();
    }
}