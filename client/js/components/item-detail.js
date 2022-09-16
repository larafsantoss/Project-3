export const renderItemDetail = (item) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const alreadyInCartText = !!cartItems[item.id]
    ? `You already have ${cartItems[item.id]} of this in your cart`
    : "";

  const page = document.querySelector("#page");
  const itemSection = document.createElement("section");
  itemSection.classList.add("product_section", "layout_padding");
  itemSection.innerHTML = `
  <div id="product_section_preview" class="container">
    <div class="heading_container heading_center">
      <h2>
        ${item.name}
      </h2>
    </div>
    <div class="row" style="justify-content: center; padding-top: 20px;">
      <div class="col-sm-6 col-md-6 col-lg-6" style="display: flex; justify-content: flex-end;">
        <img src="${item.image_url}" style="max-width: 100%; max-height: 500px; border-radius: 20px;" />
      </div>
      <div class="col-sm-6 col-md-6 col-lg-6">
        <div class="row" style="justify-content: center; align-items: center; justify-content: space-evenly;">
          <div id="cart-minus" class="btn-box mt-0">
            <a href="#" style="padding: 5px 20px">
              -
            </a>
          </div>
          <h3 id="cart-quantity">1</h3>
          <div id="cart-plus" class="btn-box mt-0">
            <a href="#" style="padding: 5px 20px">
              +
            </a>
          </div>
        </div>
        <div id="cart-text" style="text-align:center; margin-top: 40px; font-style: italic;">${alreadyInCartText}</div>
        <div id="cart-add" class="btn-box">
          <a href="#">
            Add to Cart
          </a>
        </div>
      </div>
    </div>
  </div>
`;
  page.replaceChildren(itemSection);

  const minusButton = document.getElementById("cart-minus");
  minusButton.addEventListener("click", () => {
    const cartQuantityEle = document.getElementById("cart-quantity");
    let value = Number(cartQuantityEle.innerText);
    if (value > 1) {
      cartQuantityEle.innerText = `${--value}`;
    }
  });

  const plusButton = document.getElementById("cart-plus");
  plusButton.addEventListener("click", () => {
    const cartQuantityEle = document.getElementById("cart-quantity");
    let value = Number(cartQuantityEle.innerText);
    cartQuantityEle.innerText = `${++value}`;
  });

  const addToCartButton = document.getElementById("cart-add");
  addToCartButton.addEventListener("click", () => {
    const cartQuantityEle = document.getElementById("cart-quantity");
    if (cartItems[item.id]) {
      cartItems[item.id] += Number(cartQuantityEle.innerText);
    } else {
      cartItems[item.id] = Number(cartQuantityEle.innerText);
    }
    const cartText = document.getElementById("cart-text");
    cartText.innerText = `You already have ${
      cartItems[item.id]
    } of this in your cart`;
    cartQuantityEle.innerText = "1";
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  });
};
