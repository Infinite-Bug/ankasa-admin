import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "../pages/Landing";
import Airline from '../pages/Airline'
import Login from "../pages/Login";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import NotFound from "../pages/NotFound";
import CreateAirline from "../pages/CreateAirline";
import UpdateAirline from "../pages/UpdateAirline";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return children;
  }
  return <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return children;
  }
  return <Navigate to="/" />;
}

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
        </Route>
        <Route path="/airline">
          <Route index element={<Airline />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/createAirline">
          <Route index element={
            <PrivateRoute>
              <CreateAirline />
            </ PrivateRoute>
          } />
        </Route>
        <Route path="/airline/:id">
          <Route index element={
            <PrivateRoute>
              <UpdateAirline />
            </ PrivateRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
