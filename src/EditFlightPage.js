import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment'; // Import moment.js for date/time conversion


const EditFlightPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    plecare: '',
    destinatie: '',
    data_plecare: '',
    data_sosire: '',
    companie_id: '',
    numar_locuri_disponibile: '',
    pret_bilet: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlight();
  }, []);

  const fetchFlight = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/flights/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching flight:', error);
      toast.error('Eroare la încărcarea zborului.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const plecareResponse = await axios.get(`http://localhost:5000/airport-id/${formData.plecare}`);
      const destinatieResponse = await axios.get(`http://localhost:5000/airport-id/${formData.destinatie}`);

      const updatedFormData = {
        ...formData,
        aeroport_plecare_id: plecareResponse.data.aeroport_id, 
        aeroport_destinatie_id: destinatieResponse.data.aeroport_id,
        companie_id: parseInt(formData.companie_id, 10),
        pret_bilet: parseFloat(formData.pret_bilet),
        data_plecare: new Date(formData.data_plecare).toISOString().slice(0, 19).replace('T', ' '),
        data_sosire: new Date(formData.data_sosire).toISOString().slice(0, 19).replace('T', ' ')
      };

      await axios.put(`http://localhost:5000/update-flight/${id}`, updatedFormData);
      toast.success('Zbor actualizat cu succes!');
      navigate('/');
    } catch (error) {
      console.error('Error updating flight:', error);
      toast.error('Eroare la actualizarea zborului.');
    }
  };

  return (
    <div className="container mx-auto p-4">

      
      <form onSubmit={handleSubmit}>
        <input
 type="text"
 name="plecare" 
 placeholder="Aeroport Plecare"
value={formData.plecare}
 onChange={handleChange}
 className="w-full p-2 mb-4 border rounded"
 />
 <input
 type="text"
 name="destinatie" 
 placeholder="Aeroport Destinație"
 value={formData.destinatie}
onChange={handleChange}
 className="w-full p-2 mb-4 border rounded"
/>
        <input
          type="datetime-local"
          name="data_plecare"
          placeholder="Data Plecare"
          value={formData.data_plecare}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="datetime-local"
          name="data_sosire"
          placeholder="Data Sosire"
          value={formData.data_sosire}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="number"
          name="numar_locuri_disponibile"
          placeholder="Număr Locuri Disponibile"
          value={formData.numar_locuri_disponibile}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="number"
          name="pret_bilet"
          placeholder="Preț Bilet"
          value={formData.pret_bilet}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Actualizează Zbor
        </button>
      </form>

    </div>
  );
};

export default EditFlightPage;