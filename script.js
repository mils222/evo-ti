let currentIndex = 0;
const productList = document.querySelector('.product-list');
const products = document.querySelectorAll('.product');
const totalProducts = products.length;
const visibleProducts = 3; // Prikazujemo 3 proizvoda

function moveCarousel(direction) {
    currentIndex += direction;

    // Ograničenja
    if (currentIndex < 0) {
        currentIndex = totalProducts - visibleProducts;
    } else if (currentIndex > totalProducts - visibleProducts) {
        currentIndex = 0;
    }

    // Pomak
    productList.style.transform = `translateX(-${(currentIndex / totalProducts) * 100}%)`;
}

// Automatsko pomeranje svakih 3 sekunde
setInterval(() => moveCarousel(1), 3000);