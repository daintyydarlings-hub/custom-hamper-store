let cart = [];

function addHamper(name, price) {

    cart.push({
        name: name,
        price: price
    });

    updateCart();
    openCart();
}


function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartCount.innerText = cart.length;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.innerText = "0";

        return;
    }

    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">

                <strong>${item.name}</strong>

                <p>₹${item.price}</p>

                <button onclick="removeItem(${index})">
                    Remove
                </button>

            </div>
        `;
    });

    cartTotal.innerText = total;
}


function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}


function openCart() {

    document
        .getElementById("cart")
        .classList.add("open");
}


function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("open");
}


function goToCheckout() {

    closeCart();

    document
        .getElementById("checkout")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function requestCustomHamper() {

    const selected =
        document.querySelectorAll(
            ".product-option input:checked"
        );

    if (selected.length === 0) {

        alert(
            "Please select at least one product."
        );

        return;
    }

    let products = [];

    selected.forEach(product => {

        products.push(product.value);

    });

    alert(
        "Customized hamper request received!\n\n" +
        "Selected products:\n" +
        products.join(", ") +
        "\n\n" +
        "We will contact you with the final price."
    );
}


function placeOrder() {

    if (cart.length === 0) {

        alert(
            "Please add a hamper to your cart first."
        );

        return;
    }


    const name =
        document.getElementById(
            "customerName"
        ).value.trim();


    const phone =
        document.getElementById(
            "customerPhone"
        ).value.trim();


    const address =
        document.getElementById(
            "customerAddress"
        ).value.trim();


    const city =
        document.getElementById(
            "customerCity"
        ).value.trim();


    const state =
        document.getElementById(
            "customerState"
        ).value.trim();


    const pincode =
        document.getElementById(
            "customerPincode"
        ).value.trim();


    if (
        !name ||
        !phone ||
        !address ||
        !city ||
        !state ||
        !pincode
    ) {

        alert(
            "Please fill all required details."
        );

        return;
    }


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    let total = 0;

    cart.forEach(item => {

        total += item.price;

    });


    const order = {

        name: name,
        phone: phone,
        address: address,
        city: city,
        state: state,
        pincode: pincode,

        items: cart,

        total: total,

        paymentMethod: payment

    };


    console.log(order);


    if (payment === "COD") {

        alert(
            "COD order received!\n\n" +
            "Name: " + name +
            "\nAmount: ₹" + total
        );

    } else {

        alert(
            "Online payment will be connected after the secure payment backend is added."
        );

    }

}
