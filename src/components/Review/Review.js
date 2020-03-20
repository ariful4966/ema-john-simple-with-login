import React, { useEffect, useState } from 'react';
import './Review.css';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Reviewitem from '../Reviewitem/Reviewitem';
import Cart from '../Cart/Cart';
import HappyImage from './../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);

    const hendlePlaceOrder = () => {
        setCart([]);
        setOrderPlace(true);
        processOrder();
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey); 
    };
    useEffect( () =>{
        // cart
      const savedCart = getDatabaseCart();
      const productKey = Object.keys(savedCart);
      const cartProducts = productKey.map( key => {
          const product = fakeData.find(pd => pd.key === key );
          product.quantity = savedCart[key];
          return product;
      });
      setCart(cartProducts);
    }, []);
    let thankyou;
    if(orderPlace){
        thankyou = <img src={HappyImage} alt=""/>
    } 
    return (
        <div className="twin-container">
           <div className="product-container">
           {
                cart.map(pd => <Reviewitem
                    key ={pd.key}
                    removeProduct = {removeProduct}
                     product ={pd} 
                     ></Reviewitem>)
            }
            {thankyou}
           </div>

           <div className="cart-container">
               <Cart cart={cart}>
                   <button onClick={hendlePlaceOrder} className="main-button">Place Order</button>
               </Cart>
        
           </div>
        </div>
    );
};

export default Review;