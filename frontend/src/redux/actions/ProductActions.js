import { ActionTypes } from "../constants/ProductConstants"

export const setProducts = (products) => ({
        type: ActionTypes.SET_PRODUCTS,
        payload: products
})

export const addToWishlist = (product) => ({
        type: ActionTypes.ADD_PRODUCT_TO_WISHLIST,
        payload: product
})

export const removeSelectedWishlist = (id) => ({
        type: ActionTypes.REMOVE_PRODUCT_FROM_WISHLIST,
        payload: id
})

export const setProductsInCart = (items) => ({
  type: ActionTypes.SET_CART_PRODUCTS,
  payload: items,
});

export const setWishListed = (items) => ({
  type: ActionTypes.SET_WISHLIST_PRODUCTS,
  payload: items,
});

export const addProductToCart = (product) => ({
  type: ActionTypes.ADD_TO_CART,
  payload: product,
});

export const removeProductFromCart = (id) => ({
  type: ActionTypes.REMOVE_PRODUCT_FROM_CART,
  payload: id,
});


