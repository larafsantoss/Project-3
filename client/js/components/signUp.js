import { renderLogin } from "./login.js";

export const renderSignUp = () => {
  const page = document.querySelector("#page");
  const formSection = document.createElement("section");
  formSection.classList.add("product_section", "layout_padding");
  formSection.innerHTML = `
      <div id="product_section_preview" class="container">
        <div class="heading_container heading_center">
          <h2>
            Sign Up
          </h2>
        </div>
        <div class="row">
          <div class="col-md-9 mx-auto">
            <div class="form_container">
              <form class="sign_up_form">
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
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <input name="seller_code" type="text" class="form-control" placeholder="Seller Code" />
                  </div>
                </div>
                <div>Already have an account? <a href="#" class="render-log-in">Log In!</a></div>
                <div class="btn-box">
                  <a href="#" class="process-sign-up">Sign Up</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;

  formSection
    .getElementsByClassName("render-log-in")[0]
    .addEventListener("click", renderLogin);

  const form = formSection.getElementsByClassName("sign_up_form")[0];

  formSection
    .getElementsByClassName("process-sign-up")[0]
    .addEventListener("click", () => {
      const formData = new FormData(form);
      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
        sellerCode: formData.get("seller_code"),
      };

      axios
        .post("/api/signup", data)
        .then(() => {
          localStorage.setItem("cartItems", JSON.stringify({}));
          window.location.href = "";
        })
        .catch((err) => {
          if (err.response.status === 500) {
            alert("Oops, failed to Sign Up. Please try again.");
          } else if (err.response.status === 401) {
            alert("Invalid seller code!");
          } else {
            alert(err);
          }
        });
    });

  page.replaceChildren(formSection);
};
