import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AddProduct() {
  // localStorage.setItem(
  //   "token",
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMzNzUyZjZlLWYwZTQtNGEwMy1hOTJlLTNkYmVmYjkwMWRlMyIsImxldmVsIjowLCJpYXQiOjE2NTIxNzM2MDMsImV4cCI6MTY1MjE5NTIwM30.GhEsAgPJwXxRenzYA-9TArpNpY_-FYmSfVsZrI25wQI"
  // );
  // localStorage.setItem("id", "c3752f6e-f0e4-4a03-a92e-3dbefb901de3");

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

  useEffect(() => {
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
  }, [token]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (
      form.airline_id &&
      form.destination &&
      form.origin &&
      form.price &&
      form.stock &&
      form.type &&
      form.transit_total &&
      form.gate &&
      form.terminal &&
      form.flight_date &&
      form.estimation
    ) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/product`, form, {
          headers: {
            token,
          },
        })
        .then(() => {
          alert("Berhasil menambahkan product");

          setForm({
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
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Semua input harus diisi!");
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-center">Add Product</h1>
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
          >
            <option selected={form.airline_id === ""} value="">
              Select Airline
            </option>
            {airlines.map((airline) => (
              <option
                selected={airline.id === form.airline_id}
                key={airline.id}
                value={airline.id}
              >
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
              >
                <option selected={form.type === ""} value="">
                  Select Type
                </option>
                <option selected={form.type === "economy"} value="economy">
                  Economy
                </option>
                <option selected={form.type === "business"} value="business">
                  Business
                </option>
                <option
                  selected={form.type === "firstclass"}
                  value="firstclass"
                >
                  First Class
                </option>
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
        <button className="btn btn-lg btn-primary w-100 mt-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
