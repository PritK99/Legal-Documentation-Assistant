import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from './Home';
import Service from './Service';
import About from './about';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service/:id" element={<Service />} />
      <Route path='/about' element={<About/>}/>
      </Routes>
    </Router>
  );
}

export default App;
