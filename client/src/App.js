import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from './Home';
import Service from './Service';
import Navbar from './Navbar';
function App() {
  return (
    <Router>
    <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/service' element={<Service/>}/>
      </Routes>
      </Router>
  );
}

export default App;
