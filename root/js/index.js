var Titles = ["Cracking the coding interview",
              "Hands on machine learning",
              "Programming interviews exposed",
              "System design interview",
              "Beggining c++ through game programming",
              "JavaScript The definitive guide",
];
var Authors = ["Gayle Laakmann McDowell",
               "Aurélien Géron",
               "Eric Giguere, Noah Kindler, John Mongan",
               "Alex Xu",
               "Stephen Prata",
               "David Flanagan",
];
var Descriptions = ["“Cracking the Coding Interview” offers a comprehensive guide for technical interview preparation in coding, covering algorithms, data structures, and problem-solving techniques, along with tips and strategies for success.",
                    "“Hands-On Machine Learning” is a practical guide that delves into various machine learning algorithms and their applications through real-world examples and projects, providing a hands-on approach to understanding the field.",
                    "“Programming Interviews Exposed” provides insights into common programming interview questions, offering detailed explanations and solutions, along with tips on handling behavioral and technical aspects of interviews effectively.",
                    "“System Design Interview” offers an in-depth exploration of designing scalable systems, covering topics such as architecture, scalability, and trade-offs, essential for mastering system design interviews.",
                    "“Beginning C++ Through Game Programming” introduces C++ programming fundamentals through engaging game development projects, making learning enjoyable and practical for beginners in game programming.",
                    "“JavaScript: The Definitive Guide” serves as the ultimate reference for mastering JavaScript, covering the language's core features, APIs, and best practices, making it essential for both novice and experienced JavaScript developers.",
];
var Prices = [14.99, 21.99, 12.99, 14.99, 27.99,19.49,
];
var cart = {
};

function addToCart(productId) {
    if (productId in cart) {
        cart[productId] += 1;
    } else {
        cart[productId] = 1;
    }
    //updateCart();
    console.log(cart);
    alert('"'+Titles[productId]+'"'+" added to cart!");
}

function createListItem(i) {
    return `
    <li class='panels'>
        <img src="${"images/Book JPGs/"+Titles[i]+".jpg"}" class="img-box">
        <div>
            <h2>${Titles[i]}</h2>
            <h3>${Authors[i]}</h3>
            <h5>${Descriptions[i]}</h5>
            <h4>£${Prices[i]}</h4>
            <br>
            <button id="purchase-button" onclick="addToCart(${i})">Add to Cart</button>
        </div>
    </li>
    `;
}

function createListHTML() {
    let html = '<ul class="books-list">';
    for (let i = 0; i < Titles.length; i++) {
        html += createListItem(i)
    }
    html += "</ul>";
    return html;
}

function calculateCartTotal() {
    let cartTotal = 0;
    for (const [i, quantity] of Object.entries(cart)) {
        cartTotal += Math.round(Prices[i]*quantity * 100) / 100
    }
    cartTotal = Math.round(cartTotal * 100) / 100
    if (cartTotal>0){
        return 'Total: £'+cartTotal
    }
    else{
        return ''
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('cart-icon');
    const cartPopup = document.getElementById('cart-popup');

    // Function to display the cart contents
    function displayCart() {
        let cartContent = '<ul class="cart-list">';
        for (const [i, quantity] of Object.entries(cart)) {
            cartContent += `<li> <img src="${"images/Book JPGs/"+Titles[i]+".jpg"} "class="img-cart">${Titles[i]} (x${quantity}) - £${Math.round(Prices[i]*quantity * 100) / 100}</li>`;
        }
        if (Object.keys(cart).length === 0){
            cartContent += `<li>Your cart is empty!</li>`;
        }
        cartContent += '</ul>';
        
        cartContent += calculateCartTotal()
        cartContent += '<a href="pay.html?cartTotal=' + calculateCartTotal() + '" id="checkout-button">Checkout</a>';
        cartPopup.innerHTML = cartContent;
        cartPopup.style.display = 'block';
    }

    // Event listener to show cart on mouseover
    cartIcon.addEventListener('mouseover', function() {
        displayCart();
    });

    // Event listener to show cart on mouseover on the popup menu
    cartPopup.addEventListener('mouseover', function() {
        cartPopup.style.display = 'block';
    });

    // Event listener to hide cart on mouseout, but keep it if mouse is over either the cart symbol or the popup menu
    document.addEventListener('mouseout', function(event) {
        if (!cartIcon.contains(event.relatedTarget) && !cartPopup.contains(event.relatedTarget)) {
            cartPopup.style.display = 'none';
        }
    });
});

var sidemenu = document.getElementById("sidemenu")
function openmenu(){
    sidemenu.style.right = "0";
}
function closemenu(){
    sidemenu.style.right = "-200px";
}