import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../ProductCard/productCard'
import { addProductToCart } from '../../Redux/slice/productData'
import { add } from '../../Redux/slice/cartDataSlice'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Loader/loader'
import { addToWishlist } from '../../Redux/slice/wishlistSliceData'
import {useFormik} from 'formik'

const catFilter = ['Electronics', 'Clothes', 'Furniture', 'Others']
export const FilterSelect = ({ value, label, formik, filterData}) => {

    return (
        <div className="filter-component">
            <input type="checkbox" value={label} onChange={(e)=>{formik.setFieldValue(label, e.target.checked? e.target.value:''); filterData();}}/>
            <label>{ label }</label>
        </div>
    )
}

const ProductShowcase = ({ productData, cartData, addToCart, setAddToCart }) => {
    const dispatch = useDispatch();
    const paginationFactor = 12;
    const [page, setPage] = useState(0);
    const [product, setProduct] = useState([])
    let wishlistData = useSelector(state => state?.wishlistData);



    const handlePrev = () => {
        console.log('pageP', page)
        if (productData?.length > 12 && page > 0) {
            setPage(page - paginationFactor);
        }

    }

    const handleNext = () => {
        console.log('pageN', page)
        if (productData?.length > 12) {
            setPage(page + paginationFactor);
        }
    }

    const handleAddProductToCart = (e, id) => {
        
        let product = productData?.filter(Item => Item?.id === id)[0];
        if (addToCart?.filter(Item => Item?.id === id)?.length > 0) {
            toast.warning('Product is already the Cart')
        } else {
           dispatch(add(product))

            toast.success('Product is added Succesfully to the Cart')
        }
    }
    const handleAddProductToWishList = (e, id) => {

        let product = productData?.filter(Item => Item?.id === id)[0];
        if (wishlistData?.filter(Item => Item?.id === id)?.length > 0) {
            toast.warning('Product is already in the Wishlist')
        } else {
            dispatch(addToWishlist(product))
            toast.success('Product is added Succesfully to the Wishlist')
        }

    }


    const LoaderData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    console.log('pro', productData, productData?.length)

    const formik = useFormik({
        initialValues:{
            Electronics:'', 
            Clothes:'',
            Furniture:'',
            Others:'',

        },
        enableReinitialization:true,


    })
  
  

    let filterList = Object.values(formik.values)?.filter(Item => Item !== '');
    
  const filterData=(arr)=>{

      const filteredResults = arr?.filter(item =>
          filterList?.every(val => item.category?.name?.indexOf(val) > -1))
      return filteredResults;
 
  }
  
  
    return (
        <>
            <div className="section-heading"> <div className="section-heading-text">Meet the style</div> </div>
            <div className="product-container">

                <div className="product-filter-container">
                    <div className="filter-container-box">
                        <div className="filter-categories">Category</div>
                        {
                            catFilter?.map((Item, index) => {
                                return (
                                    <FilterSelect key={ index } label={ Item } formik={ formik } filterData={filterData} />
                                )
                            })
                        }

                        {/* <FilterSelect label={ 'Shoes' }   formik={formik}/>
                        <FilterSelect label={ 'Clothes' }  formik={formik}/>
                        <FilterSelect label={ 'Electronics' } formk={formik}i />
                        <FilterSelect label={ 'Furniture' } formik={formik} />
                        <FilterSelect label={ 'Others' } formik={formik} /> */}

                    </div>
                </div>


                <div className='product-showcase-container'>

                    {
                        productData?.length === 0 ? LoaderData?.map((val, index )=> { return (<Loader key={index}/>) }) :
                           filterData(productData)?.slice(page, (page + paginationFactor))?.map((Item, index )=> {
                                return (
                                    <ProductCard key={ index } id={ Item?.id } title={ Item?.title } src={ Item?.images[0] } category={ Item?.category?.name } price={ Item?.price } handleAddProductToCart={ handleAddProductToCart } handleAddProductToWishList={ handleAddProductToWishList } />
                                )
                            })
                    }
                </div>


            </div>
            <div className="pagination-container">
                <div className="pagination-controls">
                    <div className="pagination-info mx-2">Showing { page === 0 ? 1 : page } of { page + paginationFactor } of { filterData(productData)?.length }</div>
                    <div className="pagination-prev mx-2"><button className="button-fill" disabled={ page <= 0 ? true : false } onClick={ handlePrev }><ChevronLeft size={ 14 } color='#ffffff' /></button></div>
                    <div className="pagination-next"><button className="button-fill" disabled={ page + paginationFactor > productData?.length ? true : false } onClick={ handleNext }><ChevronRight size={ 14 } color='#ffffff' /></button></div>
                </div>
            </div>

        </>
    )
}

export default ProductShowcase
