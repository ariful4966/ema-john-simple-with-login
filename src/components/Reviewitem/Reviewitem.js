import React from 'react';

const Reviewitem = (props) => {
    const {name, quantity, key, price} = props.product;
    const reviewitemStyle={
        borderBottom:'1px solid lightgray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'
    }
    return (
        <div style={reviewitemStyle} className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>Quentity: {quantity}</p>
    <p><small>${price}</small></p>
            <br/>
            <button onClick={() => props.removeProduct(key)} className="main-button">Remove</button>
        </div>
    );
};

export default Reviewitem;