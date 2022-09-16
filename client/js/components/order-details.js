import { renderAllOrders } from "./orders.js";

export const renderOrderDetails = (orderId) => {
  const page = document.querySelector("#page");
  const orderDetailSection = document.createElement("section");
  orderDetailSection.classList.add("about_section", "layout_padding");

  orderDetailSection.innerHTML = `
    <div id="order_detail_section_preview" class="container">
      <div class="heading_container heading_center">
        <h2>
          Order #${orderId}
        </h2>
      </div>
      <div id="order_detail_section_data" class="row" style="justify-content: center;">
        <img src="images/loading.gif" />
      </div>
    </div>
  `;
  page.replaceChildren(orderDetailSection);

  axios.get(`/api/orders/${orderId}`).then((response) => {
    const orderDetailData = response.data;
    const rows = orderDetailData.map(
      (detail) => `
      <tr>
        <td>${detail.product_id}</td>
        <td>${detail.product_name}</td>
        <td>$${detail.unit_price_in_cents / 100}</td>
        <td>${detail.quantity}</td>
      </tr>
    `
    );

    const detailDiv = document.createElement("div");
    detailDiv.classList.add("container", "table-responsive", "py-4");
    detailDiv.innerHTML = `
    <a id="back-to-orders" href="#" class="btn btn-primary my-2">Back to orders</a>
    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div class="col p-4 d-flex flex-column position-static">
        <h2>${orderDetailData[0].customer_name}</h2>
        <strong class="d-inline-block mb-2 text-primary">${
          orderDetailData[0].customer_address
        }</strong>
        <div class="mb-1 text-muted">Total: $${
          orderDetailData[0].total_amount
        }</div>

      </div>
    </div>
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">Product #</th>
          <th scope="col">Product Name</th>
          <th scope="col">Unit Price</th>
          <th scope="col">Quantity</th>
        </tr>
      </thead>
      <tbody>
        ${rows.join("")}
      </tbody>
    </table>
    `;
    const dataSection = document.querySelector("#order_detail_section_data");

    dataSection.replaceChildren(detailDiv);
    const backToOrdersBtn = document.getElementById("back-to-orders");
    backToOrdersBtn.addEventListener("click", renderAllOrders);
  });
};
