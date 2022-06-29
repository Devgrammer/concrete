import React, {useState} from 'react'
import { Heart, Plus } from 'react-feather'
import { addProductToCart } from '../../Redux/slice/productData';

import { useDispatch } from 'react-redux';


const ProductCard = ({ id, title, src, category, price, handleAddProductToCart, handleAddProductToWishList }) => {
   let dispatch=useDispatch();
   
   
    

    return (
        <div className='product-card-container'>
            <div className="product-display" style={ { backgroundImage: ` url(${src})` } }>
                <div className="display-badge">New Arrivals</div>
            </div>
            <div className="product-desc">
                <div className="product-desc-content">
                    <div className="product-title"></div>
                    <div className="product-title">{title}</div>
                    <div className="product-categories my-2">{category}</div>
                </div>
                <div className="product-console">
                    <div className="product-pricing">₹{price}</div>
                    <div className="product-control-option">
                        <button className="product-wishlist" onClick={ (e) => handleAddProductToWishList(e, id)}><Heart size={14} color='#363a45'/></button>
                        <button className="product-add-to-cart" onClick={ (e) => handleAddProductToCart(e,id) }><Plus size={ 10 } color='#ffffff'/></button>

                    </div>

                </div>

            </div>
            
        </div>
    )
}

export default ProductCard
