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

// const filePath = "expenses_data.json";
// const expenses = [];

// fetch(filePath)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json(); // JSON Parsing
//   })
//   .then((data) => {
//     expenses.push(...data);

//     // 초기에 리스트 렌더링
//     // renderExpenses();

//     renderExpensesReport();
//   })
//   .catch((error) => {
//     console.error("There was a problem with the fetch operation:", error);
//   });

function renderExpensesReport() {
  // order by date (current data -> get a date)
  const expenses = JSON.parse(localStorage.getItem("expenses")) ?? [];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const filteredExpensesByDate = expenses.filter(({ date }) => {
    const [year, month] = date.split("-").map(Number);
    return year === currentYear && month === currentMonth;
  });

  //group by category
  const report_summary = Object.groupBy(
    filteredExpensesByDate,
    ({ category }) => category
  );

  for (let el in report_summary) {
    let total = 0;
    for (amount of report_summary[el]) {
      total += amount["amount"];
    }
    report_summary[el] = total;
  }
  let total_this_month_amount = 0;
  function combineAndSortExpenses(expenses) {
    // Object to [key, value], Order by desc
    const sortedArray = Object.entries(expenses).sort((a, b) => b[1] - a[1]);

    const result = {};
    let etcValue = 0;

    for (let i = 0; i < sortedArray.length; i++) {
      const [key, value] = sortedArray[i];

      if (i < 4) {
        // if over 4
        result[key] = Number(value).toFixed(2);
        total_this_month_amount += Number(value);
      } else {
        etcValue += Number(value); // combine every value
      }
    }

    // combined value to 'ETC'
    if (etcValue > 0) {
      total_this_month_amount += etcValue;
      result["Etc"] = Number(etcValue).toFixed(2);
    }

    return result;
  }

  let summary = combineAndSortExpenses(report_summary);
  // Chart.js setting
  const ctx = document.getElementById("myChart");
  const bgColor = ["#FF6384", "#36A2FF", "#FFCD56", "#9cf772", "#e8e8e8"];

  const config = {
    type: "pie",
    data: {
      labels: Object.keys(summary),
      datasets: [
        {
          data: Object.values(summary),
          backgroundColor: bgColor,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  };

  new Chart(ctx, config);

  //Show list
  const summary_list = document.querySelector(".summary_list");
  summary_list.innerHTML = "";
  let idx = 0;
  for (let category in summary) {
    let div = document.createElement("div");
    div.classList.add("mt-5");
    
    div.innerHTML = `
      <div class="flex justify-between content-center pb-2">
        <div class="badge flex items-center px-2 py-1 border-2 border-[#F1F1FA] rounded-full">
          <div class="label bg-[${bgColor[idx]}]"></div>
          <p>${category}</p>
        </div>
        <p class="text-red-600 text-2xl">-$${summary[category]}</p>
      </div>
      <div class="flex w-full h-3 bg-[#F1F1FA] rounded-full">
        <div class="w-[${
          (summary[category] / total_this_month_amount) * 100
        }%] h-3 bg-[${bgColor[idx]}] rounded-full">
        </div>
      </div>
    `;

    summary_list.appendChild(div);
    idx++;
  }

  /* Date Category */
}
const dateSelector = document.querySelector(".date-category");
dateSelector.addEventListener("click", (e) => {
  e.preventDefault();

  document.querySelector("ul").classList.remove("hidden");
});
