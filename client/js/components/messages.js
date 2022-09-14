export const renderOrderSuccessMessage = (orderId) => {
  const page = document.querySelector("#page");

  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `
  <h1>Your order #${orderId} has been placed!</h1>
  <p>
  Back to shopping
  </p>
  `;
  page.replaceChildren(messageDiv);
};
