import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const FlightsPageAdmin = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:5000/flights');
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
      toast.error('Eroare la încărcarea zborurilor.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-flight/${id}`);
      toast.success('Zbor șters cu succes!');
      fetchFlights();
    } catch (error) {
      console.error('Error deleting flight:', error);
      toast.error('Eroare la ștergerea zborului.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Zboruri</h1>
      <Link to="/add-flight" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">Adaugă Zbor</Link>
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
                <Link to={`/edit-flight/${flight.zbor_id}`} className="bg-yellow-500 text-white p-2 rounded mr-2">Editează</Link>
                <button onClick={() => handleDelete(flight.zbor_id)} className="bg-red-500 text-white p-2 rounded">Șterge</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightsPageAdmin;
