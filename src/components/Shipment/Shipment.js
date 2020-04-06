import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm()
    const auth = useAuth();
    const onSubmit = data => {
        // TOODO Samad Move this after Payment
        console.log(auth.user.email);
        const savedCart = getDatabaseCart();
        const orderDetails = { email: auth.user.email, cart: savedCart };
        fetch('http://localhost:4200/placeOreder', {
            method: 'POST',
            body: JSON.stringify(orderDetails),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('Order Places', data);
                alert('Successfully Place Your Order'+data._id)
                processOrder();
            })
    }



    return (

        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>

            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder='Your Name' />
            {
                errors.name && <span className="errors">User name is required</span>
            }

            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder='@mail.com' />
            {
                errors.email && <span className="errors">Email is required</span>
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
    );
};

export default Shipment;