import React from 'react';
import './Cart.css';


const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    // const total = cart.reduce((total, prd) => total + prd.price, 0);
    let total = 0;
    for(let i = 0; i<cart.length;i++){
        const product = cart[i];
        total = total + product.price * product.quantity;
       
    }

    let shipping = 0;
    if( total > 35){
        shipping = 0;
    }
    else if( total> 15){
        shipping= 4.99;
    }
    else if( total> 0){
        shipping= 12.99;
    }
    const tax = total /10;
    const grandTotal = total + shipping + Number(tax);

    const formateNumber = num => {
        const pricition = num.toFixed(2);
        return Number(pricition);
    }
    return (
        <div >
            <h4 className="text-success text-center">Order Summary</h4>
    <p>Items Orderd {cart.length}</p>
    <p><small>Product Price: {formateNumber(total)}</small></p>
    <p><small>Shipping Cost: {shipping}</small></p>
    <p><small>Tax + Vat: {formateNumber(tax)}</small></p>
    <p>Total Price: {formateNumber(grandTotal)}</p>
        {
            props.children
        }
    </div>
    );
};

export default Cart;