import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../components/Login";
import React from "react";
import Dashboard from "../components/Dashboard";
import { useAuth0 } from "@auth0/auth0-react";

export const MainRoutes = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
      />
    </Routes>
  );
};
