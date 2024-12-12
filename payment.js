// 1. Define Variables
let basket = JSON.parse(localStorage.getItem("basket")) || [];
const orderSummaryTable = document.getElementById("order-summary");
const totalPriceElement = document.getElementById("total-price-summary");
const payButton = document.getElementById("pay-button");
const thankYouMessage = document.getElementById("thank-you-message");
const deliveryDateSummary = document.getElementById("delivery-date-summary");
const hamburger = document.querySelector('.hamburger');
const navBar = document.querySelector('#nav_bar');

// 2. Define Event Listeners
document.addEventListener("DOMContentLoaded", populateOrderSummary);
payButton.addEventListener("click", processPayment);




hamburger.addEventListener('click', () => {
  navBar.classList.toggle('active');
});

// 3. Functions

// Function to populate the order summary table and calculate the total price
function populateOrderSummary() {
    let totalPrice = 0;

    // Loop through the basket items and add them to the table
    basket.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price}</td>
        `;
        orderSummaryTable.appendChild(row);
        
        // Calculate the total price
        totalPrice += parseFloat(item.price);
    });

    // Update the total price in the summary
    totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
}

// Function to process the payment and show the confirmation message
function processPayment(event) {
    event.preventDefault();

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);

    // Display the thank-you message and delivery date
    thankYouMessage.classList.remove("hidden");
    deliveryDateSummary.innerText = deliveryDate.toDateString();

    // Clear the basket from local storage
    localStorage.removeItem("basket");
}
