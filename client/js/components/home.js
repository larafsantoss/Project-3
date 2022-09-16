import { renderItem, renderMenuList } from "./menu.js";
import { renderOurStory } from "./our-story.js";

export const renderHome = () => {
  const page = document.querySelector("#page");

  const introSection = document.createElement("section");
  introSection.classList.add("cat_section");
  introSection.innerHTML = `
  <section>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="box">
          <div class="img-box">
            <img src="images/c1.jpg" alt="">
          </div>
          <div class="detail-box">
            <h5>
              Birthday Cakes
            </h5>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="box">
          <div class="img-box">
            <img src="images/c2.jpg" alt="">
          </div>
          <div class="detail-box">
            <h5>
              Wedding Cakes
            </h5>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="box">
          <div class="img-box">
            <img src="images/c3.jpg" alt="">
          </div>
          <div class="detail-box">
            <h5>
              Cupcakes
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>

  <section class="about_section layout_padding">
  <div class="container  ">

    <div class="row">
      <div class="col-md-6 ">
        <div class="img-box">
          <img src="images/about-img.png" alt="">
        </div>
      </div>
      <div class="col-md-6">
        <div class="detail-box">
          <div class="heading_container">
            <h2>
              We Are Jula Bakery
            </h2>
          </div>
          <p>
            Jula Bakery is a petite bakery in inner Sydney with a large and devotes
            following for its Debugging cupcakes and cookies. Our team is composed of
            16 bakers that were trying to become software developers, but something
            went wrong in "a 3rd Project" so we gave up and decide to cook delicious
            cakes using ingredients from Lucys farm supplier. Not every day is
            perfect, some days Sid is not there to help us out, some days Ken and Ge
            (our regular customers) order more than we can cook. It is the good days
            we live for though. Sometimes we do not even remember that we had to use
            CSS someday! That is the gold.
          </p>
          <a id="read-more-btn" href="#">
            Read More
          </a>
        </div>
      </div>
    </div>
  </div>
  </section>`;

  const itemSection = document.createElement("section");
  itemSection.classList.add("product_section", "layout_padding");
  itemSection.innerHTML = `
  <div id="product_section_preview" class="container">
    <div class="heading_container heading_center">
      <h2>
        Our Products
      </h2>
    </div>
    <div id="product_section_data" class="row" style="justify-content: center;">
      <img src="images/loading.gif" />
    </div>
  </div>
  `;

  axios.get("/api/items").then((response) => {
    const items = response.data.sort((a, b) => 0.5 - Math.random());

    const itemDivs = items.slice(0, 8).map((item) => renderItem(item));
    const dataSection = document.querySelector("#product_section_data");

    dataSection.replaceChildren(...itemDivs);

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("btn-box");
    buttonDiv.innerHTML = `
    <div id="view-all-products-btn" class="btn-box">
      <a href="#">
        View All Products
      </a>
    </div>
    `;
    document.querySelector("#product_section_data").appendChild(buttonDiv);
    const viewAllBtn = document.getElementById("view-all-products-btn");
    viewAllBtn.addEventListener("click", renderMenuList);
  });

  const clientSection = document.createElement("section");
  clientSection.classList.add("client_section", "layout_padding");
  clientSection.innerHTML = `
  </script>
    <div class="container">
      <div class="heading_container heading_center psudo_white_primary mb_45">
        <h2>
          What Says Our Customers
        </h2>
      </div>
      <div class="carousel-wrap row">
        <div class="owl-carousel client_owl-carousel">
          <div class="item">
            <div class="box">
              <div class="img-box">
                <img src="images/client1.jpg" alt="" class="box-img">
              </div>
              <div class="detail-box">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                </p>
                <h6>
                  Klara Smith
                </h6>
                <p>
                  magna aliqua
                </p>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="box">
              <div class="img-box">
                <img src="images/client2.jpg" alt="" class="box-img">
              </div>
              <div class="detail-box">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                </p>
                <h6>
                  Jessica Hawk
                </h6>
                <p>
                  magna aliqua
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const contactSection = document.createElement("section");
  contactSection.classList.add("contact_section", "layout_padding-bottom");
  contactSection.innerHTML = `
    <div class="container">
      <div class="heading_container heading_center">
        <h2>
          Contact Us
        </h2>
      </div>
      <div class="row">
        <div class="col-md-9 mx-auto">
          <div class="form_container">
            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input type="text" class="form-control" placeholder="First Name" />
                </div>
                <div class="form-group col-md-6">
                  <input type="text" class="form-control" placeholder="Last Name" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input type="email" class="form-control" placeholder="Email" />
                </div>
                <div class="form-group col-md-6">
                  <input type="text" class="form-control" placeholder="Phone Number" />
                </div>
              </div>
              <div class="form-group ">
                <input type="text" class="message-box" placeholder="Message" />
              </div>
              <div class="btn-box">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  page.replaceChildren(
    introSection,
    itemSection,
    clientSection,
    contactSection
  );

  const readMoreBtn = document.getElementById("read-more-btn");
  readMoreBtn.addEventListener("click", renderOurStory);

  $(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 2,
      },
    },
  });
};
