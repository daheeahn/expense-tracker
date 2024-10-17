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

function filterExpensesBySelectedDate(expenses, selectedDate) {
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth() + 1;

  return expenses.filter(({ date }) => {
    const [year, month] = date.split("-").map(Number);
    return year === currentYear && month === currentMonth;
  });
}