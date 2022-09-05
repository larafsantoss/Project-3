export const renderItem = (item) => {
  const el = document.createElement("div");

  const name = document.createElement("h3");
  name.textContent = item.name;

  const price = document.createElement("p");
  price.textContent = `$${item.price_in_cents / 100}`;

  const img = document.createElement("img");
  img.src = item.image_url;
  console.log(img.src);

  el.append(name, price, img);

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
      // console.log(response.data);
      const items = response.data.map((item) => renderItem(item));
      console.log(items);

      page.replaceChildren(...items);
    })
    .catch((err) => {
      console.log(err);
    });
};
