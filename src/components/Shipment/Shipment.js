import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => { console.log(data) }
    const auth = useAuth();


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