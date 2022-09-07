export const renderStory = () => {
    const el = document.createElement("div");

  
    const ourStory = document.createElement("h2");
    ourStory.textContent = 'Our story';
  
    const storyP = document.createElement("p");
    storyP.textContent = 'Cake shop is a petite bakery in inner Sydney with a large and devotes following for its Debugging cupcakes and cookies. Our team is composed of 16 bakers that were trying to become software developers, but something went wrong in ‘a 3rd Project’ so we gave up and decide to cook delicious cakes using ingredients from Lucys farm supplier. Not every day is perfect, some days Sid is not there to help us out, some days Ken and Ge (our regular customers) order more than we can cook. It is the good days we live for though. Sometimes we do not even remember that we had to use CSS someday! That is the gold.';
  
    const team = document.createElement("p");
    team.textContent = team.name;

    const img = document.createElement("p");
    img.scr = team.image_url;
    console.log(img.scr);

    el.append(ourStory, storyP, team, img);
  
    return el;
  };
  
  export const renderOurStory = () => {
    const page = document.querySelector("#page");
    const paragraph = document.createElement("p");
    paragraph.classList.add("loading");
  
    paragraph.textContent = "Loading...";
    page.replaceChildren(paragraph);
  
    axios
      .get("/api/story")
      .then((response) => {
        // console.log(response.data);
        const storyElements = response.data.map((story) => renderStory(story));
        console.log(storyElements);
  
        page.replaceChildren(...storyElements);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  