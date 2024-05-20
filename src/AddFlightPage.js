import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const AddFlightPage = () => {
  const [formData, setFormData] = useState({
    aeroport_plecare_id: '',
    aeroport_destinatie_id: '',
    data_plecare: '',
    data_sosire: '',
    companie_id: '',
    numar_locuri_disponibile: '',
    pret_bilet: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/add-flight', formData);
      toast.success('Zbor adăugat cu succes!');
      navigate('/');
    } catch (error) {
      console.error('Error adding flight:', error);
      toast.error('Eroare la adăugarea zborului.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Adaugă Zbor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="aeroport_plecare_id"
          placeholder="ID Aeroport Plecare"
          value={formData.aeroport_plecare_id}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="aeroport_destinatie_id"
          placeholder="ID Aeroport Destinație"
          value={formData.aeroport_destinatie_id}
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
          type="text"
          name="companie_id"
          placeholder="ID Companie"
          value={formData.companie_id}
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
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Adaugă Zbor
        </button>
      </form>
    </div>
  );
};

export default AddFlightPage;
