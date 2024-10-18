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

function handleBudgetColor(remainAmount){
  if(remainAmount > 0){
      return "bg-alert-remain";
  }else {
    return "bg-alert-exceed";
  }
}

function showBudgetAlert(){

}
