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
    if(match.route.sectionId === "reportSection") {
      renderExpensesReport();
    }
  }
};

// Fired when the HTML is fully parsed and the DOM is completely built.
document.addEventListener("DOMContentLoaded", () => {
  // localStorage.removeItem("expenses"); // 🚨 just for test
  const mockData = `[
    {
        "id": 1,
        "date": "2024-10-27",
        "category": "Utilities",
        "description": "Expense 1",
        "amount": 23.31
    },
    {
        "id": 2,
        "date": "2024-03-31",
        "category": "Transportation",
        "description": "Expense 2",
        "amount": 18.54
    },
    {
        "id": 3,
        "date": "2024-10-06",
        "category": "Miscellaneous",
        "description": "Expense 3",
        "amount": 49.88
    },
    {
        "id": 4,
        "date": "2024-03-26",
        "category": "Miscellaneous",
        "description": "Expense 4",
        "amount": 7.05
    },
    {
        "id": 5,
        "date": "2024-05-18",
        "category": "Entertainment",
        "description": "Expense 5",
        "amount": 27.11
    },
    {
        "id": 6,
        "date": "2024-09-22",
        "category": "Healthcare",
        "description": "Expense 6",
        "amount": 20.46
    },
    {
        "id": 7,
        "date": "2024-12-14",
        "category": "Miscellaneous",
        "description": "Expense 7",
        "amount": 45.11
    },
    {
        "id": 8,
        "date": "2024-01-16",
        "category": "Miscellaneous",
        "description": "Expense 8",
        "amount": 27.58
    },
    {
        "id": 9,
        "date": "2024-07-02",
        "category": "Groceries",
        "description": "Expense 9",
        "amount": 27.7
    },
    {
        "id": 10,
        "date": "2024-01-31",
        "category": "Utilities",
        "description": "Expense 10",
        "amount": 32.65
    },
    {
        "id": 11,
        "date": "2024-02-03",
        "category": "Transportation",
        "description": "Expense 11",
        "amount": 15.37
    },
    {
        "id": 12,
        "date": "2024-03-01",
        "category": "Entertainment",
        "description": "Expense 12",
        "amount": 32.47
    },
    {
        "id": 13,
        "date": "2024-02-23",
        "category": "Miscellaneous",
        "description": "Expense 13",
        "amount": 29.11
    },
    {
        "id": 14,
        "date": "2024-04-19",
        "category": "Utilities",
        "description": "Expense 14",
        "amount": 17.67
    },
    {
        "id": 15,
        "date": "2024-03-26",
        "category": "Healthcare",
        "description": "Expense 15",
        "amount": 19.99
    },
    {
        "id": 16,
        "date": "2024-10-31",
        "category": "Healthcare",
        "description": "Expense 16",
        "amount": 29.52
    },
    {
        "id": 17,
        "date": "2024-04-12",
        "category": "Food",
        "description": "Expense 17",
        "amount": 396.61
    },
    {
        "id": 18,
        "date": "2024-05-12",
        "category": "Groceries",
        "description": "Expense 18",
        "amount": 47.48
    },
    {
        "id": 19,
        "date": "2024-02-11",
        "category": "Groceries",
        "description": "Expense 19",
        "amount": 8.55
    },
    {
        "id": 20,
        "date": "2024-09-26",
        "category": "Education",
        "description": "Expense 20",
        "amount": 30.81
    },
    {
        "id": 21,
        "date": "2024-10-25",
        "category": "Healthcare",
        "description": "Expense 21",
        "amount": 30.77
    },
    {
        "id": 22,
        "date": "2024-12-30",
        "category": "Entertainment",
        "description": "Expense 22",
        "amount": 29.78
    },
    {
        "id": 23,
        "date": "2024-10-18",
        "category": "Miscellaneous",
        "description": "Expense 23",
        "amount": 11.78
    },
    {
        "id": 24,
        "date": "2024-11-10",
        "category": "Education",
        "description": "Expense 24",
        "amount": 33.35
    },
    {
        "id": 25,
        "date": "2024-08-08",
        "category": "Housing",
        "description": "Expense 25",
        "amount": 1000
    },
    {
        "id": 26,
        "date": "2024-01-18",
        "category": "Housing",
        "description": "Expense 26",
        "amount": 34.2
    },
    {
        "id": 27,
        "date": "2024-08-31",
        "category": "Utilities",
        "description": "Expense 27",
        "amount": 18.28
    },
    {
        "id": 28,
        "date": "2024-05-16",
        "category": "Education",
        "description": "Expense 28",
        "amount": 18.78
    },
    {
        "id": 29,
        "date": "2024-08-18",
        "category": "Transportation",
        "description": "Expense 29",
        "amount": 9.19
    },
    {
        "id": 30,
        "date": "2024-04-17",
        "category": "Housing",
        "description": "Expense 30",
        "amount": 41.72
    },
    {
        "id": 31,
        "date": "2024-04-10",
        "category": "Entertainment",
        "description": "Expense 31",
        "amount": 11.19
    },
    {
        "id": 32,
        "date": "2024-11-06",
        "category": "Entertainment",
        "description": "Expense 32",
        "amount": 42.44
    },
    {
        "id": 33,
        "date": "2024-12-06",
        "category": "Housing",
        "description": "Expense 33",
        "amount": 36.38
    },
    {
        "id": 34,
        "date": "2024-04-27",
        "category": "Utilities",
        "description": "Expense 34",
        "amount": 28.08
    },
    {
        "id": 35,
        "date": "2024-06-18",
        "category": "Education",
        "description": "Expense 35",
        "amount": 42.28
    },
    {
        "id": 36,
        "date": "2024-05-21",
        "category": "Education",
        "description": "Expense 36",
        "amount": 31.7
    },
    {
        "id": 37,
        "date": "2024-08-18",
        "category": "Housing",
        "description": "Expense 37",
        "amount": 34.41
    },
    {
        "id": 38,
        "date": "2024-07-27",
        "category": "Entertainment",
        "description": "Expense 38",
        "amount": 42.1
    },
    {
        "id": 39,
        "date": "2024-03-25",
        "category": "Entertainment",
        "description": "Expense 39",
        "amount": 43.79
    },
    {
        "id": 40,
        "date": "2024-04-18",
        "category": "Food",
        "description": "Expense 40",
        "amount": 341.22
    },
    {
        "id": 41,
        "date": "2024-02-25",
        "category": "Entertainment",
        "description": "Expense 41",
        "amount": 19.25
    },
    {
        "id": 42,
        "date": "2024-12-31",
        "category": "Food",
        "description": "Expense 42",
        "amount": 267.58
    },
    {
        "id": 43,
        "date": "2024-04-24",
        "category": "Housing",
        "description": "Expense 43",
        "amount": 31.43
    },
    {
        "id": 44,
        "date": "2024-04-28",
        "category": "Food",
        "description": "Expense 44",
        "amount": 302.61
    },
    {
        "id": 45,
        "date": "2024-07-07",
        "category": "Housing",
        "description": "Expense 45",
        "amount": 41.76
    },
    {
        "id": 46,
        "date": "2024-10-26",
        "category": "Food",
        "description": "Expense 46",
        "amount": 221.18
    },
    {
        "id": 47,
        "date": "2024-10-05",
        "category": "Housing",
        "description": "Expense 47",
        "amount": 29.0
    },
    {
        "id": 48,
        "date": "2024-12-04",
        "category": "Education",
        "description": "Expense 48",
        "amount": 28.88
    },
    {
        "id": 49,
        "date": "2024-06-09",
        "category": "Food",
        "description": "Expense 49",
        "amount": 312.34
    },
    {
        "id": 50,
        "date": "2024-01-07",
        "category": "Healthcare",
        "description": "Expense 50",
        "amount": 19.82
    },
    {
        "id": 51,
        "date": "2024-01-23",
        "category": "Education",
        "description": "Expense 51",
        "amount": 38.9
    },
    {
        "id": 52,
        "date": "2024-02-22",
        "category": "Utilities",
        "description": "Expense 52",
        "amount": 17.99
    },
    {
        "id": 53,
        "date": "2024-05-12",
        "category": "Healthcare",
        "description": "Expense 53",
        "amount": 41.38
    },
    {
        "id": 54,
        "date": "2024-07-31",
        "category": "Housing",
        "description": "Expense 54",
        "amount": 14.05
    },
    {
        "id": 55,
        "date": "2024-04-16",
        "category": "Food",
        "description": "Expense 55",
        "amount": 319.57
    },
    {
        "id": 56,
        "date": "2024-12-30",
        "category": "Entertainment",
        "description": "Expense 56",
        "amount": 39.76
    },
    {
        "id": 57,
        "date": "2024-11-15",
        "category": "Utilities",
        "description": "Expense 57",
        "amount": 30.15
    },
    {
        "id": 58,
        "date": "2024-09-08",
        "category": "Groceries",
        "description": "Expense 58",
        "amount": 20.85
    },
    {
        "id": 59,
        "date": "2024-01-10",
        "category": "Housing",
        "description": "Expense 59",
        "amount": 39.07
    },
    {
        "id": 60,
        "date": "2024-01-23",
        "category": "Education",
        "description": "Expense 60",
        "amount": 6.07
    },
    {
        "id": 61,
        "date": "2024-03-17",
        "category": "Healthcare",
        "description": "Expense 61",
        "amount": 34.2
    },
    {
        "id": 62,
        "date": "2024-12-13",
        "category": "Utilities",
        "description": "Expense 62",
        "amount": 49.01
    },
    {
        "id": 63,
        "date": "2024-11-11",
        "category": "Food",
        "description": "Expense 63",
        "amount": 203.61
    },
    {
        "id": 64,
        "date": "2024-11-27",
        "category": "Education",
        "description": "Expense 64",
        "amount": 17.93
    },
    {
        "id": 65,
        "date": "2024-11-18",
        "category": "Utilities",
        "description": "Expense 65",
        "amount": 24.94
    },
    {
        "id": 66,
        "date": "2024-09-29",
        "category": "Utilities",
        "description": "Expense 66",
        "amount": 37.83
    },
    {
        "id": 67,
        "date": "2024-12-23",
        "category": "Utilities",
        "description": "Expense 67",
        "amount": 33.39
    },
    {
        "id": 68,
        "date": "2024-09-21",
        "category": "Transportation",
        "description": "Expense 68",
        "amount": 40.28
    },
    {
        "id": 69,
        "date": "2024-09-02",
        "category": "Utilities",
        "description": "Expense 69",
        "amount": 48.86
    },
    {
        "id": 70,
        "date": "2024-03-05",
        "category": "Groceries",
        "description": "Expense 70",
        "amount": 24.4
    },
    {
        "id": 71,
        "date": "2024-04-02",
        "category": "Education",
        "description": "Expense 71",
        "amount": 28.94
    },
    {
        "id": 72,
        "date": "2024-09-11",
        "category": "Groceries",
        "description": "Expense 72",
        "amount": 34.41
    },
    {
        "id": 73,
        "date": "2024-11-29",
        "category": "Food",
        "description": "Expense 73",
        "amount": 342.09
    },
    {
        "id": 74,
        "date": "2024-03-01",
        "category": "Healthcare",
        "description": "Expense 74",
        "amount": 39.57
    },
    {
        "id": 75,
        "date": "2024-04-01",
        "category": "Transportation",
        "description": "Expense 75",
        "amount": 15.46
    },
    {
        "id": 76,
        "date": "2024-04-01",
        "category": "Utilities",
        "description": "Expense 76",
        "amount": 19.82
    },
    {
        "id": 77,
        "date": "2024-07-02",
        "category": "Food",
        "description": "Expense 77",
        "amount": 395.62
    },
    {
        "id": 78,
        "date": "2024-11-01",
        "category": "Miscellaneous",
        "description": "Expense 78",
        "amount": 7.45
    },
    {
        "id": 79,
        "date": "2024-11-29",
        "category": "Education",
        "description": "Expense 79",
        "amount": 37.28
    },
    {
        "id": 80,
        "date": "2024-07-31",
        "category": "Transportation",
        "description": "Expense 80",
        "amount": 14.35
    },
    {
        "id": 81,
        "date": "2024-03-08",
        "category": "Food",
        "description": "Expense 81",
        "amount": 391.49
    },
    {
        "id": 82,
        "date": "2024-11-28",
        "category": "Entertainment",
        "description": "Expense 82",
        "amount": 12.39
    },
    {
        "id": 83,
        "date": "2024-01-19",
        "category": "Housing",
        "description": "Expense 83",
        "amount": 30.96
    },
    {
        "id": 84,
        "date": "2024-12-11",
        "category": "Entertainment",
        "description": "Expense 84",
        "amount": 13.07
    },
    {
        "id": 85,
        "date": "2024-10-23",
        "category": "Transportation",
        "description": "Expense 85",
        "amount": 5.1
    },
    {
        "id": 86,
        "date": "2024-01-07",
        "category": "Miscellaneous",
        "description": "Expense 86",
        "amount": 23.32
    },
    {
        "id": 87,
        "date": "2024-12-08",
        "category": "Food",
        "description": "Expense 87",
        "amount": 261.2
    },
    {
        "id": 88,
        "date": "2024-10-31",
        "category": "Education",
        "description": "Expense 88",
        "amount": 21.19
    },
    {
        "id": 89,
        "date": "2024-04-05",
        "category": "Healthcare",
        "description": "Expense 89",
        "amount": 7.22
    },
    {
        "id": 90,
        "date": "2024-02-26",
        "category": "Entertainment",
        "description": "Expense 90",
        "amount": 21.72
    },
    {
        "id": 91,
        "date": "2024-07-29",
        "category": "Food",
        "description": "Expense 91",
        "amount": 352.49
    },
    {
        "id": 92,
        "date": "2024-07-30",
        "category": "Groceries",
        "description": "Expense 92",
        "amount": 27.01
    },
    {
        "id": 93,
        "date": "2024-03-27",
        "category": "Groceries",
        "description": "Expense 93",
        "amount": 39.29
    },
    {
        "id": 94,
        "date": "2024-05-08",
        "category": "Housing",
        "description": "Expense 94",
        "amount": 19.83
    },
    {
        "id": 95,
        "date": "2024-06-11",
        "category": "Groceries",
        "description": "Expense 95",
        "amount": 11.23
    },
    {
        "id": 96,
        "date": "2024-04-20",
        "category": "Housing",
        "description": "Expense 96",
        "amount": 27.86
    },
    {
        "id": 97,
        "date": "2024-09-23",
        "category": "Housing",
        "description": "Expense 97",
        "amount": 44.12
    },
    {
        "id": 98,
        "date": "2024-05-20",
        "category": "Miscellaneous",
        "description": "Expense 98",
        "amount": 34.0
    },
    {
        "id": 99,
        "date": "2024-03-15",
        "category": "Entertainment",
        "description": "Expense 99",
        "amount": 45.01
    },
    {
        "id": 100,
        "date": "2024-01-11",
        "category": "Housing",
        "description": "Expense 100",
        "amount": 9.69
    },
    {
        "id": 101,
        "date": "2024-08-03",
        "category": "Food",
        "description": "Expense 101",
        "amount": 258.96
    },
    {
        "id": 102,
        "date": "2024-12-30",
        "category": "Miscellaneous",
        "description": "Expense 102",
        "amount": 18.03
    },
    {
        "id": 103,
        "date": "2024-05-27",
        "category": "Healthcare",
        "description": "Expense 103",
        "amount": 17.75
    },
    {
        "id": 104,
        "date": "2024-12-25",
        "category": "Groceries",
        "description": "Expense 104",
        "amount": 7.98
    },
    {
        "id": 105,
        "date": "2024-07-20",
        "category": "Groceries",
        "description": "Expense 105",
        "amount": 46.33
    },
    {
        "id": 106,
        "date": "2024-02-16",
        "category": "Utilities",
        "description": "Expense 106",
        "amount": 26.53
    },
    {
        "id": 107,
        "date": "2024-03-23",
        "category": "Housing",
        "description": "Expense 107",
        "amount": 49.25
    },
    {
        "id": 108,
        "date": "2024-01-30",
        "category": "Housing",
        "description": "Expense 108",
        "amount": 13.66
    },
    {
        "id": 109,
        "date": "2024-08-02",
        "category": "Healthcare",
        "description": "Expense 109",
        "amount": 9.23
    },
    {
        "id": 110,
        "date": "2024-03-08",
        "category": "Healthcare",
        "description": "Expense 110",
        "amount": 24.64
    },
    {
        "id": 111,
        "date": "2024-01-14",
        "category": "Education",
        "description": "Expense 111",
        "amount": 30.33
    },
    {
        "id": 112,
        "date": "2024-10-30",
        "category": "Healthcare",
        "description": "Expense 112",
        "amount": 23.72
    },
    {
        "id": 113,
        "date": "2024-11-11",
        "category": "Groceries",
        "description": "Expense 113",
        "amount": 38.3
    },
    {
        "id": 114,
        "date": "2024-11-20",
        "category": "Housing",
        "description": "Expense 114",
        "amount": 39.84
    },
    {
        "id": 115,
        "date": "2024-07-26",
        "category": "Miscellaneous",
        "description": "Expense 115",
        "amount": 48.94
    },
    {
        "id": 116,
        "date": "2024-12-31",
        "category": "Education",
        "description": "Expense 116",
        "amount": 47.3
    },
    {
        "id": 117,
        "date": "2024-01-09",
        "category": "Healthcare",
        "description": "Expense 117",
        "amount": 30.63
    },
    {
        "id": 118,
        "date": "2024-10-15",
        "category": "Education",
        "description": "Expense 118",
        "amount": 24.3
    },
    {
        "id": 119,
        "date": "2024-02-11",
        "category": "Utilities",
        "description": "Expense 119",
        "amount": 45.05
    },
    {
        "id": 120,
        "date": "2024-01-08",
        "category": "Groceries",
        "description": "Expense 120",
        "amount": 20.21
    },
    {
        "id": 121,
        "date": "2024-10-24",
        "category": "Miscellaneous",
        "description": "Expense 121",
        "amount": 45.56
    },
    {
        "id": 122,
        "date": "2024-10-09",
        "category": "Utilities",
        "description": "Expense 122",
        "amount": 32.85
    },
    {
        "id": 123,
        "date": "2024-09-30",
        "category": "Utilities",
        "description": "Expense 123",
        "amount": 31.3
    },
    {
        "id": 124,
        "date": "2024-10-08",
        "category": "Utilities",
        "description": "Expense 124",
        "amount": 6.97
    },
    {
        "id": 125,
        "date": "2024-03-24",
        "category": "Entertainment",
        "description": "Expense 125",
        "amount": 8.71
    },
    {
        "id": 126,
        "date": "2024-03-29",
        "category": "Miscellaneous",
        "description": "Expense 126",
        "amount": 27.27
    },
    {
        "id": 127,
        "date": "2024-11-04",
        "category": "Transportation",
        "description": "Expense 127",
        "amount": 43.17
    },
    {
        "id": 128,
        "date": "2024-09-29",
        "category": "Utilities",
        "description": "Expense 128",
        "amount": 14.51
    },
    {
        "id": 129,
        "date": "2024-11-09",
        "category": "Transportation",
        "description": "Expense 129",
        "amount": 32.44
    },
    {
        "id": 130,
        "date": "2024-06-01",
        "category": "Groceries",
        "description": "Expense 130",
        "amount": 41.69
    },
    {
        "id": 131,
        "date": "2024-03-16",
        "category": "Transportation",
        "description": "Expense 131",
        "amount": 29.47
    },
    {
        "id": 132,
        "date": "2024-09-22",
        "category": "Housing",
        "description": "Expense 132",
        "amount": 27.51
    },
    {
        "id": 133,
        "date": "2024-03-30",
        "category": "Transportation",
        "description": "Expense 133",
        "amount": 11.41
    },
    {
        "id": 134,
        "date": "2024-05-27",
        "category": "Healthcare",
        "description": "Expense 134",
        "amount": 31.67
    },
    {
        "id": 135,
        "date": "2024-03-12",
        "category": "Food",
        "description": "Expense 135",
        "amount": 235.44
    },
    {
        "id": 136,
        "date": "2024-05-08",
        "category": "Food",
        "description": "Expense 136",
        "amount": 235.93
    },
    {
        "id": 137,
        "date": "2024-03-22",
        "category": "Entertainment",
        "description": "Expense 137",
        "amount": 40.55
    },
    {
        "id": 138,
        "date": "2024-11-16",
        "category": "Education",
        "description": "Expense 138",
        "amount": 14.6
    },
    {
        "id": 139,
        "date": "2024-10-10",
        "category": "Housing",
        "description": "Expense 139",
        "amount": 21.67
    },
    {
        "id": 140,
        "date": "2024-12-09",
        "category": "Groceries",
        "description": "Expense 140",
        "amount": 25.6
    },
    {
        "id": 141,
        "date": "2024-03-01",
        "category": "Food",
        "description": "Expense 141",
        "amount": 378.5
    },
    {
        "id": 142,
        "date": "2024-03-01",
        "category": "Miscellaneous",
        "description": "Expense 142",
        "amount": 48.63
    },
    {
        "id": 143,
        "date": "2024-04-22",
        "category": "Utilities",
        "description": "Expense 143",
        "amount": 7.1
    },
    {
        "id": 144,
        "date": "2024-04-23",
        "category": "Miscellaneous",
        "description": "Expense 144",
        "amount": 47.96
    },
    {
        "id": 145,
        "date": "2024-12-09",
        "category": "Utilities",
        "description": "Expense 145",
        "amount": 25.47
    },
    {
        "id": 146,
        "date": "2024-03-09",
        "category": "Food",
        "description": "Expense 146",
        "amount": 328.28
    },
    {
        "id": 147,
        "date": "2024-08-27",
        "category": "Education",
        "description": "Expense 147",
        "amount": 39.53
    },
    {
        "id": 148,
        "date": "2024-07-03",
        "category": "Utilities",
        "description": "Expense 148",
        "amount": 21.42
    },
    {
        "id": 149,
        "date": "2024-04-04",
        "category": "Groceries",
        "description": "Expense 149",
        "amount": 39.99
    },
    {
        "id": 150,
        "date": "2024-05-09",
        "category": "Miscellaneous",
        "description": "Expense 150",
        "amount": 7.0
    },
    {
        "id": 151,
        "date": "2024-07-19",
        "category": "Food",
        "description": "Expense 151",
        "amount": 337.94
    },
    {
        "id": 152,
        "date": "2024-11-29",
        "category": "Healthcare",
        "description": "Expense 152",
        "amount": 18.22
    },
    {
        "id": 153,
        "date": "2024-10-01",
        "category": "Education",
        "description": "Expense 153",
        "amount": 12.46
    },
    {
        "id": 154,
        "date": "2024-03-16",
        "category": "Entertainment",
        "description": "Expense 154",
        "amount": 43.28
    },
    {
        "id": 155,
        "date": "2024-12-12",
        "category": "Healthcare",
        "description": "Expense 155",
        "amount": 29.87
    },
    {
        "id": 156,
        "date": "2024-06-08",
        "category": "Education",
        "description": "Expense 156",
        "amount": 14.01
    },
    {
        "id": 157,
        "date": "2024-07-30",
        "category": "Entertainment",
        "description": "Expense 157",
        "amount": 30.12
    },
    {
        "id": 158,
        "date": "2024-05-30",
        "category": "Utilities",
        "description": "Expense 158",
        "amount": 15.99
    },
    {
        "id": 159,
        "date": "2024-08-06",
        "category": "Healthcare",
        "description": "Expense 159",
        "amount": 7.9
    },
    {
        "id": 160,
        "date": "2024-01-09",
        "category": "Housing",
        "description": "Expense 160",
        "amount": 49.44
    },
    {
        "id": 161,
        "date": "2024-10-04",
        "category": "Food",
        "description": "Expense 161",
        "amount": 336.77
    },
    {
        "id": 162,
        "date": "2024-06-04",
        "category": "Housing",
        "description": "Expense 162",
        "amount": 17.99
    },
    {
        "id": 163,
        "date": "2024-11-11",
        "category": "Miscellaneous",
        "description": "Expense 163",
        "amount": 7.31
    },
    {
        "id": 164,
        "date": "2024-08-09",
        "category": "Healthcare",
        "description": "Expense 164",
        "amount": 21.21
    },
    {
        "id": 165,
        "date": "2024-05-25",
        "category": "Housing",
        "description": "Expense 165",
        "amount": 10.32
    },
    {
        "id": 166,
        "date": "2024-01-04",
        "category": "Transportation",
        "description": "Expense 166",
        "amount": 19.6
    },
    {
        "id": 167,
        "date": "2024-01-03",
        "category": "Healthcare",
        "description": "Expense 167",
        "amount": 9.43
    },
    {
        "id": 168,
        "date": "2024-12-12",
        "category": "Education",
        "description": "Expense 168",
        "amount": 19.75
    },
    {
        "id": 169,
        "date": "2024-07-22",
        "category": "Healthcare",
        "description": "Expense 169",
        "amount": 11.11
    },
    {
        "id": 170,
        "date": "2024-03-23",
        "category": "Housing",
        "description": "Expense 170",
        "amount": 33.68
    },
    {
        "id": 171,
        "date": "2024-12-31",
        "category": "Housing",
        "description": "Expense 171",
        "amount": 28.05
    },
    {
        "id": 172,
        "date": "2024-01-12",
        "category": "Utilities",
        "description": "Expense 172",
        "amount": 26.36
    },
    {
        "id": 173,
        "date": "2024-05-15",
        "category": "Education",
        "description": "Expense 173",
        "amount": 26.98
    },
    {
        "id": 174,
        "date": "2024-02-24",
        "category": "Utilities",
        "description": "Expense 174",
        "amount": 24.86
    },
    {
        "id": 175,
        "date": "2024-10-31",
        "category": "Transportation",
        "description": "Expense 175",
        "amount": 17.95
    },
    {
        "id": 176,
        "date": "2024-08-17",
        "category": "Education",
        "description": "Expense 176",
        "amount": 23.69
    },
    {
        "id": 177,
        "date": "2024-02-02",
        "category": "Housing",
        "description": "Expense 177",
        "amount": 17.99
    },
    {
        "id": 178,
        "date": "2024-12-01",
        "category": "Housing",
        "description": "Expense 178",
        "amount": 46.21
    },
    {
        "id": 179,
        "date": "2024-08-22",
        "category": "Food",
        "description": "Expense 179",
        "amount": 236.9
    },
    {
        "id": 180,
        "date": "2024-10-25",
        "category": "Utilities",
        "description": "Expense 180",
        "amount": 12.89
    },
    {
        "id": 181,
        "date": "2024-08-25",
        "category": "Housing",
        "description": "Expense 181",
        "amount": 19.62
    },
    {
        "id": 182,
        "date": "2024-10-24",
        "category": "Food",
        "description": "Expense 182",
        "amount": 322.35
    },
    {
        "id": 183,
        "date": "2024-02-05",
        "category": "Housing",
        "description": "Expense 183",
        "amount": 29.78
    },
    {
        "id": 184,
        "date": "2024-01-12",
        "category": "Entertainment",
        "description": "Expense 184",
        "amount": 48.57
    },
    {
        "id": 185,
        "date": "2024-01-06",
        "category": "Food",
        "description": "Expense 185",
        "amount": 298.43
    },
    {
        "id": 186,
        "date": "2024-03-01",
        "category": "Transportation",
        "description": "Expense 186",
        "amount": 26.51
    },
    {
        "id": 187,
        "date": "2024-09-29",
        "category": "Miscellaneous",
        "description": "Expense 187",
        "amount": 23.03
    },
    {
        "id": 188,
        "date": "2024-03-26",
        "category": "Transportation",
        "description": "Expense 188",
        "amount": 5.34
    },
    {
        "id": 189,
        "date": "2024-11-29",
        "category": "Education",
        "description": "Expense 189",
        "amount": 16.06
    },
    {
        "id": 190,
        "date": "2024-11-18",
        "category": "Miscellaneous",
        "description": "Expense 190",
        "amount": 16.37
    },
    {
        "id": 191,
        "date": "2024-03-10",
        "category": "Miscellaneous",
        "description": "Expense 191",
        "amount": 45.02
    },
    {
        "id": 192,
        "date": "2024-05-04",
        "category": "Healthcare",
        "description": "Expense 192",
        "amount": 46.02
    },
    {
        "id": 193,
        "date": "2024-05-01",
        "category": "Groceries",
        "description": "Expense 193",
        "amount": 13.6
    },
    {
        "id": 194,
        "date": "2024-01-13",
        "category": "Education",
        "description": "Expense 194",
        "amount": 45.45
    },
    {
        "id": 195,
        "date": "2024-10-28",
        "category": "Transportation",
        "description": "Expense 195",
        "amount": 34.91
    },
    {
        "id": 196,
        "date": "2024-12-11",
        "category": "Food",
        "description": "Expense 196",
        "amount": 211.19
    },
    {
        "id": 197,
        "date": "2024-09-20",
        "category": "Transportation",
        "description": "Expense 197",
        "amount": 42.37
    },
    {
        "id": 198,
        "date": "2024-01-29",
        "category": "Miscellaneous",
        "description": "Expense 198",
        "amount": 7.36
    },
    {
        "id": 199,
        "date": "2024-05-15",
        "category": "Entertainment",
        "description": "Expense 199",
        "amount": 19.98
    },
    {
        "id": 200,
        "date": "2024-07-31",
        "category": "Miscellaneous",
        "description": "Expense 200",
        "amount": 42.46
    },
    {
        "id": 201,
        "date": "2024-03-03",
        "category": "Healthcare",
        "description": "Expense 201",
        "amount": 36.87
    },
    {
        "id": 202,
        "date": "2024-07-09",
        "category": "Entertainment",
        "description": "Expense 202",
        "amount": 37.89
    },
    {
        "id": 203,
        "date": "2024-02-20",
        "category": "Food",
        "description": "Expense 203",
        "amount": 358.13
    },
    {
        "id": 204,
        "date": "2024-02-13",
        "category": "Transportation",
        "description": "Expense 204",
        "amount": 19.99
    },
    {
        "id": 205,
        "date": "2024-09-06",
        "category": "Utilities",
        "description": "Expense 205",
        "amount": 36.15
    },
    {
        "id": 206,
        "date": "2024-02-12",
        "category": "Healthcare",
        "description": "Expense 206",
        "amount": 26.01
    },
    {
        "id": 207,
        "date": "2024-10-04",
        "category": "Housing",
        "description": "Expense 207",
        "amount": 48.68
    },
    {
        "id": 208,
        "date": "2024-10-12",
        "category": "Utilities",
        "description": "Expense 208",
        "amount": 14.52
    },
    {
        "id": 209,
        "date": "2024-08-16",
        "category": "Healthcare",
        "description": "Expense 209",
        "amount": 8.24
    },
    {
        "id": 210,
        "date": "2024-12-28",
        "category": "Housing",
        "description": "Expense 210",
        "amount": 39.96
    },
    {
        "id": 211,
        "date": "2024-10-15",
        "category": "Entertainment",
        "description": "Expense 211",
        "amount": 38.66
    },
    {
        "id": 212,
        "date": "2024-03-16",
        "category": "Food",
        "description": "Expense 212",
        "amount": 247.0
    },
    {
        "id": 213,
        "date": "2024-12-24",
        "category": "Housing",
        "description": "Expense 213",
        "amount": 24.9
    },
    {
        "id": 214,
        "date": "2024-10-01",
        "category": "Groceries",
        "description": "Expense 214",
        "amount": 37.19
    },
    {
        "id": 215,
        "date": "2024-02-27",
        "category": "Healthcare",
        "description": "Expense 215",
        "amount": 30.48
    },
    {
        "id": 216,
        "date": "2024-04-04",
        "category": "Groceries",
        "description": "Expense 216",
        "amount": 22.7
    },
    {
        "id": 217,
        "date": "2024-04-26",
        "category": "Utilities",
        "description": "Expense 217",
        "amount": 20.79
    },
    {
        "id": 218,
        "date": "2024-06-10",
        "category": "Utilities",
        "description": "Expense 218",
        "amount": 25.56
    },
    {
        "id": 219,
        "date": "2024-07-23",
        "category": "Education",
        "description": "Expense 219",
        "amount": 9.9
    },
    {
        "id": 220,
        "date": "2024-03-29",
        "category": "Food",
        "description": "Expense 220",
        "amount": 375.84
    },
    {
        "id": 221,
        "date": "2024-02-29",
        "category": "Groceries",
        "description": "Expense 221",
        "amount": 32.15
    },
    {
        "id": 222,
        "date": "2024-05-19",
        "category": "Transportation",
        "description": "Expense 222",
        "amount": 7.74
    },
    {
        "id": 223,
        "date": "2024-04-15",
        "category": "Food",
        "description": "Expense 223",
        "amount": 391.57
    },
    {
        "id": 224,
        "date": "2024-10-23",
        "category": "Entertainment",
        "description": "Expense 224",
        "amount": 31.77
    },
    {
        "id": 225,
        "date": "2024-04-01",
        "category": "Miscellaneous",
        "description": "Expense 225",
        "amount": 32.83
    },
    {
        "id": 226,
        "date": "2024-08-28",
        "category": "Entertainment",
        "description": "Expense 226",
        "amount": 11.71
    },
    {
        "id": 227,
        "date": "2024-09-20",
        "category": "Miscellaneous",
        "description": "Expense 227",
        "amount": 26.26
    },
    {
        "id": 228,
        "date": "2024-04-01",
        "category": "Education",
        "description": "Expense 228",
        "amount": 33.36
    },
    {
        "id": 229,
        "date": "2024-12-11",
        "category": "Food",
        "description": "Expense 229",
        "amount": 237.85
    },
    {
        "id": 230,
        "date": "2024-02-26",
        "category": "Groceries",
        "description": "Expense 230",
        "amount": 25.01
    },
    {
        "id": 231,
        "date": "2024-03-19",
        "category": "Food",
        "description": "Expense 231",
        "amount": 255.31
    },
    {
        "id": 232,
        "date": "2024-02-25",
        "category": "Education",
        "description": "Expense 232",
        "amount": 40.51
    },
    {
        "id": 233,
        "date": "2024-09-29",
        "category": "Miscellaneous",
        "description": "Expense 233",
        "amount": 26.45
    },
    {
        "id": 234,
        "date": "2024-07-28",
        "category": "Utilities",
        "description": "Expense 234",
        "amount": 21.86
    },
    {
        "id": 235,
        "date": "2024-08-26",
        "category": "Groceries",
        "description": "Expense 235",
        "amount": 20.24
    },
    {
        "id": 236,
        "date": "2024-10-04",
        "category": "Utilities",
        "description": "Expense 236",
        "amount": 7.64
    },
    {
        "id": 237,
        "date": "2024-06-26",
        "category": "Miscellaneous",
        "description": "Expense 237",
        "amount": 36.58
    },
    {
        "id": 238,
        "date": "2024-07-21",
        "category": "Healthcare",
        "description": "Expense 238",
        "amount": 22.22
    },
    {
        "id": 239,
        "date": "2024-12-13",
        "category": "Education",
        "description": "Expense 239",
        "amount": 43.7
    },
    {
        "id": 240,
        "date": "2024-03-22",
        "category": "Miscellaneous",
        "description": "Expense 240",
        "amount": 20.21
    },
    {
        "id": 241,
        "date": "2024-10-07",
        "category": "Education",
        "description": "Expense 241",
        "amount": 38.94
    },
    {
        "id": 242,
        "date": "2024-11-13",
        "category": "Food",
        "description": "Expense 242",
        "amount": 291.94
    },
    {
        "id": 243,
        "date": "2024-04-12",
        "category": "Groceries",
        "description": "Expense 243",
        "amount": 6.67
    },
    {
        "id": 244,
        "date": "2024-08-15",
        "category": "Education",
        "description": "Expense 244",
        "amount": 34.39
    },
    {
        "id": 245,
        "date": "2024-01-05",
        "category": "Miscellaneous",
        "description": "Expense 245",
        "amount": 35.69
    },
    {
        "id": 246,
        "date": "2024-12-29",
        "category": "Healthcare",
        "description": "Expense 246",
        "amount": 22.23
    },
    {
        "id": 247,
        "date": "2024-06-21",
        "category": "Transportation",
        "description": "Expense 247",
        "amount": 49.87
    },
    {
        "id": 248,
        "date": "2024-01-23",
        "category": "Education",
        "description": "Expense 248",
        "amount": 33.36
    },
    {
        "id": 249,
        "date": "2024-11-12",
        "category": "Utilities",
        "description": "Expense 249",
        "amount": 42.37
    },
    {
        "id": 250,
        "date": "2024-11-20",
        "category": "Transportation",
        "description": "Expense 250",
        "amount": 49.68
    },
    {
        "id": 251,
        "date": "2024-07-06",
        "category": "Entertainment",
        "description": "Expense 251",
        "amount": 31.32
    },
    {
        "id": 252,
        "date": "2024-06-15",
        "category": "Food",
        "description": "Expense 252",
        "amount": 396.43
    },
    {
        "id": 253,
        "date": "2024-03-28",
        "category": "Transportation",
        "description": "Expense 253",
        "amount": 31.72
    },
    {
        "id": 254,
        "date": "2024-07-03",
        "category": "Transportation",
        "description": "Expense 254",
        "amount": 31.57
    },
    {
        "id": 255,
        "date": "2024-04-17",
        "category": "Food",
        "description": "Expense 255",
        "amount": 295.58
    },
    {
        "id": 256,
        "date": "2024-03-24",
        "category": "Entertainment",
        "description": "Expense 256",
        "amount": 37.48
    },
    {
        "id": 257,
        "date": "2024-02-08",
        "category": "Utilities",
        "description": "Expense 257",
        "amount": 48.62
    },
    {
        "id": 258,
        "date": "2024-10-03",
        "category": "Utilities",
        "description": "Expense 258",
        "amount": 20.51
    },
    {
        "id": 259,
        "date": "2024-07-20",
        "category": "Housing",
        "description": "Expense 259",
        "amount": 47.88
    },
    {
        "id": 260,
        "date": "2024-04-02",
        "category": "Food",
        "description": "Expense 260",
        "amount": 345.32
    },
    {
        "id": 261,
        "date": "2024-03-01",
        "category": "Utilities",
        "description": "Expense 261",
        "amount": 18.38
    },
    {
        "id": 262,
        "date": "2024-05-25",
        "category": "Miscellaneous",
        "description": "Expense 262",
        "amount": 46.97
    },
    {
        "id": 263,
        "date": "2024-02-09",
        "category": "Utilities",
        "description": "Expense 263",
        "amount": 11.88
    },
    {
        "id": 264,
        "date": "2024-04-07",
        "category": "Transportation",
        "description": "Expense 264",
        "amount": 18.66
    },
    {
        "id": 265,
        "date": "2024-02-24",
        "category": "Utilities",
        "description": "Expense 265",
        "amount": 15.68
    },
    {
        "id": 266,
        "date": "2024-03-04",
        "category": "Transportation",
        "description": "Expense 266",
        "amount": 6.25
    },
    {
        "id": 267,
        "date": "2024-12-03",
        "category": "Transportation",
        "description": "Expense 267",
        "amount": 27.55
    },
    {
        "id": 268,
        "date": "2024-04-01",
        "category": "Groceries",
        "description": "Expense 268",
        "amount": 30.41
    },
    {
        "id": 269,
        "date": "2024-12-23",
        "category": "Healthcare",
        "description": "Expense 269",
        "amount": 23.6
    },
    {
        "id": 270,
        "date": "2024-11-20",
        "category": "Miscellaneous",
        "description": "Expense 270",
        "amount": 33.33
    },
    {
        "id": 271,
        "date": "2024-12-16",
        "category": "Healthcare",
        "description": "Expense 271",
        "amount": 26.07
    },
    {
        "id": 272,
        "date": "2024-06-07",
        "category": "Transportation",
        "description": "Expense 272",
        "amount": 33.52
    },
    {
        "id": 273,
        "date": "2024-05-20",
        "category": "Miscellaneous",
        "description": "Expense 273",
        "amount": 47.67
    },
    {
        "id": 274,
        "date": "2024-03-05",
        "category": "Groceries",
        "description": "Expense 274",
        "amount": 43.02
    },
    {
        "id": 275,
        "date": "2024-05-17",
        "category": "Healthcare",
        "description": "Expense 275",
        "amount": 7.69
    },
    {
        "id": 276,
        "date": "2024-02-07",
        "category": "Utilities",
        "description": "Expense 276",
        "amount": 32.18
    },
    {
        "id": 277,
        "date": "2024-12-17",
        "category": "Groceries",
        "description": "Expense 277",
        "amount": 15.19
    },
    {
        "id": 278,
        "date": "2024-05-18",
        "category": "Healthcare",
        "description": "Expense 278",
        "amount": 17.95
    },
    {
        "id": 279,
        "date": "2024-04-16",
        "category": "Entertainment",
        "description": "Expense 279",
        "amount": 11.09
    },
    {
        "id": 280,
        "date": "2024-08-01",
        "category": "Housing",
        "description": "Expense 280",
        "amount": 44.67
    },
    {
        "id": 281,
        "date": "2024-11-30",
        "category": "Healthcare",
        "description": "Expense 281",
        "amount": 27.01
    },
    {
        "id": 282,
        "date": "2024-07-10",
        "category": "Transportation",
        "description": "Expense 282",
        "amount": 39.78
    },
    {
        "id": 283,
        "date": "2024-08-12",
        "category": "Utilities",
        "description": "Expense 283",
        "amount": 7.95
    },
    {
        "id": 284,
        "date": "2024-03-04",
        "category": "Transportation",
        "description": "Expense 284",
        "amount": 37.19
    },
    {
        "id": 285,
        "date": "2024-08-24",
        "category": "Food",
        "description": "Expense 285",
        "amount": 327.93
    },
    {
        "id": 286,
        "date": "2024-09-03",
        "category": "Education",
        "description": "Expense 286",
        "amount": 41.26
    },
    {
        "id": 287,
        "date": "2024-02-03",
        "category": "Food",
        "description": "Expense 287",
        "amount": 341.48
    },
    {
        "id": 288,
        "date": "2024-09-27",
        "category": "Transportation",
        "description": "Expense 288",
        "amount": 33.19
    },
    {
        "id": 289,
        "date": "2024-11-06",
        "category": "Food",
        "description": "Expense 289",
        "amount": 333.79
    },
    {
        "id": 290,
        "date": "2024-05-15",
        "category": "Groceries",
        "description": "Expense 290",
        "amount": 49.39
    },
    {
        "id": 291,
        "date": "2024-04-16",
        "category": "Housing",
        "description": "Expense 291",
        "amount": 22.3
    },
    {
        "id": 292,
        "date": "2024-01-24",
        "category": "Entertainment",
        "description": "Expense 292",
        "amount": 12.37
    },
    {
        "id": 293,
        "date": "2024-01-22",
        "category": "Housing",
        "description": "Expense 293",
        "amount": 28.46
    },
    {
        "id": 294,
        "date": "2024-01-29",
        "category": "Healthcare",
        "description": "Expense 294",
        "amount": 18.05
    },
    {
        "id": 295,
        "date": "2024-04-17",
        "category": "Housing",
        "description": "Expense 295",
        "amount": 9.93
    },
    {
        "id": 296,
        "date": "2024-02-11",
        "category": "Transportation",
        "description": "Expense 296",
        "amount": 44.09
    },
    {
        "id": 297,
        "date": "2024-06-01",
        "category": "Utilities",
        "description": "Expense 297",
        "amount": 31.8
    },
    {
        "id": 298,
        "date": "2024-12-29",
        "category": "Food",
        "description": "Expense 298",
        "amount": 259.23
    },
    {
        "id": 299,
        "date": "2024-12-09",
        "category": "Food",
        "description": "Expense 299",
        "amount": 210.77
    },
    {
        "id": 300,
        "date": "2024-11-21",
        "category": "Healthcare",
        "description": "Expense 300",
        "amount": 22.9
    },
    {
        "id": 301,
        "date": "2024-02-20",
        "category": "Transportation",
        "description": "Expense 301",
        "amount": 15.21
    },
    {
        "id": 302,
        "date": "2024-09-30",
        "category": "Housing",
        "description": "Expense 302",
        "amount": 45.98
    },
    {
        "id": 303,
        "date": "2024-02-24",
        "category": "Education",
        "description": "Expense 303",
        "amount": 9.77
    },
    {
        "id": 304,
        "date": "2024-11-14",
        "category": "Utilities",
        "description": "Expense 304",
        "amount": 17.67
    },
    {
        "id": 305,
        "date": "2024-05-31",
        "category": "Healthcare",
        "description": "Expense 305",
        "amount": 28.87
    },
    {
        "id": 306,
        "date": "2024-01-03",
        "category": "Food",
        "description": "Expense 306",
        "amount": 357.79
    },
    {
        "id": 307,
        "date": "2024-04-02",
        "category": "Housing",
        "description": "Expense 307",
        "amount": 10.36
    },
    {
        "id": 308,
        "date": "2024-01-21",
        "category": "Housing",
        "description": "Expense 308",
        "amount": 45.75
    },
    {
        "id": 309,
        "date": "2024-03-02",
        "category": "Groceries",
        "description": "Expense 309",
        "amount": 18.59
    },
    {
        "id": 310,
        "date": "2024-04-26",
        "category": "Housing",
        "description": "Expense 310",
        "amount": 11.03
    },
    {
        "id": 311,
        "date": "2024-03-04",
        "category": "Healthcare",
        "description": "Expense 311",
        "amount": 36.76
    },
    {
        "id": 312,
        "date": "2024-02-12",
        "category": "Entertainment",
        "description": "Expense 312",
        "amount": 16.38
    },
    {
        "id": 313,
        "date": "2024-01-09",
        "category": "Housing",
        "description": "Expense 313",
        "amount": 36.77
    },
    {
        "id": 314,
        "date": "2024-03-28",
        "category": "Transportation",
        "description": "Expense 314",
        "amount": 42.1
    },
    {
        "id": 315,
        "date": "2024-06-17",
        "category": "Food",
        "description": "Expense 315",
        "amount": 266.8
    },
    {
        "id": 316,
        "date": "2024-10-09",
        "category": "Education",
        "description": "Expense 316",
        "amount": 34.07
    },
    {
        "id": 317,
        "date": "2024-05-14",
        "category": "Miscellaneous",
        "description": "Expense 317",
        "amount": 20.77
    },
    {
        "id": 318,
        "date": "2024-08-06",
        "category": "Housing",
        "description": "Expense 318",
        "amount": 30.69
    },
    {
        "id": 319,
        "date": "2024-03-01",
        "category": "Entertainment",
        "description": "Expense 319",
        "amount": 39.82
    },
    {
        "id": 320,
        "date": "2024-02-15",
        "category": "Transportation",
        "description": "Expense 320",
        "amount": 45.99
    },
    {
        "id": 321,
        "date": "2024-11-24",
        "category": "Groceries",
        "description": "Expense 321",
        "amount": 8.34
    },
    {
        "id": 322,
        "date": "2024-02-13",
        "category": "Education",
        "description": "Expense 322",
        "amount": 36.81
    },
    {
        "id": 323,
        "date": "2024-08-11",
        "category": "Miscellaneous",
        "description": "Expense 323",
        "amount": 22.12
    },
    {
        "id": 324,
        "date": "2024-06-23",
        "category": "Education",
        "description": "Expense 324",
        "amount": 41.09
    },
    {
        "id": 325,
        "date": "2024-11-15",
        "category": "Entertainment",
        "description": "Expense 325",
        "amount": 23.22
    },
    {
        "id": 326,
        "date": "2024-02-05",
        "category": "Groceries",
        "description": "Expense 326",
        "amount": 35.45
    },
    {
        "id": 327,
        "date": "2024-05-16",
        "category": "Utilities",
        "description": "Expense 327",
        "amount": 12.98
    },
    {
        "id": 328,
        "date": "2024-03-26",
        "category": "Transportation",
        "description": "Expense 328",
        "amount": 42.86
    },
    {
        "id": 329,
        "date": "2024-06-14",
        "category": "Entertainment",
        "description": "Expense 329",
        "amount": 16.01
    },
    {
        "id": 330,
        "date": "2024-01-12",
        "category": "Utilities",
        "description": "Expense 330",
        "amount": 7.66
    },
    {
        "id": 331,
        "date": "2024-03-22",
        "category": "Housing",
        "description": "Expense 331",
        "amount": 44.37
    },
    {
        "id": 332,
        "date": "2024-04-25",
        "category": "Utilities",
        "description": "Expense 332",
        "amount": 18.9
    },
    {
        "id": 333,
        "date": "2024-05-27",
        "category": "Transportation",
        "description": "Expense 333",
        "amount": 35.18
    },
    {
        "id": 334,
        "date": "2024-04-23",
        "category": "Housing",
        "description": "Expense 334",
        "amount": 22.02
    },
    {
        "id": 335,
        "date": "2024-08-04",
        "category": "Groceries",
        "description": "Expense 335",
        "amount": 15.81
    },
    {
        "id": 336,
        "date": "2024-05-28",
        "category": "Utilities",
        "description": "Expense 336",
        "amount": 46.18
    },
    {
        "id": 337,
        "date": "2024-06-24",
        "category": "Miscellaneous",
        "description": "Expense 337",
        "amount": 43.87
    },
    {
        "id": 338,
        "date": "2024-04-02",
        "category": "Education",
        "description": "Expense 338",
        "amount": 11.3
    },
    {
        "id": 339,
        "date": "2024-08-19",
        "category": "Entertainment",
        "description": "Expense 339",
        "amount": 9.36
    },
    {
        "id": 340,
        "date": "2024-12-27",
        "category": "Utilities",
        "description": "Expense 340",
        "amount": 49.99
    },
    {
        "id": 341,
        "date": "2024-12-24",
        "category": "Miscellaneous",
        "description": "Expense 341",
        "amount": 45.41
    },
    {
        "id": 342,
        "date": "2024-07-01",
        "category": "Housing",
        "description": "Expense 342",
        "amount": 19.68
    },
    {
        "id": 343,
        "date": "2024-05-23",
        "category": "Utilities",
        "description": "Expense 343",
        "amount": 39.86
    },
    {
        "id": 344,
        "date": "2024-06-03",
        "category": "Food",
        "description": "Expense 344",
        "amount": 268.89
    },
    {
        "id": 345,
        "date": "2024-05-25",
        "category": "Housing",
        "description": "Expense 345",
        "amount": 28.43
    },
    {
        "id": 346,
        "date": "2024-03-21",
        "category": "Housing",
        "description": "Expense 346",
        "amount": 14.74
    },
    {
        "id": 347,
        "date": "2024-05-26",
        "category": "Food",
        "description": "Expense 347",
        "amount": 255.81
    },
    {
        "id": 348,
        "date": "2024-10-17",
        "category": "Utilities",
        "description": "Expense 348",
        "amount": 5.22
    },
    {
        "id": 349,
        "date": "2024-10-23",
        "category": "Groceries",
        "description": "Expense 349",
        "amount": 36.04
    },
    {
        "id": 350,
        "date": "2024-07-08",
        "category": "Transportation",
        "description": "Expense 350",
        "amount": 26.46
    },
    {
        "id": 351,
        "date": "2024-07-22",
        "category": "Entertainment",
        "description": "Expense 351",
        "amount": 15.74
    },
    {
        "id": 352,
        "date": "2024-01-27",
        "category": "Healthcare",
        "description": "Expense 352",
        "amount": 18.21
    },
    {
        "id": 353,
        "date": "2024-06-22",
        "category": "Groceries",
        "description": "Expense 353",
        "amount": 19.01
    },
    {
        "id": 354,
        "date": "2024-01-04",
        "category": "Education",
        "description": "Expense 354",
        "amount": 31.25
    },
    {
        "id": 355,
        "date": "2024-10-29",
        "category": "Transportation",
        "description": "Expense 355",
        "amount": 45.9
    },
    {
        "id": 356,
        "date": "2024-03-18",
        "category": "Housing",
        "description": "Expense 356",
        "amount": 44.17
    },
    {
        "id": 357,
        "date": "2024-08-26",
        "category": "Healthcare",
        "description": "Expense 357",
        "amount": 37.84
    },
    {
        "id": 358,
        "date": "2024-11-07",
        "category": "Utilities",
        "description": "Expense 358",
        "amount": 19.6
    },
    {
        "id": 359,
        "date": "2024-11-14",
        "category": "Food",
        "description": "Expense 359",
        "amount": 397.61
    },
    {
        "id": 360,
        "date": "2024-02-23",
        "category": "Entertainment",
        "description": "Expense 360",
        "amount": 22.56
    },
    {
        "id": 361,
        "date": "2024-03-24",
        "category": "Education",
        "description": "Expense 361",
        "amount": 6.32
    },
    {
        "id": 362,
        "date": "2024-09-04",
        "category": "Utilities",
        "description": "Expense 362",
        "amount": 10.3
    },
    {
        "id": 363,
        "date": "2024-05-24",
        "category": "Groceries",
        "description": "Expense 363",
        "amount": 23.33
    },
    {
        "id": 364,
        "date": "2024-01-29",
        "category": "Transportation",
        "description": "Expense 364",
        "amount": 31.66
    },
    {
        "id": 365,
        "date": "2024-06-29",
        "category": "Healthcare",
        "description": "Expense 365",
        "amount": 21.07
    },
    {
        "id": 366,
        "date": "2024-12-08",
        "category": "Groceries",
        "description": "Expense 366",
        "amount": 36.55
    },
    {
        "id": 367,
        "date": "2024-09-29",
        "category": "Housing",
        "description": "Expense 367",
        "amount": 24.89
    },
    {
        "id": 368,
        "date": "2024-03-10",
        "category": "Groceries",
        "description": "Expense 368",
        "amount": 24.6
    },
    {
        "id": 369,
        "date": "2024-12-16",
        "category": "Food",
        "description": "Expense 369",
        "amount": 301.32
    },
    {
        "id": 370,
        "date": "2024-03-24",
        "category": "Utilities",
        "description": "Expense 370",
        "amount": 22.92
    },
    {
        "id": 371,
        "date": "2024-05-18",
        "category": "Education",
        "description": "Expense 371",
        "amount": 40.81
    },
    {
        "id": 372,
        "date": "2024-10-25",
        "category": "Miscellaneous",
        "description": "Expense 372",
        "amount": 12.42
    },
    {
        "id": 373,
        "date": "2024-04-24",
        "category": "Transportation",
        "description": "Expense 373",
        "amount": 41.88
    },
    {
        "id": 374,
        "date": "2024-05-12",
        "category": "Housing",
        "description": "Expense 374",
        "amount": 13.73
    },
    {
        "id": 375,
        "date": "2024-04-13",
        "category": "Utilities",
        "description": "Expense 375",
        "amount": 48.57
    },
    {
        "id": 376,
        "date": "2024-05-24",
        "category": "Transportation",
        "description": "Expense 376",
        "amount": 39.13
    },
    {
        "id": 377,
        "date": "2024-12-21",
        "category": "Groceries",
        "description": "Expense 377",
        "amount": 39.45
    },
    {
        "id": 378,
        "date": "2024-06-30",
        "category": "Food",
        "description": "Expense 378",
        "amount": 356.51
    },
    {
        "id": 379,
        "date": "2024-03-28",
        "category": "Healthcare",
        "description": "Expense 379",
        "amount": 9.26
    },
    {
        "id": 380,
        "date": "2024-08-30",
        "category": "Healthcare",
        "description": "Expense 380",
        "amount": 31.99
    },
    {
        "id": 381,
        "date": "2024-02-20",
        "category": "Education",
        "description": "Expense 381",
        "amount": 19.46
    },
    {
        "id": 382,
        "date": "2024-01-02",
        "category": "Utilities",
        "description": "Expense 382",
        "amount": 19.74
    },
    {
        "id": 383,
        "date": "2024-09-18",
        "category": "Utilities",
        "description": "Expense 383",
        "amount": 39.89
    },
    {
        "id": 384,
        "date": "2024-06-15",
        "category": "Groceries",
        "description": "Expense 384",
        "amount": 49.04
    },
    {
        "id": 385,
        "date": "2024-02-19",
        "category": "Utilities",
        "description": "Expense 385",
        "amount": 40.69
    },
    {
        "id": 386,
        "date": "2024-05-16",
        "category": "Healthcare",
        "description": "Expense 386",
        "amount": 20.89
    },
    {
        "id": 387,
        "date": "2024-06-04",
        "category": "Entertainment",
        "description": "Expense 387",
        "amount": 46.42
    },
    {
        "id": 388,
        "date": "2024-07-26",
        "category": "Healthcare",
        "description": "Expense 388",
        "amount": 33.62
    },
    {
        "id": 389,
        "date": "2024-05-06",
        "category": "Utilities",
        "description": "Expense 389",
        "amount": 41.03
    },
    {
        "id": 390,
        "date": "2024-09-12",
        "category": "Entertainment",
        "description": "Expense 390",
        "amount": 19.33
    },
    {
        "id": 391,
        "date": "2024-06-30",
        "category": "Healthcare",
        "description": "Expense 391",
        "amount": 15.66
    },
    {
        "id": 392,
        "date": "2024-04-23",
        "category": "Food",
        "description": "Expense 392",
        "amount": 354.65
    },
    {
        "id": 393,
        "date": "2024-03-20",
        "category": "Utilities",
        "description": "Expense 393",
        "amount": 17.76
    },
    {
        "id": 394,
        "date": "2024-09-11",
        "category": "Healthcare",
        "description": "Expense 394",
        "amount": 30.2
    },
    {
        "id": 395,
        "date": "2024-08-30",
        "category": "Healthcare",
        "description": "Expense 395",
        "amount": 42.42
    },
    {
        "id": 396,
        "date": "2024-07-12",
        "category": "Housing",
        "description": "Expense 396",
        "amount": 42.81
    },
    {
        "id": 397,
        "date": "2024-10-15",
        "category": "Healthcare",
        "description": "Expense 397",
        "amount": 31.2
    },
    {
        "id": 398,
        "date": "2024-09-10",
        "category": "Education",
        "description": "Expense 398",
        "amount": 28.99
    },
    {
        "id": 399,
        "date": "2024-06-21",
        "category": "Housing",
        "description": "Expense 399",
        "amount": 48.6
    },
    {
        "id": 400,
        "date": "2024-01-18",
        "category": "Utilities",
        "description": "Expense 400",
        "amount": 16.31
    },
    {
        "id": 401,
        "date": "2024-07-11",
        "category": "Miscellaneous",
        "description": "Expense 401",
        "amount": 43.2
    },
    {
        "id": 402,
        "date": "2024-12-14",
        "category": "Housing",
        "description": "Expense 402",
        "amount": 24.61
    },
    {
        "id": 403,
        "date": "2024-01-13",
        "category": "Groceries",
        "description": "Expense 403",
        "amount": 8.11
    },
    {
        "id": 404,
        "date": "2024-02-25",
        "category": "Utilities",
        "description": "Expense 404",
        "amount": 42.92
    },
    {
        "id": 405,
        "date": "2024-04-12",
        "category": "Utilities",
        "description": "Expense 405",
        "amount": 19.54
    },
    {
        "id": 406,
        "date": "2024-10-23",
        "category": "Food",
        "description": "Expense 406",
        "amount": 332.64
    },
    {
        "id": 407,
        "date": "2024-03-31",
        "category": "Food",
        "description": "Expense 407",
        "amount": 270.57
    },
    {
        "id": 408,
        "date": "2024-12-15",
        "category": "Miscellaneous",
        "description": "Expense 408",
        "amount": 49.37
    },
    {
        "id": 409,
        "date": "2024-06-05",
        "category": "Transportation",
        "description": "Expense 409",
        "amount": 24.75
    },
    {
        "id": 410,
        "date": "2024-10-07",
        "category": "Entertainment",
        "description": "Expense 410",
        "amount": 9.76
    },
    {
        "id": 411,
        "date": "2024-07-13",
        "category": "Utilities",
        "description": "Expense 411",
        "amount": 42.73
    },
    {
        "id": 412,
        "date": "2024-12-24",
        "category": "Utilities",
        "description": "Expense 412",
        "amount": 41.29
    },
    {
        "id": 413,
        "date": "2024-07-19",
        "category": "Utilities",
        "description": "Expense 413",
        "amount": 19.15
    },
    {
        "id": 414,
        "date": "2024-10-15",
        "category": "Food",
        "description": "Expense 414",
        "amount": 295.82
    },
    {
        "id": 415,
        "date": "2024-02-19",
        "category": "Entertainment",
        "description": "Expense 415",
        "amount": 23.53
    },
    {
        "id": 416,
        "date": "2024-10-18",
        "category": "Food",
        "description": "Expense 416",
        "amount": 276.45
    },
    {
        "id": 417,
        "date": "2024-12-11",
        "category": "Education",
        "description": "Expense 417",
        "amount": 19.27
    },
    {
        "id": 418,
        "date": "2024-08-08",
        "category": "Miscellaneous",
        "description": "Expense 418",
        "amount": 11.24
    },
    {
        "id": 419,
        "date": "2024-02-16",
        "category": "Transportation",
        "description": "Expense 419",
        "amount": 22.64
    },
    {
        "id": 420,
        "date": "2024-05-20",
        "category": "Housing",
        "description": "Expense 420",
        "amount": 29.91
    },
    {
        "id": 421,
        "date": "2024-09-09",
        "category": "Entertainment",
        "description": "Expense 421",
        "amount": 48.44
    },
    {
        "id": 422,
        "date": "2024-09-20",
        "category": "Food",
        "description": "Expense 422",
        "amount": 251.05
    },
    {
        "id": 423,
        "date": "2024-06-18",
        "category": "Utilities",
        "description": "Expense 423",
        "amount": 46.21
    },
    {
        "id": 424,
        "date": "2024-06-06",
        "category": "Food",
        "description": "Expense 424",
        "amount": 388.48
    },
    {
        "id": 425,
        "date": "2024-11-22",
        "category": "Transportation",
        "description": "Expense 425",
        "amount": 7.13
    },
    {
        "id": 426,
        "date": "2024-11-22",
        "category": "Food",
        "description": "Expense 426",
        "amount": 313.84
    },
    {
        "id": 427,
        "date": "2024-12-15",
        "category": "Miscellaneous",
        "description": "Expense 427",
        "amount": 8.97
    },
    {
        "id": 428,
        "date": "2024-12-09",
        "category": "Housing",
        "description": "Expense 428",
        "amount": 30.38
    },
    {
        "id": 429,
        "date": "2024-02-05",
        "category": "Utilities",
        "description": "Expense 429",
        "amount": 24.65
    },
    {
        "id": 430,
        "date": "2024-12-17",
        "category": "Transportation",
        "description": "Expense 430",
        "amount": 26.36
    },
    {
        "id": 431,
        "date": "2024-09-30",
        "category": "Education",
        "description": "Expense 431",
        "amount": 42.74
    },
    {
        "id": 432,
        "date": "2024-11-27",
        "category": "Education",
        "description": "Expense 432",
        "amount": 41.26
    },
    {
        "id": 433,
        "date": "2024-10-05",
        "category": "Utilities",
        "description": "Expense 433",
        "amount": 24.63
    },
    {
        "id": 434,
        "date": "2024-06-16",
        "category": "Utilities",
        "description": "Expense 434",
        "amount": 26.21
    },
    {
        "id": 435,
        "date": "2024-05-30",
        "category": "Education",
        "description": "Expense 435",
        "amount": 47.81
    },
    {
        "id": 436,
        "date": "2024-07-19",
        "category": "Food",
        "description": "Expense 436",
        "amount": 271.07
    },
    {
        "id": 437,
        "date": "2024-11-01",
        "category": "Housing",
        "description": "Expense 437",
        "amount": 6.13
    },
    {
        "id": 438,
        "date": "2024-08-08",
        "category": "Entertainment",
        "description": "Expense 438",
        "amount": 8.53
    },
    {
        "id": 439,
        "date": "2024-04-19",
        "category": "Education",
        "description": "Expense 439",
        "amount": 47.02
    },
    {
        "id": 440,
        "date": "2024-04-24",
        "category": "Food",
        "description": "Expense 440",
        "amount": 309.93
    },
    {
        "id": 441,
        "date": "2024-10-18",
        "category": "Education",
        "description": "Expense 441",
        "amount": 30.56
    },
    {
        "id": 442,
        "date": "2024-05-06",
        "category": "Food",
        "description": "Expense 442",
        "amount": 354.81
    },
    {
        "id": 443,
        "date": "2024-05-29",
        "category": "Food",
        "description": "Expense 443",
        "amount": 258.02
    },
    {
        "id": 444,
        "date": "2024-09-16",
        "category": "Food",
        "description": "Expense 444",
        "amount": 283.76
    },
    {
        "id": 445,
        "date": "2024-07-09",
        "category": "Education",
        "description": "Expense 445",
        "amount": 48.51
    },
    {
        "id": 446,
        "date": "2024-01-03",
        "category": "Food",
        "description": "Expense 446",
        "amount": 265.42
    },
    {
        "id": 447,
        "date": "2024-10-10",
        "category": "Entertainment",
        "description": "Expense 447",
        "amount": 24.71
    },
    {
        "id": 448,
        "date": "2024-06-16",
        "category": "Entertainment",
        "description": "Expense 448",
        "amount": 46.36
    },
    {
        "id": 449,
        "date": "2024-01-26",
        "category": "Groceries",
        "description": "Expense 449",
        "amount": 23.08
    },
    {
        "id": 450,
        "date": "2024-11-06",
        "category": "Housing",
        "description": "Expense 450",
        "amount": 39.72
    },
    {
        "id": 451,
        "date": "2024-07-13",
        "category": "Education",
        "description": "Expense 451",
        "amount": 38.51
    },
    {
        "id": 452,
        "date": "2024-04-02",
        "category": "Entertainment",
        "description": "Expense 452",
        "amount": 19.22
    },
    {
        "id": 453,
        "date": "2024-06-02",
        "category": "Groceries",
        "description": "Expense 453",
        "amount": 20.01
    },
    {
        "id": 454,
        "date": "2024-12-06",
        "category": "Miscellaneous",
        "description": "Expense 454",
        "amount": 13.05
    },
    {
        "id": 455,
        "date": "2024-03-03",
        "category": "Healthcare",
        "description": "Expense 455",
        "amount": 12.31
    },
    {
        "id": 456,
        "date": "2024-02-01",
        "category": "Education",
        "description": "Expense 456",
        "amount": 43.93
    },
    {
        "id": 457,
        "date": "2024-03-29",
        "category": "Healthcare",
        "description": "Expense 457",
        "amount": 20.09
    },
    {
        "id": 458,
        "date": "2024-09-29",
        "category": "Groceries",
        "description": "Expense 458",
        "amount": 27.1
    },
    {
        "id": 459,
        "date": "2024-11-21",
        "category": "Housing",
        "description": "Expense 459",
        "amount": 41.56
    },
    {
        "id": 460,
        "date": "2024-11-05",
        "category": "Education",
        "description": "Expense 460",
        "amount": 36.7
    },
    {
        "id": 461,
        "date": "2024-12-13",
        "category": "Food",
        "description": "Expense 461",
        "amount": 365.02
    },
    {
        "id": 462,
        "date": "2024-12-08",
        "category": "Utilities",
        "description": "Expense 462",
        "amount": 10.31
    },
    {
        "id": 463,
        "date": "2024-03-26",
        "category": "Utilities",
        "description": "Expense 463",
        "amount": 27.62
    },
    {
        "id": 464,
        "date": "2024-06-11",
        "category": "Entertainment",
        "description": "Expense 464",
        "amount": 38.1
    },
    {
        "id": 465,
        "date": "2024-10-24",
        "category": "Transportation",
        "description": "Expense 465",
        "amount": 27.53
    },
    {
        "id": 466,
        "date": "2024-03-18",
        "category": "Miscellaneous",
        "description": "Expense 466",
        "amount": 22.98
    },
    {
        "id": 467,
        "date": "2024-06-22",
        "category": "Housing",
        "description": "Expense 467",
        "amount": 9.29
    },
    {
        "id": 468,
        "date": "2024-12-22",
        "category": "Entertainment",
        "description": "Expense 468",
        "amount": 6.37
    },
    {
        "id": 469,
        "date": "2024-11-17",
        "category": "Food",
        "description": "Expense 469",
        "amount": 383.72
    },
    {
        "id": 470,
        "date": "2024-06-23",
        "category": "Utilities",
        "description": "Expense 470",
        "amount": 40.74
    },
    {
        "id": 471,
        "date": "2024-04-19",
        "category": "Housing",
        "description": "Expense 471",
        "amount": 39.14
    },
    {
        "id": 472,
        "date": "2024-07-11",
        "category": "Food",
        "description": "Expense 472",
        "amount": 233.45
    },
    {
        "id": 473,
        "date": "2024-08-22",
        "category": "Education",
        "description": "Expense 473",
        "amount": 47.02
    },
    {
        "id": 474,
        "date": "2024-08-30",
        "category": "Utilities",
        "description": "Expense 474",
        "amount": 16.64
    },
    {
        "id": 475,
        "date": "2024-06-11",
        "category": "Entertainment",
        "description": "Expense 475",
        "amount": 33.2
    },
    {
        "id": 476,
        "date": "2024-01-22",
        "category": "Groceries",
        "description": "Expense 476",
        "amount": 17.87
    },
    {
        "id": 477,
        "date": "2024-09-21",
        "category": "Groceries",
        "description": "Expense 477",
        "amount": 10.15
    },
    {
        "id": 478,
        "date": "2024-05-03",
        "category": "Healthcare",
        "description": "Expense 478",
        "amount": 18.52
    },
    {
        "id": 479,
        "date": "2024-07-23",
        "category": "Healthcare",
        "description": "Expense 479",
        "amount": 49.26
    },
    {
        "id": 480,
        "date": "2024-07-07",
        "category": "Miscellaneous",
        "description": "Expense 480",
        "amount": 9.81
    },
    {
        "id": 481,
        "date": "2024-12-11",
        "category": "Groceries",
        "description": "Expense 481",
        "amount": 43.93
    },
    {
        "id": 482,
        "date": "2024-04-26",
        "category": "Education",
        "description": "Expense 482",
        "amount": 17.4
    },
    {
        "id": 483,
        "date": "2024-07-01",
        "category": "Transportation",
        "description": "Expense 483",
        "amount": 34.95
    },
    {
        "id": 484,
        "date": "2024-06-28",
        "category": "Entertainment",
        "description": "Expense 484",
        "amount": 11.58
    },
    {
        "id": 485,
        "date": "2024-03-18",
        "category": "Healthcare",
        "description": "Expense 485",
        "amount": 26.18
    },
    {
        "id": 486,
        "date": "2024-11-12",
        "category": "Healthcare",
        "description": "Expense 486",
        "amount": 12.55
    },
    {
        "id": 487,
        "date": "2024-12-12",
        "category": "Groceries",
        "description": "Expense 487",
        "amount": 43.46
    },
    {
        "id": 488,
        "date": "2024-01-11",
        "category": "Food",
        "description": "Expense 488",
        "amount": 329.87
    },
    {
        "id": 489,
        "date": "2024-06-21",
        "category": "Utilities",
        "description": "Expense 489",
        "amount": 39.28
    },
    {
        "id": 490,
        "date": "2024-05-22",
        "category": "Entertainment",
        "description": "Expense 490",
        "amount": 28.53
    },
    {
        "id": 491,
        "date": "2024-10-16",
        "category": "Housing",
        "description": "Expense 491",
        "amount": 8.81
    },
    {
        "id": 492,
        "date": "2024-06-12",
        "category": "Utilities",
        "description": "Expense 492",
        "amount": 16.44
    },
    {
        "id": 493,
        "date": "2024-11-10",
        "category": "Groceries",
        "description": "Expense 493",
        "amount": 19.79
    },
    {
        "id": 494,
        "date": "2024-01-23",
        "category": "Entertainment",
        "description": "Expense 494",
        "amount": 10.97
    },
    {
        "id": 495,
        "date": "2024-08-31",
        "category": "Education",
        "description": "Expense 495",
        "amount": 17.92
    },
    {
        "id": 496,
        "date": "2024-06-21",
        "category": "Housing",
        "description": "Expense 496",
        "amount": 42.29
    },
    {
        "id": 497,
        "date": "2024-12-16",
        "category": "Transportation",
        "description": "Expense 497",
        "amount": 40.9
    },
    {
        "id": 498,
        "date": "2024-05-22",
        "category": "Utilities",
        "description": "Expense 498",
        "amount": 19.69
    },
    {
        "id": 499,
        "date": "2024-07-21",
        "category": "Transportation",
        "description": "Expense 499",
        "amount": 21.97
    },
    {
        "id": 500,
        "date": "2024-09-22",
        "category": "Transportation",
        "description": "Expense 500",
        "amount": 30.28
    },
    {
        "id": 501,
        "date": "2024-05-31",
        "category": "Housing",
        "description": "Expense 501",
        "amount": 6.73
    },
    {
        "id": 502,
        "date": "2024-05-31",
        "category": "Groceries",
        "description": "Expense 502",
        "amount": 49.45
    },
    {
        "id": 503,
        "date": "2024-02-21",
        "category": "Housing",
        "description": "Expense 503",
        "amount": 9.81
    },
    {
        "id": 504,
        "date": "2024-03-30",
        "category": "Utilities",
        "description": "Expense 504",
        "amount": 21.48
    },
    {
        "id": 505,
        "date": "2024-11-08",
        "category": "Healthcare",
        "description": "Expense 505",
        "amount": 13.38
    },
    {
        "id": 506,
        "date": "2024-04-26",
        "category": "Transportation",
        "description": "Expense 506",
        "amount": 39.29
    },
    {
        "id": 507,
        "date": "2024-05-16",
        "category": "Housing",
        "description": "Expense 507",
        "amount": 41.36
    },
    {
        "id": 508,
        "date": "2024-11-27",
        "category": "Entertainment",
        "description": "Expense 508",
        "amount": 48.96
    },
    {
        "id": 509,
        "date": "2024-06-20",
        "category": "Healthcare",
        "description": "Expense 509",
        "amount": 21.73
    },
    {
        "id": 510,
        "date": "2024-03-27",
        "category": "Healthcare",
        "description": "Expense 510",
        "amount": 18.87
    },
    {
        "id": 511,
        "date": "2024-10-21",
        "category": "Food",
        "description": "Expense 511",
        "amount": 303.39
    },
    {
        "id": 512,
        "date": "2024-11-13",
        "category": "Housing",
        "description": "Expense 512",
        "amount": 22.38
    },
    {
        "id": 513,
        "date": "2024-07-18",
        "category": "Healthcare",
        "description": "Expense 513",
        "amount": 46.2
    },
    {
        "id": 514,
        "date": "2024-12-14",
        "category": "Entertainment",
        "description": "Expense 514",
        "amount": 13.67
    },
    {
        "id": 515,
        "date": "2024-02-09",
        "category": "Housing",
        "description": "Expense 515",
        "amount": 13.04
    },
    {
        "id": 516,
        "date": "2024-02-05",
        "category": "Entertainment",
        "description": "Expense 516",
        "amount": 44.98
    },
    {
        "id": 517,
        "date": "2024-11-04",
        "category": "Food",
        "description": "Expense 517",
        "amount": 367.87
    },
    {
        "id": 518,
        "date": "2024-04-28",
        "category": "Food",
        "description": "Expense 518",
        "amount": 372.86
    },
    {
        "id": 519,
        "date": "2024-04-21",
        "category": "Utilities",
        "description": "Expense 519",
        "amount": 14.37
    },
    {
        "id": 520,
        "date": "2024-12-09",
        "category": "Entertainment",
        "description": "Expense 520",
        "amount": 15.41
    },
    {
        "id": 521,
        "date": "2024-06-13",
        "category": "Utilities",
        "description": "Expense 521",
        "amount": 30.23
    },
    {
        "id": 522,
        "date": "2024-05-23",
        "category": "Healthcare",
        "description": "Expense 522",
        "amount": 35.82
    },
    {
        "id": 523,
        "date": "2024-11-20",
        "category": "Housing",
        "description": "Expense 523",
        "amount": 43.06
    },
    {
        "id": 524,
        "date": "2024-09-16",
        "category": "Healthcare",
        "description": "Expense 524",
        "amount": 22.16
    },
    {
        "id": 525,
        "date": "2024-11-08",
        "category": "Transportation",
        "description": "Expense 525",
        "amount": 34.62
    },
    {
        "id": 526,
        "date": "2024-02-13",
        "category": "Healthcare",
        "description": "Expense 526",
        "amount": 16.39
    },
    {
        "id": 527,
        "date": "2024-09-06",
        "category": "Entertainment",
        "description": "Expense 527",
        "amount": 27.27
    },
    {
        "id": 528,
        "date": "2024-07-17",
        "category": "Education",
        "description": "Expense 528",
        "amount": 7.99
    },
    {
        "id": 529,
        "date": "2024-04-08",
        "category": "Utilities",
        "description": "Expense 529",
        "amount": 18.07
    },
    {
        "id": 530,
        "date": "2024-05-09",
        "category": "Entertainment",
        "description": "Expense 530",
        "amount": 5.6
    },
    {
        "id": 531,
        "date": "2024-06-13",
        "category": "Healthcare",
        "description": "Expense 531",
        "amount": 22.58
    },
    {
        "id": 532,
        "date": "2024-04-30",
        "category": "Education",
        "description": "Expense 532",
        "amount": 41.68
    },
    {
        "id": 533,
        "date": "2024-03-01",
        "category": "Utilities",
        "description": "Expense 533",
        "amount": 13.99
    },
    {
        "id": 534,
        "date": "2024-08-30",
        "category": "Groceries",
        "description": "Expense 534",
        "amount": 40.58
    },
    {
        "id": 535,
        "date": "2024-07-22",
        "category": "Utilities",
        "description": "Expense 535",
        "amount": 32.1
    },
    {
        "id": 536,
        "date": "2024-01-18",
        "category": "Miscellaneous",
        "description": "Expense 536",
        "amount": 22.06
    },
    {
        "id": 537,
        "date": "2024-11-29",
        "category": "Miscellaneous",
        "description": "Expense 537",
        "amount": 29.72
    },
    {
        "id": 538,
        "date": "2024-12-28",
        "category": "Housing",
        "description": "Expense 538",
        "amount": 42.86
    },
    {
        "id": 539,
        "date": "2024-08-27",
        "category": "Entertainment",
        "description": "Expense 539",
        "amount": 36.88
    },
    {
        "id": 540,
        "date": "2024-01-04",
        "category": "Utilities",
        "description": "Expense 540",
        "amount": 42.35
    },
    {
        "id": 541,
        "date": "2024-03-21",
        "category": "Healthcare",
        "description": "Expense 541",
        "amount": 36.66
    },
    {
        "id": 542,
        "date": "2024-11-10",
        "category": "Healthcare",
        "description": "Expense 542",
        "amount": 15.41
    },
    {
        "id": 543,
        "date": "2024-03-11",
        "category": "Entertainment",
        "description": "Expense 543",
        "amount": 28.9
    },
    {
        "id": 544,
        "date": "2024-07-30",
        "category": "Housing",
        "description": "Expense 544",
        "amount": 34.35
    },
    {
        "id": 545,
        "date": "2024-11-23",
        "category": "Miscellaneous",
        "description": "Expense 545",
        "amount": 22.49
    },
    {
        "id": 546,
        "date": "2024-01-26",
        "category": "Housing",
        "description": "Expense 546",
        "amount": 16.73
    },
    {
        "id": 547,
        "date": "2024-10-28",
        "category": "Transportation",
        "description": "Expense 547",
        "amount": 41.22
    },
    {
        "id": 548,
        "date": "2024-02-23",
        "category": "Education",
        "description": "Expense 548",
        "amount": 44.26
    },
    {
        "id": 549,
        "date": "2024-06-04",
        "category": "Education",
        "description": "Expense 549",
        "amount": 45.83
    },
    {
        "id": 550,
        "date": "2024-05-24",
        "category": "Healthcare",
        "description": "Expense 550",
        "amount": 36.09
    },
    {
        "id": 551,
        "date": "2024-01-23",
        "category": "Education",
        "description": "Expense 551",
        "amount": 14.52
    },
    {
        "id": 552,
        "date": "2024-12-27",
        "category": "Housing",
        "description": "Expense 552",
        "amount": 34.39
    },
    {
        "id": 553,
        "date": "2024-01-27",
        "category": "Utilities",
        "description": "Expense 553",
        "amount": 16.86
    },
    {
        "id": 554,
        "date": "2024-10-16",
        "category": "Utilities",
        "description": "Expense 554",
        "amount": 14.21
    },
    {
        "id": 555,
        "date": "2024-02-12",
        "category": "Miscellaneous",
        "description": "Expense 555",
        "amount": 9.58
    },
    {
        "id": 556,
        "date": "2024-05-01",
        "category": "Healthcare",
        "description": "Expense 556",
        "amount": 33.73
    },
    {
        "id": 557,
        "date": "2024-08-20",
        "category": "Food",
        "description": "Expense 557",
        "amount": 256.71
    },
    {
        "id": 558,
        "date": "2024-09-11",
        "category": "Healthcare",
        "description": "Expense 558",
        "amount": 23.88
    },
    {
        "id": 559,
        "date": "2024-11-10",
        "category": "Food",
        "description": "Expense 559",
        "amount": 312.54
    },
    {
        "id": 560,
        "date": "2024-05-22",
        "category": "Groceries",
        "description": "Expense 560",
        "amount": 16.36
    },
    {
        "id": 561,
        "date": "2024-06-29",
        "category": "Housing",
        "description": "Expense 561",
        "amount": 5.6
    },
    {
        "id": 562,
        "date": "2024-02-18",
        "category": "Entertainment",
        "description": "Expense 562",
        "amount": 33.91
    },
    {
        "id": 563,
        "date": "2024-05-27",
        "category": "Entertainment",
        "description": "Expense 563",
        "amount": 25.35
    },
    {
        "id": 564,
        "date": "2024-08-06",
        "category": "Transportation",
        "description": "Expense 564",
        "amount": 10.68
    },
    {
        "id": 565,
        "date": "2024-08-29",
        "category": "Education",
        "description": "Expense 565",
        "amount": 49.56
    },
    {
        "id": 566,
        "date": "2024-06-06",
        "category": "Housing",
        "description": "Expense 566",
        "amount": 35.69
    },
    {
        "id": 567,
        "date": "2024-08-25",
        "category": "Education",
        "description": "Expense 567",
        "amount": 48.73
    },
    {
        "id": 568,
        "date": "2024-04-30",
        "category": "Food",
        "description": "Expense 568",
        "amount": 201.74
    },
    {
        "id": 569,
        "date": "2024-12-17",
        "category": "Education",
        "description": "Expense 569",
        "amount": 46.78
    },
    {
        "id": 570,
        "date": "2024-07-19",
        "category": "Education",
        "description": "Expense 570",
        "amount": 20.72
    },
    {
        "id": 571,
        "date": "2024-01-13",
        "category": "Utilities",
        "description": "Expense 571",
        "amount": 17.48
    },
    {
        "id": 572,
        "date": "2024-03-08",
        "category": "Miscellaneous",
        "description": "Expense 572",
        "amount": 38.5
    },
    {
        "id": 573,
        "date": "2024-11-07",
        "category": "Education",
        "description": "Expense 573",
        "amount": 36.74
    },
    {
        "id": 574,
        "date": "2024-03-05",
        "category": "Housing",
        "description": "Expense 574",
        "amount": 35.31
    },
    {
        "id": 575,
        "date": "2024-01-22",
        "category": "Housing",
        "description": "Expense 575",
        "amount": 29.67
    },
    {
        "id": 576,
        "date": "2024-06-26",
        "category": "Miscellaneous",
        "description": "Expense 576",
        "amount": 40.27
    },
    {
        "id": 577,
        "date": "2024-06-10",
        "category": "Housing",
        "description": "Expense 577",
        "amount": 33.96
    },
    {
        "id": 578,
        "date": "2024-06-06",
        "category": "Transportation",
        "description": "Expense 578",
        "amount": 46.99
    },
    {
        "id": 579,
        "date": "2024-08-15",
        "category": "Healthcare",
        "description": "Expense 579",
        "amount": 43.4
    },
    {
        "id": 580,
        "date": "2024-11-05",
        "category": "Miscellaneous",
        "description": "Expense 580",
        "amount": 44.84
    },
    {
        "id": 581,
        "date": "2024-09-27",
        "category": "Miscellaneous",
        "description": "Expense 581",
        "amount": 9.43
    },
    {
        "id": 582,
        "date": "2024-06-25",
        "category": "Miscellaneous",
        "description": "Expense 582",
        "amount": 27.99
    },
    {
        "id": 583,
        "date": "2024-11-29",
        "category": "Transportation",
        "description": "Expense 583",
        "amount": 26.88
    },
    {
        "id": 584,
        "date": "2024-03-25",
        "category": "Groceries",
        "description": "Expense 584",
        "amount": 24.38
    },
    {
        "id": 585,
        "date": "2024-02-24",
        "category": "Miscellaneous",
        "description": "Expense 585",
        "amount": 24.35
    },
    {
        "id": 586,
        "date": "2024-08-07",
        "category": "Education",
        "description": "Expense 586",
        "amount": 28.36
    },
    {
        "id": 587,
        "date": "2024-01-29",
        "category": "Housing",
        "description": "Expense 587",
        "amount": 41.45
    },
    {
        "id": 588,
        "date": "2024-12-06",
        "category": "Entertainment",
        "description": "Expense 588",
        "amount": 33.5
    },
    {
        "id": 589,
        "date": "2024-05-04",
        "category": "Entertainment",
        "description": "Expense 589",
        "amount": 29.83
    },
    {
        "id": 590,
        "date": "2024-06-30",
        "category": "Transportation",
        "description": "Expense 590",
        "amount": 25.42
    },
    {
        "id": 591,
        "date": "2024-02-07",
        "category": "Groceries",
        "description": "Expense 591",
        "amount": 35.51
    },
    {
        "id": 592,
        "date": "2024-06-07",
        "category": "Groceries",
        "description": "Expense 592",
        "amount": 39.33
    },
    {
        "id": 593,
        "date": "2024-07-04",
        "category": "Groceries",
        "description": "Expense 593",
        "amount": 38.23
    },
    {
        "id": 594,
        "date": "2024-07-27",
        "category": "Miscellaneous",
        "description": "Expense 594",
        "amount": 38.19
    },
    {
        "id": 595,
        "date": "2024-04-28",
        "category": "Entertainment",
        "description": "Expense 595",
        "amount": 46.06
    },
    {
        "id": 596,
        "date": "2024-07-01",
        "category": "Education",
        "description": "Expense 596",
        "amount": 47.39
    },
    {
        "id": 597,
        "date": "2024-02-02",
        "category": "Entertainment",
        "description": "Expense 597",
        "amount": 49.47
    },
    {
        "id": 598,
        "date": "2024-03-06",
        "category": "Housing",
        "description": "Expense 598",
        "amount": 49.39
    },
    {
        "id": 599,
        "date": "2024-09-14",
        "category": "Housing",
        "description": "Expense 599",
        "amount": 31.55
    },
    {
        "id": 600,
        "date": "2024-09-13",
        "category": "Housing",
        "description": "Expense 600",
        "amount": 48.73
    },
    {
        "id": 601,
        "date": "2024-08-14",
        "category": "Utilities",
        "description": "Expense 601",
        "amount": 46.07
    },
    {
        "id": 602,
        "date": "2024-05-23",
        "category": "Food",
        "description": "Expense 602",
        "amount": 275.55
    },
    {
        "id": 603,
        "date": "2024-06-08",
        "category": "Education",
        "description": "Expense 603",
        "amount": 35.38
    },
    {
        "id": 604,
        "date": "2024-01-08",
        "category": "Groceries",
        "description": "Expense 604",
        "amount": 33.03
    },
    {
        "id": 605,
        "date": "2024-01-25",
        "category": "Miscellaneous",
        "description": "Expense 605",
        "amount": 25.01
    },
    {
        "id": 606,
        "date": "2024-03-07",
        "category": "Entertainment",
        "description": "Expense 606",
        "amount": 22.11
    },
    {
        "id": 607,
        "date": "2024-06-12",
        "category": "Utilities",
        "description": "Expense 607",
        "amount": 43.03
    },
    {
        "id": 608,
        "date": "2024-03-15",
        "category": "Food",
        "description": "Expense 608",
        "amount": 355.2
    },
    {
        "id": 609,
        "date": "2024-09-23",
        "category": "Miscellaneous",
        "description": "Expense 609",
        "amount": 23.81
    },
    {
        "id": 610,
        "date": "2024-03-20",
        "category": "Food",
        "description": "Expense 610",
        "amount": 268.56
    },
    {
        "id": 611,
        "date": "2024-07-10",
        "category": "Housing",
        "description": "Expense 611",
        "amount": 37.03
    },
    {
        "id": 612,
        "date": "2024-06-29",
        "category": "Healthcare",
        "description": "Expense 612",
        "amount": 40.29
    },
    {
        "id": 613,
        "date": "2024-03-03",
        "category": "Miscellaneous",
        "description": "Expense 613",
        "amount": 41.67
    },
    {
        "id": 614,
        "date": "2024-04-05",
        "category": "Miscellaneous",
        "description": "Expense 614",
        "amount": 28.95
    },
    {
        "id": 615,
        "date": "2024-02-14",
        "category": "Food",
        "description": "Expense 615",
        "amount": 234.7
    },
    {
        "id": 616,
        "date": "2024-10-18",
        "category": "Healthcare",
        "description": "Expense 616",
        "amount": 35.59
    },
    {
        "id": 617,
        "date": "2024-03-13",
        "category": "Healthcare",
        "description": "Expense 617",
        "amount": 44.88
    },
    {
        "id": 618,
        "date": "2024-06-19",
        "category": "Transportation",
        "description": "Expense 618",
        "amount": 5.7
    },
    {
        "id": 619,
        "date": "2024-01-20",
        "category": "Entertainment",
        "description": "Expense 619",
        "amount": 29.19
    },
    {
        "id": 620,
        "date": "2024-06-21",
        "category": "Groceries",
        "description": "Expense 620",
        "amount": 41.58
    },
    {
        "id": 621,
        "date": "2024-09-17",
        "category": "Groceries",
        "description": "Expense 621",
        "amount": 35.21
    },
    {
        "id": 622,
        "date": "2024-05-26",
        "category": "Healthcare",
        "description": "Expense 622",
        "amount": 40.71
    },
    {
        "id": 623,
        "date": "2024-10-09",
        "category": "Transportation",
        "description": "Expense 623",
        "amount": 46.87
    },
    {
        "id": 624,
        "date": "2024-01-19",
        "category": "Transportation",
        "description": "Expense 624",
        "amount": 23.13
    },
    {
        "id": 625,
        "date": "2024-11-19",
        "category": "Utilities",
        "description": "Expense 625",
        "amount": 17.7
    },
    {
        "id": 626,
        "date": "2024-03-06",
        "category": "Transportation",
        "description": "Expense 626",
        "amount": 25.97
    },
    {
        "id": 627,
        "date": "2024-10-08",
        "category": "Utilities",
        "description": "Expense 627",
        "amount": 46.54
    },
    {
        "id": 628,
        "date": "2024-11-05",
        "category": "Transportation",
        "description": "Expense 628",
        "amount": 33.01
    },
    {
        "id": 629,
        "date": "2024-08-07",
        "category": "Transportation",
        "description": "Expense 629",
        "amount": 49.63
    },
    {
        "id": 630,
        "date": "2024-01-16",
        "category": "Education",
        "description": "Expense 630",
        "amount": 9.03
    },
    {
        "id": 631,
        "date": "2024-01-09",
        "category": "Miscellaneous",
        "description": "Expense 631",
        "amount": 26.18
    },
    {
        "id": 632,
        "date": "2024-07-28",
        "category": "Miscellaneous",
        "description": "Expense 632",
        "amount": 40.73
    },
    {
        "id": 633,
        "date": "2024-10-24",
        "category": "Food",
        "description": "Expense 633",
        "amount": 399.01
    },
    {
        "id": 634,
        "date": "2024-09-25",
        "category": "Groceries",
        "description": "Expense 634",
        "amount": 8.98
    },
    {
        "id": 635,
        "date": "2024-05-13",
        "category": "Housing",
        "description": "Expense 635",
        "amount": 5.9
    },
    {
        "id": 636,
        "date": "2024-03-10",
        "category": "Entertainment",
        "description": "Expense 636",
        "amount": 32.5
    },
    {
        "id": 637,
        "date": "2024-09-08",
        "category": "Food",
        "description": "Expense 637",
        "amount": 372.12
    },
    {
        "id": 638,
        "date": "2024-03-24",
        "category": "Entertainment",
        "description": "Expense 638",
        "amount": 22.51
    },
    {
        "id": 639,
        "date": "2024-08-28",
        "category": "Transportation",
        "description": "Expense 639",
        "amount": 21.55
    },
    {
        "id": 640,
        "date": "2024-02-16",
        "category": "Housing",
        "description": "Expense 640",
        "amount": 18.93
    },
    {
        "id": 641,
        "date": "2024-06-01",
        "category": "Education",
        "description": "Expense 641",
        "amount": 19.7
    },
    {
        "id": 642,
        "date": "2024-03-23",
        "category": "Education",
        "description": "Expense 642",
        "amount": 46.49
    },
    {
        "id": 643,
        "date": "2024-11-27",
        "category": "Transportation",
        "description": "Expense 643",
        "amount": 36.91
    },
    {
        "id": 644,
        "date": "2024-09-18",
        "category": "Miscellaneous",
        "description": "Expense 644",
        "amount": 28.37
    },
    {
        "id": 645,
        "date": "2024-08-25",
        "category": "Food",
        "description": "Expense 645",
        "amount": 261.72
    },
    {
        "id": 646,
        "date": "2024-10-26",
        "category": "Education",
        "description": "Expense 646",
        "amount": 12.37
    },
    {
        "id": 647,
        "date": "2024-03-04",
        "category": "Housing",
        "description": "Expense 647",
        "amount": 17.9
    },
    {
        "id": 648,
        "date": "2024-08-29",
        "category": "Groceries",
        "description": "Expense 648",
        "amount": 32.35
    },
    {
        "id": 649,
        "date": "2024-09-15",
        "category": "Food",
        "description": "Expense 649",
        "amount": 280.62
    },
    {
        "id": 650,
        "date": "2024-01-11",
        "category": "Healthcare",
        "description": "Expense 650",
        "amount": 15.56
    },
    {
        "id": 651,
        "date": "2024-08-25",
        "category": "Transportation",
        "description": "Expense 651",
        "amount": 9.49
    },
    {
        "id": 652,
        "date": "2024-07-26",
        "category": "Healthcare",
        "description": "Expense 652",
        "amount": 15.73
    },
    {
        "id": 653,
        "date": "2024-05-12",
        "category": "Housing",
        "description": "Expense 653",
        "amount": 23.08
    },
    {
        "id": 654,
        "date": "2024-09-04",
        "category": "Food",
        "description": "Expense 654",
        "amount": 346.46
    },
    {
        "id": 655,
        "date": "2024-12-16",
        "category": "Entertainment",
        "description": "Expense 655",
        "amount": 41.43
    },
    {
        "id": 656,
        "date": "2024-01-19",
        "category": "Housing",
        "description": "Expense 656",
        "amount": 25.09
    },
    {
        "id": 657,
        "date": "2024-01-23",
        "category": "Miscellaneous",
        "description": "Expense 657",
        "amount": 30.19
    },
    {
        "id": 658,
        "date": "2024-02-07",
        "category": "Miscellaneous",
        "description": "Expense 658",
        "amount": 23.72
    },
    {
        "id": 659,
        "date": "2024-11-15",
        "category": "Miscellaneous",
        "description": "Expense 659",
        "amount": 26.45
    },
    {
        "id": 660,
        "date": "2024-09-20",
        "category": "Miscellaneous",
        "description": "Expense 660",
        "amount": 7.24
    },
    {
        "id": 661,
        "date": "2024-05-08",
        "category": "Food",
        "description": "Expense 661",
        "amount": 318.07
    },
    {
        "id": 662,
        "date": "2024-10-29",
        "category": "Education",
        "description": "Expense 662",
        "amount": 30.73
    },
    {
        "id": 663,
        "date": "2024-01-14",
        "category": "Miscellaneous",
        "description": "Expense 663",
        "amount": 25.84
    },
    {
        "id": 664,
        "date": "2024-11-13",
        "category": "Groceries",
        "description": "Expense 664",
        "amount": 27.12
    },
    {
        "id": 665,
        "date": "2024-07-30",
        "category": "Transportation",
        "description": "Expense 665",
        "amount": 31.99
    },
    {
        "id": 666,
        "date": "2024-08-01",
        "category": "Housing",
        "description": "Expense 666",
        "amount": 12.7
    },
    {
        "id": 667,
        "date": "2024-10-20",
        "category": "Transportation",
        "description": "Expense 667",
        "amount": 49.99
    },
    {
        "id": 668,
        "date": "2024-02-09",
        "category": "Transportation",
        "description": "Expense 668",
        "amount": 19.85
    },
    {
        "id": 669,
        "date": "2024-09-05",
        "category": "Housing",
        "description": "Expense 669",
        "amount": 25.15
    },
    {
        "id": 670,
        "date": "2024-12-29",
        "category": "Healthcare",
        "description": "Expense 670",
        "amount": 41.43
    },
    {
        "id": 671,
        "date": "2024-07-01",
        "category": "Utilities",
        "description": "Expense 671",
        "amount": 23.31
    },
    {
        "id": 672,
        "date": "2024-05-08",
        "category": "Education",
        "description": "Expense 672",
        "amount": 37.65
    },
    {
        "id": 673,
        "date": "2024-07-05",
        "category": "Miscellaneous",
        "description": "Expense 673",
        "amount": 44.03
    },
    {
        "id": 674,
        "date": "2024-12-17",
        "category": "Entertainment",
        "description": "Expense 674",
        "amount": 11.3
    },
    {
        "id": 675,
        "date": "2024-02-15",
        "category": "Education",
        "description": "Expense 675",
        "amount": 32.33
    },
    {
        "id": 676,
        "date": "2024-08-02",
        "category": "Housing",
        "description": "Expense 676",
        "amount": 13.08
    },
    {
        "id": 677,
        "date": "2024-04-21",
        "category": "Entertainment",
        "description": "Expense 677",
        "amount": 22.27
    },
    {
        "id": 678,
        "date": "2024-12-09",
        "category": "Food",
        "description": "Expense 678",
        "amount": 248.66
    },
    {
        "id": 679,
        "date": "2024-04-10",
        "category": "Entertainment",
        "description": "Expense 679",
        "amount": 49.03
    },
    {
        "id": 680,
        "date": "2024-05-23",
        "category": "Miscellaneous",
        "description": "Expense 680",
        "amount": 45.79
    },
    {
        "id": 681,
        "date": "2024-01-31",
        "category": "Food",
        "description": "Expense 681",
        "amount": 260.48
    },
    {
        "id": 682,
        "date": "2024-10-10",
        "category": "Utilities",
        "description": "Expense 682",
        "amount": 29.04
    },
    {
        "id": 683,
        "date": "2024-03-12",
        "category": "Food",
        "description": "Expense 683",
        "amount": 372.2
    },
    {
        "id": 684,
        "date": "2024-12-01",
        "category": "Education",
        "description": "Expense 684",
        "amount": 24.88
    },
    {
        "id": 685,
        "date": "2024-04-16",
        "category": "Entertainment",
        "description": "Expense 685",
        "amount": 12.13
    },
    {
        "id": 686,
        "date": "2024-09-01",
        "category": "Groceries",
        "description": "Expense 686",
        "amount": 18.08
    },
    {
        "id": 687,
        "date": "2024-07-16",
        "category": "Utilities",
        "description": "Expense 687",
        "amount": 5.83
    },
    {
        "id": 688,
        "date": "2024-12-03",
        "category": "Education",
        "description": "Expense 688",
        "amount": 46.35
    },
    {
        "id": 689,
        "date": "2024-04-30",
        "category": "Healthcare",
        "description": "Expense 689",
        "amount": 26.85
    },
    {
        "id": 690,
        "date": "2024-05-08",
        "category": "Education",
        "description": "Expense 690",
        "amount": 15.28
    },
    {
        "id": 691,
        "date": "2024-07-08",
        "category": "Education",
        "description": "Expense 691",
        "amount": 31.42
    },
    {
        "id": 692,
        "date": "2024-01-18",
        "category": "Food",
        "description": "Expense 692",
        "amount": 349.54
    },
    {
        "id": 693,
        "date": "2024-01-27",
        "category": "Food",
        "description": "Expense 693",
        "amount": 291.88
    },
    {
        "id": 694,
        "date": "2024-07-16",
        "category": "Food",
        "description": "Expense 694",
        "amount": 382.83
    },
    {
        "id": 695,
        "date": "2024-02-26",
        "category": "Healthcare",
        "description": "Expense 695",
        "amount": 21.09
    },
    {
        "id": 696,
        "date": "2024-07-23",
        "category": "Groceries",
        "description": "Expense 696",
        "amount": 9.61
    },
    {
        "id": 697,
        "date": "2024-06-08",
        "category": "Food",
        "description": "Expense 697",
        "amount": 359.21
    },
    {
        "id": 698,
        "date": "2024-01-30",
        "category": "Miscellaneous",
        "description": "Expense 698",
        "amount": 17.66
    },
    {
        "id": 699,
        "date": "2024-05-14",
        "category": "Miscellaneous",
        "description": "Expense 699",
        "amount": 25.68
    },
    {
        "id": 700,
        "date": "2024-05-12",
        "category": "Education",
        "description": "Expense 700",
        "amount": 38.16
    },
    {
        "id": 701,
        "date": "2024-03-29",
        "category": "Entertainment",
        "description": "Expense 701",
        "amount": 19.69
    },
    {
        "id": 702,
        "date": "2024-10-09",
        "category": "Housing",
        "description": "Expense 702",
        "amount": 38.44
    },
    {
        "id": 703,
        "date": "2024-08-10",
        "category": "Entertainment",
        "description": "Expense 703",
        "amount": 17.93
    },
    {
        "id": 704,
        "date": "2024-03-04",
        "category": "Education",
        "description": "Expense 704",
        "amount": 40.41
    },
    {
        "id": 705,
        "date": "2024-01-24",
        "category": "Food",
        "description": "Expense 705",
        "amount": 240.15
    },
    {
        "id": 706,
        "date": "2024-04-10",
        "category": "Education",
        "description": "Expense 706",
        "amount": 23.85
    },
    {
        "id": 707,
        "date": "2024-06-07",
        "category": "Food",
        "description": "Expense 707",
        "amount": 307.48
    },
    {
        "id": 708,
        "date": "2024-12-11",
        "category": "Transportation",
        "description": "Expense 708",
        "amount": 37.77
    },
    {
        "id": 709,
        "date": "2024-11-20",
        "category": "Housing",
        "description": "Expense 709",
        "amount": 24.64
    },
    {
        "id": 710,
        "date": "2024-05-27",
        "category": "Housing",
        "description": "Expense 710",
        "amount": 35.1
    },
    {
        "id": 711,
        "date": "2024-09-20",
        "category": "Healthcare",
        "description": "Expense 711",
        "amount": 6.03
    },
    {
        "id": 712,
        "date": "2024-04-14",
        "category": "Groceries",
        "description": "Expense 712",
        "amount": 39.54
    },
    {
        "id": 713,
        "date": "2024-03-26",
        "category": "Healthcare",
        "description": "Expense 713",
        "amount": 13.59
    },
    {
        "id": 714,
        "date": "2024-10-01",
        "category": "Utilities",
        "description": "Expense 714",
        "amount": 38.7
    },
    {
        "id": 715,
        "date": "2024-02-17",
        "category": "Miscellaneous",
        "description": "Expense 715",
        "amount": 32.31
    },
    {
        "id": 716,
        "date": "2024-01-01",
        "category": "Groceries",
        "description": "Expense 716",
        "amount": 48.59
    },
    {
        "id": 717,
        "date": "2024-12-18",
        "category": "Entertainment",
        "description": "Expense 717",
        "amount": 19.52
    },
    {
        "id": 718,
        "date": "2024-10-09",
        "category": "Transportation",
        "description": "Expense 718",
        "amount": 25.01
    },
    {
        "id": 719,
        "date": "2024-11-12",
        "category": "Utilities",
        "description": "Expense 719",
        "amount": 49.1
    },
    {
        "id": 720,
        "date": "2024-10-07",
        "category": "Entertainment",
        "description": "Expense 720",
        "amount": 48.72
    },
    {
        "id": 721,
        "date": "2024-12-12",
        "category": "Miscellaneous",
        "description": "Expense 721",
        "amount": 12.46
    },
    {
        "id": 722,
        "date": "2024-07-02",
        "category": "Food",
        "description": "Expense 722",
        "amount": 216.39
    },
    {
        "id": 723,
        "date": "2024-04-02",
        "category": "Transportation",
        "description": "Expense 723",
        "amount": 34.26
    },
    {
        "id": 724,
        "date": "2024-03-08",
        "category": "Miscellaneous",
        "description": "Expense 724",
        "amount": 43.72
    },
    {
        "id": 725,
        "date": "2024-12-07",
        "category": "Utilities",
        "description": "Expense 725",
        "amount": 28.38
    },
    {
        "id": 726,
        "date": "2024-11-16",
        "category": "Miscellaneous",
        "description": "Expense 726",
        "amount": 11.01
    },
    {
        "id": 727,
        "date": "2024-09-30",
        "category": "Food",
        "description": "Expense 727",
        "amount": 331.39
    },
    {
        "id": 728,
        "date": "2024-05-29",
        "category": "Housing",
        "description": "Expense 728",
        "amount": 49.3
    },
    {
        "id": 729,
        "date": "2024-10-17",
        "category": "Transportation",
        "description": "Expense 729",
        "amount": 19.97
    },
    {
        "id": 730,
        "date": "2024-05-22",
        "category": "Transportation",
        "description": "Expense 730",
        "amount": 36.67
    },
    {
        "id": 731,
        "date": "2024-05-17",
        "category": "Healthcare",
        "description": "Expense 731",
        "amount": 28.27
    },
    {
        "id": 732,
        "date": "2024-01-07",
        "category": "Transportation",
        "description": "Expense 732",
        "amount": 25.95
    },
    {
        "id": 733,
        "date": "2024-10-29",
        "category": "Miscellaneous",
        "description": "Expense 733",
        "amount": 19.47
    },
    {
        "id": 734,
        "date": "2024-10-10",
        "category": "Education",
        "description": "Expense 734",
        "amount": 21.25
    },
    {
        "id": 735,
        "date": "2024-02-11",
        "category": "Education",
        "description": "Expense 735",
        "amount": 26.08
    },
    {
        "id": 736,
        "date": "2024-06-11",
        "category": "Housing",
        "description": "Expense 736",
        "amount": 10.55
    },
    {
        "id": 737,
        "date": "2024-06-05",
        "category": "Utilities",
        "description": "Expense 737",
        "amount": 22.09
    },
    {
        "id": 738,
        "date": "2024-04-08",
        "category": "Education",
        "description": "Expense 738",
        "amount": 23.17
    },
    {
        "id": 739,
        "date": "2024-10-12",
        "category": "Utilities",
        "description": "Expense 739",
        "amount": 18.62
    },
    {
        "id": 740,
        "date": "2024-11-30",
        "category": "Groceries",
        "description": "Expense 740",
        "amount": 6.68
    },
    {
        "id": 741,
        "date": "2024-02-25",
        "category": "Healthcare",
        "description": "Expense 741",
        "amount": 47.53
    },
    {
        "id": 742,
        "date": "2024-12-27",
        "category": "Education",
        "description": "Expense 742",
        "amount": 45.76
    },
    {
        "id": 743,
        "date": "2024-03-20",
        "category": "Healthcare",
        "description": "Expense 743",
        "amount": 19.44
    },
    {
        "id": 744,
        "date": "2024-10-19",
        "category": "Miscellaneous",
        "description": "Expense 744",
        "amount": 25.85
    },
    {
        "id": 745,
        "date": "2024-01-05",
        "category": "Housing",
        "description": "Expense 745",
        "amount": 31.34
    },
    {
        "id": 746,
        "date": "2024-04-22",
        "category": "Education",
        "description": "Expense 746",
        "amount": 24.12
    },
    {
        "id": 747,
        "date": "2024-04-15",
        "category": "Housing",
        "description": "Expense 747",
        "amount": 36.04
    },
    {
        "id": 748,
        "date": "2024-08-14",
        "category": "Transportation",
        "description": "Expense 748",
        "amount": 33.69
    },
    {
        "id": 749,
        "date": "2024-04-10",
        "category": "Entertainment",
        "description": "Expense 749",
        "amount": 30.61
    },
    {
        "id": 750,
        "date": "2024-11-02",
        "category": "Food",
        "description": "Expense 750",
        "amount": 380.92
    },
    {
        "id": 751,
        "date": "2024-12-18",
        "category": "Housing",
        "description": "Expense 751",
        "amount": 38.21
    },
    {
        "id": 752,
        "date": "2024-07-24",
        "category": "Utilities",
        "description": "Expense 752",
        "amount": 29.23
    },
    {
        "id": 753,
        "date": "2024-09-12",
        "category": "Food",
        "description": "Expense 753",
        "amount": 308.17
    },
    {
        "id": 754,
        "date": "2024-09-05",
        "category": "Food",
        "description": "Expense 754",
        "amount": 329.58
    },
    {
        "id": 755,
        "date": "2024-08-29",
        "category": "Groceries",
        "description": "Expense 755",
        "amount": 30.5
    },
    {
        "id": 756,
        "date": "2024-03-20",
        "category": "Groceries",
        "description": "Expense 756",
        "amount": 43.32
    },
    {
        "id": 757,
        "date": "2024-09-11",
        "category": "Utilities",
        "description": "Expense 757",
        "amount": 36.67
    },
    {
        "id": 758,
        "date": "2024-02-12",
        "category": "Housing",
        "description": "Expense 758",
        "amount": 26.24
    },
    {
        "id": 759,
        "date": "2024-07-29",
        "category": "Groceries",
        "description": "Expense 759",
        "amount": 20.58
    },
    {
        "id": 760,
        "date": "2024-07-15",
        "category": "Housing",
        "description": "Expense 760",
        "amount": 40.54
    },
    {
        "id": 761,
        "date": "2024-11-21",
        "category": "Housing",
        "description": "Expense 761",
        "amount": 36.62
    },
    {
        "id": 762,
        "date": "2024-11-09",
        "category": "Housing",
        "description": "Expense 762",
        "amount": 18.24
    },
    {
        "id": 763,
        "date": "2024-05-18",
        "category": "Utilities",
        "description": "Expense 763",
        "amount": 38.82
    },
    {
        "id": 764,
        "date": "2024-11-22",
        "category": "Miscellaneous",
        "description": "Expense 764",
        "amount": 48.67
    },
    {
        "id": 765,
        "date": "2024-12-01",
        "category": "Groceries",
        "description": "Expense 765",
        "amount": 6.42
    },
    {
        "id": 766,
        "date": "2024-03-18",
        "category": "Groceries",
        "description": "Expense 766",
        "amount": 19.52
    },
    {
        "id": 767,
        "date": "2024-04-09",
        "category": "Entertainment",
        "description": "Expense 767",
        "amount": 31.82
    },
    {
        "id": 768,
        "date": "2024-04-07",
        "category": "Education",
        "description": "Expense 768",
        "amount": 35.46
    },
    {
        "id": 769,
        "date": "2024-12-27",
        "category": "Entertainment",
        "description": "Expense 769",
        "amount": 46.0
    },
    {
        "id": 770,
        "date": "2024-07-03",
        "category": "Healthcare",
        "description": "Expense 770",
        "amount": 42.34
    },
    {
        "id": 771,
        "date": "2024-02-08",
        "category": "Education",
        "description": "Expense 771",
        "amount": 44.02
    },
    {
        "id": 772,
        "date": "2024-02-27",
        "category": "Food",
        "description": "Expense 772",
        "amount": 290.54
    },
    {
        "id": 773,
        "date": "2024-08-20",
        "category": "Healthcare",
        "description": "Expense 773",
        "amount": 37.3
    },
    {
        "id": 774,
        "date": "2024-01-23",
        "category": "Transportation",
        "description": "Expense 774",
        "amount": 21.64
    },
    {
        "id": 775,
        "date": "2024-05-13",
        "category": "Miscellaneous",
        "description": "Expense 775",
        "amount": 14.5
    },
    {
        "id": 776,
        "date": "2024-06-27",
        "category": "Transportation",
        "description": "Expense 776",
        "amount": 6.96
    },
    {
        "id": 777,
        "date": "2024-09-30",
        "category": "Groceries",
        "description": "Expense 777",
        "amount": 32.38
    },
    {
        "id": 778,
        "date": "2024-08-25",
        "category": "Groceries",
        "description": "Expense 778",
        "amount": 29.64
    },
    {
        "id": 779,
        "date": "2024-03-25",
        "category": "Transportation",
        "description": "Expense 779",
        "amount": 11.57
    },
    {
        "id": 780,
        "date": "2024-12-28",
        "category": "Entertainment",
        "description": "Expense 780",
        "amount": 37.17
    },
    {
        "id": 781,
        "date": "2024-11-24",
        "category": "Education",
        "description": "Expense 781",
        "amount": 15.53
    },
    {
        "id": 782,
        "date": "2024-03-25",
        "category": "Education",
        "description": "Expense 782",
        "amount": 19.18
    },
    {
        "id": 783,
        "date": "2024-11-29",
        "category": "Utilities",
        "description": "Expense 783",
        "amount": 31.87
    },
    {
        "id": 784,
        "date": "2024-10-04",
        "category": "Utilities",
        "description": "Expense 784",
        "amount": 25.5
    },
    {
        "id": 785,
        "date": "2024-06-21",
        "category": "Transportation",
        "description": "Expense 785",
        "amount": 7.83
    },
    {
        "id": 786,
        "date": "2024-02-26",
        "category": "Healthcare",
        "description": "Expense 786",
        "amount": 46.43
    },
    {
        "id": 787,
        "date": "2024-04-09",
        "category": "Groceries",
        "description": "Expense 787",
        "amount": 26.73
    },
    {
        "id": 788,
        "date": "2024-09-20",
        "category": "Education",
        "description": "Expense 788",
        "amount": 48.41
    },
    {
        "id": 789,
        "date": "2024-10-29",
        "category": "Food",
        "description": "Expense 789",
        "amount": 327.89
    },
    {
        "id": 790,
        "date": "2024-06-27",
        "category": "Food",
        "description": "Expense 790",
        "amount": 207.99
    },
    {
        "id": 791,
        "date": "2024-05-10",
        "category": "Groceries",
        "description": "Expense 791",
        "amount": 45.66
    },
    {
        "id": 792,
        "date": "2024-01-24",
        "category": "Utilities",
        "description": "Expense 792",
        "amount": 21.43
    },
    {
        "id": 793,
        "date": "2024-03-28",
        "category": "Utilities",
        "description": "Expense 793",
        "amount": 7.9
    },
    {
        "id": 794,
        "date": "2024-12-20",
        "category": "Housing",
        "description": "Expense 794",
        "amount": 36.57
    },
    {
        "id": 795,
        "date": "2024-07-28",
        "category": "Miscellaneous",
        "description": "Expense 795",
        "amount": 34.28
    },
    {
        "id": 796,
        "date": "2024-04-29",
        "category": "Transportation",
        "description": "Expense 796",
        "amount": 11.48
    },
    {
        "id": 797,
        "date": "2024-12-20",
        "category": "Food",
        "description": "Expense 797",
        "amount": 360.18
    },
    {
        "id": 798,
        "date": "2024-07-06",
        "category": "Entertainment",
        "description": "Expense 798",
        "amount": 29.82
    },
    {
        "id": 799,
        "date": "2024-03-09",
        "category": "Healthcare",
        "description": "Expense 799",
        "amount": 37.03
    },
    {
        "id": 800,
        "date": "2024-09-20",
        "category": "Transportation",
        "description": "Expense 800",
        "amount": 6.44
    },
    {
        "id": 801,
        "date": "2024-04-16",
        "category": "Groceries",
        "description": "Expense 801",
        "amount": 16.78
    },
    {
        "id": 802,
        "date": "2024-08-15",
        "category": "Groceries",
        "description": "Expense 802",
        "amount": 43.63
    },
    {
        "id": 803,
        "date": "2024-05-03",
        "category": "Food",
        "description": "Expense 803",
        "amount": 305.43
    },
    {
        "id": 804,
        "date": "2024-10-30",
        "category": "Miscellaneous",
        "description": "Expense 804",
        "amount": 19.82
    },
    {
        "id": 805,
        "date": "2024-03-20",
        "category": "Transportation",
        "description": "Expense 805",
        "amount": 27.62
    },
    {
        "id": 806,
        "date": "2024-11-25",
        "category": "Education",
        "description": "Expense 806",
        "amount": 17.1
    },
    {
        "id": 807,
        "date": "2024-05-02",
        "category": "Food",
        "description": "Expense 807",
        "amount": 375.71
    },
    {
        "id": 808,
        "date": "2024-02-15",
        "category": "Utilities",
        "description": "Expense 808",
        "amount": 9.87
    },
    {
        "id": 809,
        "date": "2024-08-02",
        "category": "Education",
        "description": "Expense 809",
        "amount": 10.17
    },
    {
        "id": 810,
        "date": "2024-02-19",
        "category": "Healthcare",
        "description": "Expense 810",
        "amount": 44.11
    },
    {
        "id": 811,
        "date": "2024-07-07",
        "category": "Groceries",
        "description": "Expense 811",
        "amount": 8.04
    },
    {
        "id": 812,
        "date": "2024-09-28",
        "category": "Entertainment",
        "description": "Expense 812",
        "amount": 17.88
    },
    {
        "id": 813,
        "date": "2024-01-20",
        "category": "Groceries",
        "description": "Expense 813",
        "amount": 11.7
    },
    {
        "id": 814,
        "date": "2024-10-31",
        "category": "Groceries",
        "description": "Expense 814",
        "amount": 41.01
    },
    {
        "id": 815,
        "date": "2024-08-15",
        "category": "Groceries",
        "description": "Expense 815",
        "amount": 31.1
    },
    {
        "id": 816,
        "date": "2024-08-12",
        "category": "Entertainment",
        "description": "Expense 816",
        "amount": 27.73
    },
    {
        "id": 817,
        "date": "2024-07-08",
        "category": "Food",
        "description": "Expense 817",
        "amount": 236.88
    },
    {
        "id": 818,
        "date": "2024-07-26",
        "category": "Utilities",
        "description": "Expense 818",
        "amount": 43.4
    },
    {
        "id": 819,
        "date": "2024-03-01",
        "category": "Miscellaneous",
        "description": "Expense 819",
        "amount": 9.56
    },
    {
        "id": 820,
        "date": "2024-05-09",
        "category": "Utilities",
        "description": "Expense 820",
        "amount": 47.9
    },
    {
        "id": 821,
        "date": "2024-07-18",
        "category": "Groceries",
        "description": "Expense 821",
        "amount": 33.15
    },
    {
        "id": 822,
        "date": "2024-11-02",
        "category": "Miscellaneous",
        "description": "Expense 822",
        "amount": 37.55
    },
    {
        "id": 823,
        "date": "2024-05-05",
        "category": "Utilities",
        "description": "Expense 823",
        "amount": 24.63
    },
    {
        "id": 824,
        "date": "2024-07-23",
        "category": "Healthcare",
        "description": "Expense 824",
        "amount": 34.08
    },
    {
        "id": 825,
        "date": "2024-10-09",
        "category": "Groceries",
        "description": "Expense 825",
        "amount": 29.47
    },
    {
        "id": 826,
        "date": "2024-04-15",
        "category": "Groceries",
        "description": "Expense 826",
        "amount": 41.67
    },
    {
        "id": 827,
        "date": "2024-01-27",
        "category": "Education",
        "description": "Expense 827",
        "amount": 35.21
    },
    {
        "id": 828,
        "date": "2024-10-27",
        "category": "Transportation",
        "description": "Expense 828",
        "amount": 44.14
    },
    {
        "id": 829,
        "date": "2024-11-13",
        "category": "Miscellaneous",
        "description": "Expense 829",
        "amount": 21.14
    },
    {
        "id": 830,
        "date": "2024-11-01",
        "category": "Entertainment",
        "description": "Expense 830",
        "amount": 35.95
    },
    {
        "id": 831,
        "date": "2024-01-28",
        "category": "Groceries",
        "description": "Expense 831",
        "amount": 16.75
    },
    {
        "id": 832,
        "date": "2024-06-08",
        "category": "Entertainment",
        "description": "Expense 832",
        "amount": 30.05
    },
    {
        "id": 833,
        "date": "2024-07-30",
        "category": "Housing",
        "description": "Expense 833",
        "amount": 17.51
    },
    {
        "id": 834,
        "date": "2024-02-15",
        "category": "Housing",
        "description": "Expense 834",
        "amount": 41.15
    },
    {
        "id": 835,
        "date": "2024-08-23",
        "category": "Food",
        "description": "Expense 835",
        "amount": 360.41
    },
    {
        "id": 836,
        "date": "2024-04-29",
        "category": "Housing",
        "description": "Expense 836",
        "amount": 22.2
    },
    {
        "id": 837,
        "date": "2024-07-04",
        "category": "Utilities",
        "description": "Expense 837",
        "amount": 8.83
    },
    {
        "id": 838,
        "date": "2024-11-26",
        "category": "Utilities",
        "description": "Expense 838",
        "amount": 6.51
    },
    {
        "id": 839,
        "date": "2024-01-20",
        "category": "Transportation",
        "description": "Expense 839",
        "amount": 33.03
    },
    {
        "id": 840,
        "date": "2024-08-11",
        "category": "Food",
        "description": "Expense 840",
        "amount": 245.56
    },
    {
        "id": 841,
        "date": "2024-07-08",
        "category": "Groceries",
        "description": "Expense 841",
        "amount": 25.57
    },
    {
        "id": 842,
        "date": "2024-06-29",
        "category": "Groceries",
        "description": "Expense 842",
        "amount": 5.18
    },
    {
        "id": 843,
        "date": "2024-12-23",
        "category": "Food",
        "description": "Expense 843",
        "amount": 376.62
    },
    {
        "id": 844,
        "date": "2024-08-11",
        "category": "Food",
        "description": "Expense 844",
        "amount": 308.96
    },
    {
        "id": 845,
        "date": "2024-11-02",
        "category": "Utilities",
        "description": "Expense 845",
        "amount": 18.45
    },
    {
        "id": 846,
        "date": "2024-04-03",
        "category": "Transportation",
        "description": "Expense 846",
        "amount": 28.29
    },
    {
        "id": 847,
        "date": "2024-03-16",
        "category": "Food",
        "description": "Expense 847",
        "amount": 268.69
    },
    {
        "id": 848,
        "date": "2024-02-21",
        "category": "Food",
        "description": "Expense 848",
        "amount": 206.52
    },
    {
        "id": 849,
        "date": "2024-01-12",
        "category": "Groceries",
        "description": "Expense 849",
        "amount": 40.48
    },
    {
        "id": 850,
        "date": "2024-07-05",
        "category": "Utilities",
        "description": "Expense 850",
        "amount": 44.18
    },
    {
        "id": 851,
        "date": "2024-12-23",
        "category": "Education",
        "description": "Expense 851",
        "amount": 43.64
    },
    {
        "id": 852,
        "date": "2024-03-22",
        "category": "Transportation",
        "description": "Expense 852",
        "amount": 33.27
    },
    {
        "id": 853,
        "date": "2024-11-23",
        "category": "Food",
        "description": "Expense 853",
        "amount": 309.65
    },
    {
        "id": 854,
        "date": "2024-08-02",
        "category": "Utilities",
        "description": "Expense 854",
        "amount": 44.94
    },
    {
        "id": 855,
        "date": "2024-11-01",
        "category": "Healthcare",
        "description": "Expense 855",
        "amount": 35.06
    },
    {
        "id": 856,
        "date": "2024-01-15",
        "category": "Transportation",
        "description": "Expense 856",
        "amount": 39.82
    },
    {
        "id": 857,
        "date": "2024-11-27",
        "category": "Healthcare",
        "description": "Expense 857",
        "amount": 6.78
    },
    {
        "id": 858,
        "date": "2024-03-16",
        "category": "Housing",
        "description": "Expense 858",
        "amount": 17.23
    },
    {
        "id": 859,
        "date": "2024-04-29",
        "category": "Miscellaneous",
        "description": "Expense 859",
        "amount": 43.3
    },
    {
        "id": 860,
        "date": "2024-12-08",
        "category": "Miscellaneous",
        "description": "Expense 860",
        "amount": 34.17
    },
    {
        "id": 861,
        "date": "2024-06-30",
        "category": "Housing",
        "description": "Expense 861",
        "amount": 15.5
    },
    {
        "id": 862,
        "date": "2024-12-20",
        "category": "Groceries",
        "description": "Expense 862",
        "amount": 35.62
    },
    {
        "id": 863,
        "date": "2024-10-09",
        "category": "Education",
        "description": "Expense 863",
        "amount": 12.69
    },
    {
        "id": 864,
        "date": "2024-09-19",
        "category": "Housing",
        "description": "Expense 864",
        "amount": 10.88
    },
    {
        "id": 865,
        "date": "2024-03-25",
        "category": "Utilities",
        "description": "Expense 865",
        "amount": 12.09
    },
    {
        "id": 866,
        "date": "2024-09-24",
        "category": "Utilities",
        "description": "Expense 866",
        "amount": 5.79
    },
    {
        "id": 867,
        "date": "2024-07-14",
        "category": "Transportation",
        "description": "Expense 867",
        "amount": 15.29
    },
    {
        "id": 868,
        "date": "2024-03-06",
        "category": "Housing",
        "description": "Expense 868",
        "amount": 13.1
    },
    {
        "id": 869,
        "date": "2024-12-02",
        "category": "Miscellaneous",
        "description": "Expense 869",
        "amount": 47.79
    },
    {
        "id": 870,
        "date": "2024-09-05",
        "category": "Utilities",
        "description": "Expense 870",
        "amount": 20.4
    },
    {
        "id": 871,
        "date": "2024-10-31",
        "category": "Utilities",
        "description": "Expense 871",
        "amount": 8.81
    },
    {
        "id": 872,
        "date": "2024-12-12",
        "category": "Housing",
        "description": "Expense 872",
        "amount": 25.73
    },
    {
        "id": 873,
        "date": "2024-04-15",
        "category": "Groceries",
        "description": "Expense 873",
        "amount": 16.16
    },
    {
        "id": 874,
        "date": "2024-05-14",
        "category": "Transportation",
        "description": "Expense 874",
        "amount": 23.02
    },
    {
        "id": 875,
        "date": "2024-03-30",
        "category": "Healthcare",
        "description": "Expense 875",
        "amount": 30.65
    },
    {
        "id": 876,
        "date": "2024-11-23",
        "category": "Housing",
        "description": "Expense 876",
        "amount": 21.33
    },
    {
        "id": 877,
        "date": "2024-10-15",
        "category": "Food",
        "description": "Expense 877",
        "amount": 336.84
    },
    {
        "id": 878,
        "date": "2024-03-09",
        "category": "Food",
        "description": "Expense 878",
        "amount": 270.18
    },
    {
        "id": 879,
        "date": "2024-06-14",
        "category": "Housing",
        "description": "Expense 879",
        "amount": 31.32
    },
    {
        "id": 880,
        "date": "2024-06-01",
        "category": "Food",
        "description": "Expense 880",
        "amount": 316.0
    },
    {
        "id": 881,
        "date": "2024-04-20",
        "category": "Healthcare",
        "description": "Expense 881",
        "amount": 12.99
    },
    {
        "id": 882,
        "date": "2024-04-10",
        "category": "Healthcare",
        "description": "Expense 882",
        "amount": 23.84
    },
    {
        "id": 883,
        "date": "2024-04-27",
        "category": "Groceries",
        "description": "Expense 883",
        "amount": 11.15
    },
    {
        "id": 884,
        "date": "2024-09-18",
        "category": "Transportation",
        "description": "Expense 884",
        "amount": 6.72
    },
    {
        "id": 885,
        "date": "2024-12-29",
        "category": "Entertainment",
        "description": "Expense 885",
        "amount": 11.27
    },
    {
        "id": 886,
        "date": "2024-05-16",
        "category": "Housing",
        "description": "Expense 886",
        "amount": 40.27
    },
    {
        "id": 887,
        "date": "2024-01-28",
        "category": "Transportation",
        "description": "Expense 887",
        "amount": 11.37
    },
    {
        "id": 888,
        "date": "2024-04-18",
        "category": "Entertainment",
        "description": "Expense 888",
        "amount": 12.78
    },
    {
        "id": 889,
        "date": "2024-09-02",
        "category": "Transportation",
        "description": "Expense 889",
        "amount": 10.45
    },
    {
        "id": 890,
        "date": "2024-10-01",
        "category": "Transportation",
        "description": "Expense 890",
        "amount": 25.39
    },
    {
        "id": 891,
        "date": "2024-06-17",
        "category": "Miscellaneous",
        "description": "Expense 891",
        "amount": 10.7
    },
    {
        "id": 892,
        "date": "2024-02-24",
        "category": "Groceries",
        "description": "Expense 892",
        "amount": 19.74
    },
    {
        "id": 893,
        "date": "2024-06-19",
        "category": "Housing",
        "description": "Expense 893",
        "amount": 26.5
    },
    {
        "id": 894,
        "date": "2024-06-19",
        "category": "Housing",
        "description": "Expense 894",
        "amount": 18.22
    },
    {
        "id": 895,
        "date": "2024-08-03",
        "category": "Entertainment",
        "description": "Expense 895",
        "amount": 38.14
    },
    {
        "id": 896,
        "date": "2024-06-11",
        "category": "Entertainment",
        "description": "Expense 896",
        "amount": 43.99
    },
    {
        "id": 897,
        "date": "2024-04-09",
        "category": "Miscellaneous",
        "description": "Expense 897",
        "amount": 32.11
    },
    {
        "id": 898,
        "date": "2024-07-01",
        "category": "Miscellaneous",
        "description": "Expense 898",
        "amount": 23.33
    },
    {
        "id": 899,
        "date": "2024-09-01",
        "category": "Food",
        "description": "Expense 899",
        "amount": 394.59
    },
    {
        "id": 900,
        "date": "2024-06-17",
        "category": "Healthcare",
        "description": "Expense 900",
        "amount": 32.95
    },
    {
        "id": 901,
        "date": "2024-09-05",
        "category": "Housing",
        "description": "Expense 901",
        "amount": 17.06
    },
    {
        "id": 902,
        "date": "2024-01-18",
        "category": "Groceries",
        "description": "Expense 902",
        "amount": 12.06
    },
    {
        "id": 903,
        "date": "2024-12-30",
        "category": "Transportation",
        "description": "Expense 903",
        "amount": 18.98
    },
    {
        "id": 904,
        "date": "2024-08-13",
        "category": "Food",
        "description": "Expense 904",
        "amount": 363.28
    },
    {
        "id": 905,
        "date": "2024-08-06",
        "category": "Education",
        "description": "Expense 905",
        "amount": 47.74
    },
    {
        "id": 906,
        "date": "2024-04-18",
        "category": "Housing",
        "description": "Expense 906",
        "amount": 27.65
    },
    {
        "id": 907,
        "date": "2024-06-09",
        "category": "Education",
        "description": "Expense 907",
        "amount": 22.98
    },
    {
        "id": 908,
        "date": "2024-10-19",
        "category": "Housing",
        "description": "Expense 908",
        "amount": 11.41
    },
    {
        "id": 909,
        "date": "2024-08-05",
        "category": "Healthcare",
        "description": "Expense 909",
        "amount": 37.8
    },
    {
        "id": 910,
        "date": "2024-02-15",
        "category": "Utilities",
        "description": "Expense 910",
        "amount": 36.51
    },
    {
        "id": 911,
        "date": "2024-02-26",
        "category": "Miscellaneous",
        "description": "Expense 911",
        "amount": 43.74
    },
    {
        "id": 912,
        "date": "2024-07-25",
        "category": "Miscellaneous",
        "description": "Expense 912",
        "amount": 11.31
    },
    {
        "id": 913,
        "date": "2024-01-25",
        "category": "Entertainment",
        "description": "Expense 913",
        "amount": 27.71
    },
    {
        "id": 914,
        "date": "2024-01-13",
        "category": "Transportation",
        "description": "Expense 914",
        "amount": 32.69
    },
    {
        "id": 915,
        "date": "2024-12-03",
        "category": "Groceries",
        "description": "Expense 915",
        "amount": 10.55
    },
    {
        "id": 916,
        "date": "2024-10-27",
        "category": "Housing",
        "description": "Expense 916",
        "amount": 15.72
    },
    {
        "id": 917,
        "date": "2024-09-20",
        "category": "Transportation",
        "description": "Expense 917",
        "amount": 9.41
    },
    {
        "id": 918,
        "date": "2024-04-29",
        "category": "Food",
        "description": "Expense 918",
        "amount": 319.01
    },
    {
        "id": 919,
        "date": "2024-02-26",
        "category": "Transportation",
        "description": "Expense 919",
        "amount": 9.43
    },
    {
        "id": 920,
        "date": "2024-05-02",
        "category": "Transportation",
        "description": "Expense 920",
        "amount": 10.32
    },
    {
        "id": 921,
        "date": "2024-04-24",
        "category": "Food",
        "description": "Expense 921",
        "amount": 388.18
    },
    {
        "id": 922,
        "date": "2024-03-19",
        "category": "Miscellaneous",
        "description": "Expense 922",
        "amount": 17.59
    },
    {
        "id": 923,
        "date": "2024-01-06",
        "category": "Education",
        "description": "Expense 923",
        "amount": 6.35
    },
    {
        "id": 924,
        "date": "2024-04-03",
        "category": "Food",
        "description": "Expense 924",
        "amount": 280.51
    },
    {
        "id": 925,
        "date": "2024-12-29",
        "category": "Entertainment",
        "description": "Expense 925",
        "amount": 9.16
    },
    {
        "id": 926,
        "date": "2024-08-02",
        "category": "Education",
        "description": "Expense 926",
        "amount": 9.68
    },
    {
        "id": 927,
        "date": "2024-08-20",
        "category": "Miscellaneous",
        "description": "Expense 927",
        "amount": 39.63
    },
    {
        "id": 928,
        "date": "2024-08-24",
        "category": "Healthcare",
        "description": "Expense 928",
        "amount": 6.54
    },
    {
        "id": 929,
        "date": "2024-03-18",
        "category": "Education",
        "description": "Expense 929",
        "amount": 22.77
    },
    {
        "id": 930,
        "date": "2024-05-27",
        "category": "Miscellaneous",
        "description": "Expense 930",
        "amount": 9.59
    },
    {
        "id": 931,
        "date": "2024-10-21",
        "category": "Groceries",
        "description": "Expense 931",
        "amount": 29.42
    },
    {
        "id": 932,
        "date": "2024-10-04",
        "category": "Food",
        "description": "Expense 932",
        "amount": 294.37
    },
    {
        "id": 933,
        "date": "2024-12-28",
        "category": "Transportation",
        "description": "Expense 933",
        "amount": 9.43
    },
    {
        "id": 934,
        "date": "2024-10-04",
        "category": "Entertainment",
        "description": "Expense 934",
        "amount": 24.39
    },
    {
        "id": 935,
        "date": "2024-01-23",
        "category": "Groceries",
        "description": "Expense 935",
        "amount": 18.74
    },
    {
        "id": 936,
        "date": "2024-11-27",
        "category": "Education",
        "description": "Expense 936",
        "amount": 27.66
    },
    {
        "id": 937,
        "date": "2024-09-22",
        "category": "Housing",
        "description": "Expense 937",
        "amount": 23.61
    },
    {
        "id": 938,
        "date": "2024-04-21",
        "category": "Transportation",
        "description": "Expense 938",
        "amount": 14.39
    },
    {
        "id": 939,
        "date": "2024-05-07",
        "category": "Entertainment",
        "description": "Expense 939",
        "amount": 8.2
    },
    {
        "id": 940,
        "date": "2024-06-09",
        "category": "Groceries",
        "description": "Expense 940",
        "amount": 24.43
    },
    {
        "id": 941,
        "date": "2024-11-19",
        "category": "Transportation",
        "description": "Expense 941",
        "amount": 21.06
    },
    {
        "id": 942,
        "date": "2024-01-30",
        "category": "Groceries",
        "description": "Expense 942",
        "amount": 42.7
    },
    {
        "id": 943,
        "date": "2024-08-05",
        "category": "Miscellaneous",
        "description": "Expense 943",
        "amount": 38.06
    },
    {
        "id": 944,
        "date": "2024-04-10",
        "category": "Miscellaneous",
        "description": "Expense 944",
        "amount": 26.5
    },
    {
        "id": 945,
        "date": "2024-01-22",
        "category": "Miscellaneous",
        "description": "Expense 945",
        "amount": 30.2
    },
    {
        "id": 946,
        "date": "2024-06-06",
        "category": "Healthcare",
        "description": "Expense 946",
        "amount": 42.13
    },
    {
        "id": 947,
        "date": "2024-03-31",
        "category": "Healthcare",
        "description": "Expense 947",
        "amount": 44.27
    },
    {
        "id": 948,
        "date": "2024-07-06",
        "category": "Education",
        "description": "Expense 948",
        "amount": 5.84
    },
    {
        "id": 949,
        "date": "2024-09-15",
        "category": "Entertainment",
        "description": "Expense 949",
        "amount": 12.2
    },
    {
        "id": 950,
        "date": "2024-01-10",
        "category": "Transportation",
        "description": "Expense 950",
        "amount": 41.61
    },
    {
        "id": 951,
        "date": "2024-07-19",
        "category": "Utilities",
        "description": "Expense 951",
        "amount": 7.77
    },
    {
        "id": 952,
        "date": "2024-10-03",
        "category": "Education",
        "description": "Expense 952",
        "amount": 16.75
    },
    {
        "id": 953,
        "date": "2024-10-18",
        "category": "Housing",
        "description": "Expense 953",
        "amount": 30.99
    },
    {
        "id": 954,
        "date": "2024-06-11",
        "category": "Entertainment",
        "description": "Expense 954",
        "amount": 12.9
    },
    {
        "id": 955,
        "date": "2024-06-10",
        "category": "Entertainment",
        "description": "Expense 955",
        "amount": 31.8
    },
    {
        "id": 956,
        "date": "2024-01-06",
        "category": "Education",
        "description": "Expense 956",
        "amount": 43.2
    },
    {
        "id": 957,
        "date": "2024-10-14",
        "category": "Housing",
        "description": "Expense 957",
        "amount": 33.1
    },
    {
        "id": 958,
        "date": "2024-03-18",
        "category": "Miscellaneous",
        "description": "Expense 958",
        "amount": 41.65
    },
    {
        "id": 959,
        "date": "2024-12-04",
        "category": "Healthcare",
        "description": "Expense 959",
        "amount": 44.35
    },
    {
        "id": 960,
        "date": "2024-08-08",
        "category": "Food",
        "description": "Expense 960",
        "amount": 279.78
    },
    {
        "id": 961,
        "date": "2024-07-22",
        "category": "Housing",
        "description": "Expense 961",
        "amount": 20.83
    },
    {
        "id": 962,
        "date": "2024-07-21",
        "category": "Healthcare",
        "description": "Expense 962",
        "amount": 44.67
    },
    {
        "id": 963,
        "date": "2024-01-28",
        "category": "Healthcare",
        "description": "Expense 963",
        "amount": 6.17
    },
    {
        "id": 964,
        "date": "2024-07-26",
        "category": "Entertainment",
        "description": "Expense 964",
        "amount": 22.69
    },
    {
        "id": 965,
        "date": "2024-10-24",
        "category": "Housing",
        "description": "Expense 965",
        "amount": 6.45
    },
    {
        "id": 966,
        "date": "2024-08-07",
        "category": "Transportation",
        "description": "Expense 966",
        "amount": 14.77
    },
    {
        "id": 967,
        "date": "2024-03-06",
        "category": "Utilities",
        "description": "Expense 967",
        "amount": 46.76
    },
    {
        "id": 968,
        "date": "2024-04-21",
        "category": "Entertainment",
        "description": "Expense 968",
        "amount": 13.09
    },
    {
        "id": 969,
        "date": "2024-03-14",
        "category": "Entertainment",
        "description": "Expense 969",
        "amount": 10.79
    },
    {
        "id": 970,
        "date": "2024-08-26",
        "category": "Education",
        "description": "Expense 970",
        "amount": 11.46
    },
    {
        "id": 971,
        "date": "2024-02-27",
        "category": "Groceries",
        "description": "Expense 971",
        "amount": 13.5
    },
    {
        "id": 972,
        "date": "2024-05-03",
        "category": "Education",
        "description": "Expense 972",
        "amount": 37.89
    },
    {
        "id": 973,
        "date": "2024-11-24",
        "category": "Utilities",
        "description": "Expense 973",
        "amount": 46.24
    },
    {
        "id": 974,
        "date": "2024-08-17",
        "category": "Transportation",
        "description": "Expense 974",
        "amount": 11.45
    },
    {
        "id": 975,
        "date": "2024-06-12",
        "category": "Utilities",
        "description": "Expense 975",
        "amount": 43.1
    },
    {
        "id": 976,
        "date": "2024-04-18",
        "category": "Utilities",
        "description": "Expense 976",
        "amount": 41.47
    },
    {
        "id": 977,
        "date": "2024-03-18",
        "category": "Entertainment",
        "description": "Expense 977",
        "amount": 31.56
    },
    {
        "id": 978,
        "date": "2024-09-22",
        "category": "Food",
        "description": "Expense 978",
        "amount": 276.06
    },
    {
        "id": 979,
        "date": "2024-08-19",
        "category": "Miscellaneous",
        "description": "Expense 979",
        "amount": 49.15
    },
    {
        "id": 980,
        "date": "2024-06-27",
        "category": "Healthcare",
        "description": "Expense 980",
        "amount": 20.3
    },
    {
        "id": 981,
        "date": "2024-10-19",
        "category": "Housing",
        "description": "Expense 981",
        "amount": 42.33
    },
    {
        "id": 982,
        "date": "2024-12-18",
        "category": "Miscellaneous",
        "description": "Expense 982",
        "amount": 33.47
    },
    {
        "id": 983,
        "date": "2024-08-03",
        "category": "Transportation",
        "description": "Expense 983",
        "amount": 42.22
    },
    {
        "id": 984,
        "date": "2024-03-12",
        "category": "Food",
        "description": "Expense 984",
        "amount": 292.02
    },
    {
        "id": 985,
        "date": "2024-10-28",
        "category": "Entertainment",
        "description": "Expense 985",
        "amount": 6.81
    },
    {
        "id": 986,
        "date": "2024-03-13",
        "category": "Groceries",
        "description": "Expense 986",
        "amount": 34.65
    },
    {
        "id": 987,
        "date": "2024-08-21",
        "category": "Utilities",
        "description": "Expense 987",
        "amount": 40.69
    },
    {
        "id": 988,
        "date": "2024-02-12",
        "category": "Healthcare",
        "description": "Expense 988",
        "amount": 38.89
    },
    {
        "id": 989,
        "date": "2024-10-30",
        "category": "Utilities",
        "description": "Expense 989",
        "amount": 48.34
    },
    {
        "id": 990,
        "date": "2024-09-27",
        "category": "Food",
        "description": "Expense 990",
        "amount": 340.0
    },
    {
        "id": 991,
        "date": "2024-05-01",
        "category": "Entertainment",
        "description": "Expense 991",
        "amount": 9.03
    },
    {
        "id": 992,
        "date": "2024-04-20",
        "category": "Healthcare",
        "description": "Expense 992",
        "amount": 8.34
    },
    {
        "id": 993,
        "date": "2024-06-27",
        "category": "Transportation",
        "description": "Expense 993",
        "amount": 24.13
    },
    {
        "id": 994,
        "date": "2024-04-06",
        "category": "Groceries",
        "description": "Expense 994",
        "amount": 8.0
    },
    {
        "id": 995,
        "date": "2024-06-03",
        "category": "Utilities",
        "description": "Expense 995",
        "amount": 17.92
    },
    {
        "id": 996,
        "date": "2024-02-04",
        "category": "Miscellaneous",
        "description": "Expense 996",
        "amount": 29.37
    },
    {
        "id": 997,
        "date": "2024-12-10",
        "category": "Education",
        "description": "Expense 997",
        "amount": 8.52
    },
    {
        "id": 998,
        "date": "2024-06-01",
        "category": "Healthcare",
        "description": "Expense 998",
        "amount": 27.8
    },
    {
        "id": 999,
        "date": "2024-10-28",
        "category": "Food",
        "description": "Expense 999",
        "amount": 328.7
    },
    {
        "id": 1000,
        "date": "2024-04-02",
        "category": "Healthcare",
        "description": "Expense 1000",
        "amount": 10.32
    }
]
`
  localStorage.setItem("expenses", mockData)
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
