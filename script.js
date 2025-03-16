let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let totalTax = document.getElementById("totalTax");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode = "create";
let temp;

function getTotal() {
  if (price.value != "") {
    let result =
      +price.value +
      +price.value * (+taxes.value / 100) +
      +ads.value -
      +discount.value;
    result = result.toFixed(2);
    total.innerHTML = `${result} ريال`;
    total.style.background = "green";
    let taxResult = +price.value * (+taxes.value / 100);
    // taxResult = taxResult.toFixed(2);
    totalTax.innerHTML = `${taxResult} ريال`;
    totalTax.style.background = "green";
  } else {
    total.innerHTML = "Price❌";

    total.style.background = "red";
    totalTax.style.background = "red";
  }
}

let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

function create() {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (title.value != "" && price.value != "" && category.value !== "") {
    if (mode === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[temp] = newProduct;
    }
    clear();
  }

  localStorage.setItem("product", JSON.stringify(dataProduct));

  

  showData();
  
}

function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  totalTax.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showData() {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
        <tr class="tr">
        <td class="td">${i + 1}</td>
        <td class="td">${dataProduct[i].title}</td>
        <td class="td">${dataProduct[i].price} ريال</td>
        <td class="td">${dataProduct[i].taxes} %</td>
        <td class="td">${dataProduct[i].ads}</td>
        <td class="td">${dataProduct[i].discount}</td>
        <td class="td">${dataProduct[i].total}</td>
        <td class="td">${dataProduct[i].category}</td>
        <td class="td"><button onclick="updateData(${i})" class="update">Update</button></td>
        <td class="td"><button onclick="deleteBtn(${i})" class="delete">Delete</button></td>
        </tr>
        `;
  }

  document.getElementById("tbody").innerHTML = table;
  let deleteAllBtn = document.getElementById("delete-all");

  if (dataProduct.length > 0) {
    deleteAllBtn.innerHTML = `
            <button onclick="deleteAll()" id="delete-all" " >Delete All (${dataProduct.length} item's)</button>
            `;
  } else {
    deleteAllBtn.innerHTML = "";
    deleteAllBtn.style.display = "none";
  }
  
}

function deleteBtn(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}

function deleteAll() {
  let confirmation = confirm(
    `Are you sure you want to delete all items? ${dataProduct.length} item's`
  );
  if (confirmation) {
    localStorage.clear();
    dataProduct.splice(0);
    showData();
  } else {
    console.log("deletion canceled");
  }
}

function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  total.innerHTML = dataProduct[i].total;
  category.value = dataProduct[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerText = "Update";
  temp = i;
  mode = "update";
}

let searchMode = "title";

function getSearchMode(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMode = "title";
    search.placeholder = "Search BY Title";
  } else {
    searchMode = "category";
    search.placeholder = "Search BY Category";
  }
  search.placeholder = `Search BY ${searchMode}`;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMode == "title") {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `
        <tr class="tr">
        <td class="td">${i + 1}</td>
        <td class="td">${dataProduct[i].title}</td>
        <td class="td">${dataProduct[i].price} ريال</td>
        <td class="td">${dataProduct[i].taxes} %</td>
        <td class="td">${dataProduct[i].ads}</td>
        <td class="td">${dataProduct[i].discount}</td>
        <td class="td">${dataProduct[i].total}</td>
        <td class="td">${dataProduct[i].category}</td>
        <td class="td"><button onclick="updateData(${i})" class="update">Update</button></td>
        <td class="td"><button onclick="deleteBtn(${i})" class="delete">Delete</button></td>
        </tr>
        `;
      }
    } else {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += `
          <tr class="tr">
          <td class="td">${i + 1}</td>
          <td class="td">${dataProduct[i].title}</td>
          <td class="td">${dataProduct[i].price} ريال</td>
          <td class="td">${dataProduct[i].taxes} %</td>
          <td class="td">${dataProduct[i].ads}</td>
          <td class="td">${dataProduct[i].discount}</td>
          <td class="td">${dataProduct[i].total}</td>
          <td class="td">${dataProduct[i].category}</td>
          <td class="td"><button onclick="updateData(${i})" class="update">Update</button></td>
          <td class="td"><button onclick="deleteBtn(${i})" class="delete">Delete</button></td>
          </tr>
          `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

showData();
