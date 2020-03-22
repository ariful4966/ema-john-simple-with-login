import React, { useEffect, useState } from 'react';
import './Review.css';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Reviewitem from '../Reviewitem/Reviewitem';
import Cart from '../Cart/Cart';
import HappyImage from './../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);
    const auth = useAuth();


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
    useEffect(() => {
        // cart
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const cartProducts = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);
    let thankyou;
    if (orderPlace) {
        thankyou = <img src={HappyImage} alt="" />
    }
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
                {thankyou}
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