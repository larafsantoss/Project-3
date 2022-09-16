import { renderHeader } from "./components/header.js";
import { renderHome } from "./components/home.js";
// localStorage.clear(); // TO DELETE

const cartItems = JSON.parse(localStorage.getItem("cartItems"));
if (!cartItems) {
  localStorage.setItem("cartItems", JSON.stringify({}));
}
renderHeader();
renderHome();
