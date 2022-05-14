import axios from "axios";
import {
    GET_DETAIL_AIRLINE_FAILED,
    GET_DETAIL_AIRLINE_PENDING,
    GET_DETAIL_AIRLINE_SUCCESS,
} from "./types";

export const getDetailAirline = (id, navigate) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");

        dispatch({
            type: GET_DETAIL_AIRLINE_FAILED,
            payload: null,
        });

        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/airlines/${id}`,
            {
                headers: { token },
            }
        );

        dispatch({
            type: GET_DETAIL_AIRLINE_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        if (error.response) {
            if (parseInt(error.response.data.code, 10) === 401) {
                localStorage.clear();
                // return navigate("/");
            }

            error.message = error.response.data.error;
        }

        dispatch({
            type: GET_DETAIL_AIRLINE_PENDING,
            payload: error.message,
        });
    }
};


export const createAirline = (body) => {
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("id")

    // console.log(body)

    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_API_URL}/airlines`, body,
            {
                headers: {
                    token: token
                }
            })
            .then((response) => {
                // console.log(response)
                resolve(response.data)
            })
            .catch((err) => {
                // console.log(err)
                reject(err)
            })
    })
};


export const updateAirline = (id, body) => {
    const token = localStorage.getItem("token")
    // const id = localStorage.getItem("id")

    return new Promise((resolve, reject) => {
        axios.put(`${process.env.REACT_APP_API_URL}/airlines/${id}`, body, {
            headers: {
                token: token
            }
        })
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
};