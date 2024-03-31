import { ActionTypes } from "../constants/ProductConstants"

export const setProducts = (products) =>{
    return {
        type: ActionTypes.SET_PRODUCTS,
        payload: products
    }
}

export const selectProducts = (id) =>{
    return {
        type: ActionTypes.ADD_PRODUCT_TO_CART,
        payload: id
    }
}

export const removeSelectedProducts = (id) =>{
    return {
        type: ActionTypes.REMOVE_PRODUCT_FROM_CART,
        payload: id
    }
}

export const selectWishlist = (id) =>{
    return {
        type: ActionTypes.ADD_PRODUCT_TO_CART,
        payload: id
    }
}

export const removeSelectedWishlist = (id) =>{
    return {
        type: ActionTypes.REMOVE_PRODUCT_FROM_CART,
        payload: id
    }
}

