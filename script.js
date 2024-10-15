/*
   Expense Object Example
   { 
     id: 1,
     category: "Shopping",
     description: "Buy some grocery",
     amount: 120,
     date: "2024-10-13",
   }
 */

function renderExpenses() {
  // retrieve expenses from localStorage
  const expenses = JSON.parse(localStorage.getItem("expenses")) ?? [];

  // calculate total expense
  const totalExpense =
    expenses.length === 0
      ? 0
      : expenses
          .map((item) => Number(item.amount))
          .reduce((acc, val) => acc + val);
  // apply total expense
  document.getElementById("total-expense").innerText = totalExpense;

  // render list
  const expensesList = document.querySelector(".expenses-list ul");
  expensesList.innerHTML = "";
  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="expense-item" data-index="${index}">
        <div class="details">
        <p class="category">${expense.category}</p>
        <p class="description">${expense.description}</p>
        <p>${expense.date}</p>
        <p>(id: ${expense.id})</p>
        </div>
        <div class="amount">- $${expense.amount}</div>
      </div>
    `;
    expensesList.appendChild(li);
  });
}
