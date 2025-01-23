const foods = [
    {name: "Doha Special", description: "Tomatsås, ost, champinjoner.", image: "images/p1.jpeg", price: 85},
    {name: "Margherita", description: "Tomatsås, ost och oregano.", image: "images/p2.jpeg", price: 75},
    {name: "Melanzane", description: "Tomatsås, ost och svartkål.", image: "images/p3.jpeg", price: 95},
    {name: "Caprese", description: "Tomatsås, ost, mozzarella och basilika.", image: "images/p4.jpeg", price: 100},
    {name: "Kebabpizza", description: "Tomatsås, ost, kebab, lök och sås.", image: "images/p5.jpeg", price: 110},
    {name: "Vegetariana", description: "Tomatsås, ost och blandade grönsaker.", image: "images/p6.jpeg", price: 90},
    {name: "Pommes", description: "Våra unika pommes.", image: "images/s1.jpeg", price: 35},
    {name: "Doha fries", description: "Pommes, cheddarost, lök och jalapeño.", image: "images/s2.jpeg", price: 45},
    {name: "Kebab i pita", description: "Kebab, gurka, lök, sallad, feferoni, mildsås.", image: "images/s3.jpeg", price: 80},
    {name: "K*cklingrulle", description: "K*yckling, sallad, gurka, lök, mildsås.", image: "images/s4.jpeg", price: 90}
];

const cart = [];

function displayFoods() {
    const container = document.getElementById("food-list");
    container.innerHTML = "";

    foods.forEach((food) => {
        const col = document.createElement("div");
        col.classList.add("col-sm-6", "col-md-4", "mb-4", "product-card");
    
        col.innerHTML = 
        "<img src=\"" + food.image + "\" class=\"img-fluid\" alt=\"" + food.name + "\">" +
        "<p><strong>" + food.name + "</strong></p>" +
        "<p>" + food.description + "</p>" +
        "<p><strong>Pris: " + food.price + " kr</strong></p>" +
        "<button class=\"btn btn-sm add-to-cart-btn\" onclick=\"addToCart('" + food.name + "')\">Lägg till</button>";
    
        container.appendChild(col);
    });
}    

function addToCart(itemName) {
    const item = cart.find(cartItem => cartItem.name === itemName);
    if (item) {
        item.quantity++;
    } else {
        const food = foods.find(food => food.name === itemName);
        cart.push({ name: food.name, price: food.price, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function clearCart() {
    cart.length = 0;
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        cartDiv.innerHTML = "Din kundvagn är tom.";
        return;
    }

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-2");
    
        const itemName = document.createElement("span");
        itemName.textContent = item.name + " x" + item.quantity + " (" + item.price + " kr/st)";
    
        const removeButton = document.createElement("button");
        removeButton.textContent = "x";
        removeButton.classList.add("btn", "btn-danger", "btn-sm");
        removeButton.onclick = function() { removeFromCart(index); };
    
        cartItem.appendChild(itemName);
        cartItem.appendChild(removeButton);
        cartDiv.appendChild(cartItem);
    
        totalPrice += item.price * item.quantity;
    });
    
    const totalPriceElement = document.createElement("p");
    totalPriceElement.textContent = "Totalt pris: " + totalPrice + " kr";
    totalPriceElement.classList.add("mt-3", "fw-bold");
    cartDiv.appendChild(totalPriceElement);
    
    const clearCartButton = document.createElement("button");
    clearCartButton.textContent = "Töm kundvagn";
    clearCartButton.classList.add("btn", "btn-black", "btn-sm", "mt-3");
    clearCartButton.onclick = clearCart;
    cartDiv.appendChild(clearCartButton);
    
}


window.onload = displayFoods;
