import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import QRCode from 'react-qr-code';

const TicketPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/ticket/${ticketId}`);
        setTicketData(response.data);
      } catch (error) {
        console.error('Error fetching ticket:', error);
        toast.error('Eroare la încărcarea biletului.');
        navigate('/flights'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchTicket();
  }, [ticketId, navigate]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ticketData) { 
    return <div>No ticket found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Biletul tău</h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Detalii bilet</h2>
          <p><span className="font-semibold">Locație plecare:</span> {ticketData.plecare}</p>
          <p><span className="font-semibold">Locație destinație:</span> {ticketData.destinatie}</p>
          <p><span className="font-semibold">Data plecare:</span> {new Date(ticketData.data_plecare).toLocaleString()}</p>
          <p><span className="font-semibold">Data sosire:</span> {new Date(ticketData.data_sosire).toLocaleString()}</p>
          <p><span className="font-semibold">Locuri rezervate:</span> {ticketData.numar_locuri_rezervate}</p>
          <p><span className="font-semibold">Preț total:</span> {ticketData.pret_total}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Cod QR</h2>
          <div className="flex justify-center">
            <QRCode value={JSON.stringify(ticketData)} size={200} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
