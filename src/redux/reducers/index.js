import { combineReducers } from "redux";
import listAirlineReducer from "./listAirline";

const rootReducers = combineReducers({
  listAirline: listAirlineReducer
});

export default rootReducers;
