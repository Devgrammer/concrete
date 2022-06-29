import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WishlistCard from '../../components/ProductCard/wishlistCard';
import { removeFromWishlist}  from '../../Redux/slice/wishlistSliceData'
import { add } from '../../Redux/slice/cartDataSlice'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/loader'
import Helmet from 'react-helmet';




const Wishlist = () => {
    const dispatch = useDispatch();
    const paginationFactor = 12;
    const [page, setPage] = useState(0);


    const productData = useSelector(state=>state?.productData?.product)
    const wishlistData = useSelector(state=>state?.wishlist)

   



    const handlePrev = () => {
        console.log('pageP', page)
        if (wishlistData?.length > 12 && page > 0) {
            setPage(page - paginationFactor);
        }

    }

    const handleNext = () => {
        console.log('pageN', page)
        if (wishlistData?.length > 12) {
            setPage(page + paginationFactor);
        }
    }

    const handleAddProductToCart = (e,id) => {
        let product = productData?.filter(Item => Item?.id === id)[0];
            dispatch(add(product))
            dispatch(removeFromWishlist(id));  
        }
    
    const removeProductFromWishlist = (e,id) => {
        console.log('ss', id)
            dispatch(removeFromWishlist(id))
    }


    const LoaderData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
   

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Concrete-Wishlist</title>
            </Helmet>
            <div className="section-heading"> <div className="section-heading-text">Wishlist</div> </div>
            <div className="product-container">


                <div className='product-showcase-container w-add'>

                    {
                        wishlistData?.length === 0 ? LoaderData?.map(val => { return (<Loader />) }) :
                            wishlistData?.slice(page, (page + paginationFactor))?.map(Item => {
                                return (
                                    <WishlistCard key={ Item?.id } id={ Item?.id } title={ Item?.title } src={ Item?.images[0] } category={ Item?.category?.name } price={ Item?.price } handleAddProductToCart={ handleAddProductToCart } removeProductFromWishlist={ removeProductFromWishlist } />
                                )
                            })
                    }
                </div>


            </div>
            <div className="pagination-container">
                <div className="pagination-controls">
                    <div className="pagination-info mx-2">Showing { page === 0 ? 1 : page } of { page + paginationFactor } of { wishlistData?.length }</div>
                    <div className="pagination-prev mx-2"><button className="button-fill" disabled={ page <= 0 ? true : false } onClick={ handlePrev }><ChevronLeft size={ 14 } color='#ffffff' /></button></div>
                    <div className="pagination-next"><button className="button-fill" disabled={ page + paginationFactor > wishlistData?.length ? true : false } onClick={ handleNext }><ChevronRight size={ 14 } color='#ffffff' /></button></div>
                </div>
            </div>

        </>
    )
}

export default Wishlist
