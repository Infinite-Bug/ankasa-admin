import { combineReducers } from "redux";
import listAirlineReducer from "./listAirline";
import AirlineDetailReducer from "./airline";

const rootReducers = combineReducers({
    listAirline: listAirlineReducer,
    detailAirline: AirlineDetailReducer,
});

export default rootReducers;
