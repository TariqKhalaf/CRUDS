let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let tbody = document.getElementById("tbody");
let delAll = document.getElementById("deleteAll");
let error = document.getElementById("error");
let mood = "update";
let tmp;

// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#0d25b0";
  }
}

// create product & save to localStorage

let products;
if (localStorage.product != null) {
  products = JSON.parse(localStorage.product);
} else {
  products = [];
}

create.addEventListener("click", function (e) {
  {
    mood = "create";
    let newProduct = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value,
    };
    if (mood === "create") {
      if (
        newProduct.title.trim() != "" &&
        newProduct.price.trim() != "" &&
        newProduct.category.trim() != ""
      ) {
        // لو العدد أكتر من واحد
        if (newProduct.count > 1) {
          for (let i = 1; i < newProduct.count; i++) {
            products.push(newProduct);
          }
        } else {
          products.push(newProduct);
        }
        error.style.display = "none";
      } else {
        error.style.display = "block";
        e.preventDefault();
      }
    } else {
      products[tmp] = newProduct;
    }
    localStorage.setItem("product", JSON.stringify(products));

    clearData();
  }
});

// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read
function showData() {
  let table = "";
  for (let i = 0; i < products.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
            <td><button onclick="deleteProduct( ${i})" id="delete">Delete</button></td>
        </tr>
        
        `;
  }
  tbody.innerHTML = table;

  if (products.length > 0) {
    delAll.innerHTML = `
        <button onclick = "deleteAll()" >Delete All (${products.length})</button>
        `;
  } else {
    delAll.innerHTML = "";
  }
}
showData();

// delete & deleteAll
function deleteProduct(i) {
  products.splice(i, 1);
  localStorage.product = JSON.stringify(products);
  showData();
}

function deleteAll() {
  localStorage.clear();
  products.splice(0);
  showData();
}

// update
function updateProduct(i) {
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  ads.value = products[i].ads;
  discount.value = products[i].discount;
  category.value = products[i].category;
  count.style.display = "none";
  create.innerHTML = "Update";
  tmp = i;
  mood = "update";
  getTotal();
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchMood;
function searchProduct(id) {
  let search = document.querySelector("#search");
  if (id == "searchByTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = `Search By ${searchMood}`;
  search.focus();
  search.value = "";
  showData();
}

function searchBy(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
            <td><button onclick="deleteProduct( ${i})" id="delete">Delete</button></td>
        </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
            <td><button onclick="deleteProduct( ${i})" id="delete">Delete</button></td>
        </tr>
        `;
      }
    }
  }
  tbody.innerHTML = table;
}
