import axios from "axios";
import {
  GET_DETAIL_PRODUCT_FAILED,
  GET_DETAIL_PRODUCT_PENDING,
  GET_DETAIL_PRODUCT_SUCCESS,
  GET_PRODUCT_PENDING,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILED,
} from "./types";

export const getListProduct = (url) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    dispatch({
      type: GET_PRODUCT_PENDING,
      payload: null,
    });

    const res = await axios.get(url, {
      headers: { token },
    });

    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAILED,
      payload: error.message,
    });
  }
};

export const deleteProduct = (id) => {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/delete-product/${id}`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getDetailProduct = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    dispatch({
      type: GET_DETAIL_PRODUCT_FAILED,
      payload: null,
    });

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product-detail/${id}`,
      {
        headers: { token },
      }
    );

    dispatch({
      type: GET_DETAIL_PRODUCT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    if (error.response) {
      if (parseInt(error.response.data.code, 10) === 401) {
        localStorage.clear();
      }

      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_DETAIL_PRODUCT_PENDING,
      payload: error.message,
    });
  }
};

export const createProduct = async (body, setErrors) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(`${process.env.REACT_APP_API_URL}/product`, body, {
      headers: {
        token: token,
      },
    });

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

export const updateProduct = async (id, body, setErrors) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(`${process.env.REACT_APP_API_URL}/product/${id}`, body, {
      headers: {
        token: token,
        "Content-Type": "multipart/form-data",
      },
    });

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
