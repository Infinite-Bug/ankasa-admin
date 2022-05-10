import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "../pages/Landing";
import NotFound from "../pages/NotFound";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return children;
  }
  return <Navigate to="/auth" />;
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
