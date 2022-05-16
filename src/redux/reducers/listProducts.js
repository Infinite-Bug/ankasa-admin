import { GET_PRODUCT_PENDING, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAILED } from "../actions/types";

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null
}

const listProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_PENDING:
      return { ...state, isLoading: true };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data
      }
    case GET_PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload
      }
    default:
      return state
  }
}

export default listProductReducer