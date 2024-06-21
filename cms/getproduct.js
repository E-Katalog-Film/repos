// Fetch all products from the server
function getProducts() {
  // fetch('https://asia-southeast2-testlogin-366704.cloudfunctions.net/getallproduct')
  fetch('https://asia-southeast2-testlogin-366704.cloudfunctions.net/getall-product_berkemah')
    .then(response => response.json())
    .then(data => {
      if (data.status === true) {
        displayProducts(data.data);
      } else {
        console.error('Failed to fetch products');
      }
    })
    .catch(error => console.error('Error:', error));
}

// Display products in the table
function displayProducts(products) {
  const tableBody = document.getElementById('productTableBody');
  tableBody.innerHTML = '';

  products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.ID}</td>
      <td>${product.nomorid}</td>
      <td>${product.name}</td>
      <td>${product.description}</td>
      <td>${product.price}</td>
      <td>${product.stock}</td>
      <td>${product.size}</td>
      <td><img src="${product.image}" alt="Product Image" style="width: 50px; height: 50px;"></td>
      <td>${product.status ? 'True' : 'False'}</td>
      <td><a href="updated.html?id=${product.nomorid}&name=${product.name}&description=${product.description}&price=${product.price}&stock=${product.stock}&size=${product.size}&image=${product.image}&status=${product.status}">Edit</a></td>
      <td><a href="delete.html?id=${product.nomorid}">Delete</a></td>
    `;
    tableBody.appendChild(row);
  });
}

// Fetch and display products on page load
window.onload = getProducts;
