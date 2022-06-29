import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const getProductData = createAsyncThunk('./getProductData', async () => {
    return fetch("https://api.escuelajs.co/api/v1/products").then((res) => res.json())
 
        
})
export const getCartData = createAsyncThunk('./getCartData', async () => {
    return fetch("https://fakestoreapi.com/carts/user/2").then((res) => res.json())

        
})
export const addProductToCart = createAsyncThunk('./putProductToCart',  (data) => {
    console.log('data', data)
    return data;

    // return fetch('https://fakestoreapi.com/carts', {
    //     method: "POST",
    //     body: JSON.stringify(
    //         {
    //             userId:2,
    //             date: '2020-02-03',
    //             products: [{ productId: data, quantity: 1 }]
    //         }
    //     )
    })
 
        


// export const addProductToCart=(data)=>{
//     let cart = [...data, data];
//     console.log('cd', cart)
//     return data;
// }

const productDataSlice = createSlice({
    name: 'productData',
    initialState: {
        product: [],
        status: null
    },
    extraReducers: {
        [getProductData.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getProductData.fulfilled]: (state, { payload }) => {
            state.product = payload;
            state.status = 'success'
        },
        [getProductData.rejected]: (state, action) => {
            state.status = 'failed'
        },
        [addProductToCart.pending]: (state, action) => {
            state.status = 'loading'
        },
        [addProductToCart.fulfilled]: (state, { payload }) => {
            console.log('gf', state.cartData, payload)
            state.cartData= payload;
            state.status = 'success'
        },
        [addProductToCart.rejected]: (state, action) => {
            state.status = 'failed'
        },
        [getCartData.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getCartData.fulfilled]: (state,action, { payload }) => {
            state.cartData = payload
            state.status = 'success'
        },
        [getCartData.rejected]: (state, action) => {
            state.status = 'failed'
        },
     
    }
})

export default productDataSlice.reducer;