# Budget Tracker
This is a budget tracker web application created using HTML, CSS, and JavaScript. It allows you to track your expenses and monitor your budget.

## Functionality
This budget tracker provides the following features:

- Displaying the current budget and balance.
- Adding expenses with details such as payment amount, category, description, and payment date.
- Editing and updating existing expenses.
- Deleting expenses.
- Viewing detailed information about an expense.
- Resetting the budget and deleting all expenses.
- Utilizing LocalStorage for persistent data storage.

## Usage
To use the budget tracker, follow these steps:

1- Set the initial budget amount by entering a valid value in the "Total Budget" input field and clicking the "Set Budget" button.
2- Add expenses by entering the payment amount, category, description, and payment date in the corresponding input fields and clicking the "Add Expense" button. Validation will be performed to ensure that the payment amount is greater than zero and that the category and payment date are provided.
3- View the list of expenses by clicking the "Expenses List" button.
4- In the expenses list, you can see the category, payment date, and payment amount for each expense. You can also perform the following actions:
- Click the eye icon button to view detailed information about the expense.
- Click the edit icon button to edit the expense details.
- Click the trash can icon button to delete the expense.
5- In the detailed information section, you can see the category, description, payment amount, and payment date of the selected expense.
6- To edit an expense, make the necessary changes in the edit form and click the "Edit Expense" button. Validation will be performed to ensure that the payment amount is greater than zero and that the category and payment date are provided.
7- To delete all expenses and reset the budget, click the "Delete All" button. This action cannot be undone.

## Design
The budget tracker has a simple and intuitive design. It uses a color scheme of orange and black. The font "Orbitron" is used for a modern look. The expenses are displayed in a table format with buttons for actions such as viewing, editing, and deleting. Random background colors are assigned to each expense table for visual variety.

## Credits
This budget tracker was created by **MUHAMMAD MUDDUSSIR RAZA** as part of a project or assignment.

## License
This project is licensed under the MIT License.

### Additionally,
This budget tracker utilizes LocalStorage to provide persistent data storage, ensuring that your budget and expenses remain available even if you close or refresh the browser. With LocalStorage, you can confidently track your expenses and manage your budget without worrying about losing your data.
