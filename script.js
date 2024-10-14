let expenses = [
  {
    id: 1,
    category: "Shopping",
    description: "Buy some grocery",
    amount: 120,
    date: "2024-10-13",
  },
  {
    id: 2,
    category: "Subscription",
    description: "Disney+ Annual",
    amount: 80,
    date: "2024-10-13",
  },
  {
    id: 3,
    category: "Food",
    description: "Buy a ramen",
    amount: 32,
    date: "2024-10-13",
  },
  {
    id: 4,
    category: "Transportation",
    description: "Charging Tesla",
    amount: 18,
    date: "2024-10-12",
  },
  {
    id: 5,
    category: "Transportation",
    description: "Charging Tesla",
    amount: 18,
    date: "2024-10-12",
  },
];

function renderExpenses() {
  const todayList = document.querySelector(".expenses-list ul");
  todayList.innerHTML = "";
  expenses.forEach((expense) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="expense-item">
        <div class="details">
          <p class="category">${expense.category}</p>
          <p class="description">${expense.description}</p>
        </div>
        <div class="amount">- $${expense.amount}</div>
      </div>
    `;
    todayList.appendChild(li);
  });
}

// 초기에 리스트 렌더링
renderExpenses();
