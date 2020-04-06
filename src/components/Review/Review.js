import React, { useEffect, useState } from 'react';
import './Review.css';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';

import Reviewitem from '../Reviewitem/Reviewitem';
import Cart from '../Cart/Cart';

import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    // const [orderPlace, setOrderPlace] = useState(false);
    const auth = useAuth();


    /*const hendlePlaceOrder = () => {
        setCart([]);
        setOrderPlace(true);
        processOrder();
    }*/

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };
    useEffect(() => {
        // cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        console.log(productKeys);
        fetch('http://localhost:4200/getProductByKey', {
            method: 'POST',
            body: JSON.stringify(productKeys),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const cartProducts = productKeys.map(key => {
                    const product = data.find(pd => pd.key === key);
                    product.quantity = savedCart[key];
                    return product;
                });
                setCart(cartProducts);
            })

    }, []);
    /*let thankyou;
    if (orderPlace) {
        thankyou = <img src={HappyImage} alt="" />
    }*/
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <Reviewitem
                        key={pd.key}
                        removeProduct={removeProduct}
                        product={pd}
                    ></Reviewitem>)
                }
               
                {
                    !cart.length && <h1>Your Cart is Empty. <a href="/">Keep Shoping</a></h1>
                }
            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="Shipment">
                        {auth.user ?
                            <button className="main-button">Prossed Checkout</button>
                            : <button className="main-button">Login to Prossed </button>
                        }
                    </Link>
                </Cart>

            </div>
        </div>
    );
};

export default Review;