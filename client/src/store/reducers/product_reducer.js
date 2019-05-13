import { GET_PRODUCTS_BY_SELL, GET_PRODUCTS_BY_ARRIVAL,BRANDS,WOODS, GET_PRODUCTS_BY_SHOP, ADD_PRODUCT } from '../actions/types';

export default function(state={},action) {
    switch(action.type) {
        case GET_PRODUCTS_BY_SELL:
        return { ...state, bySell: action.payload }
        case GET_PRODUCTS_BY_ARRIVAL:
        return { ...state, byArrival : action.payload }
        case GET_PRODUCTS_BY_SHOP:
        return { ...state, toShop : action.payload.articles ,toShopSize : action.payload.size  }
        case ADD_PRODUCT:
        return {...state, addProduct : action.payload}
        case BRANDS:
        return { ...state, brands : action.payload }
        case WOODS:
        return { ...state, woods : action.payload }
        default : return state;

    }
}