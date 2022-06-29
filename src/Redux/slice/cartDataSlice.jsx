import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const getProductData = createAsyncThunk('./getProductData', async () => {
    return fetch("https://api.escuelajs.co/api/v1/products").then((res) => res.json())})








const cartDataSlice = createSlice({
    name: 'cartData',
    initialState:[],
    reducers:{

        add(state, action){
            if (action.payload !== 'null'){
                state.push(action.payload)
            }
           
        },
        remove(state, action){
            return  state.filter((Item)=>Item?.id !== action.payload)
        }

    
},
});

export const {add, remove}=cartDataSlice.actions;
export default cartDataSlice.reducer;