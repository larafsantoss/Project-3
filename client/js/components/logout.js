import { renderHome } from "./home.js";

export const logoutAction = () => {
    axios.delete("/api/session").then((response) => {
        renderHome();
    });
  };
