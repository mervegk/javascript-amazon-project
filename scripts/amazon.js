let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
   <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
        <!-- SOLUTION 13B -->
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>
        <!-- SOLUTION 13I -->
        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
  `;
})

document.querySelector('.products-grid').innerHTML = productsHTML;

const addedMessageTimeouts = {};
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const { productId } = button.dataset;
    let matchingItem;
    // SOLUTION 13C, 13D
    let quantitySelectorValue = document.querySelector(`.js-quantity-selector-${productId}`).value;
    // SOLUTION 13E, 13H
    const quantity = Number(quantitySelectorValue);

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    if (matchingItem) {
      // SOLUTION 13E
      matchingItem.quantity += quantity;
    }
    else {
      cart.push({
        productId,
        // SOLUTION 13H
        quantity
      })
    }

    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.cart-quantity').innerHTML = cartQuantity;

    // SOLUTION 13M
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
  })
})

