import React, {useEffect} from 'react'
import { Star , Trash2, X} from 'react-feather';
import { useDispatch, useSelector } from 'react-redux'
import { getCartData } from '../../Redux/slice/productData'
import Modal from 'react-modal';


const Cart = ({modalIsOpen, setmodalIsOpen}) => {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getCartData());
    // },[]);
    const cartData = useSelector(state => state?.productData?.product);
    const productData = useSelector(state => state?.productData?.product);
    console.log("cartData: ", cartData);
    const productIdArray = cartData?.map(Item => Item?.productId);
   const cartProduct = [];
  
  if(productIdArray){
      for (let val of productIdArray) {
          if (productData?.filter(Item => Item?.id === val)) {
              cartProduct?.push(productData?.filter(Item => Item?.id === parseInt(val))[0])
          }
      }
  } 
    console.log("cartProduct: ", cartProduct);


    const getQuanity=(Id)=>{
        return cartData?.filter(Item=>Item?.productId === Id && Item?.quantity)[0]?.quantity;
    }

    const customStyles = {
        content: {
            width:' fit-content',
            top: '15%',
            right: '2%',
            left:'auto',
            bottom: 'auto',
           
           // transform: 'translate(-32%, -32%)',
            borderRadius: '8px',
            backgroundColor:'#e2e2e2',
            padding:'36px 36px 36px 36px',
            boxSizing:'border-box',
            backdropFilter:'brightness(80%)',

        },
    };

    console.log('jk', getQuanity(9))
    return (
        <Modal
            isOpen={ modalIsOpen }
            // onAfterOpen={ afterOpenModal }
            // onRequestClose={ closeModal }
            style={ customStyles }
            contentLabel="Cart"
        >
            <button  className="button-fill close-modal" onClick={ () => setmodalIsOpen(!modalIsOpen) }><X/></button>

       
             
             
          
                                                                                                                                                                                                                                                                                                                                                                                        
        </Modal>
      
           
       
       
    )
}

export default Cart
