import { renderMenuList } from "./menu.js";
import { renderOurStory } from "./our-story.js";
import { renderCartList } from "./cart.js";

export const renderHeader = () => {
  const header = document.querySelector("#header-nav");
  header.innerHTML = `
    <h1>Cake Shop</h1>
    <ul id="navlist">
      <li>Home</li>
      <li id="menu">Menu</li>
      <li id="story">Our Story</li>
      <li id="contact">Contact</li>
      <li id="cart">Cart</li>
    </ul>
  `;

  const menuLi = document.getElementById("menu");
  menuLi.addEventListener("click", renderMenuList);

  const story = document.getElementById("story");
  story.addEventListener("click", renderOurStory);

  const cartLi = document.getElementById("cart");
  cartLi.addEventListener("click", renderCartList);
};
