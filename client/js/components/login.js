import { renderHome } from "./home.js";
import { renderSignUp } from "./signUp.js";

export const renderLogin = () => {
  const page = document.querySelector("#page");
  const formSection = document.createElement("section");
  formSection.classList.add("product_section", "layout_padding");
  formSection.innerHTML = `
    <div id="product_section_preview" class="container">
      <div class="heading_container heading_center">
        <h2>
          Log In
        </h2>
      </div>
      <div class="row">
        <div class="col-md-9 mx-auto">
          <div class="form_container">
            <form class="log_in_form">
              <div class="form-row">
                <div class="form-group col-md-12">
                  <input name="email" type="text" class="form-control" placeholder="Email Address" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <input name="password" type="password" class="form-control" placeholder="Password" />
                </div>
              </div>
              <div>Have a seller code? <a href="#" class="render-sign-up">Sign Up!</a></div>
              <div class="btn-box">
                <a href="#" class="process-log-in">Log In</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  formSection
    .getElementsByClassName("render-sign-up")[0]
    .addEventListener("click", renderSignUp);

  const form = formSection.getElementsByClassName("log_in_form")[0];

  formSection
    .getElementsByClassName("process-log-in")[0]
    .addEventListener("click", () => {
      const formData = new FormData(form);
      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      axios
        .post("/api/session", data)
        .then(() => {
          localStorage.setItem("cartItems", JSON.stringify({}));
          window.location.href = "";
        })
        .catch((err) => {
          if (err.response.status === 500) {
            alert("Oops, failed to Log In. Please try again.");
          } else {
            alert(err.response.data.message);
          }
        });
    });

  page.replaceChildren(formSection);
};
