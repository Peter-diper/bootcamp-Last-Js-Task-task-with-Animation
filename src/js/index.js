const searchSection = document.querySelector(".search-wrapper");
const mainSection = document.querySelector(".content--section");

const searchInput = document.querySelector("#search");

// order Btns
const priceArrowBtn = document.querySelector("#price-arrow");
const dateArrowBtn = document.querySelector("#date-arrow");
const idArrowBtn = document.querySelector("#id-arrow");

const tableBody = document.querySelector("#table-body");

//show tabale element
const overlay = document.querySelector(".overlay");
const btnStart = document.querySelector("#btn-calc");

//* Events

// show table
btnStart.addEventListener("click", showTable);

// load document
document.addEventListener("DOMContentLoaded", reander);

//* functions

// show table function
function showTable(e) {
  e.target.classList.add("hidden");
  overlay.classList.remove("hidden");

  setTimeout(() => {
    searchSection.classList.remove("hidden");
    searchSection.classList.add("opacity--animatin");

    mainSection.classList.remove("hidden");
    mainSection.classList.add("opacity--animatin");

    overlay.classList.add("hidden");

    tableBody.classList.add("scale--animatin");
    mainSection.classList.add("scale--animatin");

    // remove table body scale animation
    setTimeout(() => {
      tableBody.classList.remove("scale--animatin");
    }, 601);
  }, 2000);
}

// rander table Data
async function reander() {
  const respnce = await fetch("db.json");
  const tableData = (await respnce.json()).transactions;
  console.log(tableData);

  // call table items
  showTableItem(tableData);

  priceArrowBtn.addEventListener("click", orderPrice);
  dateArrowBtn.addEventListener("click", orderDate);
  idArrowBtn.addEventListener("click", orderId);

  searchInput.addEventListener("input", searchRefId);

  // order by price function
  function orderPrice(e) {
    if (e.target.ariaSelected === "false") {
      let sortedData = tableData.sort((a, b) => a.price - b.price);
      showTableItem(sortedData);
      e.target.ariaSelected = "true";
      e.target.classList.add("arrow--active");

      return;
    }
    let sortedData = tableData.sort((a, b) => b.price - a.price);
    showTableItem(sortedData);
    e.target.ariaSelected = "false";
    e.target.classList.remove("arrow--active");
  }

  // order by date function
  function orderDate(e) {
    if (e.target.ariaSelected === "false") {
      let sortedData = tableData.sort((a, b) => a.date - b.date);
      showTableItem(sortedData);
      e.target.ariaSelected = "true";
      e.target.classList.add("arrow--active");
      return;
    }
    let sortedData = tableData.sort((a, b) => b.date - a.date);
    showTableItem(sortedData);
    e.target.ariaSelected = "false";
    e.target.classList.remove("arrow--active");
  }

  // order by id function
  function orderId(e) {
    if (e.target.ariaSelected === "false") {
      let sortedData = tableData.sort((a, b) => a.id - b.id);
      showTableItem(sortedData);
      e.target.ariaSelected = "true";
      e.target.classList.add("arrow--active");
      return;
    }
    let sortedData = tableData.sort((a, b) => b.id - a.id);
    showTableItem(sortedData);
    e.target.ariaSelected = "false";
    e.target.classList.remove("arrow--active");
  }

  function searchRefId(e) {
    const refIdValue = e.target.value;

    const result = tableData.filter((value) => {
      const strRef = `${value.refId}`;
      return strRef.includes(refIdValue);
    });
    showTableItem(result);
  }
}

// show table items
function showTableItem(data) {
  tableBody.classList.add("opacity--animatin");

  let tableRow = "";
  data.forEach((value, index) => {
    tableRow += `
          <tr id="transaction">
            <td id="transaction-id">${value.id}</td>
            <td id="transaction-type">${value.type}</td>
            <td id="transaction-price">${value.price}</td>
            <td id="transaction-refId">${value.refId}</td>
            <td id="transaction-date">${new Date(value.date).toLocaleDateString(
              "fa-ir"
            )}</td>
          </tr>
    `;
  });

  //* render table data
  tableBody.innerHTML = tableRow;

  // change transaction color
  const transaction_type = document.querySelectorAll("#transaction-type");

  transaction_type.forEach((element) => {
    element.textContent === "افزایش اعتبار"
      ? element.classList.add("text-green")
      : element.classList.add("text-red");
  });

  setTimeout(() => {
    tableBody.classList.remove("opacity--animatin");
  }, 500);
  return;
}
// order Price
