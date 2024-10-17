function getCategoryImage(category) {
  switch (category) {
    case "food":
      return "./assets/icons/food.png";
    case "transportation":
      return "./assets/icons/transportation.png";
    case "subscription":
      return "./assets/icons/subscription.png";
    case "shopping":
    default:
      return "./assets/icons/shopping.png";
  }
}

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
      total_month_amount += Number(value);
    } else {
      etcValue += Number(value); // combine every value
    }
  }

  // combined value to 'ETC'
  if (etcValue > 0) {
    total_month_amount += etcValue;
    result["Etc"] = Number(etcValue).toFixed(2);
  }

  return result;
}

function filterExpensesBySelectedDate(expenses, selectedDate) {
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth() + 1;

  return expenses.filter(({ date }) => {
    const [year, month] = date.split("-").map(Number);
    return year === currentYear && month === currentMonth;
  });
}


function generateMonthSelect(selectedMenu, currentDate) {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // init
  if (selectedMenu) selectedMenu.innerHTML = '';
  document.querySelector('.month-label').innerHTML = MONTH_STR[currentMonth]; // 초기 월 업데이트

  // create header
  const Header = document.createElement('div');
  Header.classList.add('py-2', 'px-4', 'font-bold', 'bg-base-purple', 'text-base-light-light-80', 'flex', 'justify-between');
  Header.innerHTML = `
    <span class="prev-year cursor-pointer">◀️</span>
    <div>${currentYear}</div>
    <span class="next-year cursor-pointer">▶️</span>
  `;
  selectedMenu.appendChild(Header);

  // create month element
  MONTH_STR.forEach((month, index) => {
    const div = document.createElement('div');
    div.classList.add('month', 'py-2', 'px-4', 'cursor-pointer');
    div.innerHTML = month;
    div.dataset.monthIndex = index; // 월 인덱스 저장
    selectedMenu.appendChild(div);
  });

  // change to new month data
  selectedMenu.querySelectorAll('.month').forEach((monthElement) => {
    monthElement.addEventListener('click', (e) => {
      const monthIndex = parseInt(e.target.dataset.monthIndex, 10);
      currentDate.setMonth(monthIndex);
      document.querySelector('.month-label').innerHTML = MONTH_STR[monthIndex]; // show updated month
      renderExpensesReport();
      selectedMenu.classList.add('hidden'); // close the menu

    });
  });

  function prevYear(e) {
    e.stopPropagation();
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    generateMonthSelect(selectedMenu, currentDate);
  }
  function nextYear(e){
    e.stopPropagation();
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    generateMonthSelect(selectedMenu, currentDate);
  }
  document.querySelector('.prev-year').addEventListener('click', prevYear);
  document.querySelector('.next-year').addEventListener('click', nextYear);
}
