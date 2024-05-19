export let cart= JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}


export function setStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCartFun(productId){
  let matchingItem;
  const quantitySelector = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantitySelector;
    }
    else {
      cart.push({
        productId : productId,
        quantity : quantitySelector,
        deliveryOptionId: '1'
      });
   }
   setStorage();
}

export function removeItem(productId){
  const newCart = [];
  cart.forEach((cartItem)=>{
    if(productId !== cartItem.productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  setStorage();
}

export function calculateCartQuantity(){
  let cartQuan = 0;
  cart.forEach((cartItem)=>{
    cartQuan += cartItem.quantity;
  });
  return cartQuan;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  setStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  setStorage();
}

export function resetCart() {
  cart = [];
  setStorage();
}

/*export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}*/

export async function loadCartFetch(){

  const response = await fetch('https://supersimplebackend.dev/cart');
  const cartItem = await response.text();
  return cartItem;

}