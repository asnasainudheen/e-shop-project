const API = "http://localhost:5000";

const userEmail =
localStorage.getItem("userEmail");

if (!userEmail) {

    window.location.href =
    "index.html";
}

async function loadOrders() {

    try {

        const res =
        await fetch(
            `${API}/orders`
        );

        const orders =
        await res.json();

        const userOrders =
        orders.filter(
            order =>
            order.userId === userEmail
        );

        let html = "";

        if (
            userOrders.length === 0
        ) {

            html =
            `
            <div class="order-card">

                <h2>
                    No Orders Found
                </h2>

            </div>
            `;
        }

        userOrders.forEach(
            (order, index) => {

            html += `

            <div class="order-card">

                <h2>
                    Order #${index + 1}
                </h2>

                <p>
                    <strong>
                    Products:
                    </strong>
                    ${order.products.join(", ")}
                </p>

                <p>
                    <strong>
                    Payment:
                    </strong>
                    ${order.paymentMethod || "N/A"}
                </p>

                <p>
                    <strong>
                    Total:
                    </strong>
                    ₹${order.total}
                </p>

                <p>
                    <strong>
                    Date:
                    </strong>
                    ${new Date(
                        order.createdAt
                    ).toLocaleString()}
                </p>

                <p>
                    <strong>
                    Status:
                    </strong>
                    Processing
                </p>

            </div>

            `;
        });

        document
        .getElementById(
            "ordersContainer"
        )
        .innerHTML = html;

    } catch (error) {

        console.log(error);

        document
        .getElementById(
            "ordersContainer"
        )
        .innerHTML =
        "<h2>Error Loading Orders</h2>";
    }
}

loadOrders();