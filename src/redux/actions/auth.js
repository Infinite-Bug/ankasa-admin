import axios from "axios";

export const login = async (data, setErrors) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      data
    );
    const token = res.data.token.jwt;
    const id = res.data.token.id;

    const check = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/${id}`,
      {
        headers: { token },
      }
    );
    if(check.data.data.level === 0){
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      return true;
    }
    throw Error ([`Unfortunately, you're not admin`])
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
