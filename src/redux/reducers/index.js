import { combineReducers } from "redux";
import listAirlineReducer from "./listAirline";
import AirlineDetailReducer from "./airline";
import listProductReducer from "./listProducts"
import ProductDetailReducer from "./product";

const rootReducers = combineReducers({
    listAirline: listAirlineReducer,
    listProducts: listProductReducer,
    detailAirline: AirlineDetailReducer,
    detailProduct: ProductDetailReducer,
});

export default rootReducers;
