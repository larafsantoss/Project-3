import { renderMenuList } from "./menu.js";

export const renderNewItem = () => {
  const page = document.querySelector("#page");
  const itemSection = document.createElement("section");
  itemSection.classList.add("product_section", "layout_padding");
  itemSection.innerHTML = `
      <div id="product_section_preview" class="container">
      <div class="heading_container heading_center">
        <h2>Add a new product</h2>
      </div>
      <div class="row" style="justify-content: center; padding-top: 20px;">
        <div class="col-sm-12 col-md-12 col-lg-12">
          <form id="product-add-form">
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="name">Name</label>
                <input
                  name="name"
                  type="text"
                  class="form-control"
                  placeholder="Product name"
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
                  placeholder="Price in cents"
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
                />
              </div>
            </div>
            <div id="product-add-btn" class="btn-box">
              <a href="#">Add</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
  page.replaceChildren(itemSection);

  const form = document.getElementById("product-add-form");
  const addBtn = document.getElementById("product-add-btn");

  addBtn.addEventListener("click", () => {
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      price_in_cents: formData.get("price_in_cents"),
      image_url: formData.get("image_url"),
    };
    axios
      .post("/api/items", data)
      .then((response) => {
        alert("Product has been added!");
        renderMenuList();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 500) {
          alert("Oops, failed to add product. Please try again.");
        } else {
          alert(err.response.data.message);
        }
      });
  });
};
