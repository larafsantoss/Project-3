import { renderMenuList } from "./menu.js";
import { renderOurStory } from "./our-story.js";
import { renderHome } from "./home.js";
import { renderContact } from "./contact.js";

export const renderHeader = () => {
  const header = document.querySelector("#header-nav");
  header.innerHTML = `
    <h1>Cake Shop</h1>
    <ul id="navlist">
      <li id="home">Home</li>
      <li id="menu">Menu</li>
      <li id="story">Our Story</li>
      <li id="contact">Contact</li>
    </ul>
  `;

  const menuLi = document.getElementById("menu");
  menuLi.addEventListener("click", renderMenuList);

  const story = document.getElementById("story");
  story.addEventListener("click", renderOurStory);

  const home = document.getElementById("home");
  home.addEventListener("click", renderHome);

  const contact = document.getElementById("contact");
  contact.addEventListener("click", renderContact);
};
