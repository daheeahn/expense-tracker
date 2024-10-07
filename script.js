// Initial Data
let tableEntries = [
  { type: "shopping", memo: "Buy some grocery", amount: 25000 },
  { type: "subscription", memo: "Netflix", amount: 18000 },
  { type: "food", memo: "Buy a ramen", amount: 20000 },
  { type: "transportation", memo: "Buy a compass card", amount: 30000 },
];

// Function to update data expense summary
function updateSummary() {
  let totalExpense = tableEntries.reduce((ex, e) => {
    ex += e.amount;
    return ex;
  }, 0);
  updatedExp.innerText = totalExpense;
}

// Function to add new entry to the dataset and expense table
function addItem() {
  let type = itemType.value;
  let memo = document.getElementById("memo");
  let amount = document.getElementById("amount");
  let date = document.getElementById("date");

  // Input validation
  if (memo.value === "") return alert("Put Memo");
  if (Number(amount.value) === 0) return alert("Put Amount");
  if (Number(amount.value) <= 0)
    return alert("Incorrect amount! can't add negative");

  // Push new data
  tableEntries.push({
    type: type,
    memo: memo.value,
    amount: Number(amount.value),
    date: date.value,
  });

  updateTable();
  memo.value = "";
  amount.value = 0;
}

// Function to load all entry in the expense table
function loadItems(e, i) {
  let table = document.getElementById("table");
  let row = table.insertRow(i + 1);
  let cell0 = row.insertCell(0);
  let cell1 = row.insertCell(1);
  let cell2 = row.insertCell(2);
  let cell3 = row.insertCell(3);
  let cell4 = row.insertCell(4);
  cell0.innerHTML = i + 1;
  cell1.innerHTML = e.memo;
  cell2.innerHTML = e.amount;
  cell3.innerHTML = e.type;
  cell4.innerHTML = "&#9746;";
  cell4.classList.add("zoom");
  cell4.addEventListener("click", () => del(e));
}

// Clear the table before updation
function remove() {
  while (table.rows.length > 1) table.deleteRow(-1);
}

// Function to delete a specific entry
function del(el) {
  remove();
  tableEntries = tableEntries.filter((e) => e.name !== el.name);
  tableEntries.map((e, i) => loadItems(e, i));
  updateSummary();
}

// To render all entries
function updateTable() {
  remove();
  tableEntries.map((e, i) => {
    loadItems(e, i);
  });
  updateSummary();
}

updateTable();
