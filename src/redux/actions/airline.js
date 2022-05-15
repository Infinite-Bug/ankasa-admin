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


export const createAirline = async (body, setErrors) => {

    try {
        const token = localStorage.getItem("token")
        // const id = localStorage.getItem("id")

        await axios.post(`${process.env.REACT_APP_API_URL}/airlines`, body,
            {
                headers: {
                    token: token,
                }
            })

        return true;

    } catch (error) {
        if (error.response) {
            if (Array.isArray(error.response.data.error)) {
                setErrors(error.response.data.error);
            } else {
                setErrors([{ msg: error.response.data.error }]);
            }
        } else {
            setErrors([{ msg: error.message }]);
        }

        return false;
    }
};

export const updateAirline = async (id, body, setErrors) => {
    try {
        const token = localStorage.getItem("token")

        await axios.put(`${process.env.REACT_APP_API_URL}/airlines/${id}`, body, {
            headers: {
                token: token,
                "Content-Type": "multipart/form-data"
            }
        })

        return true;
    } catch (error) {
        if (error.response) {
            if (Array.isArray(error.response.data.error)) {
                setErrors(error.response.data.error);
            } else {
                setErrors([{ msg: error.response.data.error }]);
            }
        } else {
            setErrors([{ msg: error.message }]);
        }

        return false;
    }
};