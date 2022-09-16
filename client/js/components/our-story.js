export const renderOurStory2 = () => {
  const storyDiv = document.createElement("div");
  storyDiv.innerHTML = `
  <h2>HOW IT WORKS</h2>
  <h3>1. ORDER YOUR CAKE ONLINE</h3>
  <p>When it comes to cakes in Sydney, we have the widest range to choose from and all tastes / dietary requirements are catered for.

  The only problem is...
  
  How will you ever decide?
  
  Don't agonise too long, though, because online cake orders made by 2:30pm qualify for our guaranteed next business day delivery.</p>
  <h3>2. KICK BACK & RELAX</h3>
  <p>By the time you've wiped away the cake-induced drool from the corners of your mouth, the confirmation email and tax invoice will be sitting in your inbox.

  The day before delivery, your cake will be baked in the kind of authentic kitchen that even your gran would be jealous of.
  
  On delivery day, whether it’s home or office, you'll be greeted by one of our drivers before the agreed deadline. Seriously, they know the roads of Sydney so well, they don't even use Google Maps.</p>
  <p>
  "Cake shop is a petite bakery in inner Sydney with a large and devotes
  following for its Debugging cupcakes and cookies. Our team is composed of
  16 bakers that were trying to become software developers, but something
  went wrong in ‘a 3rd Project’ so we gave up and decide to cook delicious
  cakes using ingredients from Lucys farm supplier. Not every day is
  perfect, some days Sid is not there to help us out, some days Ken and Ge
  (our regular customers) order more than we can cook. It is the good days
  we live for though. Sometimes we do not even remember that we had to use
  CSS someday! That is the gold."
</p>
  `;

  page.replaceChildren(storyDiv);
};

export const renderOurStory = () => {
  const page = document.querySelector("#page");
  const aboutSection = document.createElement("section");
  aboutSection.classList.add("about_section", "layout_padding");
  aboutSection.innerHTML = `
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
          <h2>HOW IT WORKS</h2>
          </div>
          <h3>1. ORDER YOUR CAKE ONLINE</h3>
          <p>When it comes to cakes in Sydney, we have the widest range to choose from and all tastes / dietary requirements are catered for.
        
          The only problem is...
          
          How will you ever decide?
          
          Don't agonise too long, though, because online cake orders made by 2:30pm qualify for our guaranteed next business day delivery.</p>
          <h3>2. KICK BACK & RELAX</h3>
          <p>By the time you've wiped away the cake-induced drool from the corners of your mouth, the confirmation email and tax invoice will be sitting in your inbox.
        
          The day before delivery, your cake will be baked in the kind of authentic kitchen that even your gran would be jealous of.
          
          On delivery day, whether it's home or office, you'll be greeted by one of our drivers before the agreed deadline. Seriously, they know the roads of Sydney so well, they don't even use Google Maps.</p>
          <p>
          "Jula Bakery is a petite bakery in inner Sydney with a large and devotes
          following for its Debugging cupcakes and cookies. Our team is composed of
          16 bakers that were trying to become software developers, but something
          went wrong in 'a 3rd Project' so we gave up and decide to cook delicious
          cakes using ingredients from Lucys farm supplier. Not every day is
          perfect, some days Sid is not there to help us out, some days Ken and Ge
          (our regular customers) order more than we can cook. It is the good days
          we live for though. Sometimes we do not even remember that we had to use
          CSS someday! That is the gold."
        </p>
          <a href="">
            Read More
          </a>
        </div>
      </div>
    </div>
  </div>
  `;
  page.replaceChildren(aboutSection);
};
