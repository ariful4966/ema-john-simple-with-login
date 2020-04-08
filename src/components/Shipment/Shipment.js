import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart , clearLocalShoppingCart} from '../../utilities/databaseManager';
import { Container, Row, Col } from 'react-bootstrap';
import CheckoutForm from '../CheckOutForm/CheckOutForm';

const Shipment = () => {
    const [shipInfo, setShipInfo] = useState(null)
    const { register, handleSubmit, errors } = useForm()
    const [ orderId, setOrderId] = useState(null)
    const auth = useAuth();
    const stripePromise = loadStripe('pk_test_cDG8ZSyYySzEcf5UKLL1dwGj00oXXjRDjH');

    const onSubmit = data => {
        setShipInfo(data)

    }
    const handleplaceOrder = (payment) => {
        const savedCart = getDatabaseCart();
        const orderDetails = {
            email: auth.user.email,
            cart: savedCart,
            shipment: shipInfo,
            payment: payment
        };
        fetch('http://localhost:4200/placeOreder', {
            method: 'POST',
            body: JSON.stringify(orderDetails),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(order => {
                console.log('form database', order._id)
                setOrderId(order._id);
                clearLocalShoppingCart();
                

            })
    }



    return (

        <Container>
            <Row>
                <Col md={6} style={{ display: shipInfo && 'none' }}>
                    <h3>Shipment Information</h3>
                    <form className='ship-form' onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>

                        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder='Your Name' />
                        {
                            errors.name && <span className="errors">User name is required</span>
                        }


                        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder='@mail.com' />
                        {
                            errors.email && <span className="errors">Email is required</span>
                        }
                        <input name="number" ref={register({ required: true })} placeholder='+880 1*********' />
                        {
                            errors.phone && <span className="errors">Phone Number is required</span>
                        }
                        <input name="address1" ref={register({ required: true })} placeholder='Address' />
                        {errors.address1 && <span className="errors">Address is required</span>}
                        <input name="address2" ref={register} placeholder='Optional' />
                        <input name="city" ref={register({ required: true })} placeholder='city' />
                        {errors.city && <span className="errors">City is required</span>}
                        <input name="country" ref={register({ required: true })} placeholder='Country' />
                        {errors.country && <span className="errors">Country is required</span>}
                        <input name="zeepcode" ref={register({ required: true })} placeholder='Your Zeep-Code' />
                        {errors.zeepcode && <span className="errors" >zeepcode is required</span>}

                        <input type="submit" />
                    </form>
                </Col>
                <Col md={6} style={{ marginTop: '200px', display: shipInfo ? 'block' : 'none' }} >
                    <h3>Payment Information</h3>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm handleplaceOrder={handleplaceOrder}/>
                    </Elements>     
                    <br/>
                    {
                        orderId && <div>
                            <h3>Thank you for shopping with us</h3>
                            <p>Your order Id is: {orderId}</p>
                        </div>
                    }              
                </Col>
            </Row>
        </Container>
    );
};

export default Shipment;