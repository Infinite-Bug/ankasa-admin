import axios from "axios";
import { GET_USER_PENDING, GET_USER_SUCCESS, GET_USER_FAILED } from "./types";

export const getUser = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_PENDING,
      payload: null,
    });

    const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);

    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAILED,
      payload: error.message,
    });
  }
};
