import { cart, calculateCartQuantity, setStorage} from "../data/cart.js";
import { getProduct, loadProductFetch} from "../data/products.js";
import { orders } from "../data/order.js";
import { formatCurrency } from "./utils/money.js";
import { calculateDeliveryDate } from "../data/deliveryoption.js";
import { getDeliveryOption } from "../data/deliveryoption.js";

async function loader(){
  await loadProductFetch();
  let quan = calculateCartQuantity();
  let orderHeaderHtml ='';
  orders.forEach((orderItems)=> {
    const dates = calculateDeliveryDate(orderItems.orderTime);
    orderHeaderHtml += `
      <div class="order-header">           
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${dates}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(orderItems.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${orderItems.id}</div>
        </div>
      </div>
    `
    orderItems.products.forEach((products)=>{
      const productId = products.productId;
      const matchingProduct = getProduct(productId);
      let arrivingDate;
      cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          const deliveryOptionId = cartItem.deliveryOptionId;
          const deliveryOption = getDeliveryOption(deliveryOptionId);

          arrivingDate = calculateDeliveryDate(deliveryOption);
        }
      });
      orderHeaderHtml += `
      <div class="order-details-grid js-detailed-grid">
          <div class="product-image-container">
            <img src="${matchingProduct.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${arrivingDate}
            </div>
            <div class="product-quantity">
              Quantity: ${products.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message js-buy-again" data-product-id="${matchingProduct.id}">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=${orderItems.id}&productId=${matchingProduct.id}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        </div>
      `
    });
  });
  document.querySelector('.js-order-container').innerHTML = orderHeaderHtml;
  document.querySelector('.js-cart-quantity').innerHTML = quan;

  document.querySelectorAll('.js-buy-again').forEach((button)=>{
    button.addEventListener('click', ()=>{
      let productId = button.dataset.productId;
      let matchingItem;

      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1'
        });
      }
      setStorage();
      button.innerHTML = 'Added';
      setTimeout(() => {
        button.innerHTML = `
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);
    });
  });
}
loader();
  

