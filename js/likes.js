const likedContainer = document.getElementById("liked-products");

const allProducts = [
  { id: 1, name: "Running Shoes", price: 1200, img: "images/shoes1.jpg", category: "shoes" },
  { id: 2, name: "Sneakers", price: 1400, img: "images/shoes2.jpg", category: "shoes" },
  { id: 3, name: "Formal Shirt", price: 900, img: "images/shirt1.jpg", category: "shirts" },
  { id: 4, name: "Denim Shirt", price: 1000, img: "images/shirt4.jpg", category: "shirts" },
  { id: 5, name: "Watch", price: 1500, img: "images/accessory1.jpg", category: "accessories" },
  { id: 6, name: "Cap", price: 300, img: "images/accessory3.jpg", category: "accessories" },
];

function getLikes() {
  return JSON.parse(localStorage.getItem("likes")) || [];
}

function removeLike(id) {
  let likes = getLikes().filter(likeId => likeId !== id);
  localStorage.setItem("likes", JSON.stringify(likes));
  loadLikes();
}

function loadLikes() {
  likedContainer.innerHTML = "";
  const likes = getLikes();
  const likedProducts = allProducts.filter(p => likes.includes(p.id));

  if (likedProducts.length === 0) {
    likedContainer.innerHTML = "<p style='text-align:center;'>No liked products yet.</p>";
    return;
  }

  likedProducts.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <div class="card-buttons">
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <svg 
          class="heart-icon liked" 
          data-id="${product.id}" 
          onclick="removeLike(${product.id})"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width="24" height="24"
        >
          <path 
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
               2 6 4 4 6.5 4c1.74 0 3.41 1.1 4.13 2.44H13.4
               C14.09 5.09 15.76 4 17.5 4 20 4 22 6 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="red"
            stroke="red"
            stroke-width="2"
          />
        </svg>
      </div>
    `;
    likedContainer.appendChild(div);
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.id === id);
  if (index > -1) {
    cart[index].qty += 1;
  } else {
    const product = allProducts.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

window.addEventListener("load", () => {
  loadLikes();
});
