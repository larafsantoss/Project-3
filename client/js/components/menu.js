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
    // console.log(data);

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
  const el = document.createElement("div");

  const name = document.createElement("h3");
  name.textContent = item.name;

  const price = document.createElement("p");
  price.textContent = `$${item.price_in_cents / 100}`;

  const img = document.createElement("img");
  img.src = item.image_url;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    axios
      .delete(`/api/items/${item.id}`)
      .then((response) => {
        renderMenuList();
      })
      .catch((err) => {
        if (err.response.status === 500) {
          alert("Oops, failed to delete item. Please try again.");
        } else {
          alert(err.response.data.message);
        }
      });
  });

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    renderEditItemForm(item);
  });

  el.append(name, price, img, deleteButton, editButton);

  return el;
};

export const renderMenuList = () => {
  const page = document.querySelector("#page");
  const paragraph = document.createElement("p");
  paragraph.classList.add("loading");

  paragraph.textContent = "Loading...";
  page.replaceChildren(paragraph);

  axios
    .get("/api/items")
    .then((response) => {
      console.log(response.data);
      const items = response.data.map((item) => renderItem(item));
      // console.log(items);

      page.replaceChildren(...items);
    })
    .catch((err) => {
      console.log(err);
    });
};
