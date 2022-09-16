import { renderMenuList } from "./menu.js";

export const renderItemDetailWithCart = (item) => {
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
      <div class="row" style="justify-content:center;"><h2>$${
        item.price_in_cents / 100
      }</h2></div>
      <div class="row" style="justify-content: center; padding-top: 20px;">
        <div class="col-sm-6 col-md-6 col-lg-6" style="display: flex; justify-content: flex-end;">
          <img src="${
            item.image_url
          }" style="max-width: 100%; max-height: 500px; border-radius: 20px;" />
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

export const renderItemDetailWithEdit = (item) => {
  const page = document.querySelector("#page");
  const itemSection = document.createElement("section");
  itemSection.classList.add("product_section", "layout_padding");
  itemSection.innerHTML = `
    <div id="product_section_preview" class="container">
    <div class="heading_container heading_center">
      <h2>${item.name}</h2>
    </div>
    <div class="row" style="justify-content: center; padding-top: 20px;">
      <div
        class="col-sm-6 col-md-6 col-lg-6"
        style="display: flex; justify-content: flex-end;"
      >
        <img
          src="${item.image_url}"
          style="max-width: 100%; max-height: 500px; border-radius: 20px;"
        />
      </div>
      <div class="col-sm-6 col-md-6 col-lg-6">
        <form id="product-edit-form">
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="name">Name</label>
              <input
                name="name"
                type="text"
                class="form-control"
                placeholder="Product Name"
                value="${item.name}"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="price_in_cents">Price in cents</label>
              <input
                name="price_in_cents"
                type="text"
                class="form-control"
                placeholder="Price In Cents"
                value="${item.price_in_cents}"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="image_url">Image URL</label>
              <input
                name="image_url"
                type="text"
                class="form-control"
                placeholder="Image URL"
                value=${item.image_url}
              />
            </div>
          </div>
          <div id="product-update-btn" class="btn-box">
            <a href="#">Update</a>
          </div>
          <div id="product-delete-btn" class="btn-box">
            <a href="#">Delete This Product</a>
          </div>
        </form>
      </div>
    </div>
  </div>
  `;
  page.replaceChildren(itemSection);

  const updateBtn = document.getElementById("product-update-btn");
  updateBtn.addEventListener("click", () => {
    const form = document.getElementById("product-edit-form");
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      price_in_cents: formData.get("price_in_cents"),
      image_url: formData.get("image_url"),
    };
    axios.put(`/api/items/${item.id}`, data).then(() => {
      renderItemDetail({
        id: item.id,
        ...data,
      });
      alert("Product Updated!");
    });
  });

  const deleteBtn = document.getElementById("product-delete-btn");
  deleteBtn.addEventListener("click", () => {
    axios.delete(`/api/items/${item.id}`).then(() => {
      renderMenuList();
    });
  });
};

export const renderItemDetail = (item) => {
  axios.get("/api/session").then((response) => {
    const loggedInEmail = response.data.email;
    if (!loggedInEmail) {
      return renderItemDetailWithCart(item);
    } else {
      return renderItemDetailWithEdit(item);
    }
  });
};
