import { renderOrderDetails } from "./order-details.js";

export const renderAllOrders = () => {
  const page = document.querySelector("#page");
  const ordersSection = document.createElement("section");
  ordersSection.classList.add("about_section", "layout_padding");

  ordersSection.innerHTML = `
    <div id="orders_section_preview" class="container">
      <div class="heading_container heading_center">
        <h2>
          Orders
        </h2>
      </div>
      <div id="orders_section_data" class="row" style="justify-content: center;">
        <img src="images/loading.gif" />
      </div>
    </div>
  `;
  page.replaceChildren(ordersSection);

  axios.get("/api/orders").then((response) => {
    const ordersData = response.data;
    const dataRows = ordersData.map(
      (order) => `
      <tr>
        <td>${order.id}</td>
        <td>${order.customer_name}</td>
        <td>${order.customer_address}</td>
        <td>$${order.total_amount}</td>
        <td><button id="view-order-detail-${order.id}" class="btn btn-primary">View</button></td>
      </tr>
    `
    );

    const ordersDiv = document.createElement("div");
    ordersDiv.classList.add("container", "table-responsive", "py-4");
    ordersDiv.innerHTML = `
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Order #</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Address</th>
            <th scope="col">Total Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          ${dataRows.join("")}
        </tbody>
      </table>
    `;
    const dataSection = document.querySelector("#orders_section_data");
    dataSection.replaceChildren(ordersDiv);

    for (const order of ordersData) {
      const viewButton = document.getElementById(
        `view-order-detail-${order.id}`
      );
      viewButton.addEventListener("click", () => {
        renderOrderDetails(order.id);
      });
    }
  });
};
