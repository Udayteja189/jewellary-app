import Products from '../../gallery.json'
import { ActionTypes } from '../constants/ProductConstants';

const initialState = {
    products: Products
}

export const ProductReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.ADD_PRODUCT_TO_CART:
            return {
                ...state,
                products: state.products.map((product) =>
                    product.index === payload ? { ...product, addedToCart: true } : product
                )
            };
        case ActionTypes.REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                products: state.products.map((product) =>
                    product.index === payload ? { ...product, addedToCart: false } : product
                )
            };
        case ActionTypes.ADD_PRODUCT_TO_WISHLIST:
            return {
                ...state,
                products: state.products.map((product) =>
                    product.index === payload ? { ...product, liked: true } : product
                )
            };
        case ActionTypes.REMOVE_PRODUCT_FROM_WISHLIST:
            return {
                ...state,
                products: state.products.map((product) =>
                    product.index === payload ? { ...product, liked: false } : product
                )
            };
        default:
            return state;
    }
}
