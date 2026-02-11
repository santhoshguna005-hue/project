// Product Data
const products = [
    {
        id: 1,
        name: "Amul Taaza Homogenised Toned Milk",
        weight: "500 ml",
        price: 27,
        image: "https://www.bigbasket.com/media/uploads/p/l/306926-2_4-amul-homogenised-toned-milk.jpg",
        time: "8 MINS"
    },
    {
        id: 2,
        name: "Lay's India's Magic Masala Chips",
        weight: "50 g",
        price: 20,
        image: "https://www.bigbasket.com/media/uploads/p/l/266160_13-lays-potato-chips-indias-magic-masala-best-quality-trans-fat-free.jpg",
        time: "12 MINS"
    },
    {
        id: 3,
        name: "Coca-Cola Soft Drink - Original Taste",
        weight: "750 ml",
        price: 45,
        image: "https://www.bigbasket.com/media/uploads/p/l/251040_10-coca-cola-soft-drink-original-taste.jpg",
        time: "9 MINS"
    },
    {
        id: 4,
        name: "Farmley Premium California Almonds",
        weight: "250 g",
        price: 349,
        image: "https://www.bigbasket.com/media/uploads/p/l/40203534_4-farmley-premium-california-almonds-100-natural.jpg",
        time: "15 MINS"
    },
    {
        id: 5,
        name: "Fortune Sunlite Refined Sunflower Oil",
        weight: "1 L",
        price: 155,
        image: "https://www.bigbasket.com/media/uploads/p/l/274145_14-fortune-sun-lite-sunflower-refined-oil.jpg",
        time: "11 MINS"
    },
    {
        id: 6,
        name: "Harvest Gold - White Bread",
        weight: "400 g",
        price: 45,
        image: "https://www.bigbasket.com/media/uploads/p/l/40194884_4-harvest-gold-white-bread-enriched-with-vitamins-iron-hygienically-baked.jpg",
        time: "6 MINS"
    },
    {
        id: 7,
        name: "Tata Salt Vacuum Evaporated Iodised",
        weight: "1 kg",
        price: 28,
        image: "https://www.bigbasket.com/media/uploads/p/l/241600_5-tata-salt-iodized.jpg",
        time: "10 MINS"
    },
    {
        id: 8,
        name: "Surf Excel Easy Wash Detergent Powder",
        weight: "1 kg",
        price: 135,
        image: "https://www.bigbasket.com/media/uploads/p/l/266979_25-surf-excel-easy-wash-detergent-powder.jpg",
        time: "14 MINS"
    },
    {
        id: 9,
        name: "Onion - Medium / Pyaz",
        weight: "1 kg",
        price: 35,
        image: "https://www.bigbasket.com/media/uploads/p/l/10000148_30-fresho-onion-medium.jpg",
        time: "12 MINS"
    },
    {
        id: 10,
        name: "Tomato - Hybrid",
        weight: "1 kg",
        price: 40,
        image: "https://www.bigbasket.com/media/uploads/p/l/10000200_17-fresho-tomato-hybrid.jpg",
        time: "12 MINS"
    },
    {
        id: 11,
        name: "Maggi 2-Minute Instant Noodles",
        weight: "70 g",
        price: 14,
        image: "https://www.bigbasket.com/media/uploads/p/l/266109_18-maggi-2-minute-instant-noodles-masala.jpg",
        time: "8 MINS"
    },
    {
        id: 12,
        name: "Parle-G Gold Biscuits",
        weight: "1 kg",
        price: 130,
        image: "https://www.bigbasket.com/media/uploads/p/l/40007533_7-parle-parle-g-gold-biscuits.jpg",
        time: "10 MINS"
    },
    {
        id: 13,
        name: "Colgate Strong Teeth Toothpaste",
        weight: "200 g",
        price: 112,
        image: "https://www.bigbasket.com/media/uploads/p/l/40212006_3-colgate-strong-teeth-anticavity-toothpaste-calcium-boost-refreshing-flavour.jpg",
        time: "15 MINS"
    },
    {
        id: 14,
        name: "Dettol Original Soap",
        weight: "125 g",
        price: 60,
        image: "https://www.bigbasket.com/media/uploads/p/l/40003009_12-dettol-bathing-bar-soap-original.jpg",
        time: "10 MINS"
    },
    {
        id: 15,
        name: "Head & Shoulders Anti-Dandruff Shampoo",
        weight: "180 ml",
        price: 185,
        image: "https://www.bigbasket.com/media/uploads/p/l/40127814_8-head-shoulders-anti-dandruff-shampoo-cool-menthol-activates-scalp-circulation.jpg",
        time: "15 MINS"
    },
    {
        id: 16,
        name: "Farm Eggs - Table Tray",
        weight: "30 pcs",
        price: 210,
        image: "https://www.bigbasket.com/media/uploads/p/l/150502_6-fresho-farm-eggs-table-tray-medium-antibiotic-residue-free.jpg",
        time: "20 MINS"
    }
];

// Cart State
let cart = JSON.parse(localStorage.getItem('flashcart_cart')) || {};

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartCountElement = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const billSection = document.getElementById('bill-section');
const footerTotal = document.getElementById('footer-total');
const cartFooter = document.getElementById('cart-footer');

// Initialize
function init() {
    updateCartIcon();

    if (productGrid) {
        renderProducts();
    }

    if (cartItemsContainer) {
        renderCart();
    }
}

// Render Products (Home Page)
function renderProducts() {
    productGrid.innerHTML = products.map(product => {
        const qty = cart[product.id] ? cart[product.id].qty : 0;
        return `
        <div class="product-card">
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-img">
            </div>
            <div class="product-time">⏱ ${product.time}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-weight">${product.weight}</p>
            <div class="product-action">
                <div class="product-price">₹${product.price}</div>
                
                ${qty === 0
                ? `<button class="add-btn" onclick="addToCart(${product.id})">ADD</button>`
                : `<div class="qty-control" style="display: flex;">
                           <div class="qty-btn" onclick="removeFromCart(${product.id})">-</div>
                           <div class="qty-count">${qty}</div>
                           <div class="qty-btn" onclick="addToCart(${product.id})">+</div>
                       </div>`
            }
            </div>
        </div>
        `;
    }).join('');
}

// Render Cart (Cart Page)
function renderCart() {
    const cartIds = Object.keys(cart);

    if (cartIds.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #666; margin-top: 40px;">Your cart is empty.</p>';
        billSection.style.display = 'none';
        cartFooter.style.display = 'none';
        return;
    }

    let total = 0;

    cartItemsContainer.innerHTML = cartIds.map(id => {
        const item = cart[id];
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        return `
        <div class="cart-item">
            <div>
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.weight} • ₹${item.price}</div>
            </div>
            <div class="qty-control" style="display: flex;">
                <div class="qty-btn" onclick="removeFromCart(${item.id})">-</div>
                <div class="qty-count">${item.qty}</div>
                <div class="qty-btn" onclick="addToCart(${item.id})">+</div>
            </div>
        </div>
        `;
    }).join('');

    // Bill Details
    billSection.style.display = 'block';
    document.getElementById('bill-item-total').innerText = '₹' + total;
    document.getElementById('bill-grand-total').innerText = '₹' + (total + 17); // 15 delivery + 2 handling

    // Footer
    cartFooter.style.display = 'flex';
    footerTotal.innerText = '₹' + (total + 17);
}

// Cart Actions
window.addToCart = function (id) {
    const product = products.find(p => p.id === id);
    if (!product) return; // Should not happen if data is consistent

    if (!cart[id]) {
        cart[id] = { ...product, qty: 1 };
    } else {
        cart[id].qty += 1;
    }

    saveCart();
    refreshUI();
};

window.removeFromCart = function (id) {
    if (!cart[id]) return;

    cart[id].qty -= 1;
    if (cart[id].qty <= 0) {
        delete cart[id];
    }

    saveCart();
    refreshUI();
};

function saveCart() {
    localStorage.setItem('flashcart_cart', JSON.stringify(cart));
}

function updateCartIcon() {
    if (!cartCountElement) return;

    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
    const totalValue = Object.values(cart).reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (totalItems > 0) {
        cartCountElement.innerHTML = `${totalItems} items • ₹${totalValue}`;
    } else {
        cartCountElement.innerText = 'My Cart';
    }
}

function refreshUI() {
    updateCartIcon();
    if (productGrid) renderProducts();
    if (cartItemsContainer) renderCart();
}

// Init on load
init();
