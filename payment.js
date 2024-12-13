// 1. Define Variables
let basket = JSON.parse(localStorage.getItem("basket")) || []; // Basket items from localStorage
const orderSummaryTable = document.getElementById("order-summary"); // Order summary table
const totalPriceElement = document.getElementById("total-price-summary"); // Total price summary element
const payButton = document.getElementById("pay-button"); // Payment button
const thankYouMessage = document.getElementById("thank-you-message"); // Thank you message element
const deliveryDateSummary = document.getElementById("delivery-date-summary"); // Delivery date element
const hamburger = document.querySelector('.hamburger'); // Hamburger menu button
const navBar = document.querySelector('#nav_bar'); // Navigation bar

// 2. Define Event Listeners
document.addEventListener("DOMContentLoaded", populateOrderSummary); // Populate order summary when DOM is loaded
payButton.addEventListener("click", processPayment); // Handle payment button click
hamburger.addEventListener('click', () => { // Toggle the navigation bar visibility on hamburger click
  navBar.classList.toggle('active');
});

// 3. Functions

// Function to populate the order summary table and calculate the total price
function populateOrderSummary() {
    let totalPrice = 0;

    // Loop through each item in the basket and create a table row
    basket.forEach(item => {
        const row = document.createElement("tr"); // Create a new row for each item
        row.innerHTML = `
            <td>${item.name}</td>           <!-- Item Name -->
            <td>${item.quantity}</td>       <!-- Item Quantity -->
            <td>$${item.price}</td>         <!-- Item Price -->
        `;
        orderSummaryTable.appendChild(row); // Add the row to the table
        
        // Add the item's price to the total price
        totalPrice += parseFloat(item.price);
    });

    // Update the total price display
    totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`; // Show total price with 2 decimal places
}

// Function to process the payment and show the confirmation message
function processPayment(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if the form is filled correctly
    if (validateForm()) {
        const deliveryDate = new Date(); // Get the current date
        deliveryDate.setDate(deliveryDate.getDate() + 7); // Set delivery date to 7 days later

        // Show the thank you message and the delivery date
        thankYouMessage.classList.remove("hidden");
        deliveryDateSummary.innerText = deliveryDate.toDateString(); // Format the delivery date

        // Clear the basket from localStorage after payment
        localStorage.removeItem("basket");
    } else {
        alert("Please fill in all required fields before proceeding with payment.");
    }
}

// Function to validate the form inputs before payment
function validateForm() {
    // Get the form values from the input fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const branch = document.getElementById("branch").value;
    const zipcode = document.getElementById("zipcode").value;
    const cardnumber = document.getElementById("cardnumber").value;
    const expmonth = document.getElementById("expmonth").value;
    const expyear = document.getElementById("expyear").value;
    const cvv = document.getElementById("cvv").value;

    // Check if any required field is empty
    if (!name || !email || !address || !city || !branch || !zipcode || !cardnumber || !expmonth || !expyear || !cvv) {
        return false; // Return false if validation fails
    }

    return true; // Return true if all fields are filled correctly
}
