const API = "http://localhost:5000";

const userEmail =
localStorage.getItem("userEmail");

if (!userEmail) {

    window.location.href =
    "index.html";
}

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];
if (cart.length === 0) {

    document.getElementById(
        "cartItems"
    ).innerHTML =
    "<h2>Your cart is empty</h2>";

    document.getElementById(
        "itemCount"
    ).innerText = 0;

    document.getElementById(
        "totalPrice"
    ).innerText = 0;
}

let total = 0;

let html = "";

cart.forEach((item, index) => {

    total += item.price;

    html += `
    <div class="cart-item">

        <img
        src="${item.image}"
        alt="${item.name}">

        <div>

            <h2>${item.name}</h2>

            <p>
                ${item.shortDescription}
            </p>

            <h3>
                ₹${item.price}
            </h3>

            <button
            onclick="removeItem(${index})">

                Remove

            </button>

        </div>

    </div>
    `;
});

document
.getElementById("cartItems")
.innerHTML = html;

document
.getElementById("itemCount")
.innerText = cart.length;

document
.getElementById("totalPrice")
.innerText = total;

function openPaymentModal() {

    document
    .getElementById("paymentModal")
    .style.display = "flex";
}

async function placeOrder() {

    const paymentMethod =
    document.querySelector(
        'input[name="payment"]:checked'
    );

    if (!paymentMethod) {

        alert(
            "Please select a payment method"
        );

        return;
    }

    const response =
    await fetch(
        `${API}/orders`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

                userId: userEmail,

                products:
                cart.map(
                    item => item.name
                ),

                total,

                paymentMethod:
                paymentMethod.value

            })
        }
    );

    await response.json();

    alert(
        "Order Successful!"
    );

    localStorage.removeItem(
        "cart"
    );

    window.location.href =
    "store.html";
}
function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    location.reload();
}