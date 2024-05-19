class Cart{
  cartItem;

  #localStorageId; //Private property, accessable inside class only.

  constructor(localStorageId){ // constructor can't have return value.
    this.#localStorageId = localStorageId;
    this.#loadFromStorage();
  }

  #loadFromStorage(){
    this.cartItem= JSON.parse(localStorage.getItem(this.#localStorageId));
    if(!this.cartItem){
      this.cartItem = [{
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
  }

  setStorage(){
    localStorage.setItem(this.#localStorageId, JSON.stringify(this.cartItem));
  }

  addToCartFun(productId){
    let matchingItem;
    const quantitySelector = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
      this.cartItem.forEach((cartItems)=>{
        if(productId === cartItems.productId){
          matchingItem = cartItems;
        }
      });
  
      if (matchingItem) {
        matchingItem.quantity += quantitySelector;
      }
      else {
        this.cartItem.push({
          productId : productId,
          quantity : quantitySelector,
          deliveryOptionId: '1'
        });
      }
      this.setStorage();
  }

  removeItem(productId){
    const newCart = [];
    this.cartItem.forEach((cartItems)=>{
      if(productId !== cartItems.productId){
        newCart.push(cartItems);
      }
    });
    this.cartItem = newCart;
    this.setStorage();
  }

  calculateCartQuantity(){
    let cartQuan = 0;
    this.cartItem.forEach((cartItems)=>{
      cartQuan += cartItems.quantity;
    });
    return cartQuan;
  }

  updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    this.cartItem.forEach((cartItems) => {
      if (productId === cartItems.productId) {
        matchingItem = cartItems;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    this.setStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    this.cartItem.forEach((cartItems) => {
      if (productId === cartItems.productId) {
        matchingItem = cartItems;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.setStorage();
  }
}


const carte = new Cart('cart-oop');
const businessCart = new Cart('cart-class');

/*carte.localStorageId = 'cart-oop';
businessCart.localStorageId = 'cart-class';

carte.loadFromStorage();
businessCart.loadFromStorage();*/

console.log(carte);
console.log(businessCart);

/*cart.#localStorageId = 'aaa' // it will give error*/

/*cart.#loadFromStorage(); // it will give error*/

console.log(businessCart instanceof Cart); // True





