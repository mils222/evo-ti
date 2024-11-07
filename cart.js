const productList = document.getElementById('ordered-products');
const orderForm = document.getElementById('order-form');
const orderButton = document.getElementById('order-button');
const popupMessage = document.getElementById('popup-message');
const closeButton = document.getElementById('close-button');

// Funkcija za učitavanje proizvoda iz korpe
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    productList.innerHTML = ''; // Očisti trenutnu listu

    if (cart.length === 0) {
        productList.innerHTML = '<p>Vaša korpa je prazna.</p>';
        return;
    }

    cart.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Cena: ${product.price} RSD</p>
            <button class="remove-from-cart" data-index="${index}">Ukloni</button>
        `;
        productList.appendChild(productCard);
    });

    // Dodaj funkcionalnost za uklanjanje proizvoda iz korpe
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}

// Funkcija za uklanjanje proizvoda iz korpe
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Ukloni proizvod na datom indeksu
    localStorage.setItem('cart', JSON.stringify(cart)); // Sačuvaj ažuriranu korpu
    loadCart(); // Ponovo učitaj korpu
}

// Funkcija za obradu narudžbe
orderButton.addEventListener('click', () => {
    const formData = new FormData(orderForm);
    const customerData = {};

    formData.forEach((value, key) => {
        customerData[key] = value;
    });

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Korpa je prazna!');
        return;
    }

    // Prikazivanje popup obaveštenja
    showPopup(`Uspešno ste naručili proizvode:\n${cart.map(p => p.name).join(', ')}\nHvala na kupovini!`);
    
    // Očisti korpu
    localStorage.removeItem('cart');
    loadCart(); // Ponovo učitaj korpu da prikazuje prazno
});

// Funkcija za prikazivanje popup obaveštenja
function showPopup(message) {
    popupMessage.innerText = message;
    popupMessage.style.display = 'block';
}

// Zatvori popup
closeButton.addEventListener('click', () => {
    popupMessage.style.display = 'none';
});

// Pozovi funkciju za učitavanje korpe prilikom učitavanja stranice
loadCart();
