import React, {useEffect, useState} from 'react'
import {Bell, Heart, Lock, ShoppingCart} from 'react-feather'
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../Cart/cart';
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


const NavBar = ({userName}) => {
    let navigate = useNavigate();

    const [windowSize, setWindowSize] = useState('');
    const [modalIsOpen, setmodalIsOpen] = useState(false);

    useEffect(()=>{
        setWindowSize(window.innerWidth);
    }, [windowSize.innerWidth])
    const customStyles = {
        content: {
            top: '20%',
            left: '80%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius:'8px'
        },
    };
    console.log('fig', auth.currentUser)

    const cartData = useSelector(state => state?.cartData?.length)
    const wishlistData = useSelector(state => state?.wishlist?.length)

const handleSignOut=()=>{
    signOut(auth).then(() => {
        localStorage.clear();
       toast.success("GoodBye! See you Soon.")
       navigate('/');
    }).catch((error) => {
       toast.warning(error.message)
    });
}
    return (
        <div className='navbar-container' style={ { borderBottom: auth.currentUser ? '0px' :'1px solid #363a45'}}>
            <div className="navbar-left"> 
                <Link to={ localStorage.getItem('token')?'/products':'./' }><div className="navbar-brand-logo">CONCRETE</div></Link>
             </div>
             {/* <div className="navbar-center">
                <div className="navabr-center-men mx-1">HE {windowSize }</div>
                 <div className="navabr-center-women mx-1">SHE</div>
             </div> */}
            <div className="navbar-right">
                { auth.currentUser && <div className="welcom-msg"> { userName}</div>}
                { auth.currentUser && <div className="" title={'Logout'} onClick={ handleSignOut }><Lock size={ 18 } color="#363a45" className='logout-icon' /></div>}
              { auth.currentUser && <div className="navbar-notification px-2"><Link to={ './wishlist' }><Heart size={ 18 } color='#363a45'/> {wishlistData>0 &&<span className='item-counter'>{wishlistData}</span>}</Link></div>}
                { auth.currentUser && <div className="navbar-cart px-1"  ><Link to={ './cart' }><ShoppingCart size={ 18 } color='#363a45' /> { cartData > 0 && <span className='cart-counter'>{ cartData }</span> }</Link></div>}
            </div>
         <Cart modalIsOpen={modalIsOpen} setmodalIsOpen={setmodalIsOpen}/>
        </div>


    )
}

export default NavBar
