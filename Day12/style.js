// Sample product data
var productData = [
  {
    productId: 1,
    productName: "Sản phẩm 1",
    productPrice: 1000,
  },
  {
    productId: 2,
    productName: "Sản phẩm 2",
    productPrice: 2000,
  },
  {
    productId: 3,
    productName: "Sản phẩm 3",
    productPrice: 3000,
  },
  {
    productId: 4,
    productName: "Sản phẩm 4",
    productPrice: 4000,
  },
];

// Get the product table element
var productTable = document.querySelector("#product_table");
for (var i = 0; i < productData.length; i++) {
  var productItem = productData[i];
  var tableRow = document.createElement("tr");
  var tdCount = document.createElement("td");
  tdCount.textContent = i + 1;
  tableRow.appendChild(tdCount);
  var tdProductName = document.createElement("td");
  tdProductName.textContent = productItem.productName;
  tableRow.appendChild(tdProductName);
  var tdProductPrice = document.createElement("td");
  tdProductPrice.textContent = productItem.productPrice;
  tableRow.appendChild(tdProductPrice);
  var tdAction = document.createElement("td");

  var inputQuantity = document.createElement("input");
  inputQuantity.type = "number";
  inputQuantity.id = "quantity_" + productItem.productId;
  inputQuantity.value = "1";
  inputQuantity.style.width = "90%";
  inputQuantity.style.display = "block";
  inputQuantity.style.margin = "0 auto";
  tdAction.appendChild(inputQuantity);

  var buttonAddToCart = document.createElement("button");
  buttonAddToCart.type = "button";
  buttonAddToCart.id = "add_to_cart_" + productItem.productId;
  buttonAddToCart.textContent = "Thêm vào giỏ";
  buttonAddToCart.style.width = "100%";
  tdAction.appendChild(buttonAddToCart);

  tableRow.appendChild(tdAction);
  productTable.appendChild(tableRow);
}

// Get all "add to cart" buttons
document
  .querySelectorAll("#product_table button")
  .forEach((addToCartButton) => {
    addToCartButton.addEventListener("click", () => {
      const quantityInput =
        addToCartButton.parentElement.querySelector("input");
      const productId = parseInt(quantityInput.id.replace("quantity_", ""));
      let quantityValue = parseInt(quantityInput.value);

      if (quantityValue < 1) {
        quantityValue = 1;
      }

      let cartData = JSON.parse(sessionStorage.getItem("cart")) || [];

      const existingCartItemIndex = cartData.findIndex(
        (item) => item.productId === productId
      );

      if (existingCartItemIndex !== -1) {
        cartData[existingCartItemIndex].quantity += quantityValue;
      } else {
        cartData.push({
          productId: productId,
          quantity: quantityValue,
        });
      }
      sessionStorage.setItem("cart", JSON.stringify(cartData));
      // Render the updated cart
      renderCart();
    });
  });

// Truy xuất sản phẩm theo ID
const getProduct = (productId) =>
  productData.find((product) => product.productId === productId);
function renderCart() {
  var cartData = sessionStorage.getItem("cart");
  cartData = JSON.parse(cartData);
  if (cartData !== null && cartData.length > 0) {
    var cartTableHtml = `
    <table cellpadding="0" cellspacing="0" width="100%" border="1" id="cart_table">
      <thead>
        <tr>
          <th width="5%">STT</th>
          <th>Tên sản phẩm</th>
          <th width="30%">Số lượng</th>
          <th width="30%">Giá</th>
          <th width="10%">Xoá</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table> <hr/>
      <button type="button" id="update_cart">Cập nhập giỏ hàng</button>
      <button type="button" id="delete_cart">Xoá giỏ hàng</button>
    `;

    document.querySelector("#cart_data").innerHTML = cartTableHtml;
    var count = 0; // Đếm sản phẩm
    var totalQuantity = 0; // Tổng số lượng của tất cả sản phẩm
    var totalAmount = 0; // Tổng số tiền của tất cả sản phẩm

    cartData.forEach(function (cartItem) {
      count++;
      var productDetail = getProduct(cartItem.productId);
      var amount =
        parseInt(productDetail.productPrice) * parseInt(cartItem.quantity);
      totalAmount += parseInt(amount);
      totalQuantity += parseInt(cartItem.quantity);
      var trHtml =
        `
        <tr>
          <td>` +
        count +
        `</td>
          <td>` +
        productDetail.productName +
        `</td>
          <td><input type = "number" class="quantity" data-id = "` +
        cartItem.productId +
        `"value="` +
        cartItem.quantity +
        `"></td>"
          <td> ` +
        amount +
        `</td>
          <td><button type="button" class="delete-item">Xoá</button></td>
        </tr>
      `;
      // Append the row to the cart table;
      document.querySelector("#cart_table tbody").innerHTML += trHtml;
    });

    if (count > 0) {
      var lastTr =
        `
        <tr>
            <td colspan="3">Tổng</td> ` +
        totalQuantity +
        `</td>  
            <td colspan="2"> ` +
        totalAmount +
        `</td>
        </tr>`;
      // Append the last row width total information
      document.querySelector("#cart_table tbody").innerHTML += lastTr;
    }
    updateCart();
    deleteCart();
    deleteAll();
  } else {
    document.querySelector("#cart_data").innerHTML =
      "Giỏ hàng không có sản phẩm";
  }
}

// Function to update the cart
function updateCart() {
  const updateButton = document.querySelector("#cart_data #update_cart");
  if (!updateButton) return;
  updateButton.addEventListener("click", () => {
    const cartItems = document.querySelectorAll("#cart_table tbody .quantity");
    if (!cartItems || cartItems.length === 0) return;
    const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];
    cartItems.forEach((cartItem) => {
      const quantityValue = parseInt(cartItem.value);
      const productId = parseInt(cartItem.getAttribute("data-id"));
      const foundIndex = cartData.findIndex(
        (item) => item.productId === productId
      );
      if (foundIndex !== -1) {
        if (quantityValue > 0) {
          cartData[foundIndex].quantity = quantityValue;
        } else {
          cartData.splice(foundIndex, 1);
        }
      }
    });
    const cartJson = JSON.stringify(cartData);
    sessionStorage.setItem("cart", cartJson);
    alert("Cập nhật giỏ hàng thành công");
    renderCart();
  });
}

function deleteCart() {
  document.querySelectorAll(".delete-item").forEach((deleteItem) => {
    deleteItem.addEventListener("click", () => {
      if (!confirm("Are you sure?")) return;

      const productId = parseInt(
        deleteItem
          .closest("tr")
          .querySelector(".quantity")
          .getAttribute("data-id")
      );

      const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];
      const updatedCartData = cartData.filter(
        (item) => item.productId !== productId
      );

      sessionStorage.setItem("cart", JSON.stringify(updatedCartData));
      alert("Xoá sản phẩm thành công");
      renderCart();
    });
  });
}
// Function to delete all items from the cart
function deleteAll() {
  document.querySelector("#delete_cart").onclick = function () {
    if (confirm("Are you sure?")) {
      sessionStorage.removeItem("cart");
      alert("Xoá giỏ hàng thành công");
      renderCart();
    }
  };
}

renderCart();
