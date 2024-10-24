function isLargerThanLG(width) {
  return width >= 1024;
}

function getCategoryImage(category) {
  switch (category) {
    case "food":
      return "./assets/icons/food.png";
    case "transport":
      return "./assets/icons/transport.png";
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

function filterExpensesBySelectedDate(expenses) {
  const sortedArray = expenses.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth() + 1;

  return sortedArray.filter(({ date }) => {
    const [year, month] = date.split("-").map(Number);
    return year === currentYear && month === currentMonth;
  });
}

function handleBudgetColor(remainAmount) {
  if (remainAmount > 0) {
    return "bg-alert-remain";
  } else {
    return "bg-alert-exceed";
  }
}

// getMockData
async function loadMockData() {
  try {
    const response = await fetch("./data/expenses_data_short.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonData = await response.json();
    localStorage.setItem("expenses", JSON.stringify(jsonData)); // Save in localStorage
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// create or update expense
function saveItem(event) {
  event.preventDefault(); // Prevent form submission

  const params = new URLSearchParams(window.location.search);
  const isEdit = params.get("isEdit") === "true"; // isEdit 값 확인

  const expensesFS = localStorage.getItem("expenses"); // retrieve // FS = From Storage
  const expenses = JSON.parse(expensesFS) ?? [];

  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;

  if (isEdit) {
    const selectedExpenseFS = sessionStorage.getItem("selectedExpense");
    if (selectedExpenseFS) {
      const selectedExpense = JSON.parse(selectedExpenseFS);

      const updatedArr = expenses.map((item) => {
        if (item.id !== selectedExpense.id) return item;

        const updatedExpenseObj = {
          id: selectedExpense.id,
          category: category,
          description: description,
          amount: amount,
          date: date,
        };
        return updatedExpenseObj;
      });
      localStorage.setItem("expenses", JSON.stringify(updatedArr));
    }
  } else {
    const id = expenses.length === 0 ? 1 : expenses[expenses.length - 1].id + 1;
    const newExpenseObj = {
      id: id,
      category: category,
      description: description,
      amount: amount,
      date: date,
    };

    const updatedArr = [...expenses, newExpenseObj];
    localStorage.setItem("expenses", JSON.stringify(updatedArr));
  }

  navigate("/");
  renderPageSection();
  renderExpenseList();
}

function deleteItem(event) {
  event.preventDefault(); // Prevent form submission

  const confirmDelete = confirm(
    "Are you sure you want to delete this expense?"
  );
  if (confirmDelete) {
    const selectedExpense = JSON.parse(
      sessionStorage.getItem("selectedExpense")
    );

    if (selectedExpense) {
      const expenses = JSON.parse(localStorage.getItem("expenses")) ?? [];
      const updatedExpenses = expenses.filter(
        (expense) => expense.id !== selectedExpense.id
      );

      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      alert("Expense deleted successfully!");

      navigate("/"); // navigate home
      renderPageSection();
      renderExpenseList();
    } else {
      alert("No expense data found to delete.");
    }
  }
}

function saveBudget(event) {
  event.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const isEdit = params.get("isEdit") === "true"; // isEdit 값 확인
  const thisDate =
    selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1); // 예산 달 선택
  const budgetFS = localStorage.getItem("budgets");
  const budgets = JSON.parse(budgetFS) ?? {};

  const amount = document.getElementById("budget").value;
  const category = document.getElementById("budget-category").value;

  // 해당 달의 예산 배열 초기화
  if (!budgets[thisDate]) {
    budgets[thisDate] = [];
  }

  const isDuplicate = budgets[thisDate].some(
    (budget) => budget.category === category
  );
  if (isDuplicate) {
    // have to change alert => inner text
    alert("budget already exist");
  } else {
    if (isEdit) {
      const selectedBudgetFS = sessionStorage.getItem("selectedBudget");
      if (selectedBudgetFS) {
        const selectedBudget = JSON.parse(selectedBudgetFS);

        const updatedArr = budgets[thisDate].map((item) => {
          if (item.id !== selectedBudget.id) return item;

          const updatedBudgetObj = {
            id: selectedBudget.id,
            category: category,
            amount: amount,
          };
          return updatedBudgetObj;
        });
        budgets[thisDate] = updatedArr;
      }
    } else {
      const id =
        budgets[thisDate].length === 0
          ? 1
          : budgets[thisDate][budgets[thisDate].length - 1].id + 1;
      const newBudgetObj = {
        id: id,
        category: category,
        amount: amount,
      };

      budgets[thisDate].push(newBudgetObj);
    }

    localStorage.setItem("budgets", JSON.stringify(budgets));
    navigate("/budget");
    renderPageSection();
  }
}
