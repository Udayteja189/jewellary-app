import { ActionTypes } from '../constants/ProductConstants';

const initialState = {
    products: [],
}

export const WishlistReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_WISHLIST_PRODUCTS:
            return {
                ...state,
                products: payload
            };

        case ActionTypes.ADD_PRODUCT_TO_WISHLIST:
            return {
                ...state,
                products: [...state.products, payload]
            };

        case ActionTypes.REMOVE_FROM_WISHLIST:
            return {
                ...state,
                products: state.products.filter(
                item => item.product.id !== payload
                )
            };

        default:
        return state
    }

    
}