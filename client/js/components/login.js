import { renderHome } from "./home.js";

export const renderLogin = () => {
    const page = document.querySelector("#page");
    const heading = document.createElement("h1");
    heading.textContent = "Log in";
  
    const form = document.createElement("form");
    form.innerHTML = `
    <fieldset>
      <label for="">E-mail</label>
      <input type="text" name="email">
    </fieldset>
    <fieldset>
      <label for="">Password: </label>
      <input type="password" name="password">
    </fieldset>

    <button>Log In</button>

    `;
    
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const formData = new FormData(form);
      const data = {
        email: formData.get("email"),
        password: formData.get("password")
      };
    //   console.log(data);
  
      axios
        .post("/api/session", data)
        .then(() => {
          alert("You are logged in!")  
          renderHome()
        })
        .catch((err) => {
          if (err.response.status === 500) {
            alert("Failed to log in. Please try again.");
          } else {
            alert(err.response.data.message);
          }
        });
    });
  
    page.replaceChildren(heading, form);
  };