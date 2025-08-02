const products = [
  // Shoes
  { id: 1, name: "Running Shoes", price: 1200, img: "images/shoes1.jpg", category: "shoes" },
  { id: 2, name: "Sneakers", price: 1400, img: "images/shoes2.jpg", category: "shoes" },
  { id: 3, name: "Sports Shoes", price: 1800, img: "images/shoes3.jpg", category: "shoes" },
  { id: 4, name: "Leather Shoes", price: 2200, img: "images/shoes4.jpg", category: "shoes" },
  // Shirts
  { id: 5, name: "Formal Shirt", price: 900, img: "images/shirt1.jpg", category: "shirts" },
  { id: 6, name: "Casual Shirt", price: 750, img: "images/shirt2.jpg", category: "shirts" },
  { id: 7, name: "Checked Shirt", price: 850, img: "images/shirt3.jpg", category: "shirts" },
  { id: 8, name: "Denim Shirt", price: 1000, img: "images/shirt4.jpg", category: "shirts" },
  // Accessories
  { id: 9, name: "Watch", price: 1500, img: "images/accessory1.jpg", category: "accessories" },
  { id: 10, name: "Sunglasses", price: 800, img: "images/accessory2.jpg", category: "accessories" },
  { id: 11, name: "Cap", price: 300, img: "images/accessory3.jpg", category: "accessories" },
  { id: 12, name: "Wallet", price: 600, img: "images/accessory4.jpg", category: "accessories" },
];

const container = document.getElementById("product-list");

function getLikes() {
  return JSON.parse(localStorage.getItem("likes")) || [];
}

function isInLikeList(id) {
  return getLikes().includes(id);
}

function toggleLike(id) {
  let likes = getLikes();
  const liked = likes.includes(id);
  likes = liked ? likes.filter(likeId => likeId !== id) : [...likes, id];
  localStorage.setItem("likes", JSON.stringify(likes));

  const svg = document.querySelector(`.heart-icon[data-id="${id}"] path`);
  if (svg) {
    svg.setAttribute("fill", liked ? "none" : "red");
    svg.setAttribute("stroke", liked ? "#555" : "red");
  }
}

function renderProducts(filtered) {
  container.innerHTML = "";
  filtered.forEach(product => {
    const isLiked = isInLikeList(product.id);
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <div class="card-buttons">
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <svg 
          class="heart-icon ${isLiked ? 'liked' : ''}" 
          data-id="${product.id}" 
          onclick="toggleLike(${product.id})"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width="24" height="24"
        >
          <path 
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
               2 6 4 4 6.5 4c1.74 0 3.41 1.1 4.13 2.44H13.4
               C14.09 5.09 15.76 4 17.5 4 20 4 22 6 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="${isLiked ? 'red' : 'none'}"
            stroke="${isLiked ? 'red' : '#555'}"
            stroke-width="2"
          />
        </svg>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterCategory(category) {
  const grid = document.getElementById("product-list");
  grid.classList.toggle("three-cols", category === "all");

  const filtered = category === "all"
    ? [...products]
    : products.filter(p => p.category === category);

  renderProducts(filtered);
}

function searchProducts() {
  const query = document.getElementById("search-input").value.toLowerCase().trim();

  if (!query) {
    filterCategory("all");
    return;
  }

  const results = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );

  const grid = document.getElementById("product-list");
  grid.classList.add("three-cols");
  renderProducts(results);
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.id === id);

  if (index > -1) {
    cart[index].qty += 1;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added to cart!");
}

window.addEventListener("load", () => {
  filterCategory("all");
});
