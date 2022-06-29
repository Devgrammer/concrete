import React, { useEffect, useState } from 'react'
import { Star, Trash2, X } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux'
import {remove } from '../../Redux/slice/cartDataSlice'
import Modal from 'react-modal';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';


const Cart = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [checkout, setCheckout] = useState(true)

    const dispatch = useDispatch();

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    // const[totalPrice , setTotalPrice] = useState()


    const cartData = useSelector(state => state?.cartData);
    let totalPrice = cartData?.map(Item => Item?.price)?.reduce((a, b) => a + b, 0)
    console.log("totalPrice: ", totalPrice);

    const handleRemoveProduct = (id) => {
       // let product = cartData?.filter(Item => Item?.id !== id)[0];
        if (cartData?.filter(Item => Item?.id === id)?.length > 0) {
            //dispatch(addProductToCart(product))
            console.log('trigg')
            dispatch(remove(id));
            toast?.success('Product is removed from  the Cart')
        } else {
            toast.warning('Product is not exist in the Cart')
        }
      
    }

    let formik= useFormik({
        initialValues:{
            first_name:'',
            last_name:'',
            email:'',
            phone:'',
            country:'',
            city:'',
            street:'',
            zip:'',
            card:'',
            upi:''
        },
        enableReinitialization: true,
        onSubmit:values=>{

        if(Object.values(values).filter(Item=>Item === '').length>0){
            setModalOpen(true)
        }else{
toast.warn('Fill the Delivery Details to proceed!')
        }

        }
    })



    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Concrete-Cart</title>
            </Helmet>
            <div className="cart-container">
                <div className="cart-container-left">
                    <div className="section-heading-start"><div className="section-heading-text">Checkout</div></div>
                    <div className="section-sub-heading"><div className="section-sub-heading-text">Personal Information</div></div>
                    <div className="checkout-detail-container">
                        <div className="input-field-container">
                            <div className="input-field-box">
                                <label className='input-field-label'>First Name</label>
                                <input type="text" className="input-field" placeholder='John' onChange={(e)=>{formik.setFieldValue('first_name', e?e.target.value:e)}} />
                            </div>
                            <div className="input-field-box">
                                <label className='input-field-label'>Last Name</label>
                                <input type="text" className="input-field" placeholder='Doe' onChange={ (e) => { formik.setFieldValue('last_name', e ? e.target.value : e) } } />
                            </div>
                            <div className="input-field-box">
                                <label className='input-field-label'>Email</label>
                                <input type="email" className="input-field" placeholder='johndoe@mail.com' onChange={ (e) => { formik.setFieldValue('email', e ? e.target.value : e) } } />
                            </div>
                            <div className="input-field-box">
                                <label className='input-field-label'>Phone</label>
                                <input type="number" className="input-field" placeholder='+91.........' onChange={ (e) => { formik.setFieldValue('phone', e ? e.target.value : e) } } />
                            </div>
                        </div>
                        <div className="section-sub-heading"><div className="section-sub-heading-text">Delivery Infromation</div></div>
                        <div className="input-field-container">
                            <div className="input-field-box">
                                <label className='input-field-label'>Country/Region</label>
                                <input type="text" className="input-field" placeholder='Albania' onChange={ (e) => { formik.setFieldValue('country', e ? e.target.value : e) } } />
                            </div>
                            <div className="input-field-box">
                                <label className='input-field-label'>Town/City</label>
                                <input type="text" className="input-field" placeholder='Texas' onChange={ (e) => { formik.setFieldValue('city', e ? e.target.value : e) } } />
                            </div>
                            <div className="input-field-box">
                                <label className='input-field-label'>Street</label>
                                <input type="text" className="input-field" placeholder='St. Paul Street..' onChange={ (e) => { formik.setFieldValue('street', e ? e.target.value : e) } }/>
                            </div>
                            <div className="input-field-box">
                                <label className='input-field-label'>Zip Code</label>
                                <input type="number" className="input-field" placeholder='112233' onChange={ (e) => { formik.setFieldValue('zip', e ? e.target.value : e) } } />
                            </div>
                        </div>
                        <div className="section-sub-heading"><div className="section-sub-heading-text">Payment</div></div>
                        <div className="input-field-container">
                            <div className="input-field-box">
                                <label className='input-field-label'>Card</label>
                                <input type="number" className="input-field" placeholder='0000-000-000' onChange={ (e) => { formik.setFieldValue('card', e ? e.target.value : e) } }/>
                            </div>
                            <div className="input-field-box">
                                <label className='input-field-label'>UPI</label>
                                <input type="email" className="input-field" placeholder='johnoe@ycl' onChange={ (e) => { formik.setFieldValue('upi', e ? e.target.value : e) } }/>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="cart-container-right">
<div className="cart-calculation-container">
                        <div className="section-sub-heading"><div className="section-sub-heading-text">Your order:</div></div>
                        <div className="pricing-label">
                            <div className="pricing-label-text">Sub Total:</div>
                            <div className="pricing-label-text">${totalPrice>0?totalPrice:0}</div>
                            </div>
                        <div className="pricing-label">
                            <div className="pricing-label-text">Delivery:</div>
                            <div className="pricing-label-text">{totalPrice>0?'$30':'$0'}</div>
                            </div>
                            <hr/>
                        <div className="pricing-total-label">
                            <div className="pricing-label-total-text">Total:</div>
                            <div className="pricing-label-total-text">${totalPrice>0?totalPrice+30:0}</div>
                        </div>
                        <div className="pricing-total-label">
                            <button className="checkout-btn" type="submit" disabled={ Object.values(formik?.values).filter(Item => Item !== '').length > 0 && cartData?.length>0?false:true}onClick={formik.handleSubmit}>Checkout</button>
                        </div>
</div>
                    {cartData && cartData?.length > 0 && cartData?.map((Item, index )=> {
                        console.log("ItemX: ", Item);

                        return (
                            <div key={index} className='cart-item-container my-2'>
                                <div className="cart-item-image" style={ { backgroundImage: ` url(${Item?.images[0]})` } }></div>
                                <div className="cart-item-detail">
                                    <div className="cart-item-desc">
                                        <div className="cart-item-heading">{ Item?.title?.slice(0, 15) }</div>
                                        <div className="cart-item-categories">{ Item?.category?.name }</div>
                                    </div>
                                    <div className="ratings">
                                        { [1, 2, 3, 4, 5].map(item => { return (<div className="rating-star mx-1"><Star color='#6cacc5' size={ 16 } /></div>) }) }
                                    </div>
                                </div>
                                <div className="quantity">
                                    <div className="quantity-fig">{ 1}</div>
                                </div>
                                <div className="pricing">
                                    <div className="price-amt">₹{ Item?.price }</div>
                                </div>
                                <div className="item-controls">
                                    <button className="item-remove" onClick={ (e) => { e.preventDefault(); dispatch(remove(Item?.id));}}><Trash2 /></button>
                                </div>
                            </div>

                        )
                    }) }

                </div>
                <Modal
                    isOpen={ modalOpen }
                    // onAfterOpen={ afterOpenModal }
                    // onRequestClose={ closeModal }
                    style={ customStyles }
                    contentLabel="Delivery Modal"
                >
                 
                 <div className="delivery-container">
                     <div className="modal-header">
                         <div className="modal-heading-text">Delivery </div>
                        <div><button className="modal-close" onClick={()=>setModalOpen(false)}><X size={ 32 } color="#ffffff" /></button></div>
                     </div>
                     <hr/>

                    <div className="address-box">
                        Delivered To
                            <div className="addres-text">{ formik.values.first_name }&nbsp;{ formik.values.last_name }</div>
                            <div className="addres-text">{ formik.values.street }&nbsp;{ formik.values.city }</div>
                            <div className="addres-text">{ formik.values.country }&nbsp;{ formik.values.zip }</div>
                            <div className="addres-text">{ formik.values.phone }</div>
                            <div className="delivery-banner">
                            <img width="350" height="250" src="https://delivery.namkalam.in/wp-content/uploads/2021/03/delivery.gif" className="attachment-large size-large" alt="" loading="lazy"/>
                            </div>
                            <div className="delivery-msg">We are processing your order, soons it is on the way.</div>
                            <div className="shop-row">
                                <Link to={ '/products' }><div className="shop-more">Shop More</div></Link>
                            </div>
                         
                    </div>
                 </div>


                </Modal>
            </div>


        </>









    )
}

export default Cart
