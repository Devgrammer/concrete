import React, {useEffect, useState} from 'react'
import Hero from '../components/Hero/hero'
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { getProductData } from '../Redux/slice/productData'
import ProductShowcase from '../components/Showcase/productShowcase'

const Home = ({}) => {
    let dispatch = useDispatch();
    const [addToCart, setAddToCart] = useState([]);
    useEffect(() => {
        dispatch(getProductData());
    },[])



    const productData = useSelector(state => state?.productData?.product);
    const cartData = useSelector(state => state?.productData?.cartData);
    console.log('console', productData);
    return (
        <div className="Home">
  <Helmet>
                <meta charSet="utf-8" />
                <title>Concrete-Home</title>
    </Helmet>
            <Hero/>
            <ProductShowcase productData={productData} addToCart={addToCart} setAddToCart={setAddToCart} />

        </div>
    )
}

export default Home
