import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import {renderCheckoutHeader} from "./checkout/checkoutHeader.js";
import { loadProductFetch} from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";


async function loadPage(){
  try{
    await Promise.all([
      loadProductFetch(),
      loadCartFetch()
    ]);
    //throw 'error';

  /*  await new Promise((resolve, reject) => {
      //throw 'error';
      loadCart(() => {
        //reject ('error');
        resolve();
      });
    });*/
  }catch(error){
    console.log('Unexpected error');
  }
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

}

loadPage();
/*Promise.all([
  loadProductFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});*/


