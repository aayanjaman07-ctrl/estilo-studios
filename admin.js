/* PROTECT PAGE */
auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = "admin-login.html";
        return;
    }

    loadOrders(); // ✅ IMPORTANT FIX
});

const ordersContainer = document.getElementById("orders");

/* LOAD ORDERS REALTIME */
function loadOrders() {

    db.collection("orders")
        .onSnapshot((snapshot) => {

            ordersContainer.innerHTML = "";

            snapshot.forEach((doc) => {

                const order = doc.data();

                let itemsHTML = "";

                if (order.items) {
                    order.items.forEach(item => {
                        itemsHTML += `
                            <div class="item">
                                ${item.name} | Size: ${item.size} | Qty: ${item.quantity}
                            </div>
                        `;
                    });
                }

                ordersContainer.innerHTML += `
                    <div class="order">

                        <h3>Order ID: ${doc.id}</h3>

                        <p>Name: ${order.name}</p>
                        <p>Phone: ${order.phone}</p>
                        <p>Total: $${order.total}</p>
                        <p>Status: ${order.status || "pending"}</p>

                        <div class="items">${itemsHTML}</div>

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
        });
}

/* UPDATE STATUS */
async function updateStatus(orderId, newStatus) {

    try {

        await db.collection("orders")
            .doc(orderId)
            .update({
                status: newStatus
            });

    } catch (error) {
        console.error(error);
        alert("Failed to update status.");
    }
}

/* LOGOUT */
function logout() {
    auth.signOut().then(() => {
        window.location.href = "admin-login.html";
    });
}
