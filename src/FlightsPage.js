import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const FlightsPage = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [numarLocuri, setNumarLocuri] = useState(1);
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [query, setQuery] = useState({
    query_type: '',
    min_locuri: '',
    start_date: '',
    end_date: '',
    companie_id: '',
  });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchFlights();
    fetchCompanies();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:5000/flights', {
        params: query, 
      });
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
      toast.error('Eroare la încărcarea zborurilor.');
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/companies');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast.error('Eroare la încărcarea companiilor aeriene.');
    }
  };

  const handleBuyTicket = (flight) => {
    setSelectedFlight(flight);
    setTicketModalOpen(true);
  };

  const handleCloseModal = () => {
    setTicketModalOpen(false);
    setSelectedFlight(null);
    setNumarLocuri(1);
    setUserData({ username: '', password: '' });
  };

  const handleConfirmBuyTicket = async () => {
    try {
      const response = await axios.post('http://localhost:5000/buy-ticket', {
        zbor_id: selectedFlight.zbor_id,
        numar_locuri: numarLocuri,
        username: userData.username,
        password: userData.password
      });

      toast.success(response.data.message);
      const ticketId = response.data.ticket_id;
      setTicketModalOpen(false);
      fetchFlights(); 
      navigate(`/ticket/${ticketId}`);
    } catch (error) {
      console.error('Error buying ticket:', error);
      toast.error('Eroare la achiziționarea biletului. Te rugăm să încerci din nou.');
    }
  };

  const handleQueryChange = (e) => {
    const { name, value } = e.target;
    setQuery({
      ...query,
      [name]: name === 'companie_id' ? parseInt(value, 10) : value, 
    });
  };
  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    fetchFlights(); 
  };

  return (
    <div>
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Booking423F</div>
          <div>
            <Link to="/" className="text-white px-3 py-2 rounded hover:bg-blue-700">Home</Link>
            <Link to="/about" className="text-white px-3 py-2 rounded hover:bg-blue-700">About Us</Link>
            <Link to="/contact" className="text-white px-3 py-2 rounded hover:bg-blue-700">Contact</Link>
            <Link to="/login" className="text-white px-3 py-2 rounded hover:bg-blue-700">Login</Link>
            <Link to="/register" className="text-white px-3 py-2 rounded hover:bg-blue-700">Register</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto bg-orange-200 rounded-2xl shadow-2xl p-4">
        <ToastContainer />


        <form onSubmit={handleQuerySubmit} className="mb-4">
          <select name="query_type" value={query.query_type} onChange={handleQueryChange} className="p-2 border rounded mr-2">
            <option value="">Toate zborurile</option>
            <option value="locuri_disponibile">Zboruri cu locuri disponibile peste...</option>
            <option value="data_plecare">Zboruri între datele...</option>
            <option value="companie_pret">Zboruri ale companiei... ordonate după preț</option>
            <option value="pret_mediu">Zboruri cu preț mai mare decât media</option>
          </select>

          {query.query_type === 'locuri_disponibile' && (
            <input
              type="number"
              name="min_locuri"
              placeholder="Număr minim de locuri"
              value={query.min_locuri}
              onChange={handleQueryChange}
              className="p-2 border rounded mr-2"
            />
          )}
          {query.query_type === 'data_plecare' && (
            <>
              <input
                type="date"
                name="start_date"
                value={query.start_date}
                onChange={handleQueryChange}
                className="p-2 border rounded mr-2"
              />
              <input
                type="date"
                name="end_date"
                value={query.end_date}
                onChange={handleQueryChange}
                className="p-2 border rounded mr-2"
              />
            </>
          )}
          {query.query_type === 'companie_pret' && (
            <select name="companie_id" value={query.companie_id} onChange={handleQueryChange} className="p-2 border rounded mr-2">
              <option value="">Selectează compania</option>
              {companies.map((company) => (
                <option key={company.companie_id} value={company.companie_id}>{company.nume_companie}</option>
              ))}
            </select>
          )}

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Caută</button>
        </form>

        <table className="min-w-full bg-white">
  <thead>
    <tr>
      <th className="py-2">ID</th>
      <th className="py-2">Plecare</th>
      <th className="py-2">Destinație</th>
      <th className="py-2">Companie</th>
      <th className="py-2">Data Plecare</th>
      <th className="py-2">Data Sosire</th>
      <th className="py-2">Locuri Disponibile</th>
      <th className="py-2">Preț Bilet</th>
      <th className="py-2">Acțiuni</th>
    </tr>
  </thead>
  <tbody>
    {flights.map((flight) => (
      <tr key={flight.zbor_id}>
        <td className="py-2">{flight.zbor_id}</td>
        <td className="py-2">{flight.plecare}</td> 
        <td className="py-2">{flight.destinatie}</td> 
        <td className="py-2">{flight.nume_companie}</td> 
        <td className="py-2">{new Date(flight.data_plecare).toLocaleString()}</td>
        <td className="py-2">{new Date(flight.data_sosire).toLocaleString()}</td>
        <td className="py-2">{flight.numar_locuri_disponibile}</td>
        <td className="py-2">{flight.pret_bilet}</td>
        <td className="py-2">
          <button onClick={() => handleBuyTicket(flight)} className="bg-blue-500 text-white p-2 rounded">Cumpără Bilet</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

{ticketModalOpen && (
  <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-8 rounded w-80">
      <h2 className="text-lg font-bold mb-4">Cumpără Bilet</h2>
      <p className="mb-4">{selectedFlight.plecare} → {selectedFlight.destinatie}</p>
      <p className="mb-4">Preț Bilet: {selectedFlight.pret_bilet} RON</p>
      <input
        type="number"
        min="1"
        value={numarLocuri}
        onChange={(e) => setNumarLocuri(parseInt(e.target.value, 10))}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        value={userData.username}
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        placeholder="Nume Utilizator"
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        placeholder="Parolă"
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="flex justify-between">
        <button onClick={handleCloseModal} className="bg-gray-500 text-white p-2 rounded">Anulează</button>
        <button onClick={handleConfirmBuyTicket} className="bg-blue-500 text-white p-2 rounded">Cumpără</button>
      </div>
    </div>
  </div>
)}
</div>
</div>
);
};

export default FlightsPage;
