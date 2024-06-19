import React, { useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import DesktopProvider from "./context/DesktopContext";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./Pages/Login";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DesktopProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </DesktopProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
