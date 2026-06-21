// Cart array to store items
let cart = [];

// Add item to cart
function addToCart(name, price) {
  let item = {
    name: name,
    price: price
  };

  cart.push(item);
  displayCart();
}

// Remove item from cart
function removeItem(index) {
  cart.splice(index, 1);
  displayCart();
}

// Display cart items
function displayCart() {
  let cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";

  if (cart.length == 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
    document.getElementById("total").textContent = "0";
    return;
  }

  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let li = document.createElement("li");

    li.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price}</span>
      <button class="remove-btn" onclick="removeItem(${i})">Remove</button>
    `;

    cartList.appendChild(li);
    total += item.price;
  }

  document.getElementById("total").textContent = total;
}