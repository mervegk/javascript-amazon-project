export const cart = [];

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