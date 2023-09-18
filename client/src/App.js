import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import React from "react";
import Home from "./Home";
import Service from "./Service";
import About from "./about";
import Navbar from "./Navbar";
import InputForm from "./InputForm";
import Footer from "./footer";
import Chatbot from "./chatbot";
import Faq from "./Faq";
function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service/:id" element={<Service />} />
          <Route path="/form/:id" element={<InputForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </Router>

      <Chatbot />
      <Footer />
    </>
  );
}

export default App;
