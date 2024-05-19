import {cart, calculateCartQuantity, resetCart} from '../../data/cart.js'
import { getProduct } from '../../data/products.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryoption.js';
import { formatCurrency } from '../utils/money.js';
import { addOrder } from '../../data/order.js';

export function renderPaymentSummary(){
  const cartquant = calculateCartQuantity();
  let productPriceCents = 0;
  let shippingPrice = 0;
  cart.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.productId);
    productPriceCents += matchingProduct.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPrice += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPrice;
  const textCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + textCents;

  const paymentHTML =
    ` <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${cartquant}):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPrice)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(textCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
      </div>

      <button class="place-order-button button-primary js-place-order">
        Place your order
      </button>`
  document.querySelector('.js-payment-summary').innerHTML = paymentHTML;

  document.querySelector('.js-place-order').addEventListener('click', async ()=>{
    try{
        const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
          cart:cart
        })
      });
        const order = await response.json();
        addOrder(order);

    }catch(error){
      console.log('unexpected error. Please try again.')
    }
    resetCart();
    window.location.href = 'orders.html';
  })
}