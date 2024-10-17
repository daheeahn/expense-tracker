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
  const MONTH_STR = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let selectedDate = new Date();
  let isDropdownListenerRegistered = false;

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

  let total_month_amount = 0;
  let myChart;

  function renderExpensesReport() {  
    // order by date (current data -> get a date)
    const expenses = JSON.parse(localStorage.getItem("expenses")) ?? [];

    //group by category
    const report_summary = Object.groupBy(
      filterExpensesBySelectedDate(expenses, selectedDate),
      ({ category }) => category
    );

    for (let el in report_summary) {
      let total = 0;
      for (amount of report_summary[el]) {
        total += amount["amount"];
      }
      report_summary[el] = total;
    }

    let summary = combineAndSortExpenses(report_summary);
    const bgColor = ["#FCAC12", "#7F3DFF", "#FD3C4A", "#4CD964", "#e8e8e8"];
    const ctx = document.getElementById("myChart");
  
    if(Object.values(summary).length>0){
      // Chart.js setting
      if(myChart){ // if chart object exist,
        myChart.data.datasets[0].data = Object.values(summary);
        myChart.data.labels = Object.keys(summary);
        myChart.update();
      }else{
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
    }else {
      myChart.clear();
      myChart.ctx.fillText('no data',myChart.width/2,myChart.height/2);
    }
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
            <div class="label bg-[${bgColor[idx]}] w-[14px] h-[14px] rounded-full mr-2"></div>
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
  const dropdownToggle = document.querySelector('#monthSelectButton');
  const dropdownMenu = document.getElementById('monthSelect');
  
  //generate select date
  generateMonthSelect(dropdownMenu, selectedDate);
  // 
  function toggleDropdown(e) {
    e.stopPropagation();
  // 드롭다운 메뉴 가시성 상태를 반전
    const isHidden = dropdownMenu.classList.contains('hidden');
    dropdownMenu.classList.toggle('hidden', !isHidden);
    dropdownToggle.setAttribute('aria-expanded', isHidden);
  }
  
  // 드롭다운 메뉴 외부 클릭 시 닫기
  function closeDropdownIfClickedOutside(e) {
    if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.add('hidden');
        dropdownToggle.setAttribute('aria-expanded', 'false');
    }
  }

      // 이벤트 리스너 등록 (중복 방지)
  if (!isDropdownListenerRegistered) {
    dropdownToggle.addEventListener('click', toggleDropdown);
    document.addEventListener('click', closeDropdownIfClickedOutside);
      // 연도 내비게이션 이벤트 리스너 추가

    isDropdownListenerRegistered = true;
  }
}
