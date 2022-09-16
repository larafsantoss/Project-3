export const renderCartItem = (item) => {
  const div = document.createElement("div");
  div.classList.add(
    "row",
    "g-0",
    "border",
    "rounded",
    "overflow-hidden",
    "flex-md-row",
    "mb-4",
    "shadow-sm",
    "h-md-250",
    "position-relative"
  );
  div.innerHTML = `
    <div class="col-auto d-none d-lg-block">
      <div class="py-4">
        <img width="150" height="100" src="${item.image_url}" alt="${
    item.name
  }">
      </div>
    </div>
    <div class="col p-4 d-flex flex-column position-static">
      <strong class="d-inline-block mb-2" style="color: #0c0c0c">${
        item.name
      }</strong>
      <div class="mb-1 text-muted">$${item.price_in_cents / 100}</div>
      <p class="card-text mb-auto">Quantity: ${item.quantity}</p>
      <button style="width: 70px;" class="btn btn-danger btn-sm my-2 delete-btn">Delete</button>

    </div>
    <div class="col col-auto d-flex flex-column justify-content-center px-5">
      <h4 class="mb-0">$${item.total}</h4>
    </div>
  `;

  div.getElementsByClassName("delete-btn")[0].addEventListener("click", () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    delete cartItems[item.id];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCartList();
  });

  return div;
};

export const renderOrderForm = (items) => {
  const section = document.createElement("section");
  section.classList.add("contact_section", "layout_padding-bottom");
  section.innerHTML = `
    <div class="container">
      <div class="heading_container heading_center" style="margin-top: 20px">
        <h3>
          Shipping Information
        </h3>
      </div>
      <div class="row">
        <div class="col-md-9 mx-auto">
          <div class="form_container">
            <form class="order_form">
              <div class="form-row">
                <div class="form-group col-md-12">
                  <input name="customer_name" type="text" class="form-control" placeholder="Your Name" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <input name="customer_address" type="text" class="form-control" placeholder="Address" />
                </div>
              </div>
              <div class="btn-box">
                <button class="confirm_button">Confirm Order as Guest</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  const form = section.getElementsByClassName("order_form")[0];

  section
    .getElementsByClassName("confirm_button")[0]
    .addEventListener("click", (event) => {
      event.preventDefault();
      const cartItems = JSON.parse(localStorage.getItem("cartItems"));
      const formData = new FormData(form);
      const orderDetails = Object.keys(cartItems).map((itemId) => ({
        itemId: Number(itemId),
        quantity: cartItems[itemId],
        unitPriceInCents: items.find((item) => item.id === Number(itemId))[
          "price_in_cents"
        ],
      }));
      const data = {
        customerName: formData.get("customer_name"),
        customerAddress: formData.get("customer_address"),
        totalAmount: items[0].total,
        orderDetails,
      };

      const previewSection = document.getElementById("cart_section_preview");

      previewSection.innerHTML = `
        <div id="cart_section_data" class="row" style="justify-content: center;">
          <img src="images/loading.gif" />
        </div>
      `;

      axios
        .post("/api/orders", data)
        .then((response) => {
          // Render order success
          event.preventDefault();
          previewSection.innerHTML = `
          <div id="cart_section_data" class="row" style="justify-content: center;">
            <h1>Your order #${response.data.orderId} has been placed!</h1>
           </div>
          `;
          localStorage.setItem("cartItems", JSON.stringify({}));
        })
        .catch((err) => {
          if (err.response.status === 500) {
            alert("Unknown error");
          } else {
            alert(err.response.data.message);
          }
        });
    });

  return section;
};

export const renderCartList = () => {
  const page = document.querySelector("#page");
  const cartSection = document.createElement("section");
  cartSection.classList.add("about_section", "layout_padding");

  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const isCartEmpty = Object.keys(cartItems).length === 0;

  cartSection.innerHTML = `
    <div id="cart_section_preview" class="container">
      <div class="heading_container heading_center">
        <h2>
          Your Cart
        </h2>
      </div>
      <div id="cart_section_data" class="row" style="justify-content: center;">
        ${isCartEmpty ? "Oh, it's empty!" : '<img src="images/loading.gif" />'}
      </div>
    </div>
  `;
  page.replaceChildren(cartSection);

  if (isCartEmpty) return;

  const ids = Object.keys(cartItems);
  axios.get("/api/items", { params: { ids } }).then((response) => {
    const items = response.data.map((item) => ({
      ...item,
      quantity: cartItems[item.id],
      total: (cartItems[item.id] * item.price_in_cents) / 100,
    }));
    let totalCartAmount = 0;
    const itemEles = items.map((item) => {
      totalCartAmount += item.total;
      return renderCartItem(item);
    });

    const dataSection = document.querySelector("#cart_section_data");
    dataSection.classList.remove("row");

    const totalEle = document.createElement("div");
    totalEle.classList.add("row", "border-bottom");
    totalEle.style = "justify-content: flex-end;";
    totalEle.innerHTML = `<h3>Total: $${totalCartAmount}</h3>`;

    const orderForm = renderOrderForm(items);
    dataSection.replaceChildren(...itemEles, totalEle, orderForm);
  });
};
