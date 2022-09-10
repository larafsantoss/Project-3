export const renderItemDetail = (item) => {
  const page = document.querySelector("#page");

  const name = document.createElement("h3");
  name.textContent = item.name;

  const price = document.createElement("p");
  price.textContent = `$${item.price_in_cents / 100}`;

  const img = document.createElement("img");
  img.src = item.image_url;

  let minusButton = document.createElement("h4");
  minusButton.textContent = "-";
  // minusButton.classList.add("minus");

  let quantityEle = document.createElement("input");
  quantityEle.value = "1";

  let plusButton = document.createElement("h4");
  plusButton.textContent = "+";
  // plusButton.classList.add("plus");

  let quantity = Number(quantityEle.value);
  minusButton.addEventListener("click", () => {
    if (quantity === 0) {
      return;
    }
    quantity--;
    quantityEle.value = quantity;
  });
  plusButton.addEventListener("click", () => {
    quantity++;
    quantityEle.value = quantity;
  });

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to cart";
  addToCartButton.classList.add("add-to-cart");

  addToCartButton.addEventListener("click", () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems[item.id]) {
      cartItems[item.id] += Number(quantityEle.value);
    } else {
      cartItems[item.id] = Number(quantityEle.value);
    }

    // console.log(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  });

  page.replaceChildren(
    name,
    price,
    img,
    minusButton,
    quantityEle,
    addToCartButton,
    plusButton
  );
};
