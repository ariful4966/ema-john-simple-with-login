import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
   const frist10 = fakeData.slice(0,10);
   const [product, setProduct] = useState(frist10);
   const [cart, setCart] = useState([]);
   useEffect( ()=>{
    const savedCart = getDatabaseCart();
      const productKeys = Object.keys(savedCart);
      const priviousCart = productKeys.map(existingKey => {
        const product = fakeData.find(pd => pd.key === existingKey);
        product.quantity = savedCart[existingKey];
       return product;
      })
      setCart(priviousCart);
   }, []); 
    
   const handleAddProduct = (product) => {
       

       const toBeAddedKey = product.key;
       const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
       let count = 1;
       let newCart;
       if(sameProduct){
        count = sameProduct.quantity + 1;
        sameProduct.quantity = count;
         const others = cart.filter(pd => pd.key !== toBeAddedKey);
         newCart = [...others, sameProduct];
       }else{
         product.quantity = 1;
         newCart = [...cart, product];
       }
     
      setCart(newCart);
       addToDatabaseCart(product.key, count);
   }
   
    return (
        <div className="twin-container"> 
          <div className="product-container">
           
            {
            product.map(pd => <Product 
                key = {pd.Key}
                showAddToCart={true}
                handleAddProduct = {handleAddProduct}
                product = {pd}
                ></Product>)
            }
           
          </div>
            <div className="card-container">
               <Cart cart={cart}>
                  <Link to="/review">
                      <button className="main-button">Order Review</button>
                  </Link>
               </Cart>
            </div>
        </div>
    );
};

export default Shop;