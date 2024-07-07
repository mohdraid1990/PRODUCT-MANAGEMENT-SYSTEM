let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchcategory");
let deleteAllBtn = document.getElementById("deleteAll");

let datapro = [];

// Load products from localStorage
if (localStorage.product) {
  try {
    datapro = JSON.parse(localStorage.product);
    if (!Array.isArray(datapro)) {
      datapro = [];
    }
  } catch (e) {
    datapro = [];
  }
}

// Get Total
function getTotal() {
  if (price.value != "") {
    let res = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = res;
    total.style.backgroundColor = "#3c5a92";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#af4d4d";
  }
}

// Create product
function createProduct() {
  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  for (let i = 0; i < newpro.count; i++) {
    datapro.push(newpro);
  }

  localStorage.setItem("product", JSON.stringify(datapro));
  cleardata();
  showdata();
}

submit.onclick = createProduct;

// Clear inputs
function cleardata() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

// Read and display data
function showdata() {
  let table = '';
  for (let i = 0; i < datapro.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].category}</td>
       <td><button onclick="updateProduct(${i})"><i class="fa-regular fa-pen-to-square"></i></button></td>
        <td><button onclick="deleteProduct(${i})"><i class="fa-solid fa-trash"></i></button></td>
      </tr>`;
  }
  document.getElementById('tbody').innerHTML = table;
  // Show or hide delete all button
  deleteAllBtn.style.display = datapro.length > 0 ? 'block' : 'none';
}

// Update product
function updateProduct(index) {
  let product = datapro[index];
  title.value = product.title;
  price.value = product.price;
  taxes.value = product.taxes;
  ads.value = product.ads;
  discount.value = product.discount;
  count.value = product.count;
  category.value = product.category;

  // Scroll to the top of the page
  document.querySelector('.inputs').scrollIntoView({ behavior: 'smooth' });

  submit.onclick = function () {
    datapro[index] = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value,
    };
    localStorage.setItem("product", JSON.stringify(datapro));
    cleardata();
    showdata();
    // Restore the default submit behavior
    submit.onclick = createProduct;
  };
}

// Delete product
function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    datapro.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(datapro));
    showdata();
  }
}

// Delete all products
deleteAllBtn.onclick = function () {
  if (confirm("Are you sure you want to delete all products?")) {
    datapro = [];
    localStorage.setItem("product", JSON.stringify(datapro));
    showdata();
  }
}

// Search functionality
search.onkeyup = function () {
  let value = search.value.toLowerCase();
  let filteredData = datapro.filter(product => 
    product.title.toLowerCase().includes(value) || 
    product.category.toLowerCase().includes(value)
  );
  let table = '';
  for (let i = 0; i < filteredData.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${filteredData[i].title}</td>
        <td>${filteredData[i].price}</td>
        <td>${filteredData[i].taxes}</td>
        <td>${filteredData[i].ads}</td>
        <td>${filteredData[i].total}</td>
        <td>${filteredData[i].discount}</td>
        <td>${filteredData[i].category}</td>
       <td><button onclick="updateProduct(${i})"><i class="fa-regular fa-pen-to-square"></i></button></td>
        <td><button onclick="deleteProduct(${i})"><i class="fa-solid fa-trash"></i></button></td>
      </tr>`;
  }
  document.getElementById('tbody').innerHTML = table;
}

// Initial call to display data if available
showdata();

// Add event listeners for Enter key to create product
function handleEnterKey(event) {
  if (event.key === 'Enter') {
    createProduct();
  }
}

title.addEventListener('keydown', handleEnterKey);
price.addEventListener('keydown', handleEnterKey);
taxes.addEventListener('keydown', handleEnterKey);
ads.addEventListener('keydown', handleEnterKey);
discount.addEventListener('keydown', handleEnterKey);
count.addEventListener('keydown', handleEnterKey);
category.addEventListener('keydown', handleEnterKey);
