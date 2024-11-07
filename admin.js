// Funkcija za dodavanje proizvoda
document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];

    // Prikupljanje svih dimenzija
    const dimensions = [];
    document.querySelectorAll('.dimension-input').forEach((input) => {
        if (input.value) dimensions.push(input.value);
    });

    const newProduct = { name, code, price, description, dimensions };

    // Čitanje slike i pretvaranje u base64 string
    const reader = new FileReader();
    reader.onloadend = function () {
        newProduct.image = reader.result;

        fetch('/add-product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Proizvod uspešno dodat!');
                document.getElementById('product-form').reset();
                document.getElementById('dimensions-list').innerHTML = '';
            } else {
                alert('Greška prilikom dodavanja proizvoda.');
            }
        })
        .catch(error => console.error('Greška:', error));
    };

    if (image) {
        reader.readAsDataURL(image);
    } else {
        newProduct.image = '';
        alert('Dodajte sliku proizvoda.');
    }
});

// Funkcija za dodavanje novih polja dimenzija
document.getElementById('add-dimension').addEventListener('click', () => {
    const dimensionList = document.getElementById('dimensions-list');
    const newDimensionInput = document.createElement('input');
    newDimensionInput.type = 'text';
    newDimensionInput.className = 'dimension-input';
    newDimensionInput.placeholder = 'Unesite dimenziju';
    dimensionList.appendChild(newDimensionInput);
});

// Funkcija za prikazivanje popupa za izmenu proizvoda
function openEditPopup(product) {
    document.getElementById('edit-product-popup').style.display = 'block';
    document.getElementById('edit-name').value = product.name;
    document.getElementById('edit-code').value = product.code;
    document.getElementById('edit-price').value = product.price;
    document.getElementById('edit-description').value = product.description;
    document.getElementById('edit-dimensions-list').innerHTML = '';

    product.dimensions.forEach(dim => {
        const dimensionInput = document.createElement('input');
        dimensionInput.type = 'text';
        dimensionInput.value = dim;
        dimensionInput.className = 'dimension-input';
        document.getElementById('edit-dimensions-list').appendChild(dimensionInput);
    });
}

// Zatvaranje popupa za izmenu proizvoda
document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('edit-product-popup').style.display = 'none';
});

document.getElementById('close-edit-popup').addEventListener('click', () => {
    document.getElementById('edit-product-popup').style.display = 'none';
});

// Funkcija za ažuriranje proizvoda u popup prozoru
document.getElementById('edit-product-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const updatedProduct = {
        name: document.getElementById('edit-name').value,
        code: document.getElementById('edit-code').value,
        price: document.getElementById('edit-price').value,
        description: document.getElementById('edit-description').value,
        dimensions: Array.from(document.querySelectorAll('#edit-dimensions-list .dimension-input')).map(input => input.value),
    };

    // Slanje ažuriranog proizvoda na server
    fetch('/update-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Proizvod uspešno ažuriran!');
            document.getElementById('edit-product-popup').style.display = 'none';
        } else {
            alert('Greška prilikom ažuriranja proizvoda.');
        }
    })
    .catch(error => console.error('Greška:', error));
});