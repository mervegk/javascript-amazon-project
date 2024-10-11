export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
  }
];

export function addToCart(productId) {
  let matchingItem;
  let quantitySelectorValue = document.querySelector(`.js-quantity-selector-${productId}`).value;
  const quantity = Number(quantitySelectorValue);

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += quantity;
  }
  else {
    cart.push({
      productId,
      quantity
    })
  }
}

export function updateCartQuantity(productId) {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  const addedMessageTimeouts = {};

  document.querySelector('.cart-quantity').innerHTML = cartQuantity;

  const addedMessage = document.querySelector(
    `.js-added-to-cart-${productId}`
  );

  addedMessage.classList.add('added-to-cart-show');

  const addedToCartTimeoutID = addedMessageTimeouts[productId];

  if (addedToCartTimeoutID) {
    clearTimeout(addedToCartTimeoutID);
  }

  const timeoutId = setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-show');
  }, 2000);

  addedMessageTimeouts[productId] = timeoutId;
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
}