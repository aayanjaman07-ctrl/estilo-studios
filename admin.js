/* PROTECT PAGE */

auth.onAuthStateChanged((user) => {

    if (!user) {

        window.location.href =
            "admin-login.html";
    }
});

/* LOAD ORDERS */

const ordersContainer =
    document.getElementById("orders");

async function loadOrders() {

    const ordersContainer =
        document.getElementById("orders");

    db.collection("orders")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {

    ordersContainer.innerHTML = "";

    snapshot.forEach((doc) => {

        const order = doc.data();

        let itemsHTML = "";

        order.items.forEach((item) => {

            itemsHTML += `
                <div class="item">

                    ${item.name}
                    | Size: ${item.size}
                    | Qty: ${item.quantity}

                </div>
            `;
        });

        ordersContainer.innerHTML += `

            <div class="order">

                <h3>
                    Order ID:
                    <span class="badge">
                        ${doc.id}
                    </span>
                </h3>

                <p>
                    <b>Name:</b>
                    ${order.name}
                </p>

                <p>
                    <b>Phone:</b>
                    ${order.phone}
                </p>

                <p>
                    <b>bKash TRX ID:</b>
                    ${order.trxId}
                </p>

                <p>
                    <b>Address:</b>
                    ${order.address}
                </p>

                <p>
                    <b>Total:</b>
                    $${order.total}
                </p>

                <p>
                    <b>Status:</b>
                    <span class="status ${order.status || 'pending'}">
                    ${order.status || "pending"}
                    </span>
                </p>

                <div class="items">
                    ${itemsHTML}
                </div>

                <div class="status-buttons">

                    <button onclick="updateStatus('${doc.id}', 'pending')">
                    Pending
                    </button>

                    <button onclick="updateStatus('${doc.id}', 'shipped')">
                    Shipped
                    </button>

                    <button onclick="updateStatus('${doc.id}', 'delivered')">
                    Delivered
                    </button>

                </div>

            </div>
        `;
    });
}

loadOrders();

/* LOGOUT */

function logout() {

    auth.signOut()

        .then(() => {

            window.location.href =
                "admin-login.html";
        });
}

async function updateStatus(orderId, newStatus) {

    try {

        await db.collection("orders")
            .doc(orderId)
            .update({
                status: newStatus
            });

        alert("Status updated!");

        loadOrders(); // refresh list

    } catch (error) {

        console.error(error);

        alert("Failed to update status.");
    }
}
