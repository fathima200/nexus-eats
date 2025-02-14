//function to  add to cart
        function loadCart() {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let cartItemsContainer = document.getElementById('cart-items');
            let totalPriceContainer = document.getElementById('total-price');
            let totalPrice = 0;

            cartItemsContainer.innerHTML = ''; // this code literallyClear previous content

            cart.forEach((item, index) => {
                totalPrice += item.subtotal;
                cartItemsContainer.innerHTML += `
                    <tr>
                        <td><img src="${item.image}" class="cart-image"></td>
                        <td>${item.name}</td>
                        <td>N${item.price.toLocaleString()}</td>
                        <td>
                            <input type="number" value="${item.quantity}" min="1" 
                            onchange="updateQuantity(${index}, this.value)">
                        </td>
                        <td>N${item.subtotal.toLocaleString()}</td>
                        <td><button class="delete-btn" onclick="removeItem(${index})">🗑️</button></td>
                    </tr>
                `;
            });

            totalPriceContainer.innerText = totalPrice.toLocaleString();
        }

        function updateQuantity(index, newQuantity) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (newQuantity < 1) newQuantity = 1;
            cart[index].quantity = parseInt(newQuantity);
            cart[index].subtotal = cart[index].quantity * cart[index].price;
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }

        function removeItem(index) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }

        function clearCart() {
            localStorage.removeItem('cart');
            loadCart();
        }

        document.addEventListener("DOMContentLoaded", loadCart);



// Function to add items to cart and store in local storage
function addToCart(name, price, image) {
    let product = {
        name: name,
        price: price,
        image: image,
        quantity: 1,
        subtotal: price
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.subtotal = existingItem.quantity * price;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirect after adding item
    window.location.href = "cartPage.html";
}



document.addEventListener("DOMContentLoaded", function () {
    loadOrderSummary();
});

function loadOrderSummary() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let summaryTable = document.getElementById("order-summary");
    let totalPrice = 0;

    summaryTable.innerHTML = ""; // Clear previous items

    cart.forEach((item) => {
        let row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>N${item.subtotal.toLocaleString()}</td>
            </tr>
        `;
        summaryTable.innerHTML += row;
        totalPrice += item.subtotal;
    });

    document.getElementById("total-price").textContent = `N${totalPrice.toLocaleString()}`;
}
