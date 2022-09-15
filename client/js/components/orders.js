import { renderOrderDetails } from "./order-details.js";

export const renderAllOrders = () => {
  const page = document.querySelector("#page");
  const paragraph = document.createElement("p");
  paragraph.classList.add("loading");

  paragraph.textContent = "Loading...";
  page.replaceChildren(paragraph);

  axios.get("/api/orders").then((response) => {
    const ordersData = response.data;
    const ordersDiv = document.createElement("table");
    ordersDiv.innerHTML = `
    <tr>
      <th>Order #</th>
      <th>Customer Name</th>
      <th>Customer Address</th>
      <th>Total Amount</th>
    </tr>
    `;
    for (let i = 0; i < ordersData.length; i++) {
      const orderEles = document.createElement("div");
      orderEles.innerHTML = `
    <tr>
      <td>${ordersData[i].id}</td>
      <td>${ordersData[i].customer_name}</td>
      <td>${ordersData[i].customer_address}</td>
      <td>${ordersData[i].total_amount}</td>
      <button id="view">View</button>
    </tr>`;
      ordersDiv.appendChild(orderEles);
    }
    page.replaceChildren(ordersDiv);

    const viewButton = document.getElementById("view");
    viewButton.addEventListener("click", renderOrderDetails);
  });
};
