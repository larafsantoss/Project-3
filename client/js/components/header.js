import { renderMenuList } from "./menu.js";

export const renderHeader = () => {
  const header = document.querySelector("#header-nav");
  header.innerHTML = `
    <h1>Cake Shop</h1>
    <ul id="navlist">
      <li>Home</li>
      <li id="menu">Menu</li>
      <li>Our Story</li>
      <li>Contact</li>
    </ul>
  `;

  const menuLi = document.getElementById("menu");
  menuLi.addEventListener("click", renderMenuList);
};
