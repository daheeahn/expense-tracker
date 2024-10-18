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

    if (match.route.sectionId === "reportSection") {
      renderExpensesReport();
      renderMonth(); // 광역에서 호출하도록 수정 필요
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

// Fired when the HTML is fully parsed and the DOM is completely built.
document.addEventListener("DOMContentLoaded", () => {
  // localStorage.removeItem("expenses"); // 🚨 just for test
  const mockData = `[
    {
        "id": 1,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 406.38,
        "date": "2024-10-15"
    },
    {
        "id": 2,
        "category": "food",
        "description": "Gift shopping",
        "amount": 58.36,
        "date": "2024-08-20"
    },
    {
        "id": 3,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 30.96,
        "date": "2024-02-14"
    },
    {
        "id": 4,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 497.97,
        "date": "2024-01-22"
    },
    {
        "id": 5,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 150.96,
        "date": "2024-07-28"
    },
    {
        "id": 6,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 257.16,
        "date": "2023-11-26"
    },
    {
        "id": 7,
        "category": "food",
        "description": "Taxi fare",
        "amount": 277.86,
        "date": "2024-06-25"
    },
    {
        "id": 8,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 8.1,
        "date": "2023-12-12"
    },
    {
        "id": 9,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 237.98,
        "date": "2024-09-24"
    },
    {
        "id": 10,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 172.5,
        "date": "2024-04-06"
    },
    {
        "id": 11,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 96.72,
        "date": "2024-02-22"
    },
    {
        "id": 12,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 93.08,
        "date": "2023-11-09"
    },
    {
        "id": 13,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 176.82,
        "date": "2024-08-16"
    },
    {
        "id": 14,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 283.98,
        "date": "2023-12-16"
    },
    {
        "id": 15,
        "category": "food",
        "description": "Concert tickets",
        "amount": 371.37,
        "date": "2024-07-01"
    },
    {
        "id": 16,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 487.58,
        "date": "2024-04-28"
    },
    {
        "id": 17,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 493.31,
        "date": "2024-02-11"
    },
    {
        "id": 18,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 180.45,
        "date": "2024-04-16"
    },
    {
        "id": 19,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 65.58,
        "date": "2024-02-02"
    },
    {
        "id": 20,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 442.87,
        "date": "2024-08-07"
    },
    {
        "id": 21,
        "category": "food",
        "description": "Fuel for car",
        "amount": 307.26,
        "date": "2024-03-09"
    },
    {
        "id": 22,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 61.38,
        "date": "2024-06-23"
    },
    {
        "id": 23,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 448.45,
        "date": "2024-06-19"
    },
    {
        "id": 24,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 322.41,
        "date": "2024-06-16"
    },
    {
        "id": 25,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 74.17,
        "date": "2024-02-09"
    },
    {
        "id": 26,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 131.86,
        "date": "2024-06-28"
    },
    {
        "id": 27,
        "category": "food",
        "description": "Concert tickets",
        "amount": 366.13,
        "date": "2024-06-10"
    },
    {
        "id": 28,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 490.35,
        "date": "2023-12-22"
    },
    {
        "id": 29,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 322.71,
        "date": "2024-01-22"
    },
    {
        "id": 30,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 143.41,
        "date": "2024-02-10"
    },
    {
        "id": 31,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 226.92,
        "date": "2024-01-16"
    },
    {
        "id": 32,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 65.03,
        "date": "2024-03-01"
    },
    {
        "id": 33,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 369.19,
        "date": "2024-10-01"
    },
    {
        "id": 34,
        "category": "food",
        "description": "Taxi fare",
        "amount": 0.48,
        "date": "2023-12-31"
    },
    {
        "id": 35,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 452.32,
        "date": "2024-04-26"
    },
    {
        "id": 36,
        "category": "food",
        "description": "Taxi fare",
        "amount": 376.62,
        "date": "2024-03-12"
    },
    {
        "id": 37,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 253.85,
        "date": "2024-03-22"
    },
    {
        "id": 38,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 42.45,
        "date": "2024-07-12"
    },
    {
        "id": 39,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 328.12,
        "date": "2024-09-29"
    },
    {
        "id": 40,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 110.95,
        "date": "2024-09-14"
    },
    {
        "id": 41,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 427.61,
        "date": "2023-10-30"
    },
    {
        "id": 42,
        "category": "food",
        "description": "Concert tickets",
        "amount": 156.02,
        "date": "2024-01-11"
    },
    {
        "id": 43,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 495.2,
        "date": "2023-11-15"
    },
    {
        "id": 44,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 432.17,
        "date": "2023-11-11"
    },
    {
        "id": 45,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 196.71,
        "date": "2023-11-14"
    },
    {
        "id": 46,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 188.49,
        "date": "2024-01-21"
    },
    {
        "id": 47,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 469.52,
        "date": "2024-08-27"
    },
    {
        "id": 48,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 436.48,
        "date": "2024-05-25"
    },
    {
        "id": 49,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 25.13,
        "date": "2023-12-18"
    },
    {
        "id": 50,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 482.52,
        "date": "2024-05-07"
    },
    {
        "id": 51,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 476.59,
        "date": "2024-07-01"
    },
    {
        "id": 52,
        "category": "food",
        "description": "Gift shopping",
        "amount": 160.74,
        "date": "2024-05-22"
    },
    {
        "id": 53,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 89.45,
        "date": "2023-11-26"
    },
    {
        "id": 54,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 490.71,
        "date": "2024-10-14"
    },
    {
        "id": 55,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 282.62,
        "date": "2024-02-23"
    },
    {
        "id": 56,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 74.61,
        "date": "2024-06-30"
    },
    {
        "id": 57,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 134.07,
        "date": "2023-11-23"
    },
    {
        "id": 58,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 49.94,
        "date": "2024-04-19"
    },
    {
        "id": 59,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 261.17,
        "date": "2024-07-28"
    },
    {
        "id": 60,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 73.86,
        "date": "2024-08-13"
    },
    {
        "id": 61,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 362.84,
        "date": "2024-01-12"
    },
    {
        "id": 62,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 216.59,
        "date": "2024-10-14"
    },
    {
        "id": 63,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 206.63,
        "date": "2023-11-29"
    },
    {
        "id": 64,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 433.81,
        "date": "2023-11-30"
    },
    {
        "id": 65,
        "category": "food",
        "description": "Gift shopping",
        "amount": 216.49,
        "date": "2024-04-01"
    },
    {
        "id": 66,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 178.88,
        "date": "2024-01-21"
    },
    {
        "id": 67,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 318.25,
        "date": "2023-10-28"
    },
    {
        "id": 68,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 326.78,
        "date": "2024-08-19"
    },
    {
        "id": 69,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 89.18,
        "date": "2024-06-17"
    },
    {
        "id": 70,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 383.9,
        "date": "2023-11-15"
    },
    {
        "id": 71,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 16.34,
        "date": "2024-04-06"
    },
    {
        "id": 72,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 307.86,
        "date": "2024-03-31"
    },
    {
        "id": 73,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 484.08,
        "date": "2024-01-22"
    },
    {
        "id": 74,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 464.35,
        "date": "2023-10-25"
    },
    {
        "id": 75,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 139.09,
        "date": "2023-12-09"
    },
    {
        "id": 76,
        "category": "food",
        "description": "Gift shopping",
        "amount": 233.51,
        "date": "2024-09-01"
    },
    {
        "id": 77,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 55.88,
        "date": "2023-10-18"
    },
    {
        "id": 78,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 154.43,
        "date": "2024-01-15"
    },
    {
        "id": 79,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 419.51,
        "date": "2024-10-04"
    },
    {
        "id": 80,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 486.5,
        "date": "2024-05-14"
    },
    {
        "id": 81,
        "category": "food",
        "description": "Taxi fare",
        "amount": 86.71,
        "date": "2024-08-11"
    },
    {
        "id": 82,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 435.48,
        "date": "2024-01-21"
    },
    {
        "id": 83,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 382.69,
        "date": "2023-12-01"
    },
    {
        "id": 84,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 337.95,
        "date": "2024-04-20"
    },
    {
        "id": 85,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 204.76,
        "date": "2024-01-11"
    },
    {
        "id": 86,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 109.32,
        "date": "2024-09-12"
    },
    {
        "id": 87,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 80.88,
        "date": "2024-05-11"
    },
    {
        "id": 88,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 311.41,
        "date": "2024-10-08"
    },
    {
        "id": 89,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 248.03,
        "date": "2024-07-15"
    },
    {
        "id": 90,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 259.06,
        "date": "2024-04-12"
    },
    {
        "id": 91,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 233.96,
        "date": "2023-11-02"
    },
    {
        "id": 92,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 50.11,
        "date": "2023-10-26"
    },
    {
        "id": 93,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 60.22,
        "date": "2023-11-27"
    },
    {
        "id": 94,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 398.75,
        "date": "2023-11-24"
    },
    {
        "id": 95,
        "category": "food",
        "description": "Electronics repair",
        "amount": 472.07,
        "date": "2024-03-03"
    },
    {
        "id": 96,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 451.39,
        "date": "2024-01-03"
    },
    {
        "id": 97,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 117.4,
        "date": "2023-12-14"
    },
    {
        "id": 98,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 355.36,
        "date": "2024-07-28"
    },
    {
        "id": 99,
        "category": "food",
        "description": "Taxi fare",
        "amount": 319.38,
        "date": "2024-02-06"
    },
    {
        "id": 100,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 245.48,
        "date": "2024-08-07"
    },
    {
        "id": 101,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 427.77,
        "date": "2024-07-01"
    },
    {
        "id": 102,
        "category": "food",
        "description": "Gift shopping",
        "amount": 217.68,
        "date": "2024-02-16"
    },
    {
        "id": 103,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 279.84,
        "date": "2024-05-29"
    },
    {
        "id": 104,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 389.66,
        "date": "2023-11-18"
    },
    {
        "id": 105,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 68.35,
        "date": "2024-09-25"
    },
    {
        "id": 106,
        "category": "food",
        "description": "Electronics repair",
        "amount": 35.28,
        "date": "2024-06-19"
    },
    {
        "id": 107,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 405.43,
        "date": "2024-07-16"
    },
    {
        "id": 108,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 39.86,
        "date": "2024-05-27"
    },
    {
        "id": 109,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 397.2,
        "date": "2024-06-22"
    },
    {
        "id": 110,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 416.54,
        "date": "2024-05-11"
    },
    {
        "id": 111,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 99.94,
        "date": "2024-08-18"
    },
    {
        "id": 112,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 483.62,
        "date": "2023-11-11"
    },
    {
        "id": 113,
        "category": "food",
        "description": "Electronics repair",
        "amount": 159.82,
        "date": "2023-11-19"
    },
    {
        "id": 114,
        "category": "food",
        "description": "Movie tickets",
        "amount": 359.93,
        "date": "2024-06-17"
    },
    {
        "id": 115,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 342.33,
        "date": "2023-10-26"
    },
    {
        "id": 116,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 382.69,
        "date": "2024-01-21"
    },
    {
        "id": 117,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 170.51,
        "date": "2024-01-20"
    },
    {
        "id": 118,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 228.97,
        "date": "2023-11-23"
    },
    {
        "id": 119,
        "category": "food",
        "description": "Gift shopping",
        "amount": 239.15,
        "date": "2024-01-07"
    },
    {
        "id": 120,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 103.84,
        "date": "2023-12-15"
    },
    {
        "id": 121,
        "category": "food",
        "description": "Gift shopping",
        "amount": 45.39,
        "date": "2024-07-17"
    },
    {
        "id": 122,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 160.65,
        "date": "2024-02-02"
    },
    {
        "id": 123,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 382.98,
        "date": "2024-07-13"
    },
    {
        "id": 124,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 284.86,
        "date": "2024-08-29"
    },
    {
        "id": 125,
        "category": "food",
        "description": "Gift shopping",
        "amount": 331.74,
        "date": "2023-11-01"
    },
    {
        "id": 126,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 209.89,
        "date": "2024-01-22"
    },
    {
        "id": 127,
        "category": "food",
        "description": "Fuel for car",
        "amount": 133.48,
        "date": "2024-05-31"
    },
    {
        "id": 128,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 435.05,
        "date": "2023-10-28"
    },
    {
        "id": 129,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 274.66,
        "date": "2023-10-22"
    },
    {
        "id": 130,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 13.5,
        "date": "2023-12-03"
    },
    {
        "id": 131,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 214.96,
        "date": "2024-04-30"
    },
    {
        "id": 132,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 415.59,
        "date": "2023-11-17"
    },
    {
        "id": 133,
        "category": "food",
        "description": "Fuel for car",
        "amount": 261.21,
        "date": "2024-10-10"
    },
    {
        "id": 134,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 103.06,
        "date": "2024-04-09"
    },
    {
        "id": 135,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 38.64,
        "date": "2024-01-31"
    },
    {
        "id": 136,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 66.05,
        "date": "2024-08-14"
    },
    {
        "id": 137,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 133.46,
        "date": "2023-11-02"
    },
    {
        "id": 138,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 441.53,
        "date": "2024-04-07"
    },
    {
        "id": 139,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 388.42,
        "date": "2024-04-30"
    },
    {
        "id": 140,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 246.5,
        "date": "2024-06-01"
    },
    {
        "id": 141,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 267.24,
        "date": "2024-09-22"
    },
    {
        "id": 142,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 434.89,
        "date": "2024-06-22"
    },
    {
        "id": 143,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 401.0,
        "date": "2023-12-28"
    },
    {
        "id": 144,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 453.39,
        "date": "2023-11-03"
    },
    {
        "id": 145,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 405.5,
        "date": "2024-06-09"
    },
    {
        "id": 146,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 160.05,
        "date": "2024-10-14"
    },
    {
        "id": 147,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 195.39,
        "date": "2024-07-31"
    },
    {
        "id": 148,
        "category": "food",
        "description": "Gift shopping",
        "amount": 104.62,
        "date": "2023-10-29"
    },
    {
        "id": 149,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 157.1,
        "date": "2024-10-13"
    },
    {
        "id": 150,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 26.6,
        "date": "2023-12-07"
    },
    {
        "id": 151,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 193.94,
        "date": "2024-01-27"
    },
    {
        "id": 152,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 253.91,
        "date": "2024-09-20"
    },
    {
        "id": 153,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 499.98,
        "date": "2024-04-18"
    },
    {
        "id": 154,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 355.38,
        "date": "2024-02-09"
    },
    {
        "id": 155,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 302.95,
        "date": "2023-10-21"
    },
    {
        "id": 156,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 317.95,
        "date": "2024-03-06"
    },
    {
        "id": 157,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 156.33,
        "date": "2024-09-11"
    },
    {
        "id": 158,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 282.19,
        "date": "2024-02-07"
    },
    {
        "id": 159,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 132.32,
        "date": "2023-10-30"
    },
    {
        "id": 160,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 113.86,
        "date": "2024-07-12"
    },
    {
        "id": 161,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 218.38,
        "date": "2024-07-06"
    },
    {
        "id": 162,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 150.88,
        "date": "2024-06-21"
    },
    {
        "id": 163,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 65.29,
        "date": "2024-01-06"
    },
    {
        "id": 164,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 5.2,
        "date": "2024-01-07"
    },
    {
        "id": 165,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 472.33,
        "date": "2024-05-06"
    },
    {
        "id": 166,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 269.97,
        "date": "2024-07-26"
    },
    {
        "id": 167,
        "category": "food",
        "description": "Movie tickets",
        "amount": 48.93,
        "date": "2023-10-19"
    },
    {
        "id": 168,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 42.59,
        "date": "2023-11-28"
    },
    {
        "id": 169,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 112.94,
        "date": "2023-11-19"
    },
    {
        "id": 170,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 484.07,
        "date": "2024-03-22"
    },
    {
        "id": 171,
        "category": "food",
        "description": "Electronics repair",
        "amount": 364.62,
        "date": "2023-10-31"
    },
    {
        "id": 172,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 126.11,
        "date": "2024-07-15"
    },
    {
        "id": 173,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 320.64,
        "date": "2024-07-09"
    },
    {
        "id": 174,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 368.69,
        "date": "2024-01-26"
    },
    {
        "id": 175,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 423.9,
        "date": "2024-06-18"
    },
    {
        "id": 176,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 151.53,
        "date": "2024-02-03"
    },
    {
        "id": 177,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 248.9,
        "date": "2024-01-11"
    },
    {
        "id": 178,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 67.05,
        "date": "2024-01-28"
    },
    {
        "id": 179,
        "category": "food",
        "description": "Taxi fare",
        "amount": 44.82,
        "date": "2024-03-25"
    },
    {
        "id": 180,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 260.36,
        "date": "2024-07-26"
    },
    {
        "id": 181,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 262.7,
        "date": "2024-09-03"
    },
    {
        "id": 182,
        "category": "food",
        "description": "Electronics repair",
        "amount": 218.83,
        "date": "2023-11-18"
    },
    {
        "id": 183,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 392.27,
        "date": "2024-01-04"
    },
    {
        "id": 184,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 68.73,
        "date": "2024-03-10"
    },
    {
        "id": 185,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 291.89,
        "date": "2024-10-05"
    },
    {
        "id": 186,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 58.39,
        "date": "2024-01-29"
    },
    {
        "id": 187,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 240.63,
        "date": "2024-03-28"
    },
    {
        "id": 188,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 8.55,
        "date": "2024-04-15"
    },
    {
        "id": 189,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 64.59,
        "date": "2024-01-06"
    },
    {
        "id": 190,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 413.02,
        "date": "2024-06-16"
    },
    {
        "id": 191,
        "category": "food",
        "description": "Movie tickets",
        "amount": 119.02,
        "date": "2024-06-02"
    },
    {
        "id": 192,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 358.43,
        "date": "2024-03-25"
    },
    {
        "id": 193,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 258.63,
        "date": "2023-11-04"
    },
    {
        "id": 194,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 489.62,
        "date": "2024-06-22"
    },
    {
        "id": 195,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 351.99,
        "date": "2024-04-14"
    },
    {
        "id": 196,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 116.07,
        "date": "2023-11-24"
    },
    {
        "id": 197,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 6.51,
        "date": "2024-09-16"
    },
    {
        "id": 198,
        "category": "food",
        "description": "Gift shopping",
        "amount": 315.85,
        "date": "2024-06-09"
    },
    {
        "id": 199,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 307.06,
        "date": "2024-03-08"
    },
    {
        "id": 200,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 116.73,
        "date": "2024-01-31"
    },
    {
        "id": 201,
        "category": "food",
        "description": "Movie tickets",
        "amount": 6.13,
        "date": "2024-03-05"
    },
    {
        "id": 202,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 357.79,
        "date": "2023-10-29"
    },
    {
        "id": 203,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 50.89,
        "date": "2024-08-25"
    },
    {
        "id": 204,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 377.16,
        "date": "2024-04-13"
    },
    {
        "id": 205,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 29.56,
        "date": "2024-02-26"
    },
    {
        "id": 206,
        "category": "food",
        "description": "Concert tickets",
        "amount": 122.18,
        "date": "2024-08-07"
    },
    {
        "id": 207,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 297.45,
        "date": "2024-01-03"
    },
    {
        "id": 208,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 93.53,
        "date": "2023-12-13"
    },
    {
        "id": 209,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 423.98,
        "date": "2024-09-27"
    },
    {
        "id": 210,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 325.73,
        "date": "2023-12-06"
    },
    {
        "id": 211,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 39.27,
        "date": "2024-07-11"
    },
    {
        "id": 212,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 64.37,
        "date": "2024-02-18"
    },
    {
        "id": 213,
        "category": "food",
        "description": "Concert tickets",
        "amount": 469.28,
        "date": "2023-11-29"
    },
    {
        "id": 214,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 285.5,
        "date": "2024-05-15"
    },
    {
        "id": 215,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 37.62,
        "date": "2024-04-05"
    },
    {
        "id": 216,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 167.94,
        "date": "2023-11-27"
    },
    {
        "id": 217,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 106.71,
        "date": "2024-10-16"
    },
    {
        "id": 218,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 45.63,
        "date": "2024-01-31"
    },
    {
        "id": 219,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 284.74,
        "date": "2024-08-19"
    },
    {
        "id": 220,
        "category": "food",
        "description": "Movie tickets",
        "amount": 327.54,
        "date": "2023-11-22"
    },
    {
        "id": 221,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 442.63,
        "date": "2024-03-25"
    },
    {
        "id": 222,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 352.12,
        "date": "2023-11-22"
    },
    {
        "id": 223,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 282.08,
        "date": "2024-06-27"
    },
    {
        "id": 224,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 279.22,
        "date": "2023-11-21"
    },
    {
        "id": 225,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 486.0,
        "date": "2024-05-12"
    },
    {
        "id": 226,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 258.29,
        "date": "2024-09-08"
    },
    {
        "id": 227,
        "category": "food",
        "description": "Concert tickets",
        "amount": 160.52,
        "date": "2023-11-21"
    },
    {
        "id": 228,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 297.84,
        "date": "2024-07-25"
    },
    {
        "id": 229,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 453.9,
        "date": "2023-11-13"
    },
    {
        "id": 230,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 171.88,
        "date": "2024-10-03"
    },
    {
        "id": 231,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 290.54,
        "date": "2024-01-30"
    },
    {
        "id": 232,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 176.38,
        "date": "2023-10-21"
    },
    {
        "id": 233,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 423.54,
        "date": "2024-07-18"
    },
    {
        "id": 234,
        "category": "food",
        "description": "Fuel for car",
        "amount": 446.79,
        "date": "2024-09-02"
    },
    {
        "id": 235,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 302.28,
        "date": "2024-03-14"
    },
    {
        "id": 236,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 155.08,
        "date": "2024-03-08"
    },
    {
        "id": 237,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 266.99,
        "date": "2024-04-30"
    },
    {
        "id": 238,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 415.87,
        "date": "2024-02-06"
    },
    {
        "id": 239,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 0.76,
        "date": "2024-08-06"
    },
    {
        "id": 240,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 71.17,
        "date": "2023-10-24"
    },
    {
        "id": 241,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 244.75,
        "date": "2023-12-27"
    },
    {
        "id": 242,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 91.28,
        "date": "2024-03-14"
    },
    {
        "id": 243,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 428.58,
        "date": "2024-06-18"
    },
    {
        "id": 244,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 68.74,
        "date": "2024-05-17"
    },
    {
        "id": 245,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 447.78,
        "date": "2024-03-03"
    },
    {
        "id": 246,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 277.46,
        "date": "2024-05-13"
    },
    {
        "id": 247,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 46.56,
        "date": "2024-10-01"
    },
    {
        "id": 248,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 401.9,
        "date": "2024-02-05"
    },
    {
        "id": 249,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 279.52,
        "date": "2023-12-04"
    },
    {
        "id": 250,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 107.48,
        "date": "2024-08-10"
    },
    {
        "id": 251,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 331.56,
        "date": "2024-04-10"
    },
    {
        "id": 252,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 178.89,
        "date": "2024-06-19"
    },
    {
        "id": 253,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 373.81,
        "date": "2023-12-11"
    },
    {
        "id": 254,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 426.68,
        "date": "2024-09-21"
    },
    {
        "id": 255,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 249.54,
        "date": "2024-08-14"
    },
    {
        "id": 256,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 379.65,
        "date": "2024-03-23"
    },
    {
        "id": 257,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 458.89,
        "date": "2023-11-04"
    },
    {
        "id": 258,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 480.44,
        "date": "2024-07-30"
    },
    {
        "id": 259,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 418.09,
        "date": "2024-01-04"
    },
    {
        "id": 260,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 87.77,
        "date": "2024-04-11"
    },
    {
        "id": 261,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 125.52,
        "date": "2023-10-22"
    },
    {
        "id": 262,
        "category": "food",
        "description": "Electronics repair",
        "amount": 267.95,
        "date": "2024-04-19"
    },
    {
        "id": 263,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 444.74,
        "date": "2023-11-19"
    },
    {
        "id": 264,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 56.6,
        "date": "2024-06-02"
    },
    {
        "id": 265,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 67.37,
        "date": "2024-08-19"
    },
    {
        "id": 266,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 147.61,
        "date": "2024-04-27"
    },
    {
        "id": 267,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 234.95,
        "date": "2023-11-25"
    },
    {
        "id": 268,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 389.56,
        "date": "2024-07-30"
    },
    {
        "id": 269,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 231.48,
        "date": "2024-05-13"
    },
    {
        "id": 270,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 189.16,
        "date": "2024-08-12"
    },
    {
        "id": 271,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 490.52,
        "date": "2024-07-17"
    },
    {
        "id": 272,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 444.79,
        "date": "2024-02-23"
    },
    {
        "id": 273,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 217.92,
        "date": "2024-04-01"
    },
    {
        "id": 274,
        "category": "food",
        "description": "Fuel for car",
        "amount": 117.89,
        "date": "2024-09-18"
    },
    {
        "id": 275,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 368.17,
        "date": "2024-10-13"
    },
    {
        "id": 276,
        "category": "food",
        "description": "Taxi fare",
        "amount": 146.95,
        "date": "2024-06-04"
    },
    {
        "id": 277,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 412.89,
        "date": "2024-07-16"
    },
    {
        "id": 278,
        "category": "food",
        "description": "Gift shopping",
        "amount": 301.3,
        "date": "2024-01-09"
    },
    {
        "id": 279,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 444.51,
        "date": "2023-12-25"
    },
    {
        "id": 280,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 40.55,
        "date": "2024-01-04"
    },
    {
        "id": 281,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 50.52,
        "date": "2024-05-13"
    },
    {
        "id": 282,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 344.92,
        "date": "2024-06-30"
    },
    {
        "id": 283,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 92.03,
        "date": "2023-11-13"
    },
    {
        "id": 284,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 101.54,
        "date": "2024-02-17"
    },
    {
        "id": 285,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 202.35,
        "date": "2023-12-21"
    },
    {
        "id": 286,
        "category": "food",
        "description": "Gift shopping",
        "amount": 437.98,
        "date": "2023-10-23"
    },
    {
        "id": 287,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 409.49,
        "date": "2023-11-10"
    },
    {
        "id": 288,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 226.4,
        "date": "2024-06-24"
    },
    {
        "id": 289,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 352.01,
        "date": "2023-11-25"
    },
    {
        "id": 290,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 332.35,
        "date": "2024-10-01"
    },
    {
        "id": 291,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 197.73,
        "date": "2024-02-08"
    },
    {
        "id": 292,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 346.27,
        "date": "2024-08-31"
    },
    {
        "id": 293,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 0.95,
        "date": "2024-03-10"
    },
    {
        "id": 294,
        "category": "food",
        "description": "Taxi fare",
        "amount": 218.57,
        "date": "2024-05-13"
    },
    {
        "id": 295,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 371.21,
        "date": "2024-02-09"
    },
    {
        "id": 296,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 308.27,
        "date": "2023-10-18"
    },
    {
        "id": 297,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 214.56,
        "date": "2024-05-07"
    },
    {
        "id": 298,
        "category": "food",
        "description": "Concert tickets",
        "amount": 266.27,
        "date": "2023-11-06"
    },
    {
        "id": 299,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 102.42,
        "date": "2024-04-05"
    },
    {
        "id": 300,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 394.36,
        "date": "2023-10-22"
    },
    {
        "id": 301,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 321.88,
        "date": "2024-09-21"
    },
    {
        "id": 302,
        "category": "food",
        "description": "Taxi fare",
        "amount": 429.48,
        "date": "2024-02-25"
    },
    {
        "id": 303,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 24.14,
        "date": "2024-05-20"
    },
    {
        "id": 304,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 382.63,
        "date": "2024-05-23"
    },
    {
        "id": 305,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 396.91,
        "date": "2024-06-09"
    },
    {
        "id": 306,
        "category": "food",
        "description": "Electronics repair",
        "amount": 310.14,
        "date": "2024-08-26"
    },
    {
        "id": 307,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 125.65,
        "date": "2024-05-26"
    },
    {
        "id": 308,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 19.49,
        "date": "2024-02-11"
    },
    {
        "id": 309,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 90.52,
        "date": "2024-02-10"
    },
    {
        "id": 310,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 103.96,
        "date": "2024-05-30"
    },
    {
        "id": 311,
        "category": "food",
        "description": "Fuel for car",
        "amount": 331.83,
        "date": "2024-04-03"
    },
    {
        "id": 312,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 484.25,
        "date": "2024-09-20"
    },
    {
        "id": 313,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 49.36,
        "date": "2024-09-21"
    },
    {
        "id": 314,
        "category": "food",
        "description": "Electronics repair",
        "amount": 287.86,
        "date": "2024-02-20"
    },
    {
        "id": 315,
        "category": "food",
        "description": "Gift shopping",
        "amount": 429.38,
        "date": "2024-05-30"
    },
    {
        "id": 316,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 123.3,
        "date": "2024-05-12"
    },
    {
        "id": 317,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 274.53,
        "date": "2024-05-06"
    },
    {
        "id": 318,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 185.89,
        "date": "2024-02-22"
    },
    {
        "id": 319,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 108.74,
        "date": "2024-03-18"
    },
    {
        "id": 320,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 322.3,
        "date": "2023-12-19"
    },
    {
        "id": 321,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 260.33,
        "date": "2024-08-21"
    },
    {
        "id": 322,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 132.28,
        "date": "2023-12-23"
    },
    {
        "id": 323,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 132.35,
        "date": "2024-10-06"
    },
    {
        "id": 324,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 342.95,
        "date": "2024-02-24"
    },
    {
        "id": 325,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 443.98,
        "date": "2024-04-17"
    },
    {
        "id": 326,
        "category": "food",
        "description": "Concert tickets",
        "amount": 499.55,
        "date": "2024-06-30"
    },
    {
        "id": 327,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 404.04,
        "date": "2023-11-14"
    },
    {
        "id": 328,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 100.65,
        "date": "2024-04-02"
    },
    {
        "id": 329,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 372.82,
        "date": "2024-04-30"
    },
    {
        "id": 330,
        "category": "food",
        "description": "Fuel for car",
        "amount": 146.5,
        "date": "2024-10-02"
    },
    {
        "id": 331,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 356.37,
        "date": "2024-06-03"
    },
    {
        "id": 332,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 425.48,
        "date": "2024-04-29"
    },
    {
        "id": 333,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 466.5,
        "date": "2024-09-08"
    },
    {
        "id": 334,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 238.58,
        "date": "2023-11-09"
    },
    {
        "id": 335,
        "category": "food",
        "description": "Fuel for car",
        "amount": 423.94,
        "date": "2023-10-28"
    },
    {
        "id": 336,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 47.71,
        "date": "2024-03-12"
    },
    {
        "id": 337,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 151.44,
        "date": "2024-03-08"
    },
    {
        "id": 338,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 401.14,
        "date": "2024-07-17"
    },
    {
        "id": 339,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 7.3,
        "date": "2024-10-01"
    },
    {
        "id": 340,
        "category": "food",
        "description": "Electronics repair",
        "amount": 166.94,
        "date": "2024-04-03"
    },
    {
        "id": 341,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 271.51,
        "date": "2024-06-14"
    },
    {
        "id": 342,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 434.16,
        "date": "2024-09-30"
    },
    {
        "id": 343,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 82.66,
        "date": "2024-07-06"
    },
    {
        "id": 344,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 290.24,
        "date": "2023-11-14"
    },
    {
        "id": 345,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 340.05,
        "date": "2024-02-15"
    },
    {
        "id": 346,
        "category": "food",
        "description": "Electronics repair",
        "amount": 4.12,
        "date": "2024-07-13"
    },
    {
        "id": 347,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 328.81,
        "date": "2024-03-07"
    },
    {
        "id": 348,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 343.44,
        "date": "2023-12-26"
    },
    {
        "id": 349,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 334.12,
        "date": "2024-07-09"
    },
    {
        "id": 350,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 154.57,
        "date": "2024-04-23"
    },
    {
        "id": 351,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 106.93,
        "date": "2024-08-16"
    },
    {
        "id": 352,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 224.74,
        "date": "2024-01-03"
    },
    {
        "id": 353,
        "category": "food",
        "description": "Electronics repair",
        "amount": 263.85,
        "date": "2024-09-28"
    },
    {
        "id": 354,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 31.99,
        "date": "2024-06-24"
    },
    {
        "id": 355,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 483.31,
        "date": "2024-08-12"
    },
    {
        "id": 356,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 405.68,
        "date": "2024-09-26"
    },
    {
        "id": 357,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 214.14,
        "date": "2024-08-24"
    },
    {
        "id": 358,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 405.52,
        "date": "2023-10-26"
    },
    {
        "id": 359,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 182.05,
        "date": "2023-12-30"
    },
    {
        "id": 360,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 196.92,
        "date": "2024-07-26"
    },
    {
        "id": 361,
        "category": "food",
        "description": "Gift shopping",
        "amount": 281.72,
        "date": "2023-12-03"
    },
    {
        "id": 362,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 479.82,
        "date": "2024-08-17"
    },
    {
        "id": 363,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 129.11,
        "date": "2024-02-06"
    },
    {
        "id": 364,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 119.17,
        "date": "2024-07-25"
    },
    {
        "id": 365,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 6.12,
        "date": "2024-08-08"
    },
    {
        "id": 366,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 216.35,
        "date": "2024-08-31"
    },
    {
        "id": 367,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 73.21,
        "date": "2024-02-15"
    },
    {
        "id": 368,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 337.74,
        "date": "2024-03-06"
    },
    {
        "id": 369,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 478.39,
        "date": "2024-09-28"
    },
    {
        "id": 370,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 154.78,
        "date": "2024-03-18"
    },
    {
        "id": 371,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 476.96,
        "date": "2024-04-09"
    },
    {
        "id": 372,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 64.87,
        "date": "2024-09-14"
    },
    {
        "id": 373,
        "category": "food",
        "description": "Electronics repair",
        "amount": 295.32,
        "date": "2024-08-24"
    },
    {
        "id": 374,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 240.41,
        "date": "2024-06-30"
    },
    {
        "id": 375,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 465.82,
        "date": "2024-07-01"
    },
    {
        "id": 376,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 91.99,
        "date": "2023-11-26"
    },
    {
        "id": 377,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 308.67,
        "date": "2023-12-10"
    },
    {
        "id": 378,
        "category": "food",
        "description": "Concert tickets",
        "amount": 3.09,
        "date": "2024-03-25"
    },
    {
        "id": 379,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 401.02,
        "date": "2024-09-21"
    },
    {
        "id": 380,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 418.51,
        "date": "2024-03-08"
    },
    {
        "id": 381,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 184.87,
        "date": "2024-07-12"
    },
    {
        "id": 382,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 392.03,
        "date": "2024-10-08"
    },
    {
        "id": 383,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 78.27,
        "date": "2024-04-17"
    },
    {
        "id": 384,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 2.34,
        "date": "2024-07-29"
    },
    {
        "id": 385,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 206.05,
        "date": "2024-04-30"
    },
    {
        "id": 386,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 277.04,
        "date": "2024-03-19"
    },
    {
        "id": 387,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 235.11,
        "date": "2024-03-14"
    },
    {
        "id": 388,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 490.5,
        "date": "2024-08-10"
    },
    {
        "id": 389,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 252.62,
        "date": "2023-10-30"
    },
    {
        "id": 390,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 135.42,
        "date": "2024-04-30"
    },
    {
        "id": 391,
        "category": "food",
        "description": "Gift shopping",
        "amount": 298.01,
        "date": "2024-07-29"
    },
    {
        "id": 392,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 353.21,
        "date": "2024-03-24"
    },
    {
        "id": 393,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 435.92,
        "date": "2024-02-15"
    },
    {
        "id": 394,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 239.26,
        "date": "2024-07-14"
    },
    {
        "id": 395,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 457.64,
        "date": "2024-07-06"
    },
    {
        "id": 396,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 414.23,
        "date": "2024-01-17"
    },
    {
        "id": 397,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 138.08,
        "date": "2023-12-12"
    },
    {
        "id": 398,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 465.09,
        "date": "2024-07-12"
    },
    {
        "id": 399,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 152.16,
        "date": "2024-10-12"
    },
    {
        "id": 400,
        "category": "food",
        "description": "Fuel for car",
        "amount": 70.78,
        "date": "2023-11-24"
    },
    {
        "id": 401,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 331.37,
        "date": "2023-11-18"
    },
    {
        "id": 402,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 190.71,
        "date": "2024-06-27"
    },
    {
        "id": 403,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 134.73,
        "date": "2024-02-29"
    },
    {
        "id": 404,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 4.73,
        "date": "2024-08-02"
    },
    {
        "id": 405,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 300.98,
        "date": "2024-05-19"
    },
    {
        "id": 406,
        "category": "food",
        "description": "Taxi fare",
        "amount": 368.65,
        "date": "2024-08-07"
    },
    {
        "id": 407,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 156.06,
        "date": "2023-10-30"
    },
    {
        "id": 408,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 488.05,
        "date": "2024-04-09"
    },
    {
        "id": 409,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 190.99,
        "date": "2023-12-15"
    },
    {
        "id": 410,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 343.17,
        "date": "2023-11-10"
    },
    {
        "id": 411,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 410.17,
        "date": "2024-02-19"
    },
    {
        "id": 412,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 105.03,
        "date": "2024-05-19"
    },
    {
        "id": 413,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 119.99,
        "date": "2024-09-13"
    },
    {
        "id": 414,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 384.46,
        "date": "2024-06-25"
    },
    {
        "id": 415,
        "category": "food",
        "description": "Concert tickets",
        "amount": 419.88,
        "date": "2024-06-01"
    },
    {
        "id": 416,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 361.93,
        "date": "2023-11-02"
    },
    {
        "id": 417,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 206.85,
        "date": "2024-04-19"
    },
    {
        "id": 418,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 125.34,
        "date": "2024-05-29"
    },
    {
        "id": 419,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 344.15,
        "date": "2024-05-21"
    },
    {
        "id": 420,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 344.25,
        "date": "2024-06-03"
    },
    {
        "id": 421,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 105.92,
        "date": "2024-06-23"
    },
    {
        "id": 422,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 148.5,
        "date": "2024-02-12"
    },
    {
        "id": 423,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 333.19,
        "date": "2024-05-16"
    },
    {
        "id": 424,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 225.12,
        "date": "2024-08-21"
    },
    {
        "id": 425,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 151.21,
        "date": "2024-03-05"
    },
    {
        "id": 426,
        "category": "food",
        "description": "Gift shopping",
        "amount": 351.68,
        "date": "2023-11-20"
    },
    {
        "id": 427,
        "category": "food",
        "description": "Taxi fare",
        "amount": 481.34,
        "date": "2024-09-06"
    },
    {
        "id": 428,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 317.16,
        "date": "2024-10-05"
    },
    {
        "id": 429,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 215.9,
        "date": "2024-03-05"
    },
    {
        "id": 430,
        "category": "food",
        "description": "Taxi fare",
        "amount": 320.88,
        "date": "2023-12-15"
    },
    {
        "id": 431,
        "category": "food",
        "description": "Movie tickets",
        "amount": 448.77,
        "date": "2023-11-05"
    },
    {
        "id": 432,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 375.58,
        "date": "2024-06-19"
    },
    {
        "id": 433,
        "category": "food",
        "description": "Gift shopping",
        "amount": 171.93,
        "date": "2024-04-18"
    },
    {
        "id": 434,
        "category": "food",
        "description": "Electronics repair",
        "amount": 352.66,
        "date": "2024-04-28"
    },
    {
        "id": 435,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 270.26,
        "date": "2024-04-18"
    },
    {
        "id": 436,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 470.03,
        "date": "2024-09-09"
    },
    {
        "id": 437,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 284.58,
        "date": "2024-04-18"
    },
    {
        "id": 438,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 324.21,
        "date": "2024-03-02"
    },
    {
        "id": 439,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 115.93,
        "date": "2024-05-03"
    },
    {
        "id": 440,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 287.44,
        "date": "2024-01-25"
    },
    {
        "id": 441,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 255.54,
        "date": "2024-02-13"
    },
    {
        "id": 442,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 325.0,
        "date": "2023-10-24"
    },
    {
        "id": 443,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 39.81,
        "date": "2024-09-03"
    },
    {
        "id": 444,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 341.72,
        "date": "2023-12-26"
    },
    {
        "id": 445,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 431.78,
        "date": "2024-06-09"
    },
    {
        "id": 446,
        "category": "food",
        "description": "Concert tickets",
        "amount": 350.68,
        "date": "2024-07-03"
    },
    {
        "id": 447,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 130.35,
        "date": "2023-12-24"
    },
    {
        "id": 448,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 435.5,
        "date": "2023-11-29"
    },
    {
        "id": 449,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 149.48,
        "date": "2024-06-01"
    },
    {
        "id": 450,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 429.32,
        "date": "2024-09-19"
    },
    {
        "id": 451,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 456.79,
        "date": "2024-01-21"
    },
    {
        "id": 452,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 88.8,
        "date": "2024-04-05"
    },
    {
        "id": 453,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 201.72,
        "date": "2024-02-15"
    },
    {
        "id": 454,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 171.89,
        "date": "2024-03-09"
    },
    {
        "id": 455,
        "category": "food",
        "description": "Electronics repair",
        "amount": 285.11,
        "date": "2024-01-28"
    },
    {
        "id": 456,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 69.58,
        "date": "2024-03-08"
    },
    {
        "id": 457,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 2.53,
        "date": "2024-01-22"
    },
    {
        "id": 458,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 189.88,
        "date": "2023-11-16"
    },
    {
        "id": 459,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 426.52,
        "date": "2023-10-20"
    },
    {
        "id": 460,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 163.6,
        "date": "2023-11-29"
    },
    {
        "id": 461,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 370.45,
        "date": "2024-09-21"
    },
    {
        "id": 462,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 46.33,
        "date": "2024-02-26"
    },
    {
        "id": 463,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 110.43,
        "date": "2024-08-17"
    },
    {
        "id": 464,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 473.3,
        "date": "2024-01-29"
    },
    {
        "id": 465,
        "category": "food",
        "description": "Gift shopping",
        "amount": 256.59,
        "date": "2024-08-23"
    },
    {
        "id": 466,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 29.38,
        "date": "2023-11-18"
    },
    {
        "id": 467,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 157.93,
        "date": "2023-11-23"
    },
    {
        "id": 468,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 246.09,
        "date": "2023-10-26"
    },
    {
        "id": 469,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 341.72,
        "date": "2023-10-26"
    },
    {
        "id": 470,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 257.98,
        "date": "2024-01-17"
    },
    {
        "id": 471,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 134.75,
        "date": "2024-03-07"
    },
    {
        "id": 472,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 86.43,
        "date": "2024-05-09"
    },
    {
        "id": 473,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 52.57,
        "date": "2024-07-17"
    },
    {
        "id": 474,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 401.78,
        "date": "2024-03-15"
    },
    {
        "id": 475,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 451.75,
        "date": "2024-06-05"
    },
    {
        "id": 476,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 137.25,
        "date": "2024-08-26"
    },
    {
        "id": 477,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 493.79,
        "date": "2024-05-06"
    },
    {
        "id": 478,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 359.06,
        "date": "2024-01-19"
    },
    {
        "id": 479,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 109.14,
        "date": "2024-06-04"
    },
    {
        "id": 480,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 27.22,
        "date": "2024-04-04"
    },
    {
        "id": 481,
        "category": "food",
        "description": "Taxi fare",
        "amount": 240.04,
        "date": "2024-09-18"
    },
    {
        "id": 482,
        "category": "food",
        "description": "Concert tickets",
        "amount": 375.12,
        "date": "2024-07-12"
    },
    {
        "id": 483,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 312.33,
        "date": "2024-07-19"
    },
    {
        "id": 484,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 248.62,
        "date": "2024-05-01"
    },
    {
        "id": 485,
        "category": "food",
        "description": "Fuel for car",
        "amount": 21.84,
        "date": "2024-08-30"
    },
    {
        "id": 486,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 70.98,
        "date": "2024-03-30"
    },
    {
        "id": 487,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 291.91,
        "date": "2024-04-29"
    },
    {
        "id": 488,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 353.91,
        "date": "2024-01-24"
    },
    {
        "id": 489,
        "category": "food",
        "description": "Taxi fare",
        "amount": 393.03,
        "date": "2023-10-18"
    },
    {
        "id": 490,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 265.42,
        "date": "2024-04-15"
    },
    {
        "id": 491,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 385.72,
        "date": "2024-04-10"
    },
    {
        "id": 492,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 404.63,
        "date": "2024-04-08"
    },
    {
        "id": 493,
        "category": "food",
        "description": "Fuel for car",
        "amount": 72.6,
        "date": "2024-03-31"
    },
    {
        "id": 494,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 147.03,
        "date": "2023-10-23"
    },
    {
        "id": 495,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 265.44,
        "date": "2024-07-15"
    },
    {
        "id": 496,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 152.02,
        "date": "2024-08-10"
    },
    {
        "id": 497,
        "category": "food",
        "description": "Movie tickets",
        "amount": 289.96,
        "date": "2024-01-21"
    },
    {
        "id": 498,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 486.8,
        "date": "2023-12-12"
    },
    {
        "id": 499,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 433.84,
        "date": "2024-01-22"
    },
    {
        "id": 500,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 94.62,
        "date": "2024-01-02"
    },
    {
        "id": 501,
        "category": "food",
        "description": "Electronics repair",
        "amount": 65.67,
        "date": "2024-04-19"
    },
    {
        "id": 502,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 189.31,
        "date": "2024-05-25"
    },
    {
        "id": 503,
        "category": "food",
        "description": "Taxi fare",
        "amount": 45.89,
        "date": "2024-07-01"
    },
    {
        "id": 504,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 476.55,
        "date": "2023-11-18"
    },
    {
        "id": 505,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 194.62,
        "date": "2024-06-25"
    },
    {
        "id": 506,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 269.12,
        "date": "2024-07-06"
    },
    {
        "id": 507,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 14.53,
        "date": "2023-11-28"
    },
    {
        "id": 508,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 158.15,
        "date": "2024-04-11"
    },
    {
        "id": 509,
        "category": "food",
        "description": "Concert tickets",
        "amount": 424.04,
        "date": "2023-11-03"
    },
    {
        "id": 510,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 191.84,
        "date": "2024-09-09"
    },
    {
        "id": 511,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 11.84,
        "date": "2024-04-23"
    },
    {
        "id": 512,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 92.63,
        "date": "2024-10-14"
    },
    {
        "id": 513,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 232.84,
        "date": "2024-07-21"
    },
    {
        "id": 514,
        "category": "food",
        "description": "Taxi fare",
        "amount": 263.48,
        "date": "2024-01-21"
    },
    {
        "id": 515,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 28.59,
        "date": "2023-11-28"
    },
    {
        "id": 516,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 417.91,
        "date": "2024-07-05"
    },
    {
        "id": 517,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 296.66,
        "date": "2024-08-01"
    },
    {
        "id": 518,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 356.07,
        "date": "2023-11-16"
    },
    {
        "id": 519,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 276.77,
        "date": "2024-03-03"
    },
    {
        "id": 520,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 304.91,
        "date": "2024-03-09"
    },
    {
        "id": 521,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 298.74,
        "date": "2024-08-13"
    },
    {
        "id": 522,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 177.61,
        "date": "2024-06-27"
    },
    {
        "id": 523,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 128.16,
        "date": "2024-07-28"
    },
    {
        "id": 524,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 88.73,
        "date": "2024-05-07"
    },
    {
        "id": 525,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 393.72,
        "date": "2024-09-19"
    },
    {
        "id": 526,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 481.34,
        "date": "2024-05-15"
    },
    {
        "id": 527,
        "category": "food",
        "description": "Fuel for car",
        "amount": 349.17,
        "date": "2024-10-17"
    },
    {
        "id": 528,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 406.68,
        "date": "2024-05-03"
    },
    {
        "id": 529,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 253.02,
        "date": "2024-05-17"
    },
    {
        "id": 530,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 363.05,
        "date": "2024-06-24"
    },
    {
        "id": 531,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 189.59,
        "date": "2024-09-19"
    },
    {
        "id": 532,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 327.86,
        "date": "2024-08-24"
    },
    {
        "id": 533,
        "category": "food",
        "description": "Taxi fare",
        "amount": 279.5,
        "date": "2024-09-25"
    },
    {
        "id": 534,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 31.22,
        "date": "2023-11-30"
    },
    {
        "id": 535,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 324.58,
        "date": "2024-05-26"
    },
    {
        "id": 536,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 262.55,
        "date": "2024-06-10"
    },
    {
        "id": 537,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 29.68,
        "date": "2024-10-06"
    },
    {
        "id": 538,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 404.43,
        "date": "2024-08-23"
    },
    {
        "id": 539,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 332.44,
        "date": "2024-04-26"
    },
    {
        "id": 540,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 419.8,
        "date": "2024-06-08"
    },
    {
        "id": 541,
        "category": "food",
        "description": "Concert tickets",
        "amount": 478.58,
        "date": "2024-08-08"
    },
    {
        "id": 542,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 484.73,
        "date": "2024-08-13"
    },
    {
        "id": 543,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 38.25,
        "date": "2024-07-21"
    },
    {
        "id": 544,
        "category": "food",
        "description": "Concert tickets",
        "amount": 145.03,
        "date": "2024-03-31"
    },
    {
        "id": 545,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 81.55,
        "date": "2024-06-23"
    },
    {
        "id": 546,
        "category": "food",
        "description": "Gift shopping",
        "amount": 423.53,
        "date": "2024-01-25"
    },
    {
        "id": 547,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 110.74,
        "date": "2024-06-27"
    },
    {
        "id": 548,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 10.48,
        "date": "2024-06-28"
    },
    {
        "id": 549,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 243.4,
        "date": "2024-06-28"
    },
    {
        "id": 550,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 48.64,
        "date": "2024-05-01"
    },
    {
        "id": 551,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 112.68,
        "date": "2024-01-09"
    },
    {
        "id": 552,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 370.49,
        "date": "2024-03-28"
    },
    {
        "id": 553,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 316.79,
        "date": "2024-08-01"
    },
    {
        "id": 554,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 9.49,
        "date": "2024-03-08"
    },
    {
        "id": 555,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 114.6,
        "date": "2024-02-22"
    },
    {
        "id": 556,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 94.49,
        "date": "2024-01-17"
    },
    {
        "id": 557,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 357.35,
        "date": "2023-11-20"
    },
    {
        "id": 558,
        "category": "food",
        "description": "Taxi fare",
        "amount": 443.81,
        "date": "2024-02-04"
    },
    {
        "id": 559,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 65.64,
        "date": "2023-12-19"
    },
    {
        "id": 560,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 339.88,
        "date": "2024-01-02"
    },
    {
        "id": 561,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 49.39,
        "date": "2024-02-27"
    },
    {
        "id": 562,
        "category": "food",
        "description": "Taxi fare",
        "amount": 266.6,
        "date": "2024-04-02"
    },
    {
        "id": 563,
        "category": "food",
        "description": "Gift shopping",
        "amount": 182.51,
        "date": "2024-06-10"
    },
    {
        "id": 564,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 182.23,
        "date": "2024-03-21"
    },
    {
        "id": 565,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 493.84,
        "date": "2024-06-04"
    },
    {
        "id": 566,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 112.13,
        "date": "2024-01-05"
    },
    {
        "id": 567,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 265.0,
        "date": "2024-07-18"
    },
    {
        "id": 568,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 248.57,
        "date": "2024-08-19"
    },
    {
        "id": 569,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 314.55,
        "date": "2024-06-30"
    },
    {
        "id": 570,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 217.33,
        "date": "2024-02-27"
    },
    {
        "id": 571,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 80.77,
        "date": "2024-10-06"
    },
    {
        "id": 572,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 26.26,
        "date": "2024-04-04"
    },
    {
        "id": 573,
        "category": "food",
        "description": "Taxi fare",
        "amount": 427.27,
        "date": "2024-03-24"
    },
    {
        "id": 574,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 467.71,
        "date": "2024-03-11"
    },
    {
        "id": 575,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 31.85,
        "date": "2023-12-21"
    },
    {
        "id": 576,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 391.27,
        "date": "2024-05-23"
    },
    {
        "id": 577,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 353.32,
        "date": "2023-11-23"
    },
    {
        "id": 578,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 43.99,
        "date": "2024-08-16"
    },
    {
        "id": 579,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 408.86,
        "date": "2023-12-29"
    },
    {
        "id": 580,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 226.12,
        "date": "2024-03-22"
    },
    {
        "id": 581,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 117.48,
        "date": "2024-09-17"
    },
    {
        "id": 582,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 499.95,
        "date": "2024-07-09"
    },
    {
        "id": 583,
        "category": "food",
        "description": "Movie tickets",
        "amount": 285.07,
        "date": "2024-04-10"
    },
    {
        "id": 584,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 164.95,
        "date": "2024-07-29"
    },
    {
        "id": 585,
        "category": "food",
        "description": "Concert tickets",
        "amount": 229.37,
        "date": "2024-06-18"
    },
    {
        "id": 586,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 218.89,
        "date": "2024-02-16"
    },
    {
        "id": 587,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 254.88,
        "date": "2023-11-14"
    },
    {
        "id": 588,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 100.02,
        "date": "2024-05-31"
    },
    {
        "id": 589,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 274.68,
        "date": "2024-08-21"
    },
    {
        "id": 590,
        "category": "food",
        "description": "Electronics repair",
        "amount": 183.4,
        "date": "2024-08-27"
    },
    {
        "id": 591,
        "category": "food",
        "description": "Concert tickets",
        "amount": 188.82,
        "date": "2024-06-18"
    },
    {
        "id": 592,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 341.57,
        "date": "2024-04-28"
    },
    {
        "id": 593,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 28.08,
        "date": "2024-05-18"
    },
    {
        "id": 594,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 455.74,
        "date": "2024-08-28"
    },
    {
        "id": 595,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 134.07,
        "date": "2024-03-23"
    },
    {
        "id": 596,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 266.33,
        "date": "2024-07-18"
    },
    {
        "id": 597,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 45.92,
        "date": "2023-11-09"
    },
    {
        "id": 598,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 205.5,
        "date": "2024-03-11"
    },
    {
        "id": 599,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 262.95,
        "date": "2024-10-14"
    },
    {
        "id": 600,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 412.68,
        "date": "2024-04-07"
    },
    {
        "id": 601,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 298.17,
        "date": "2024-02-22"
    },
    {
        "id": 602,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 27.2,
        "date": "2024-01-09"
    },
    {
        "id": 603,
        "category": "food",
        "description": "Taxi fare",
        "amount": 5.86,
        "date": "2024-05-12"
    },
    {
        "id": 604,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 127.99,
        "date": "2024-04-07"
    },
    {
        "id": 605,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 286.84,
        "date": "2024-05-04"
    },
    {
        "id": 606,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 387.45,
        "date": "2024-07-11"
    },
    {
        "id": 607,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 266.64,
        "date": "2024-04-03"
    },
    {
        "id": 608,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 47.29,
        "date": "2024-06-04"
    },
    {
        "id": 609,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 66.91,
        "date": "2024-09-16"
    },
    {
        "id": 610,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 338.24,
        "date": "2024-02-01"
    },
    {
        "id": 611,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 465.53,
        "date": "2024-04-26"
    },
    {
        "id": 612,
        "category": "food",
        "description": "Gift shopping",
        "amount": 233.72,
        "date": "2024-06-21"
    },
    {
        "id": 613,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 440.21,
        "date": "2024-05-06"
    },
    {
        "id": 614,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 165.25,
        "date": "2023-11-23"
    },
    {
        "id": 615,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 322.02,
        "date": "2024-04-13"
    },
    {
        "id": 616,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 212.57,
        "date": "2024-08-12"
    },
    {
        "id": 617,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 104.17,
        "date": "2024-01-13"
    },
    {
        "id": 618,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 37.39,
        "date": "2024-07-12"
    },
    {
        "id": 619,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 211.06,
        "date": "2024-07-30"
    },
    {
        "id": 620,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 457.85,
        "date": "2024-10-03"
    },
    {
        "id": 621,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 35.14,
        "date": "2024-02-11"
    },
    {
        "id": 622,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 215.99,
        "date": "2024-02-06"
    },
    {
        "id": 623,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 327.83,
        "date": "2024-05-24"
    },
    {
        "id": 624,
        "category": "food",
        "description": "Gift shopping",
        "amount": 199.98,
        "date": "2024-08-16"
    },
    {
        "id": 625,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 244.16,
        "date": "2023-12-22"
    },
    {
        "id": 626,
        "category": "food",
        "description": "Fuel for car",
        "amount": 391.66,
        "date": "2024-09-19"
    },
    {
        "id": 627,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 176.46,
        "date": "2024-09-02"
    },
    {
        "id": 628,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 488.32,
        "date": "2024-03-03"
    },
    {
        "id": 629,
        "category": "food",
        "description": "Fuel for car",
        "amount": 425.62,
        "date": "2024-07-08"
    },
    {
        "id": 630,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 142.56,
        "date": "2024-04-18"
    },
    {
        "id": 631,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 189.39,
        "date": "2024-08-06"
    },
    {
        "id": 632,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 67.85,
        "date": "2024-04-09"
    },
    {
        "id": 633,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 230.49,
        "date": "2024-01-03"
    },
    {
        "id": 634,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 163.72,
        "date": "2024-03-06"
    },
    {
        "id": 635,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 404.67,
        "date": "2024-09-20"
    },
    {
        "id": 636,
        "category": "food",
        "description": "Electronics repair",
        "amount": 86.82,
        "date": "2024-04-27"
    },
    {
        "id": 637,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 186.7,
        "date": "2024-01-10"
    },
    {
        "id": 638,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 102.32,
        "date": "2024-04-27"
    },
    {
        "id": 639,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 347.62,
        "date": "2024-04-20"
    },
    {
        "id": 640,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 224.35,
        "date": "2024-03-19"
    },
    {
        "id": 641,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 150.26,
        "date": "2023-11-10"
    },
    {
        "id": 642,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 226.1,
        "date": "2024-02-07"
    },
    {
        "id": 643,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 44.75,
        "date": "2024-08-02"
    },
    {
        "id": 644,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 15.66,
        "date": "2024-01-12"
    },
    {
        "id": 645,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 284.58,
        "date": "2024-04-24"
    },
    {
        "id": 646,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 79.93,
        "date": "2023-11-30"
    },
    {
        "id": 647,
        "category": "food",
        "description": "Gift shopping",
        "amount": 166.78,
        "date": "2024-07-27"
    },
    {
        "id": 648,
        "category": "food",
        "description": "Fuel for car",
        "amount": 49.04,
        "date": "2024-06-13"
    },
    {
        "id": 649,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 301.81,
        "date": "2024-10-04"
    },
    {
        "id": 650,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 272.73,
        "date": "2024-01-10"
    },
    {
        "id": 651,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 353.59,
        "date": "2024-09-20"
    },
    {
        "id": 652,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 24.79,
        "date": "2023-10-27"
    },
    {
        "id": 653,
        "category": "food",
        "description": "Movie tickets",
        "amount": 54.36,
        "date": "2024-03-27"
    },
    {
        "id": 654,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 92.1,
        "date": "2024-04-07"
    },
    {
        "id": 655,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 325.29,
        "date": "2024-03-11"
    },
    {
        "id": 656,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 328.23,
        "date": "2024-06-16"
    },
    {
        "id": 657,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 226.28,
        "date": "2024-09-12"
    },
    {
        "id": 658,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 287.4,
        "date": "2024-07-19"
    },
    {
        "id": 659,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 82.38,
        "date": "2024-10-12"
    },
    {
        "id": 660,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 421.41,
        "date": "2024-04-23"
    },
    {
        "id": 661,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 367.6,
        "date": "2024-05-19"
    },
    {
        "id": 662,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 357.5,
        "date": "2024-08-15"
    },
    {
        "id": 663,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 309.7,
        "date": "2024-01-09"
    },
    {
        "id": 664,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 303.47,
        "date": "2024-08-14"
    },
    {
        "id": 665,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 11.4,
        "date": "2024-01-15"
    },
    {
        "id": 666,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 290.35,
        "date": "2024-05-13"
    },
    {
        "id": 667,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 331.5,
        "date": "2024-09-15"
    },
    {
        "id": 668,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 170.48,
        "date": "2024-08-20"
    },
    {
        "id": 669,
        "category": "food",
        "description": "Taxi fare",
        "amount": 317.06,
        "date": "2023-10-22"
    },
    {
        "id": 670,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 160.99,
        "date": "2024-10-13"
    },
    {
        "id": 671,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 61.56,
        "date": "2023-10-24"
    },
    {
        "id": 672,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 472.71,
        "date": "2024-05-08"
    },
    {
        "id": 673,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 407.24,
        "date": "2024-02-29"
    },
    {
        "id": 674,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 408.97,
        "date": "2024-03-21"
    },
    {
        "id": 675,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 9.92,
        "date": "2024-08-09"
    },
    {
        "id": 676,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 247.68,
        "date": "2024-08-10"
    },
    {
        "id": 677,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 16.64,
        "date": "2023-10-19"
    },
    {
        "id": 678,
        "category": "food",
        "description": "Electronics repair",
        "amount": 193.04,
        "date": "2024-07-29"
    },
    {
        "id": 679,
        "category": "food",
        "description": "Concert tickets",
        "amount": 14.84,
        "date": "2024-02-07"
    },
    {
        "id": 680,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 102.2,
        "date": "2024-05-24"
    },
    {
        "id": 681,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 297.07,
        "date": "2024-04-13"
    },
    {
        "id": 682,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 30.66,
        "date": "2024-05-01"
    },
    {
        "id": 683,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 177.03,
        "date": "2023-11-25"
    },
    {
        "id": 684,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 439.87,
        "date": "2024-05-01"
    },
    {
        "id": 685,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 374.24,
        "date": "2023-12-29"
    },
    {
        "id": 686,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 427.47,
        "date": "2023-12-05"
    },
    {
        "id": 687,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 330.64,
        "date": "2024-04-20"
    },
    {
        "id": 688,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 53.81,
        "date": "2023-11-29"
    },
    {
        "id": 689,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 437.99,
        "date": "2024-06-26"
    },
    {
        "id": 690,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 488.81,
        "date": "2024-09-13"
    },
    {
        "id": 691,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 79.69,
        "date": "2024-08-03"
    },
    {
        "id": 692,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 279.92,
        "date": "2024-07-08"
    },
    {
        "id": 693,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 228.95,
        "date": "2023-10-24"
    },
    {
        "id": 694,
        "category": "food",
        "description": "Fuel for car",
        "amount": 279.45,
        "date": "2024-04-29"
    },
    {
        "id": 695,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 222.29,
        "date": "2024-03-22"
    },
    {
        "id": 696,
        "category": "food",
        "description": "Taxi fare",
        "amount": 158.06,
        "date": "2024-05-30"
    },
    {
        "id": 697,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 451.9,
        "date": "2024-02-09"
    },
    {
        "id": 698,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 420.03,
        "date": "2023-12-21"
    },
    {
        "id": 699,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 218.52,
        "date": "2024-04-09"
    },
    {
        "id": 700,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 358.02,
        "date": "2024-02-24"
    },
    {
        "id": 701,
        "category": "food",
        "description": "Movie tickets",
        "amount": 411.45,
        "date": "2024-04-26"
    },
    {
        "id": 702,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 215.53,
        "date": "2024-09-10"
    },
    {
        "id": 703,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 253.3,
        "date": "2024-04-13"
    },
    {
        "id": 704,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 233.69,
        "date": "2024-07-12"
    },
    {
        "id": 705,
        "category": "food",
        "description": "Movie tickets",
        "amount": 71.41,
        "date": "2024-06-22"
    },
    {
        "id": 706,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 287.09,
        "date": "2023-11-07"
    },
    {
        "id": 707,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 493.31,
        "date": "2024-08-17"
    },
    {
        "id": 708,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 95.21,
        "date": "2024-06-10"
    },
    {
        "id": 709,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 83.33,
        "date": "2024-06-10"
    },
    {
        "id": 710,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 183.45,
        "date": "2024-03-21"
    },
    {
        "id": 711,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 171.97,
        "date": "2024-07-10"
    },
    {
        "id": 712,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 445.88,
        "date": "2023-12-22"
    },
    {
        "id": 713,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 483.89,
        "date": "2024-10-06"
    },
    {
        "id": 714,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 170.31,
        "date": "2024-02-22"
    },
    {
        "id": 715,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 237.5,
        "date": "2024-01-06"
    },
    {
        "id": 716,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 424.33,
        "date": "2024-07-16"
    },
    {
        "id": 717,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 288.03,
        "date": "2023-12-02"
    },
    {
        "id": 718,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 274.29,
        "date": "2024-03-28"
    },
    {
        "id": 719,
        "category": "food",
        "description": "Fuel for car",
        "amount": 81.57,
        "date": "2024-06-26"
    },
    {
        "id": 720,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 461.14,
        "date": "2024-03-30"
    },
    {
        "id": 721,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 173.69,
        "date": "2024-03-31"
    },
    {
        "id": 722,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 97.55,
        "date": "2024-02-20"
    },
    {
        "id": 723,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 268.6,
        "date": "2024-07-19"
    },
    {
        "id": 724,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 383.38,
        "date": "2024-06-12"
    },
    {
        "id": 725,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 100.23,
        "date": "2023-11-11"
    },
    {
        "id": 726,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 379.17,
        "date": "2024-08-17"
    },
    {
        "id": 727,
        "category": "food",
        "description": "Gift shopping",
        "amount": 98.14,
        "date": "2024-02-16"
    },
    {
        "id": 728,
        "category": "food",
        "description": "Fuel for car",
        "amount": 137.34,
        "date": "2024-01-21"
    },
    {
        "id": 729,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 436.34,
        "date": "2024-05-18"
    },
    {
        "id": 730,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 10.09,
        "date": "2024-08-26"
    },
    {
        "id": 731,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 241.11,
        "date": "2023-12-24"
    },
    {
        "id": 732,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 145.21,
        "date": "2024-04-30"
    },
    {
        "id": 733,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 421.88,
        "date": "2024-07-27"
    },
    {
        "id": 734,
        "category": "food",
        "description": "Fuel for car",
        "amount": 328.27,
        "date": "2023-12-28"
    },
    {
        "id": 735,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 461.68,
        "date": "2024-03-30"
    },
    {
        "id": 736,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 230.94,
        "date": "2023-11-19"
    },
    {
        "id": 737,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 144.89,
        "date": "2024-03-24"
    },
    {
        "id": 738,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 290.52,
        "date": "2024-09-10"
    },
    {
        "id": 739,
        "category": "food",
        "description": "Electronics repair",
        "amount": 266.18,
        "date": "2024-09-06"
    },
    {
        "id": 740,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 423.89,
        "date": "2024-03-26"
    },
    {
        "id": 741,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 88.47,
        "date": "2024-02-12"
    },
    {
        "id": 742,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 479.54,
        "date": "2023-12-04"
    },
    {
        "id": 743,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 218.02,
        "date": "2024-05-01"
    },
    {
        "id": 744,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 274.85,
        "date": "2024-04-27"
    },
    {
        "id": 745,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 491.25,
        "date": "2024-09-29"
    },
    {
        "id": 746,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 25.33,
        "date": "2024-04-15"
    },
    {
        "id": 747,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 123.88,
        "date": "2024-01-05"
    },
    {
        "id": 748,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 296.83,
        "date": "2024-07-25"
    },
    {
        "id": 749,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 345.34,
        "date": "2024-07-13"
    },
    {
        "id": 750,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 440.15,
        "date": "2023-11-04"
    },
    {
        "id": 751,
        "category": "food",
        "description": "Concert tickets",
        "amount": 214.82,
        "date": "2024-06-09"
    },
    {
        "id": 752,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 433.15,
        "date": "2024-03-07"
    },
    {
        "id": 753,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 375.23,
        "date": "2024-09-30"
    },
    {
        "id": 754,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 184.1,
        "date": "2024-02-27"
    },
    {
        "id": 755,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 489.97,
        "date": "2023-12-02"
    },
    {
        "id": 756,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 229.93,
        "date": "2024-04-25"
    },
    {
        "id": 757,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 169.86,
        "date": "2024-01-09"
    },
    {
        "id": 758,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 284.11,
        "date": "2024-01-13"
    },
    {
        "id": 759,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 145.9,
        "date": "2023-11-24"
    },
    {
        "id": 760,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 113.14,
        "date": "2024-02-17"
    },
    {
        "id": 761,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 491.45,
        "date": "2024-09-19"
    },
    {
        "id": 762,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 406.69,
        "date": "2024-03-19"
    },
    {
        "id": 763,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 328.19,
        "date": "2024-04-27"
    },
    {
        "id": 764,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 371.92,
        "date": "2024-05-19"
    },
    {
        "id": 765,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 107.76,
        "date": "2024-08-15"
    },
    {
        "id": 766,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 308.46,
        "date": "2024-03-16"
    },
    {
        "id": 767,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 122.06,
        "date": "2023-11-04"
    },
    {
        "id": 768,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 349.18,
        "date": "2024-03-04"
    },
    {
        "id": 769,
        "category": "food",
        "description": "Taxi fare",
        "amount": 337.46,
        "date": "2024-05-21"
    },
    {
        "id": 770,
        "category": "food",
        "description": "Taxi fare",
        "amount": 498.57,
        "date": "2024-10-11"
    },
    {
        "id": 771,
        "category": "food",
        "description": "Movie tickets",
        "amount": 365.06,
        "date": "2023-11-05"
    },
    {
        "id": 772,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 341.93,
        "date": "2024-09-23"
    },
    {
        "id": 773,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 95.49,
        "date": "2024-04-29"
    },
    {
        "id": 774,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 380.46,
        "date": "2024-06-03"
    },
    {
        "id": 775,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 6.73,
        "date": "2024-06-21"
    },
    {
        "id": 776,
        "category": "food",
        "description": "Fuel for car",
        "amount": 366.57,
        "date": "2023-11-30"
    },
    {
        "id": 777,
        "category": "food",
        "description": "Taxi fare",
        "amount": 151.44,
        "date": "2024-05-12"
    },
    {
        "id": 778,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 268.64,
        "date": "2024-03-18"
    },
    {
        "id": 779,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 175.09,
        "date": "2024-02-07"
    },
    {
        "id": 780,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 264.49,
        "date": "2024-07-11"
    },
    {
        "id": 781,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 0.72,
        "date": "2024-05-19"
    },
    {
        "id": 782,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 58.48,
        "date": "2024-05-23"
    },
    {
        "id": 783,
        "category": "food",
        "description": "Movie tickets",
        "amount": 218.2,
        "date": "2024-07-23"
    },
    {
        "id": 784,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 212.54,
        "date": "2024-03-20"
    },
    {
        "id": 785,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 52.32,
        "date": "2024-03-18"
    },
    {
        "id": 786,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 417.82,
        "date": "2024-08-26"
    },
    {
        "id": 787,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 1.46,
        "date": "2024-09-10"
    },
    {
        "id": 788,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 181.0,
        "date": "2024-08-22"
    },
    {
        "id": 789,
        "category": "food",
        "description": "Gift shopping",
        "amount": 211.0,
        "date": "2024-03-06"
    },
    {
        "id": 790,
        "category": "food",
        "description": "Taxi fare",
        "amount": 223.44,
        "date": "2023-12-13"
    },
    {
        "id": 791,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 362.51,
        "date": "2023-11-27"
    },
    {
        "id": 792,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 86.69,
        "date": "2024-07-26"
    },
    {
        "id": 793,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 459.73,
        "date": "2024-04-08"
    },
    {
        "id": 794,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 488.24,
        "date": "2024-02-02"
    },
    {
        "id": 795,
        "category": "food",
        "description": "Gift shopping",
        "amount": 366.15,
        "date": "2024-08-21"
    },
    {
        "id": 796,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 364.42,
        "date": "2024-02-04"
    },
    {
        "id": 797,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 398.95,
        "date": "2024-01-17"
    },
    {
        "id": 798,
        "category": "food",
        "description": "Electronics repair",
        "amount": 287.65,
        "date": "2023-12-09"
    },
    {
        "id": 799,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 107.28,
        "date": "2024-05-03"
    },
    {
        "id": 800,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 270.35,
        "date": "2024-03-11"
    },
    {
        "id": 801,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 41.2,
        "date": "2024-03-04"
    },
    {
        "id": 802,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 228.97,
        "date": "2024-05-04"
    },
    {
        "id": 803,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 453.79,
        "date": "2024-01-22"
    },
    {
        "id": 804,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 416.87,
        "date": "2024-01-08"
    },
    {
        "id": 805,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 87.73,
        "date": "2024-06-02"
    },
    {
        "id": 806,
        "category": "food",
        "description": "Concert tickets",
        "amount": 419.86,
        "date": "2024-03-09"
    },
    {
        "id": 807,
        "category": "food",
        "description": "Movie tickets",
        "amount": 498.56,
        "date": "2024-04-26"
    },
    {
        "id": 808,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 343.99,
        "date": "2024-05-28"
    },
    {
        "id": 809,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 325.35,
        "date": "2024-02-20"
    },
    {
        "id": 810,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 458.03,
        "date": "2024-05-14"
    },
    {
        "id": 811,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 119.06,
        "date": "2024-03-30"
    },
    {
        "id": 812,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 347.42,
        "date": "2024-07-27"
    },
    {
        "id": 813,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 282.56,
        "date": "2024-08-02"
    },
    {
        "id": 814,
        "category": "food",
        "description": "Taxi fare",
        "amount": 208.63,
        "date": "2024-01-14"
    },
    {
        "id": 815,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 244.84,
        "date": "2024-09-29"
    },
    {
        "id": 816,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 63.28,
        "date": "2024-01-26"
    },
    {
        "id": 817,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 32.8,
        "date": "2024-09-12"
    },
    {
        "id": 818,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 213.77,
        "date": "2024-08-24"
    },
    {
        "id": 819,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 35.04,
        "date": "2024-02-26"
    },
    {
        "id": 820,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 395.72,
        "date": "2024-07-16"
    },
    {
        "id": 821,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 116.75,
        "date": "2024-01-05"
    },
    {
        "id": 822,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 14.74,
        "date": "2024-03-31"
    },
    {
        "id": 823,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 479.6,
        "date": "2024-05-29"
    },
    {
        "id": 824,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 60.5,
        "date": "2023-11-26"
    },
    {
        "id": 825,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 302.24,
        "date": "2024-01-27"
    },
    {
        "id": 826,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 386.18,
        "date": "2024-01-18"
    },
    {
        "id": 827,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 388.26,
        "date": "2024-06-02"
    },
    {
        "id": 828,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 288.11,
        "date": "2024-02-11"
    },
    {
        "id": 829,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 101.58,
        "date": "2024-07-17"
    },
    {
        "id": 830,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 482.38,
        "date": "2023-12-18"
    },
    {
        "id": 831,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 409.06,
        "date": "2024-05-10"
    },
    {
        "id": 832,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 370.0,
        "date": "2024-06-18"
    },
    {
        "id": 833,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 188.23,
        "date": "2024-04-11"
    },
    {
        "id": 834,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 277.63,
        "date": "2024-08-05"
    },
    {
        "id": 835,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 93.62,
        "date": "2024-04-21"
    },
    {
        "id": 836,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 6.72,
        "date": "2023-12-17"
    },
    {
        "id": 837,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 55.18,
        "date": "2024-06-08"
    },
    {
        "id": 838,
        "category": "food",
        "description": "Gift shopping",
        "amount": 83.75,
        "date": "2024-07-14"
    },
    {
        "id": 839,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 481.71,
        "date": "2024-05-10"
    },
    {
        "id": 840,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 322.76,
        "date": "2024-03-18"
    },
    {
        "id": 841,
        "category": "food",
        "description": "Movie tickets",
        "amount": 246.73,
        "date": "2024-07-21"
    },
    {
        "id": 842,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 92.63,
        "date": "2024-05-13"
    },
    {
        "id": 843,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 407.34,
        "date": "2024-02-07"
    },
    {
        "id": 844,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 249.55,
        "date": "2024-10-05"
    },
    {
        "id": 845,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 492.38,
        "date": "2024-07-15"
    },
    {
        "id": 846,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 60.85,
        "date": "2024-07-08"
    },
    {
        "id": 847,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 11.9,
        "date": "2024-04-27"
    },
    {
        "id": 848,
        "category": "food",
        "description": "Dinner at a restaurant",
        "amount": 476.92,
        "date": "2024-04-26"
    },
    {
        "id": 849,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 455.6,
        "date": "2023-11-11"
    },
    {
        "id": 850,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 135.6,
        "date": "2024-04-16"
    },
    {
        "id": 851,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 281.57,
        "date": "2024-07-13"
    },
    {
        "id": 852,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 194.66,
        "date": "2024-06-18"
    },
    {
        "id": 853,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 179.11,
        "date": "2024-09-30"
    },
    {
        "id": 854,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 210.75,
        "date": "2024-08-24"
    },
    {
        "id": 855,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 268.49,
        "date": "2024-08-19"
    },
    {
        "id": 856,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 327.75,
        "date": "2023-10-27"
    },
    {
        "id": 857,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 157.99,
        "date": "2024-08-28"
    },
    {
        "id": 858,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 447.94,
        "date": "2024-01-18"
    },
    {
        "id": 859,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 251.52,
        "date": "2024-01-20"
    },
    {
        "id": 860,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 399.6,
        "date": "2023-12-02"
    },
    {
        "id": 861,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 33.48,
        "date": "2024-04-18"
    },
    {
        "id": 862,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 180.45,
        "date": "2024-09-03"
    },
    {
        "id": 863,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 141.17,
        "date": "2024-05-21"
    },
    {
        "id": 864,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 259.47,
        "date": "2024-10-02"
    },
    {
        "id": 865,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 151.4,
        "date": "2024-08-06"
    },
    {
        "id": 866,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 382.04,
        "date": "2024-10-12"
    },
    {
        "id": 867,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 227.61,
        "date": "2024-01-16"
    },
    {
        "id": 868,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 486.33,
        "date": "2024-07-20"
    },
    {
        "id": 869,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 374.87,
        "date": "2024-02-16"
    },
    {
        "id": 870,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 58.15,
        "date": "2024-08-21"
    },
    {
        "id": 871,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 419.51,
        "date": "2024-04-24"
    },
    {
        "id": 872,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 191.52,
        "date": "2024-05-25"
    },
    {
        "id": 873,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 112.56,
        "date": "2024-07-27"
    },
    {
        "id": 874,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 202.85,
        "date": "2023-12-07"
    },
    {
        "id": 875,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 319.44,
        "date": "2024-01-02"
    },
    {
        "id": 876,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 445.58,
        "date": "2023-11-10"
    },
    {
        "id": 877,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 285.95,
        "date": "2024-05-18"
    },
    {
        "id": 878,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 147.3,
        "date": "2024-06-01"
    },
    {
        "id": 879,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 493.66,
        "date": "2023-12-11"
    },
    {
        "id": 880,
        "category": "food",
        "description": "Concert tickets",
        "amount": 163.82,
        "date": "2024-07-18"
    },
    {
        "id": 881,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 197.03,
        "date": "2023-12-09"
    },
    {
        "id": 882,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 233.38,
        "date": "2024-01-03"
    },
    {
        "id": 883,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 6.21,
        "date": "2024-05-01"
    },
    {
        "id": 884,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 285.88,
        "date": "2024-02-14"
    },
    {
        "id": 885,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 437.59,
        "date": "2024-01-25"
    },
    {
        "id": 886,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 403.64,
        "date": "2024-02-06"
    },
    {
        "id": 887,
        "category": "food",
        "description": "Taxi fare",
        "amount": 237.2,
        "date": "2023-10-26"
    },
    {
        "id": 888,
        "category": "food",
        "description": "Movie tickets",
        "amount": 460.43,
        "date": "2024-02-12"
    },
    {
        "id": 889,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 138.89,
        "date": "2024-02-13"
    },
    {
        "id": 890,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 90.88,
        "date": "2023-12-27"
    },
    {
        "id": 891,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 398.38,
        "date": "2024-05-21"
    },
    {
        "id": 892,
        "category": "food",
        "description": "Concert tickets",
        "amount": 391.82,
        "date": "2024-04-14"
    },
    {
        "id": 893,
        "category": "food",
        "description": "Taxi fare",
        "amount": 0.63,
        "date": "2023-11-25"
    },
    {
        "id": 894,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 451.26,
        "date": "2024-02-28"
    },
    {
        "id": 895,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 96.38,
        "date": "2024-07-21"
    },
    {
        "id": 896,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 298.71,
        "date": "2024-09-28"
    },
    {
        "id": 897,
        "category": "food",
        "description": "Movie tickets",
        "amount": 378.9,
        "date": "2024-06-10"
    },
    {
        "id": 898,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 22.96,
        "date": "2024-08-24"
    },
    {
        "id": 899,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 180.8,
        "date": "2024-08-26"
    },
    {
        "id": 900,
        "category": "food",
        "description": "Movie tickets",
        "amount": 185.36,
        "date": "2024-02-11"
    },
    {
        "id": 901,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 437.0,
        "date": "2023-12-17"
    },
    {
        "id": 902,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 196.59,
        "date": "2024-05-30"
    },
    {
        "id": 903,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 182.61,
        "date": "2023-12-08"
    },
    {
        "id": 904,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 102.37,
        "date": "2024-04-17"
    },
    {
        "id": 905,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 142.23,
        "date": "2023-10-30"
    },
    {
        "id": 906,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 349.84,
        "date": "2024-01-16"
    },
    {
        "id": 907,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 385.01,
        "date": "2023-12-09"
    },
    {
        "id": 908,
        "category": "shopping",
        "description": "Buy some grocery",
        "amount": 19.02,
        "date": "2024-10-01"
    },
    {
        "id": 909,
        "category": "food",
        "description": "Fuel for car",
        "amount": 410.93,
        "date": "2024-09-17"
    },
    {
        "id": 910,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 208.5,
        "date": "2023-12-04"
    },
    {
        "id": 911,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 202.1,
        "date": "2023-12-18"
    },
    {
        "id": 912,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 390.82,
        "date": "2024-02-03"
    },
    {
        "id": 913,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 318.84,
        "date": "2024-05-23"
    },
    {
        "id": 914,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 451.27,
        "date": "2023-12-29"
    },
    {
        "id": 915,
        "category": "food",
        "description": "Clothing purchase",
        "amount": 126.65,
        "date": "2024-07-24"
    },
    {
        "id": 916,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 295.98,
        "date": "2024-04-05"
    },
    {
        "id": 917,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 210.38,
        "date": "2024-08-16"
    },
    {
        "id": 918,
        "category": "food",
        "description": "Electronics repair",
        "amount": 283.96,
        "date": "2024-01-13"
    },
    {
        "id": 919,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 293.42,
        "date": "2024-06-27"
    },
    {
        "id": 920,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 175.43,
        "date": "2024-08-04"
    },
    {
        "id": 921,
        "category": "food",
        "description": "Fuel for car",
        "amount": 457.43,
        "date": "2024-01-15"
    },
    {
        "id": 922,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 428.28,
        "date": "2023-12-15"
    },
    {
        "id": 923,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 354.04,
        "date": "2024-06-01"
    },
    {
        "id": 924,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 53.0,
        "date": "2023-11-14"
    },
    {
        "id": 925,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 241.07,
        "date": "2024-03-29"
    },
    {
        "id": 926,
        "category": "shopping",
        "description": "Monthly subscription",
        "amount": 186.62,
        "date": "2024-07-27"
    },
    {
        "id": 927,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 314.42,
        "date": "2024-02-10"
    },
    {
        "id": 928,
        "category": "food",
        "description": "Taxi fare",
        "amount": 78.64,
        "date": "2024-06-03"
    },
    {
        "id": 929,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 384.24,
        "date": "2024-08-15"
    },
    {
        "id": 930,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 319.01,
        "date": "2024-02-22"
    },
    {
        "id": 931,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 484.65,
        "date": "2024-03-05"
    },
    {
        "id": 932,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 399.75,
        "date": "2024-06-27"
    },
    {
        "id": 933,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 207.01,
        "date": "2024-03-24"
    },
    {
        "id": 934,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 19.79,
        "date": "2024-04-17"
    },
    {
        "id": 935,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 93.31,
        "date": "2024-02-08"
    },
    {
        "id": 936,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 383.37,
        "date": "2024-08-19"
    },
    {
        "id": 937,
        "category": "food",
        "description": "Movie tickets",
        "amount": 192.87,
        "date": "2024-04-11"
    },
    {
        "id": 938,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 73.49,
        "date": "2023-12-29"
    },
    {
        "id": 939,
        "category": "food",
        "description": "Taxi fare",
        "amount": 211.6,
        "date": "2024-07-11"
    },
    {
        "id": 940,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 383.64,
        "date": "2024-02-22"
    },
    {
        "id": 941,
        "category": "entertainment",
        "description": "Dinner at a restaurant",
        "amount": 295.18,
        "date": "2023-12-21"
    },
    {
        "id": 942,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 15.77,
        "date": "2024-01-18"
    },
    {
        "id": 943,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 2.64,
        "date": "2024-03-08"
    },
    {
        "id": 944,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 442.42,
        "date": "2024-09-11"
    },
    {
        "id": 945,
        "category": "transport",
        "description": "Electronics repair",
        "amount": 364.51,
        "date": "2024-04-06"
    },
    {
        "id": 946,
        "category": "transport",
        "description": "Buy some grocery",
        "amount": 158.41,
        "date": "2023-10-31"
    },
    {
        "id": 947,
        "category": "food",
        "description": "Movie tickets",
        "amount": 104.65,
        "date": "2024-01-31"
    },
    {
        "id": 948,
        "category": "food",
        "description": "Gift shopping",
        "amount": 319.98,
        "date": "2023-12-17"
    },
    {
        "id": 949,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 129.03,
        "date": "2024-02-20"
    },
    {
        "id": 950,
        "category": "transport",
        "description": "Gift shopping",
        "amount": 254.38,
        "date": "2024-02-06"
    },
    {
        "id": 951,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 391.06,
        "date": "2024-10-12"
    },
    {
        "id": 952,
        "category": "food",
        "description": "Gift shopping",
        "amount": 332.0,
        "date": "2024-05-11"
    },
    {
        "id": 953,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 411.3,
        "date": "2024-09-13"
    },
    {
        "id": 954,
        "category": "entertainment",
        "description": "Gift shopping",
        "amount": 164.35,
        "date": "2024-03-21"
    },
    {
        "id": 955,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 45.03,
        "date": "2024-06-02"
    },
    {
        "id": 956,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 48.16,
        "date": "2024-02-03"
    },
    {
        "id": 957,
        "category": "transport",
        "description": "Taxi fare",
        "amount": 430.42,
        "date": "2024-01-31"
    },
    {
        "id": 958,
        "category": "food",
        "description": "Buy some grocery",
        "amount": 77.62,
        "date": "2024-01-30"
    },
    {
        "id": 959,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 119.26,
        "date": "2024-04-26"
    },
    {
        "id": 960,
        "category": "entertainment",
        "description": "Monthly subscription",
        "amount": 154.82,
        "date": "2024-04-16"
    },
    {
        "id": 961,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 374.42,
        "date": "2024-02-05"
    },
    {
        "id": 962,
        "category": "shopping",
        "description": "Electronics repair",
        "amount": 454.39,
        "date": "2024-04-12"
    },
    {
        "id": 963,
        "category": "food",
        "description": "Electronics repair",
        "amount": 222.03,
        "date": "2024-07-29"
    },
    {
        "id": 964,
        "category": "food",
        "description": "Monthly subscription",
        "amount": 128.62,
        "date": "2024-05-13"
    },
    {
        "id": 965,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 219.77,
        "date": "2024-04-18"
    },
    {
        "id": 966,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 195.6,
        "date": "2024-07-07"
    },
    {
        "id": 967,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 85.21,
        "date": "2024-05-26"
    },
    {
        "id": 968,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 35.64,
        "date": "2024-01-04"
    },
    {
        "id": 969,
        "category": "transport",
        "description": "Fuel for car",
        "amount": 182.63,
        "date": "2024-01-03"
    },
    {
        "id": 970,
        "category": "entertainment",
        "description": "Clothing purchase",
        "amount": 414.04,
        "date": "2024-01-14"
    },
    {
        "id": 971,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 158.36,
        "date": "2023-10-18"
    },
    {
        "id": 972,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 143.31,
        "date": "2024-06-26"
    },
    {
        "id": 973,
        "category": "transport",
        "description": "Dinner at a restaurant",
        "amount": 195.53,
        "date": "2024-03-05"
    },
    {
        "id": 974,
        "category": "shopping",
        "description": "Gift shopping",
        "amount": 370.67,
        "date": "2024-03-16"
    },
    {
        "id": 975,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 24.78,
        "date": "2024-05-11"
    },
    {
        "id": 976,
        "category": "shopping",
        "description": "Clothing purchase",
        "amount": 387.5,
        "date": "2023-11-18"
    },
    {
        "id": 977,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 175.42,
        "date": "2023-11-23"
    },
    {
        "id": 978,
        "category": "entertainment",
        "description": "Movie tickets",
        "amount": 36.78,
        "date": "2024-07-31"
    },
    {
        "id": 979,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 8.31,
        "date": "2024-04-07"
    },
    {
        "id": 980,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 281.74,
        "date": "2024-02-26"
    },
    {
        "id": 981,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 182.09,
        "date": "2024-02-09"
    },
    {
        "id": 982,
        "category": "transport",
        "description": "Movie tickets",
        "amount": 28.44,
        "date": "2024-07-30"
    },
    {
        "id": 983,
        "category": "food",
        "description": "Concert tickets",
        "amount": 456.86,
        "date": "2024-07-15"
    },
    {
        "id": 984,
        "category": "entertainment",
        "description": "Concert tickets",
        "amount": 56.97,
        "date": "2024-02-04"
    },
    {
        "id": 985,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 108.65,
        "date": "2023-12-31"
    },
    {
        "id": 986,
        "category": "transport",
        "description": "Clothing purchase",
        "amount": 238.96,
        "date": "2023-12-27"
    },
    {
        "id": 987,
        "category": "shopping",
        "description": "Dinner at a restaurant",
        "amount": 33.28,
        "date": "2024-09-07"
    },
    {
        "id": 988,
        "category": "food",
        "description": "Gift shopping",
        "amount": 493.21,
        "date": "2024-07-08"
    },
    {
        "id": 989,
        "category": "transport",
        "description": "Monthly subscription",
        "amount": 112.91,
        "date": "2024-08-04"
    },
    {
        "id": 990,
        "category": "food",
        "description": "Concert tickets",
        "amount": 301.73,
        "date": "2024-05-27"
    },
    {
        "id": 991,
        "category": "shopping",
        "description": "Taxi fare",
        "amount": 134.11,
        "date": "2024-06-23"
    },
    {
        "id": 992,
        "category": "food",
        "description": "Electronics repair",
        "amount": 446.98,
        "date": "2024-06-07"
    },
    {
        "id": 993,
        "category": "shopping",
        "description": "Movie tickets",
        "amount": 446.63,
        "date": "2024-03-29"
    },
    {
        "id": 994,
        "category": "entertainment",
        "description": "Taxi fare",
        "amount": 382.65,
        "date": "2024-10-01"
    },
    {
        "id": 995,
        "category": "transport",
        "description": "Concert tickets",
        "amount": 28.95,
        "date": "2024-07-15"
    },
    {
        "id": 996,
        "category": "shopping",
        "description": "Fuel for car",
        "amount": 381.55,
        "date": "2024-03-10"
    },
    {
        "id": 997,
        "category": "shopping",
        "description": "Concert tickets",
        "amount": 134.12,
        "date": "2024-02-29"
    },
    {
        "id": 998,
        "category": "entertainment",
        "description": "Buy some grocery",
        "amount": 149.2,
        "date": "2023-12-02"
    },
    {
        "id": 999,
        "category": "entertainment",
        "description": "Electronics repair",
        "amount": 253.12,
        "date": "2024-09-30"
    },
    {
        "id": 1000,
        "category": "entertainment",
        "description": "Fuel for car",
        "amount": 227.04,
        "date": "2024-08-16"
    }
]`;
  localStorage.setItem("expenses", mockData);
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
      const id = item.getAttribute("data-id");

      const expenses = JSON.parse(localStorage.getItem("expenses")) ?? [];
      const selectedExpense = expenses.find((item) => item.id === id);

      if (selectedExpense) {
        sessionStorage.setItem(
          "selectedExpense",
          JSON.stringify(selectedExpense)
        );
        const queryString = new URLSearchParams({ isEdit: true }).toString();
        const url = `${window.location.origin}/add?${queryString}`;
        navigate(url);
      }
    }
  });

  // connect saveItem function to form submit event
  const budgetForm = document.getElementById("addBudgetForm");
  budgetForm.addEventListener("submit", saveBudget);

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

function saveBudget(event) {
  event.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const isEdit = params.get("isEdit") === "true"; // isEdit 값 확인
  const today = new Date();
  const selectedDate = today.getFullYear() + "-" + today.getMonth(); // 예산 달 선택
  const budgetFS = localStorage.getItem("budgets");
  const budgets = JSON.parse(budgetFS) ?? {};

  const amount = document.getElementById("budget").value;
  const category = document.getElementById("budget-category").value;

  // 해당 달의 예산 배열 초기화
  if (!budgets[selectedDate]) {
    budgets[selectedDate] = [];
  }

  const isDuplicate = budgets[selectedDate].some(
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

        const updatedArr = budgets[selectedDate].map((item) => {
          if (item.id !== selectedBudget.id) return item;

          const updatedBudgetObj = {
            id: selectedBudget.id,
            category: category,
            amount: amount,
          };
          return updatedBudgetObj;
        });
        budgets[selectedDate] = updatedArr;
      }
    } else {
      const id =
        budgets[selectedDate].length === 0
          ? 1
          : budgets[selectedDate][budgets[selectedDate].length - 1].id + 1;
      const newBudgetObj = {
        id: id,
        category: category,
        amount: amount,
      };

      budgets[selectedDate].push(newBudgetObj);
    }

    localStorage.setItem("budgets", JSON.stringify(budgets));
    navigate("/budget");
  }
}
