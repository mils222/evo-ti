// Funkcija za generisanje proizvoda na stranici
function renderProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Očistimo prethodne proizvode

    products.forEach(product => {
        // Kreiramo karticu za svaki proizvod
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        // Dodajemo event listener za klik na karticu proizvoda
        productCard.onclick = () => openProductPopup(product);

        // Dodajemo sliku proizvoda
        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;
        productImage.classList.add('product-image');
        
        // Dodajemo naziv proizvoda
        const productName = document.createElement('h3');
        productName.textContent = product.name;

        // Dodajemo cenu proizvoda
        const productPrice = document.createElement('p');
        productPrice.textContent = `Cena: ${product.price} RSD`;

        // Dodajemo opis proizvoda
        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;

        // Kreiramo listu dimenzija
        const dimensionSelect = document.createElement('select');
        dimensionSelect.classList.add('dimension-select');
        dimensionSelect.innerHTML = '<option value="">Izaberi dimenziju</option>'; // Default opcija

        product.dimensions.forEach(dimension => {
            const option = document.createElement('option');
            option.value = dimension;
            option.textContent = dimension;
            dimensionSelect.appendChild(option);
        });

        // Kreiramo dugme za narudžbinu
        const orderButton = document.createElement('button');
        orderButton.textContent = 'Naruči';
        orderButton.classList.add('order-button');
        orderButton.onclick = (event) => {
            event.stopPropagation(); // Sprečava otvaranje popupa kada se klikne na dugme
            orderProduct(product, dimensionSelect.value);
        };

        // Dodajemo sve elemente u karticu
        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);
        productCard.appendChild(productDescription);
        productCard.appendChild(dimensionSelect);
        productCard.appendChild(orderButton);

        // Dodajemo karticu proizvoda u glavni container
        productContainer.appendChild(productCard);
    });
}

// Funkcija za naručivanje proizvoda
function orderProduct(product, selectedDimension) {
    if (selectedDimension) {
        alert(`Naručen proizvod: ${product.name} sa dimenzijom ${selectedDimension}`);
    } else {
        alert('Morate izabrati dimenziju proizvoda.');
    }
}

// Funkcija za otvaranje popupa sa informacijama o proizvodu
function openProductPopup(product) {
    // Kreiramo popup
    const popup = document.createElement('div');
    popup.classList.add('product-popup');

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');

    // Dodajemo informacije o proizvodu
    const popupName = document.createElement('h2');
    popupName.textContent = product.name;

    const popupDescription = document.createElement('p');
    popupDescription.textContent = product.description;

    const popupPrice = document.createElement('p');
    popupPrice.textContent = `Cena: ${product.price} RSD`;

    const popupDimensions = document.createElement('p');
    popupDimensions.textContent = `Dimenzije: ${product.dimensions.length > 0 ? product.dimensions.join(', ') : 'Nema dimenzija'}`;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Zatvori';
    closeButton.onclick = () => document.body.removeChild(popup);

    // Dodajemo sve elemente u popup
    popupContent.appendChild(popupName);
    popupContent.appendChild(popupDescription);
    popupContent.appendChild(popupPrice);
    popupContent.appendChild(popupDimensions);
    popupContent.appendChild(closeButton);
    popup.appendChild(popupContent);

    // Dodajemo popup na telo stranice
    document.body.appendChild(popup);
}

// Učitavamo proizvode sa servera
fetch('products.json')
    .then(response => response.json())
    .then(products => {
        renderProducts(products);
    })
    .catch(error => {
        console.error('Greška pri učitavanju proizvoda:', error);
    });
