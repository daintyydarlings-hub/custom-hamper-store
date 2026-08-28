let cart = [];

// ADD HAMPER
function addHamper(name, price) {

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart 🛒");
}


// UPDATE CART COUNT
function updateCart() {

    const count = document.getElementById("cartCount");

    if (!count) return;

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    count.innerText = totalItems;

    displayCart();
}


// DISPLAY CART
function displayCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>Your cart is empty 🛒</p>
        `;

        cartTotal.innerText = "0";

        return;
    }

    let html = "";
    let total = 0;

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        html += `
            <div class="cart-item">

                <div>
                    <strong>${item.name}</strong>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>

                <div>

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                    <button onclick="removeItem(${index})">
                        🗑️
                    </button>

                </div>

            </div>
        `;
    });

    cartItems.innerHTML = html;

    cartTotal.innerText = total;
}


// PLUS
function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


// MINUS
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    updateCart();
}


// REMOVE
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}


// OPEN CART
function openCart() {

    const modal = document.getElementById("cartModal");

    if (modal) {
        modal.style.display = "flex";
    }

    displayCart();
}


// CLOSE CART
function closeCart() {

    const modal = document.getElementById("cartModal");

    if (modal) {
        modal.style.display = "none";
    }
}


// CUSTOMER FORM
function showCustomerForm() {

    if (cart.length === 0) {

        alert("Please add a hamper to your cart first 🛒");

        return;
    }

    closeCart();

    const modal = document.getElementById("customerModal");

    if (modal) {
        modal.style.display = "flex";
    }
}


// CLOSE CUSTOMER FORM
function closeCustomerForm() {

    const modal = document.getElementById("customerModal");

    if (modal) {
        modal.style.display = "none";
    }
}


// PLACE ORDER
const orderForm = document.getElementById("orderForm");

if (orderForm) {

    orderForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("customerName").value.trim();

        const phone =
            document.getElementById("customerPhone").value.trim();

        const address =
            document.getElementById("customerAddress").value.trim();

        const city =
            document.getElementById("customerCity").value.trim();

        const state =
            document.getElementById("customerState").value.trim();

        const pin =
            document.getElementById("customerPin").value.trim();

        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            ).value;


        let total = 0;

        cart.forEach(item => {

            total += item.price * item.quantity;

        });


        if (payment === "COD") {

            alert(
                "🎉 ORDER PLACED SUCCESSFULLY!\n\n" +

                "Customer: " + name + "\n" +

                "Mobile: " + phone + "\n\n" +

                "Address:\n" +
                address + "\n" +
                city + ", " +
                state + " - " +
                pin + "\n\n" +

                "Payment: Cash on Delivery\n" +

                "Total: ₹" + total
            );


            cart = [];

            updateCart();

            closeCustomerForm();

            orderForm.reset();

        }


        if (payment === "ONLINE") {

            alert(
                "Online payment will be connected next. 💳\n\n" +
                "Order Amount: ₹" + total
            );

        }

    });
}


// START CART
updateCart();
