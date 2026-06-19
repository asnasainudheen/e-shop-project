const API = "http://localhost:5000";

// Protect page
const user = localStorage.getItem("userEmail");

if (!user) {
    window.location.href = "index.html";
}

// Welcome message
document.getElementById(
    "profileName"
).innerText =
localStorage.getItem("userName");

// Load products
async function loadProducts() {

    const res = await fetch(`${API}/products`);
    const products = await res.json();

    const container =
        document.getElementById("products");

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `

<div class="product-card">

    <img
    src="${product.image}"
    class="product-image">

   <div class="product-details">

    <h3>${product.name}</h3>

    <div class="price">
        ₹${product.price}
    </div>

    <div class="description">
        ${product.shortDescription}
    </div>

    <button
        class="add-btn"
        onclick="addToCart(
    '${product.name}',
    ${product.price},
    '${product.image}',
    '${product.shortDescription}'
)">

        Add To Cart

    </button>

</div>

<div class="details-section">

    <button
        class="details-btn"
        onclick="showDetails(
            '${product.name}',
            '${product.price}',
            \`${product.details}\`,
            '${product.image}'
        )">

        View Details

    </button>

</div>

</div>

`;
    });

    updateCartCount();
}

// Cart
function addToCart(
    name,
    price,
    image,
    shortDescription
) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    cart.push({
        name,
        price,
        image,
        shortDescription
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert("Added to cart");
}

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    document.getElementById(
        "cartCount"
    ).innerText = cart.length;
}

// Logout
function logout() {

    localStorage.removeItem("userEmail");

    window.location.href = "index.html";
}

loadProducts();
function showDetails(
    name,
    price,
    details,
    image
){

    document.getElementById(
        "modalName"
    ).innerText = name;

    document.getElementById(
        "modalPrice"
    ).innerText = "₹" + price;

    document.getElementById(
        "modalDescription"
    ).innerText = details;

    document.getElementById(
        "modalImage"
    ).src = image;

    document.getElementById(
        "productModal"
    ).style.display = "flex";
}

function closeModal(){

    document.getElementById(
        "productModal"
    ).style.display = "none";
}
