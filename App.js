// route page
const routes = [
  {
    path: "/",
    sectionId: "mainSection",
  },
  {
    path: "/add",
    sectionId: "addSection",
  },
  {
    path: "/report",
    sectionId: "reportSection",
  },
];

// be global function by appending `window.`
window.navigate = (url) => {
  window.history.pushState(null, null, url);
  App();
};

// render page by url & state is maintained without refreshing.
const App = async () => {
  renderExpenses(); // DOMContentLoaded와 겹침 중복 제거 필요

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
    }
  }
    if(match.route.sectionId === "reportSection") {
      renderExpensesReport();
    }
};

// Fired when the HTML is fully parsed and the DOM is completely built.
document.addEventListener("DOMContentLoaded", () => {
  // localStorage.removeItem("expenses"); // 🚨 just for test

  // render expenses first
  renderExpenses();

  // add click event listener tag "<a>"
  document.body.addEventListener("click", (e) => {
    const target = e.target.closest("a");
    if (!(target instanceof HTMLAnchorElement)) return;

    e.preventDefault(); // prevent default page refresh
    navigate(target.href); // change url without refresh = SPA(Single Page Application)
  });

  // connect saveItem function to form submit event
  const form = document.getElementById("expenseForm");
  form.addEventListener("submit", saveItem);

  // connect deleteItem function to delete button
  const deleteButton = document.getElementById("deleteButton");
  deleteButton.addEventListener("click", deleteItem);

  // 클릭한 항목을 add 페이지로 전송
  document.body.addEventListener("click", (e) => {
    const item = e.target.closest(".expense-item");
    if (item) {
      const index = item.getAttribute("data-index");
      const expenses = JSON.parse(localStorage.getItem("expenses")) ?? [];
      const selectedExpense = expenses[index];
      sessionStorage.setItem(
        "selectedExpense",
        JSON.stringify(selectedExpense)
      );
      const queryString = new URLSearchParams({ isEdit: true }).toString();
      const url = `${window.location.origin}/add?${queryString}`;
      navigate(url);
    }
  });
  
  App();
});

// Listen for 'popstate' events (triggered when the user navigates using the browser's back/forward buttons)
// This ensures the app correctly updates the view when the history state changes without a full page reload.
window.addEventListener("popstate", App);

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
    } else {
      alert("No expense data found to delete.");
    }
  }
}
