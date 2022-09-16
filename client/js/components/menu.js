import { renderItemDetail } from "./item-detail.js";

export const renderEditItemForm = (item) => {
  const page = document.querySelector("#page");
  const heading = document.createElement("h1");
  heading.textContent = "Add item";

  const form = document.createElement("form");
  form.innerHTML = `
  <fieldset>
    <label for="name">Name</label>
    <input type="text" name="name" value="${item.name}">
  </fieldset>
  <fieldset>
    <label for="price">Price in cents</label>
    <input type="text" name="price_in_cents" value="${item.price_in_cents}">
  </fieldset>
  <fieldset>
    <label for="img">Address</label>
    <input type="text" name="image_url" value="${item.image_url}">
  </fieldset>
  <button>Save</button>
  `;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      price_in_cents: formData.get("price_in_cents"),
      image_url: formData.get("image_url"),
    };

    axios
      .put(`/api/items/${item.id}`, data)
      .then((response) => {
        renderMenuList();
      })
      .catch((err) => {
        if (err.response.status === 500) {
          alert("Oops, failed to edit item. Please try again.");
        } else {
          alert(err.response.data.message);
        }
      });
  });

  page.replaceChildren(heading, form);
};

export const renderItem = (item) => {
  const div = document.createElement("div");
  div.classList.add("col-sm-6", "col-md-4", "col-lg-3");
  div.innerHTML = `
    <div class="box" style="cursor: pointer;">
      <div>
        <div class="img-box">
          <img src="${item.image_url}" alt="${
    item.name
  }" style="border-radius: 20px">
        </div>
        <div class="detail-box">
          <a href="#">
            ${item.name}
          </a>
          <h6>
            $${item.price_in_cents / 100}
          </h6>
        </div>
      </div>
    </div>
  `;

  div.addEventListener("click", () => {
    renderItemDetail(item);
  });

  return div;
};

export const renderMenuList = () => {
  const page = document.querySelector("#page");
  const itemSection = document.createElement("section");
  itemSection.classList.add("product_section", "layout_padding");
  itemSection.innerHTML = `
    <div id="product_section_preview" class="container">
      <div class="heading_container heading_center">
        <h2>
          Our Products
        </h2>
      </div>
      <div id="product_section_data" class="row" style="justify-content: center;">
        <img src="images/loading.gif" />
      </div>
    </div>
  `;
  page.replaceChildren(itemSection);

  axios
    .get("/api/items")
    .then((response) => {
      const itemDivs = response.data.map((item) => renderItem(item));
      const dataSection = document.querySelector("#product_section_data");

      dataSection.replaceChildren(...itemDivs);
    })
    .catch((err) => {
      console.log(err);
    });
};
