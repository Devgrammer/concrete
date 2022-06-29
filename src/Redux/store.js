import {configureStore} from '@reduxjs/toolkit'
import wishlistDataReducer from './slice/wishlistSliceData'
import cartDataReducer from './slice/cartDataSlice'
import productDataReducer  from './slice/productData'


export const store = configureStore({
    reducer:{
        productData: productDataReducer,
        cartData: cartDataReducer,
        wishlist: wishlistDataReducer
    }
})