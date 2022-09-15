import { renderMenuList } from "./menu.js";
import { renderOurStory } from "./our-story.js";
import { renderCartList } from "./cart.js";
import { renderSignUp } from "./signUp.js";
import { renderContact } from "./contact.js";
import { renderLogin } from "./login.js";
import { logoutAction } from "./logout.js";

import { renderOrderDetails } from "./order-details.js";
import { renderAllOrders } from "./orders.js";
import { renderNewItem } from "./new-item.js";


export const renderHeader = () => {
  const header = document.querySelector("#header-nav");
  header.innerHTML = `
    <h1>Cake Shop</h1>
    <ul id="navlist">
      <li id="homepage">Home</li>
      <li id="sign-up">Sign Up</li>
      <li id="login">Log in</li>
      <li id="logout">Log out</li>
      <li id="menu">Menu</li>
      <li id="story">Our Story</li>
      <li id="contact">Contact</li>
      <li id="cart">Cart</li>
      <li id="orders">All Orders</li>
      <li id="order_details">Order details</li>
      <li id="add_new_item">Add Item</li>
    </ul>
  `;

  const menuLi = document.getElementById("menu");
  menuLi.addEventListener("click", renderMenuList);

  const story = document.getElementById("story");
  story.addEventListener("click", renderOurStory);

  const cartLi = document.getElementById("cart");
  cartLi.addEventListener("click", renderCartList);


  const signUp = document.getElementById("sign-up");
  signUp.addEventListener("click", renderSignUp);

  const contact = document.getElementById("contact");
  contact.addEventListener("click", renderContact);

  const login = document.getElementById("login");
  login.addEventListener("click", renderLogin);

  const logout = document.getElementById("logout");
  logout.addEventListener("click", logoutAction);

  const ordersLi = document.getElementById("orders");
  ordersLi.addEventListener("click", renderAllOrders);

  const orderDetailsLi = document.getElementById("order_details");
  orderDetailsLi.addEventListener("click", renderOrderDetails);

  const newItemLi = document.getElementById("add_new_item");
  newItemLi.addEventListener("click", renderNewItem);

};
