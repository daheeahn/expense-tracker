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
  // const mockData = `[{"id":1,"category":"shopping","description":"Buy some grocery","amount":120,"date":"2024-10-13"},{"id":2,"category":"transportation","description":"Compass card","amount":200,"date":"2024-10-14"},{"id":3,"category":"food","description":"Fruit","amount":50,"date":"2024-10-15"}]`; // for test
  // localStorage.setItem("expenses", mockData); // for test
  const expenses = JSON.parse(localStorage.getItem("expenses")) ?? [];
  expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

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
  let previousDate = null;

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    const imageUrl = getCategoryImage(expense.category);
    const category =
      expense.category[0].toUpperCase() + expense.category.slice(1); // capitalize
    const currentDate = expense.date;
    if (currentDate !== previousDate) {
      li.innerHTML += `
        <h2 class=" font-inter font-semibold text-lg mt-5 mb-2.5">
          ${currentDate}
        </h2>
      `;
    }

    li.innerHTML += `
      <div class="expense-item flex row py-3.5 px-4 lg:px-10 bg-base-light-light-80 rounded-3xl mb-2" data-id="${expense.id}">
        <img src="${imageUrl}" alt="${expense.category} icon" class="category-icon mr-2.5 self-center" />
        <div class="flex-1 flex flex-col gap-3">
          <p class="font-inter font-medium text-base text-base-dark-dark-25">${category}</p>
          <p class="font-inter font-medium text-sm text-base-light-light-20">${expense.description}</p>
        </div>
        <div class="font-inter text-base font-semibold text-red-red-100 self-center">- $${expense.amount}</div>
      </div>
    `;

    previousDate = currentDate;

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
