import axios from "axios";
import { GET_AIRLINE_PENDING, GET_AIRLINE_SUCCESS, GET_AIRLINE_FAILED } from "./types";

export const getListAirline = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token')
    dispatch({
      type: GET_AIRLINE_PENDING,
      payload: null
    })

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/airlines`, {
      headers: { token },
    });

    dispatch({
      type: GET_AIRLINE_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: GET_AIRLINE_FAILED,
      payload: error.message
    })
  }
}

export const deleteAirline = (id) => async () => {
  const token = localStorage.getItem('token')
  return new Promise((resolve, reject) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/airlines/${id}`, {
        headers: {
        token
      }
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}