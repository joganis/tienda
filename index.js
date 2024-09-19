const containerCards = document.getElementById('containerCards');
const URL = "https://fakestoreapi.com/products";
let cart = [];

const getApi = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  return data;
};

const makeProduct = (product) => {
  const card = document.createElement('div');
  card.classList.add('cardProduct');

  const titleProduct = document.createElement('h3');
  titleProduct.textContent = product.title;
  titleProduct.classList.add('titleProduct');

  const imageProduct = document.createElement('img');
  imageProduct.src = product.image;
  imageProduct.alt = product.title;

  const categoryProduct = document.createElement('h3');
  categoryProduct.textContent = product.category;
  categoryProduct.classList.add('categoryProduct');

  const priceProduct = document.createElement('p');
  priceProduct.textContent = `$${product.price.toFixed(2)}`;
  priceProduct.classList.add('priceProduct');

  // Crear el botón para añadir al carrito
  const buttonProduct = document.createElement('button');
  buttonProduct.textContent = 'Añadir al carrito';
  buttonProduct.classList.add('btnProduct');

  buttonProduct.addEventListener('click', () => addToCart(product));

  // Agregar todos los elementos a la tarjeta
  card.appendChild(titleProduct);
  card.appendChild(imageProduct);
  card.appendChild(categoryProduct);
  card.appendChild(priceProduct);
  card.appendChild(buttonProduct);

  // Agregar la tarjeta al contenedor
  containerCards.appendChild(card);
};

// Función para añadir productos al carrito
const addToCart = (product) => {
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
};

// Función para renderizar el carrito de compras
const renderCart = () => {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  cartItems.innerHTML = ''; // Limpiar el carrito

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
      <button onclick="removeFromCart(${item.id})">Eliminar</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
};

// Función para eliminar productos del carrito
const removeFromCart = (productId) => {
  cart = cart.filter(item => item.id !== productId);
  renderCart();
};


// Función para vaciar el carrito
const clearCart = () => {
  cart = [];
  renderCart();
};

const initialize = async () => {
  const products = await getApi();
  products.forEach(makeProduct);
};

document.getElementById('clear-cart').addEventListener('click', clearCart);
initialize();
