import { renderHeader } from "./components/header.js";
localStorage.clear(); // TO DELETE

const cartItems = JSON.parse(localStorage.getItem("cartItems"));
if (!cartItems) {
  localStorage.setItem("cartItems", JSON.stringify({}));
}
renderHeader();
