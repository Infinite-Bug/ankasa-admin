import {
    GET_DETAIL_PRODUCT_FAILED,
    GET_DETAIL_PRODUCT_PENDING,
    GET_DETAIL_PRODUCT_SUCCESS,
} from '../actions/types';

const initialState = {
    isLoading: false,
    isError: false,
    data: {},
    error: null,
};

const AirlineDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DETAIL_AIRLINE_PENDING:
            return { ...state, isLoading: true };
        case GET_DETAIL_AIRLINE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data,
            };
        case GET_DETAIL_AIRLINE_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default AirlineDetailReducer;
