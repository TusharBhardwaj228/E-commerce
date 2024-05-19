function Cart(localStorageId){
  const cart = {
    cartItem : undefined,
  
    loadFromStorage(){
      this.cartItem= JSON.parse(localStorage.getItem(localStorageId));
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
    },
  
    setStorage(){
      localStorage.setItem(localStorageId, JSON.stringify(this.cartItem));
    },
  
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
    },
  
    removeItem(productId){
      const newCart = [];
      this.cartItem.forEach((cartItems)=>{
        if(productId !== cartItems.productId){
          newCart.push(cartItems);
        }
      });
      this.cartItem = newCart;
      this.setStorage();
    },
  
    calculateCartQuantity(){
      let cartQuan = 0;
      this.cartItem.forEach((cartItems)=>{
        cartQuan += cartItems.quantity;
      });
      return cartQuan;
    },
  
    updateQuantity(productId, newQuantity) {
      let matchingItem;
    
      this.cartItem.forEach((cartItems) => {
        if (productId === cartItems.productId) {
          matchingItem = cartItems;
        }
      });
    
      matchingItem.quantity = newQuantity;
    
      this.setStorage();
    },
  
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
  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-oops');

cart.loadFromStorage();
businessCart.loadFromStorage();
console.log(cart);
console.log(businessCart);





