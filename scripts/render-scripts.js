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
// Budget Object Example
// {
//    "2024-10": [
//     {
//       "id": 1,
//       "category": "Food",
//       "amount": 500
//     },
//     {
//       "id": 2,
//       "category": "Transport",
//       "amount": 100
//     }
//   ],
// }

const MONTH_STR = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let selectedDate = new Date();
let isDropdownListenerRegistered = false;

function renderExpenseList() {
  // 가계부 리스트 렌더링

  // retrieve expenses from localStorage
  const expenses =
    filterExpensesBySelectedDate(
      JSON.parse(localStorage.getItem("expenses"))
    ) ?? [];

  // calculate total expense
  const totalExpense =
    expenses.length === 0
      ? 0
      : expenses
          .map((item) => Number(item.amount))
          .reduce((acc, val) => acc + val);
  // apply total expense
  document.getElementById("total-expense").innerText = `$${totalExpense.toFixed(
    2
  )}`;

  // render list
  const expensesList = document.querySelector(".expenses-list ul");
  if (expensesList) {
    expensesList.innerHTML = "";
    let previousDate = null;
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      const imageUrl = getCategoryImage(expense.category);
      const category =
        expense.category[0].toUpperCase() + expense.category.slice(1); // capitalize
      const currentDate = expense.date;
      if (currentDate !== previousDate) {
        li.innerHTML += `
        <h2 class="font-inter font-semibold text-lg mt-5 mb-2.5">
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
}

function registerNavigationEvent() {
  document.body.addEventListener("click", (e) => {
    const target = e.target.closest("a");
    if (!(target instanceof HTMLAnchorElement)) return;

    e.preventDefault(); // prevent default page refresh
    navigate(target.href); // change url without refresh = SPA(Single Page Application)
    renderPageSection();
  });

  document.body.addEventListener("click", (e) => {
    const item = e.target.closest(".expense-item");
    if (item) {
      const id = item.getAttribute("data-id");

      const expenses = JSON.parse(localStorage.getItem("expenses")) ?? [];
      const selectedExpense = expenses.find((item) => item.id == id);

      if (selectedExpense) {
        sessionStorage.setItem(
          "selectedExpense",
          JSON.stringify(selectedExpense)
        );
        const queryString = new URLSearchParams({ isEdit: true }).toString();
        const url = `${window.location.origin}/add?${queryString}`;
        navigate(url);
        renderPageSection();
      }
    }
  });
}

function registerSubmitEvent() {
  // connect saveItem function to form submit event
  const form = document.getElementById("expenseForm");
  form.addEventListener("submit", saveItem);

  // connect deleteItem function to delete button
  const deleteButton = document.getElementById("deleteButton");
  deleteButton.addEventListener("click", deleteItem);

  // connect saveItem function to form submit event
  const budgetForm = document.getElementById("addBudgetForm");
  budgetForm.addEventListener("submit", saveBudget);
}

let total_month_amount = 0;
let myChart;

function renderExpensesReport() {
  // order by date (current data -> get a date)
  const expenses = JSON.parse(localStorage.getItem("expenses")) ?? [];
  total_month_amount = 0;
  // group by category
  const report_summary = Object.groupBy(
    filterExpensesBySelectedDate(expenses),
    ({ category }) => category
  );
  for (let el in report_summary) {
    let total = 0;
    for (amount of report_summary[el]) {
      total += Number(amount["amount"]);
    }
    report_summary[el] = total;
  }

  let summary = combineAndSortExpenses(report_summary);
  const bgColor = ["#FCAC12", "#7F3DFF", "#FD3C4A", "#4CD964", "#e8e8e8"];
  const ctx = document.getElementById("myChart");

  if (Object.values(summary).length > 0) {
    // Chart.js setting
    if (myChart) {
      // if chart object exist,
      myChart.data.datasets[0].data = Object.values(summary);
      myChart.data.labels = Object.keys(summary);
      myChart.update();
    } else {
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

      myChart = new Chart(ctx, config);
    }
  } else {
    myChart.clear();
    myChart.ctx.fillText("no data", myChart.width / 2, myChart.height / 2);
  }

  // show list
  const summary_list = document.querySelector(".summary_list");
  summary_list.innerHTML = "";
  let idx = 0;
  for (let category in summary) {
    let div = document.createElement("div");
    div.classList.add("mt-5");

    div.innerHTML = `
        <div class="flex justify-between content-center pb-2">
          <div class="badge flex items-center px-2 py-1 border-2 border-[#F1F1FA] rounded-full">
            <div class="label bg-[${
              bgColor[idx]
            }] w-[14px] h-[14px] rounded-full mr-2"></div>
            <p>${category}</p>
          </div>
          <p class="text-red-600 text-2xl">-$${summary[category]}</p>
        </div>
        <div class="flex w-full h-3 bg-[#F1F1FA] rounded-full">
          <div class="w-[${
            (summary[category] / total_month_amount) * 100
          }%] h-3 bg-[${bgColor[idx]}] rounded-full">
          </div>
        </div>
      `;

    summary_list.appendChild(div);
    idx++;
  }
}

function renderMonth() {
  const dropdownToggle = document.querySelector("#monthSelectButton");
  const dropdownMenu = document.getElementById("monthSelect");

  //generate select date
  generateMonthSelect(dropdownMenu);
  //
  function toggleDropdown(e) {
    e.stopPropagation();
    // dropdown menu toggle
    const isHidden = dropdownMenu.classList.contains("hidden");
    dropdownMenu.classList.toggle("hidden", !isHidden);
    dropdownToggle.setAttribute("aria-expanded", isHidden);
  }

  function closeDropdownIfClickedOutside(e) {
    if (
      !dropdownToggle.contains(e.target) &&
      !dropdownMenu.contains(e.target)
    ) {
      dropdownMenu.classList.add("hidden");
      dropdownToggle.setAttribute("aria-expanded", "false");
    }
  }

  // 이벤트 리스너 등록 (중복 방지)
  if (!isDropdownListenerRegistered) {
    dropdownToggle.addEventListener("click", toggleDropdown);
    document.addEventListener("click", closeDropdownIfClickedOutside);

    isDropdownListenerRegistered = true;
  }
}

function generateMonthSelect(selectedMenu) {
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();

  // init
  if (selectedMenu) selectedMenu.innerHTML = "";
  document.querySelector(".month-label").innerHTML = MONTH_STR[currentMonth]; // 초기 월 업데이트

  // create header
  const Header = document.createElement("div");
  Header.classList.add(
    "py-2",
    "px-4",
    "font-bold",
    "bg-base-purple",
    "text-base-light-light-80",
    "flex",
    "justify-between"
  );
  Header.innerHTML = `
    <span class="prev-year cursor-pointer">◀️</span>
    <div>${currentYear}</div>
    <span class="next-year cursor-pointer">▶️</span>
  `;
  selectedMenu.appendChild(Header);

  // create month element
  MONTH_STR.forEach((month, index) => {
    const div = document.createElement("div");
    div.classList.add("month", "py-2", "px-4", "cursor-pointer");
    div.innerHTML = month;
    div.dataset.monthIndex = index; // 월 인덱스 저장
    selectedMenu.appendChild(div);
  });

  // change to new month data
  selectedMenu.querySelectorAll(".month").forEach((monthElement) => {
    monthElement.addEventListener("click", (e) => {
      const monthIndex = parseInt(e.target.dataset.monthIndex, 10);
      selectedDate.setMonth(monthIndex);
      document.querySelector(".month-label").innerHTML = MONTH_STR[monthIndex]; // show updated month
      selectedMenu.classList.add("hidden"); // close the menu
      // navigate(window.location.href); //redirect to current page
      renderExpenseList();
    });
  });

  function prevYear(e) {
    e.stopPropagation();
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    generateMonthSelect(selectedMenu, currentDate);
  }
  function nextYear(e) {
    e.stopPropagation();
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    generateMonthSelect(selectedMenu, currentDate);
  }
  document.querySelector(".prev-year").addEventListener("click", prevYear);
  document.querySelector(".next-year").addEventListener("click", nextYear);
}

function renderBudgetManagement() {
  // retrieve expenses from localStorage
  const expenses = JSON.parse(localStorage.getItem("expenses")) ?? [];
  const filteredExpensesByDate = filterExpensesBySelectedDate(expenses);

  //group by category category:total expense
  const report_summary = Object.groupBy(
    filteredExpensesByDate,
    ({ category }) => category
  );

  for (let report in report_summary) {
    let total = 0;
    for (amount of report_summary[report]) {
      total += Number(amount["amount"]);
    }
    report_summary[report] = Number(total.toFixed(2));
  }

  const budgets = JSON.parse(localStorage.getItem("budgets")) ?? [];
  const budget_list = document.querySelector("#budgetList");
  const thisMonth =
    selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1);

  //initialize
  budget_list.innerHTML = "";

  if (budgets.length <= 0) {
    const div = document.createElement("div");
    div.innerHTML = `<div>no Budget</div>`;
    budget_list.appendChild(div);
  } else if (!budgets[thisMonth] || budgets[thisMonth].length === 0) {
    const div = document.createElement("div");
    div.innerHTML = `<div>No Budget for ${thisMonth}</div>`;
    budget_list.appendChild(div);
  } else {
    budgets[thisMonth].forEach((budget) => {
      const div = document.createElement("div");
      const currentExpense = report_summary[budget.category]
        ? report_summary[budget.category]
        : 0;
      const currentExpenseValue = Number(currentExpense);
      const budgetAmountValue = Number(budget.amount);
      let remainAmount = budgetAmountValue - currentExpenseValue;
      let isRemain = remainAmount > 0 ? true : false;

      div.classList.add("p-4");
      div.innerHTML = ` <div class="flex justify-between items-center mb-2">
                        <div class="badge flex items-center px-2 py-1 border-2 border-[#F1F1FA] rounded-full bg-base-light-light-80">
                          <div class="${handleBudgetColor(
                            remainAmount
                          )} w-[14px] h-[14px] rounded-full mr-1.5"></div>
                          <p class="font-medium text-sm">${budget.category}</p>
                        </div>
                        <p class="budget-alert bg-red-red-100 text-white w-[24px] h-[24px] rounded-full text-center ${
                          isRemain ? "hidden" : ""
                        }">!</p>
                        </div>
                        <div class="text-2xl font-semibold">
                          <h3>Remaining $${
                            remainAmount > 0 ? remainAmount.toFixed(2) : 0
                          }</h3>
                        </div>
                        <div class="flex w-full h-3 bg-[#F1F1FA] rounded-full my-0.5">
                          <div class="w-[${
                            currentExpenseValue > budgetAmountValue
                              ? 100
                              : (currentExpenseValue / budgetAmountValue) * 100
                          }%] h-3 ${handleBudgetColor(
        remainAmount
      )} rounded-full">
                          </div>
                        </div>
                        <div class="text-base-light-light-20">$<span>${currentExpense}</span> of $<span>${
        budget.amount
      }</span></div>
                      <div class="budget-alert text-red-600 text-sm ${
                        isRemain ? "hidden" : ""
                      }">You’ve exceed the limit!</div>`;

      budget_list.appendChild(div);
    });
  }

  //create a budget click event
}

const renderPageSection = () => {
  // hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = "none";
  });

  // find page to show
  const pageMatches = routes.map((route) => ({
    route: route,
    isMatch: window.location.pathname === route.path,
  }));
  const match = pageMatches.find((pageMatch) => pageMatch.isMatch);
  if (match) {
    document.getElementById(match.route.sectionId).style.display = "block";

    // path="/add": fill form data
    if (match.route.sectionId === "addSection") {
      const params = new URLSearchParams(window.location.search);
      const isEdit = params.get("isEdit") === "true";
      if (isEdit) {
        const selectedExpenseFS = sessionStorage.getItem("selectedExpense");
        if (selectedExpenseFS) {
          const selectedExpense = JSON.parse(selectedExpenseFS);
          document.getElementById("amount").value = selectedExpense.amount;
          document.getElementById("category").value = selectedExpense.category;
          document.getElementById("description").value =
            selectedExpense.description;
          document.getElementById("date").value = selectedExpense.date;
        }
      } else {
        sessionStorage.removeItem("selectedExpense");
        document.getElementById("amount").value = null;
        document.getElementById("category").value = null;
        document.getElementById("description").value = null;
        document.getElementById("date").value = null;
      }

      if (isEdit) {
        document.getElementById("deleteButton").style.display = "block";
      } else {
        document.getElementById("deleteButton").style.display = "none";
      }
    }

    if (match.route.sectionId === "reportSection") {
      renderExpensesReport();
    }

    if (match.route.sectionId === "budgetSection") {
      renderBudgetManagement();
    }

    if (match.route.sectionId === "addBudgetSection") {
      const params = new URLSearchParams(window.location.search);
      const isEdit = params.get("isEdit") === "true";
      if (isEdit) {
        const selectedBudgetFS = sessionStorage.getItem("selectedBudget");
        if (selectedBudgetFS) {
          const selectedBudget = JSON.parse(selectedBudgetFS);
          document.getElementById("category").value = selectedBudget.category;
          document.getElementById("budget").value = selectedBudget.budget;
        }
      } else {
        sessionStorage.removeItem("selectedBudget");
        document.getElementById("category").value = null;
        document.getElementById("budget").value = null;
      }
    }
  }
};
