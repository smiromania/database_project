import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import AboutUs from './AboutUs';
import Contact from './Contact';
import Login from './Login';
import Register from './Register';
import FlightsPage from './FlightsPage';
import AddFlightPage from './AddFlightPage';
import EditFlightPage from './EditFlightPage';
import FlightsPageAdmin from './FlightsPageAdmin';
import TicketPage from './TicketPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/add-flight" element={<AddFlightPage />} />
          <Route path="/edit-flight/:id" element={<EditFlightPage />} />
          <Route path="/admin" element={<FlightsPageAdmin />} />
          <Route path="/ticket/:ticketId" element={<TicketPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
