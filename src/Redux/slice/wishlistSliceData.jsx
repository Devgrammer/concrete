import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';




const wishlistDataSlice = createSlice({
    name: 'wishlistData',
    initialState: [],
    reducers: {

        addToWishlist(state, action) {
            if (state?.filter(Item => Item?.id === action.payload?.id).length === 0) {
                state.push(action.payload)
                toast.success('Product is added to wishlist')
            } else {
                toast.warn('Product is already in the wishlist')
            }

        },
        removeFromWishlist(state, action) {
            console.log("action:", action, state);

            if (state?.filter(Item => Item?.id === action.payload).length > 0) {
                toast.success('Product is removed from wishlist sucessfully!')
                return state.filter((Item) => Item?.id !== action.payload);
            }
            else {
                toast.warn('Product not exist in the wishlist')
            }


        },
    }
});

export const { addToWishlist, removeFromWishlist } = wishlistDataSlice.actions;
export default wishlistDataSlice.reducer;