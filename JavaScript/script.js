function addToCart(name, price, image, button) {
    let quantity = parseInt(button.nextElementSibling.value); // Get quantity input
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product already exists
    let existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name, price, image, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

    // Load cart from localStorage
    function loadCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartContainer = document.getElementById("cart-items");
        let totalPrice = 0;
        
        cartContainer.innerHTML = ""; // Clear existing items

        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            cartContainer.innerHTML += `
                <div class="card shadow-sm p-3 mb-3">
                    <div class="row align-items-center">
                        <div class="col-md-2">
                            <img src="${item.image}" class="img-fluid rounded" alt="${item.name}">
                        </div>
                        <div class="col-md-4">
                            <h5>${item.name}</h5>
                        </div>
                        <div class="col-md-2 text-success fw-bold">
                            $${item.price.toFixed(2)}
                        </div>
                        <div class="col-md-2">
                            <input type="number" class="form-control text-center quantity-input" min="1" value="${item.quantity}" data-index="${index}">
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        });

        document.getElementById("cart-total").innerText = `$${totalPrice.toFixed(2)}`;
        attachEventListeners();
    }

    // Update quantity & total price
    function attachEventListeners() {
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                let index = this.getAttribute("data-index");
                let newQuantity = parseInt(this.value);

                if (newQuantity < 1) newQuantity = 1; // Prevent negative or zero quantity

                cart[index].quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCart();
            });
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                let index = this.getAttribute("data-index");

                cart.splice(index, 1); // Remove item from array
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCart();
            });
        });
    }

    // Load cart when page loads
    document.addEventListener("DOMContentLoaded", loadCart);
    document.getElementById("checkout-btn").addEventListener("click", function() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            alert("Your cart is empty. Add items before checking out.");
            return;
        }

        // Simulate an order submission
        let orderDetails = cart.map(item => {
            return `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`;
        }).join("\n");

        let totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

        let confirmCheckout = confirm(`Order Summary:\n\n${orderDetails}\n\nTotal: $${totalAmount}\n\nDo you want to proceed?`);

        if (confirmCheckout) {
            alert("Thank you for your order! Your payment is being processed.");
            localStorage.removeItem("cart"); // Clear the cart after checkout
            window.location.href = "confirmation.html"; // Redirect to confirmation page
        }
    });
    /*navbar*/
    // When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").style.padding = "30px 10px";
    document.getElementById("logo").style.fontSize = "25px";
  } else {
    document.getElementById("navbar").style.padding = "80px 10px";
    document.getElementById("logo").style.fontSize = "35px";
  }
}
/*contact form*/
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    
    document.getElementById("output").innerHTML = `<div class='alert alert-success'><strong>Submitted Information:</strong><br>
        <b>Name:</b> ${name} <br>
        <b>Phone:</b> ${phone} <br>
        <b>Email:</b> ${email} <br>
        <b>Message:</b> ${message}</div>`;
    
    document.getElementById("contactForm").reset();
});
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    
    document.getElementById("output").innerHTML = `<div class='alert alert-success'><strong>Submitted Information:</strong><br>
        <b>Name:</b> ${name} <br>
        <b>Phone:</b> ${phone} <br>
        <b>Email:</b> ${email} <br>
        <b>Message:</b> ${message}</div>`;
    
    document.getElementById("contactForm").reset();
});