import { ActionTypes } from '../constants/ProductConstants';

const initialState = {
    products: []
}

export const CartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.ADD_TO_CART:
            return {
                ...state,
                products: [...state.products, payload],
            };
        case ActionTypes.SET_CART_PRODUCTS:
            return {
                ...state,
                products: payload,
            };
        case ActionTypes.REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                products: state.products.filter(
                    item => item.product.id !== payload
                ),
            };
        

        default:
            return state;
    }
}