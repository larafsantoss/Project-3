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

  div.append(name, price, img, quantity, totalItemAmount);

  return div;
};

export const renderCartList = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const ids = Object.keys(cartItems);
  const page = document.querySelector("#page");
  const paragraph = document.createElement("p");
  paragraph.classList.add("loading");

  paragraph.textContent = "Loading...";
  page.replaceChildren(paragraph);

  axios.get("/api/items", { params: { ids } }).then((response) => {
    const items = response.data.map((item) => ({
      ...item,
      quantity: cartItems[item.id],
      total: (cartItems[item.id] * item.price_in_cents) / 100,
    }));
    // console.log(items);
    const itemEles = items.map((item) => renderCartItem(item));
    page.replaceChildren(...itemEles);
  });
};
