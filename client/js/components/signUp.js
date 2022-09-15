import { renderLogin } from "./login.js";

export const renderSignUp = (user) => {
    const page = document.querySelector("#page");
    const heading = document.createElement("h1");
    heading.textContent = "Sign Up";
  
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

    <button>Sign Up</button>

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
        .post("/api/signup", data)
        .then(() => {
            alert("Welcome to Jula's bakery!")
            renderLogin()
        })
        .catch((err) => {
          if (err.response.status === 500) {
            alert("Oops, failed to Sign Up. Please try again.");
          } else {
            alert(err.response.data.message);
          }
        });
    });
  
    page.replaceChildren(heading, form);
  };