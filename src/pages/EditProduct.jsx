import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from '../components/Navbar'

export default function AddProduct() {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    airline_id: "",
    origin: "",
    destination: "",
    price: 0,
    stock: 0,
    type: "",
    transit_total: 0,
    gate: "",
    terminal: "",
    flight_date: "",
    estimation: "",
  });
  const [airlines, setAirlines] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Edit Ticket`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setApiLoading(true);

    axios
      .get(`${process.env.REACT_APP_API_URL}/airlines`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        setAirlines(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}/product-detail/${params.id}`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        setForm({
          ...res.data.data,
          flight_date: res.data.data.flight_date.slice(0, 16),
          estimation: res.data.data.estimation.slice(0, 16),
        });
        setApiLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setNotFound(true);
        setApiLoading(false);
      });
  }, [params.id, token]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);

    axios
      .put(`${process.env.REACT_APP_API_URL}/product/${params.id}`, form, {
        headers: {
          token,
        },
      })
      .then(() => {
        Swal.fire("Success!", "Ticket update successfully!", "success");
        setIsLoading(false);

        navigate("/product");
      })
      .catch((error) => {
        if (error.response) {
          if (Array.isArray(error.response.data.error)) {
            setErrors(error.response.data.error);
          } else {
            setErrors([{ msg: error.response.data.error }]);
          }
        } else {
          setErrors([{ msg: error.message }]);
        }

        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  };

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h1 className="text-center">Edit Ticket</h1>
        {apiLoading ? (
          <>
            <hr />
            <h1 className="text-center">Loading</h1>
          </>
        ) : (
          <>
            {notFound ? (
              <>
                <hr />
                <h1 className="text-center">Ticket Not Found</h1>
              </>
            ) : (
              <>
                {errors.length > 0 && (
                  <div
                    className="alert alert-danger mx-0 mx-md-auto"
                    style={{ maxWidth: "500px" }}
                  >
                    <ul className="m-0">
                      {errors.map((error, index) => (
                        <li key={index}>{error.msg}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <form
                  className="mx-md-auto mx-2 mt-4"
                  style={{ maxWidth: "500px" }}
                  onSubmit={onSubmitHandler}
                >
                  <hr />
                  <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                      Airline
                    </label>
                    <select
                      name="airline_id"
                      className="form-control"
                      onChange={onChangeHandler}
                      value={form.airline_id}
                    >
                      <option value="">Select Airline</option>
                      {airlines.map((airline) => (
                        <option key={airline.id} value={airline.id}>
                          {airline.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="mb-3 ">
                        <label htmlFor="origin" className="form-label">
                          Origin
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="origin"
                          name="origin"
                          placeholder="Origin"
                          onChange={onChangeHandler}
                          value={form.origin}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="mb-3 ">
                        <label htmlFor="destination" className="form-label">
                          Destination
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="destination"
                          name="destination"
                          placeholder="Destination"
                          onChange={onChangeHandler}
                          value={form.destination}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                          Price
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          name="price"
                          placeholder="Price"
                          onChange={onChangeHandler}
                          value={form.price}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="mb-3 ">
                        <label htmlFor="stock" className="form-label">
                          Stock
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="stock"
                          name="stock"
                          placeholder="Stock"
                          onChange={onChangeHandler}
                          value={form.stock}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="mb-3 ">
                        <label htmlFor="type" className="form-label">
                          Type
                        </label>
                        <select
                          name="type"
                          className="form-control"
                          onChange={onChangeHandler}
                          value={form.type}
                        >
                          <option value="">Select Type</option>
                          <option value="economy">Economy</option>
                          <option value="business">Business</option>
                          <option value="firstclass">First Class</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="mb-3 ">
                        <label htmlFor="transit_total" className="form-label">
                          Transit Total
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="transit_total"
                          name="transit_total"
                          placeholder="Transit"
                          onChange={onChangeHandler}
                          value={form.transit_total}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="mb-3 ">
                        <label htmlFor="gate" className="form-label">
                          Gate
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="gate"
                          name="gate"
                          placeholder="Gate"
                          onChange={onChangeHandler}
                          value={form.gate}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="mb-3 ">
                        <label htmlFor="terminal" className="form-label">
                          Terminal
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="terminal"
                          name="terminal"
                          placeholder="Terminal"
                          onChange={onChangeHandler}
                          value={form.terminal}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="mb-3 ">
                        <label htmlFor="flight_date" className="form-label">
                          Flight Date
                        </label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          id="flight_date"
                          name="flight_date"
                          placeholder="Flight Date"
                          onChange={onChangeHandler}
                          value={form.flight_date}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="mb-3 ">
                        <label htmlFor="estimation" className="form-label">
                          Estimation Date
                        </label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          id="estimation"
                          name="estimation"
                          placeholder="Estimation Date"
                          onChange={onChangeHandler}
                          value={form.estimation}
                        />
                      </div>
                    </div>
                  </div>
                  {isLoading ? (
                    <button
                      class="btn btn-lg btn-primary w-100 mt-2"
                      type="submit"
                      disabled
                    >
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span class="visually-hidden">Loading...</span>
                    </button>
                  ) : (
                    <button
                      className="btn btn-lg btn-primary w-100 mt-2"
                      type="submit"
                    >
                      Submit
                    </button>
                  )}
                </form>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
