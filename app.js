let budgetAmount = document.querySelector("#budgetAmount");
let budgetdiv = document.querySelector(".budget");
let budgetbtn = document.querySelector(".budgetbtn");
let expensesAddDiv = document.querySelector(".expensesAdd");
let budgetError = document.querySelector("#budgetError");
let paymentAmount = document.querySelector("#paymentAmount");
let totalBudget = document.querySelector("#totalBudget");
let balanceAmount = document.querySelector("#balanceAmount");
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

let setBudget = () => {
    if (budgetAmount.value < 0 || !budgetAmount.value || !numberRegex.test(budgetAmount.value)) {
        budgetError.classList.remove("hide");
    } else {
        totalExpense.value = totalExpenseValue;
        budgetError.classList.add("hide");
        budgetdiv.style.display = "none";
        expensesAddDiv.style.display = "flex";
        totalBudget.innerText = "";
        totalBudget.innerText = +budgetAmount.value;
        balanceAmount.innerText = "";
        balanceAmount.innerText = budgetAmount.value - totalExpenseValue;
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
    expensesArray.forEach((object) => {
        console.log(object);
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

        totalExpenseValue += +expenseAmount;
        totalExpense.innerText = "";
        totalExpense.innerText = totalExpenseValue;
        balanceAmount.innerText = "";
        balanceAmount.innerText = budgetAmount.value - totalExpenseValue;
        makeobject(expenseAmount, categoryValue, descriptionValue, paymentDateValue);
        displayExpenses();
        paymentAmount.value = "";
        categoryName.value = "";
        description.value = "";
        paymentDate.value = "";
    }
}
