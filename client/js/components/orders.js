export const renderAllOrders = () => {
  const page = document.querySelector("#page");
  const paragraph = document.createElement("p");
  paragraph.classList.add("loading");

  paragraph.textContent = "Loading...";
  page.replaceChildren(paragraph);

  axios.get("/api/orders").then((response) => {
    console.log("something");
  });
};
