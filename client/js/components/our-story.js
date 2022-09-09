export const renderOurStory = () => {
  const storyP = document.createElement("p");
  storyP.textContent =
    "Cake shop is a petite bakery in inner Sydney with a large and devotes following for its Debugging cupcakes and cookies. Our team is composed of 16 bakers that were trying to become software developers, but something went wrong in ‘a 3rd Project’ so we gave up and decide to cook delicious cakes using ingredients from Lucys farm supplier. Not every day is perfect, some days Sid is not there to help us out, some days Ken and Ge (our regular customers) order more than we can cook. It is the good days we live for though. Sometimes we do not even remember that we had to use CSS someday! That is the gold.";
  page.replaceChildren(storyP);
};
