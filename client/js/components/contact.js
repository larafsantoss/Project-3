export const renderContact = () => {
    const contact = document.createElement("div");
    contact.classList.add("contactInfo");

    const title = document.createElement("h2");
    title.textContent = "Contact and Opening Hours";

    const description = document.createElement("p");
    description.textContent = "The Podium Building, 1 Market St, Sydney NSW 2000";

    const hours = document.createElement("p");
    hours.textContent = " Mondays, Wednesdays and Saturdays 8:00am - 5:00pm";
    
    contact.append(title, description, hours);
    page.replaceChildren(contact);
  };