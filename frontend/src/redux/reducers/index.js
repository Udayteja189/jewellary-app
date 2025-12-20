import { combineReducers } from "redux";
import { ProductReducer } from "./ProductReducer";
import { AuthReducer } from "./AuthReducer";
import { WishlistReducer } from "./WishlistReducer";
import { CartReducer } from "./CartReducer";

const reducers = combineReducers({
    allProducts: ProductReducer,
    wishlistProducts: WishlistReducer,
    cartProducts : CartReducer,
    auth: AuthReducer,
})

export default reducers