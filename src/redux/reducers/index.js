import { combineReducers } from "redux";
import AirlineDetailReducer from "./airline";

const rootReducers = combineReducers({
    detailAirline: AirlineDetailReducer,
});

export default rootReducers;
