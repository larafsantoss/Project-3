import { renderOrderSuccessMessage } from "./messages.js";

export const renderCartItem = (item) => {
  const div = document.createElement("div");

  const name = document.createElement("h3");
  name.textContent = item.name;
  name.classList.add("product-name");
  name.addEventListener("click", () => renderItemDetail(item));

  const price = document.createElement("h5");
  price.textContent = `Item price: $${item.price_in_cents / 100}`;

  const quantity = document.createElement("h5");
  quantity.textContent = `Quantity: ${item.quantity}`;

  const totalItemAmount = document.createElement("h5");
  totalItemAmount.textContent = `Total: ${item.total}`;

  const img = document.createElement("img");
  img.src = item.image_url;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    delete cartItems[item.id];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // console.log(cartItems);
    renderCartList();
  });

  div.append(name, price, img, quantity, totalItemAmount, deleteButton);

  return div;
};

export const renderCartList = () => {
  const page = document.querySelector("#page");
  const paragraph = document.createElement("h3");
  paragraph.classList.add("loading");
  paragraph.textContent = "Loading...";
  page.replaceChildren(paragraph);

  const cartItems = JSON.parse(localStorage.getItem("cartItems"));

  if (Object.keys(cartItems).length === 0) {
    paragraph.textContent = "Your cart is empty";
    page.replaceChildren(paragraph);
    return;
  }

  const ids = Object.keys(cartItems);
  // console.log(ids);

  axios.get("/api/items", { params: { ids } }).then((response) => {
    const items = response.data.map((item) => ({
      ...item,
      quantity: cartItems[item.id],
      total: (cartItems[item.id] * item.price_in_cents) / 100,
    }));

    const itemEles = items.map((item) => renderCartItem(item));

    const form = document.createElement("form");
    form.innerHTML = `
      <h4>Shipping Address</h4>
      <fieldset>
        <lable>Customer Name</label>
        <input name="customer_name" type="text"/>
      </fieldset>

      <fieldset>
        <lable>Customer Address</label>
        <input name="customer_address" type="text"/>
      </fieldset>
      
      <button id="confirm_button">Confirm Order as Guest</button>
    `;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
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
      axios
        .post("/api/orders", data)
        .then((response) => {
          renderOrderSuccessMessage(response.data.orderId);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            alert("Unknown error");
          } else {
            alert(err.response.data.message);
          }
        });
    });

    page.replaceChildren(...itemEles, form);
  });
};
