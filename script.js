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
  
  
  let selectedDate = new Date();
  let myChart;
  
  function renderExpensesReport() {
    let currentYear = selectedDate.getFullYear();
    let currentMonth = selectedDate.getMonth() + 1;
  
    // order by date (current data -> get a date)
    const expenses = JSON.parse(localStorage.getItem("expenses")) ?? [];
    const filteredExpensesByDate = expenses.filter(({ date }) => {
      const [year, month] = date.split("-").map(Number);
      return year === currentYear && month === currentMonth;
    });
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
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
    const bgColor = ["#FF6384", "#36A2FF", "#FFCD56", "#9cf772", "#e8e8e8"];
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
    
    document.querySelector('.date-navigation').innerHTML = `
      <a id="prevDate">◀️</a>
      <div class="align-center">
        <p>${currentYear}</p>
        <h3 class="text-3xl">${month[currentMonth-1]}</h3>
      </div>
      <a id="nextDate">▶️</a>
    `
    document.querySelector('#prevDate').addEventListener('click',(e)=> {
      selectedDate.setMonth(selectedDate.getMonth() - 1);
      renderExpensesReport();
    });
    document.querySelector('#nextDate').addEventListener('click',(e)=> {
      selectedDate.setMonth(selectedDate.getMonth() + 1);
      renderExpensesReport();
    });
    /* Date Category */
  }
  const dateSelector = document.querySelector(".date-category");
  dateSelector.addEventListener("click", (e) => {
    
    document.querySelector("ul").classList.remove("hidden");
  });
  