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
  {
    path: "/budget",
    sectionId: "budgetSection",
  },
  {
    path: "/add-budget",
    sectionId: "addBudgetSection",
  },
];

// go back to previous page
window.goBack = () => {
  window.history.back();
};

window.clickBackButtonAtBudgetSection = () => {
  navigate("/");
  renderPageSection();
  renderExpenseList();
};

// be global function by appending `window.`
window.navigate = (url) => {
  window.history.pushState(null, null, url);
};

// Fired when the HTML is fully parsed and the DOM is completely built.
document.addEventListener("DOMContentLoaded", () => {
  // load mock data
  // localStorage.removeItem("expenses"); // 🚨 just for test
  // localStorage.removeItem("budgets"); // 🚨 just for test

  if (!localStorage.getItem("expenses")) {
    loadMockData(); // common.js
  }

  // render expense list
  renderExpenseList();

  // add click event listener
  registerNavigationEvent();

  // add save, delete listener
  registerSubmitEvent();

  // render month selector
  renderMonth();
});

// Listen for 'popstate' events (triggered when the user navigates using the browser's back/forward buttons)
// This ensures the app correctly updates the view when the history state changes without a full page reload.
window.addEventListener("popstate", () => {
  renderPageSection();
});
