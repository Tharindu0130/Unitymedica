// Defining Variables
const basketTable = document.getElementById("basketTable").querySelector("tbody");
const totalPriceElement = document.getElementById("totalPrice");
const addToFavoritesButton = document.getElementById("addToFavorites");
const applyFavoritesButton = document.getElementById("applyFavorites");
const buyNowButton = document.getElementById("buyNow");

// Defining Event Listeners
// Event listener for medicine section quantity change
document.querySelectorAll(".medicine").forEach(medicine => {
    const qtyInput = medicine.querySelector(".product-qty");
    const name = medicine.querySelector("h3").innerText;
    const price = parseFloat(medicine.querySelector("h4").innerText.substring(1));

    qtyInput.addEventListener("change", () => {
        const quantity = parseInt(qtyInput.value) || 0;
        updateBasketFromMedicineSection(name, price, quantity);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navBar = document.getElementById("nav_bar");
  
    hamburger.addEventListener("click", function () {
      navBar.classList.toggle("active");
    });
  });
  

// Event listeners for favorites buttons
addToFavoritesButton.addEventListener("click", saveFavorites);
applyFavoritesButton.addEventListener("click", applyFavorites);

// Event listener for the Buy Now button
buyNowButton.addEventListener("click", () => {
    window.location.href = "payment.html"; // Redirect to payment page
});

// Defining Functions
// Function to update the basket table from medicine section
function updateBasketFromMedicineSection(name, price, quantity) {
    const existingRow = [...basketTable.rows].find(row => row.cells[0].innerText === name);

    if (quantity === 0 && existingRow) {
        existingRow.remove(); // Remove the item if quantity is 0
    } else if (existingRow) {
        const qtyCell = existingRow.cells[1];
        const priceCell = existingRow.cells[2];
        qtyCell.innerText = quantity;
        priceCell.innerText = `$${(price * quantity).toFixed(2)}`;
    } else if (quantity > 0) {
        const row = basketTable.insertRow();
        row.innerHTML = `
            <td>${name}</td>
            <td>${quantity}</td>
            <td>$${(price * quantity).toFixed(2)}</td>
            <td><button class="remove-btn">Remove</button></td>
        `;

        // Add event listener for remove button
        row.querySelector(".remove-btn").addEventListener("click", () => {
            row.remove();
            updateTotalPrice();
            saveBasketToLocalStorage();
        });
    }

    updateTotalPrice();
    saveBasketToLocalStorage();
}

// Function to update the total price
function updateTotalPrice() {
    let total = 0;
    [...basketTable.rows].forEach(row => {
        total += parseFloat(row.cells[2].innerText.substring(1));
    });
    totalPriceElement.innerText = `$${total.toFixed(2)}`;
}

// Function to save the basket to localStorage
function saveBasketToLocalStorage() {
    const basket = [...basketTable.rows].map(row => ({
        name: row.cells[0].innerText,
        quantity: parseInt(row.cells[1].innerText),
        price: parseFloat(row.cells[2].innerText.substring(1)),
    }));
    localStorage.setItem("basket", JSON.stringify(basket));
}

// Function to load the basket from localStorage
function loadBasketFromLocalStorage() {
    const basket = JSON.parse(localStorage.getItem("basket") || "[]");
    basketTable.innerHTML = ""; // Clear existing table
    basket.forEach(item => {
        updateBasketFromMedicineSection(item.name, item.price / item.quantity, item.quantity);
    });
}

// Function to save favorites
function saveFavorites() {
    const favorites = [...basketTable.rows].map(row => ({
        name: row.cells[0].innerText,
        quantity: parseInt(row.cells[1].innerText),
        price: parseFloat(row.cells[2].innerText.substring(1)),
    }));
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Favorites saved!");
}

// Function to apply favorites
function applyFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    basketTable.innerHTML = "";
    favorites.forEach(item => {
        updateBasketFromMedicineSection(item.name, item.price / item.quantity, item.quantity);
    });
}

// Load basket from localStorage when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadBasketFromLocalStorage();
});
