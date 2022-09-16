import { renderMenuList } from "./menu.js";

export const renderNewItem = () => {
  const page = document.querySelector("#page");
  const heading = document.createElement("h2");
  heading.textContent = "Add new item";

  const form = document.createElement("form");
  form.innerHTML = `
  <fieldset>
    <label for="name">Name</label>
    <input type="text" name="name">
  </fieldset>

  <fieldset>
    <label for="price_in_cents">Price in cents</label>
    <input type="text" name="price_in_cents">
  </fieldset>

  <fieldset>
    <label for="image_url">Image link</label>
    <input type="text" name="image_url">
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
      .post("/api/items", data)
      .then((response) => {
        renderMenuList();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 500) {
          alert("Oops, failed to create challenge. Please try again.");
        } else {
          alert(err.response.data.message);
        }
      });
  });

  page.replaceChildren(form);
};
