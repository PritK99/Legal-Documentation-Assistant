import React, { useState } from 'react';
import './Service.css';
import Navbar from './Navbar';

function Service() {
  const initialCards = [
    { title: 'Lease Deed', category: 'Contracts' },
    { title: 'Rent Agreement', category: 'Important' },
    {title: 'Allowance', category: 'Important' },
    {title: 'Allowance', category: 'Important' },
    {title: 'Maintainance', category: 'Contracts' },
    {title: 'Acceptance', category: 'New' },
    // Add more card data here
  ];

  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = Array.from(new Set(initialCards.map((card) => card.category)));

  const filteredCards = selectedCategory
    ? initialCards.filter((card) => card.category === selectedCategory)
    : initialCards;

  const handleFilter = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  return (
    <div className="outer">
      <Navbar />

      <div className="serve">
        <div className="right">
          <h2>Search bar </h2>
          <br />
          <label htmlFor="category"> Select Category:</label>
          <br/>
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
        <div className="cards">
          {filteredCards.map((card, index) => (
            <div className="card" key={index}>
              <p>{card.title}</p>
              <button>View Document</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Service;
