import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Service.css";
import Navbar from "./Navbar";

function Service() {
  const initialCards = [
    { title: "Lease Deed", category: "Contracts" },
    { title: "Rent Agreement", category: "Important" },
    { title: "Allowance", category: "Important" },
    { title: "Allowance", category: "Important" },
    { title: "Maintainance", category: "Contracts" },
    { title: "Acceptance", category: "New" },
    // Add more card data here
  ];

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [serviceName, setServiceName] = useState('');

  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = Array.from(
    new Set(initialCards.map((card) => card.category))
  );

  const filteredCards = selectedCategory
    ? initialCards.filter((card) => card.category === selectedCategory)
    : initialCards;

  const handleFilter = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/forms?service_id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setData(res);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(()=>{
    if (data.length > 0 )
    {
    setServiceName(data[0].service_name);}
  }, [data]);

  return (
    <div className="outer">
      <Navbar />

      <div className="serve w-full">
        <div className="right">
          <h2>Search bar </h2>
          <br />
          <label htmlFor="category"> Select Category:</label>
          <br />
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="cards mx-auto">
          <h1 className="text-4xl font-bold">{serviceName.length > 0 && serviceName}</h1>
          {data.length > 0 ? (
            data.map((form, index) => (
                <div className="card" key={form.form_id}>
                  <div className="flex w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-9 h-9"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <p className="text-xl font-semibold mt-1 px-3">
                      {form.form_name}
                    </p>
                  </div>

                  <button>View Document</button>
                </div>
            ))
          ) : (
            <div className="flex justify-center w-full items-center">
              <p className="text-4xl text-white font-bold">
                We will get back to you soon....
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Service;
