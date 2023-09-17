import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import Home from "./Home";
import Service from "./Service";
import Navbar from "./Navbar";
import InputForm from "./InputForm";
import Footer from "./footer";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service/:id" element={<Service />} />
          <Route path="/form/:id" element={<InputForm />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
