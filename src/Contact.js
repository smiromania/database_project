import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPopup(true);
        e.target.reset();
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Navbar */}
            <nav className="bg-blue-600 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-2xl font-bold">Booking423F</div>
                    <div>
                        <Link to="/" className="text-white px-3 py-2 rounded hover:bg-blue-700">Home</Link>
                        <Link to="/about" className="text-white px-3 py-2 rounded hover:bg-blue-700">About Us</Link>
                        <Link to="/contact" className="text-white px-3 py-2 rounded hover:bg-blue-700">Contact</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-cover bg-center h-64" style={{ backgroundImage: "url('https://www.confideo.co.uk/wp-content/uploads/2015/10/contactus-1920x500.png')" }}>
                <div className="container mx-auto h-full flex justify-center items-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-bold mb-2">Contact</h1>
                    </div>
                </div>
            </header>

            {/* Contact Form */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6 text-center">Contactează-ne</h2>
                    <p className="text-gray-700 mb-6 text-lg text-center">
                        Dacă ai întrebări sau ai nevoie de asistență, nu ezita să ne contactezi prin intermediul formularului de mai jos.
                    </p>
                    <form className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Nume
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Numele tău"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email-ul tău"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                Mesaj
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="message"
                                rows="5"
                                placeholder="Mesajul tău"
                                required
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Trimite
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-black bg-opacity-50 absolute inset-0" onClick={() => setShowPopup(false)}></div>
                    <div className="bg-white p-8 rounded-lg shadow-lg z-10">
                        <h2 className="text-2xl font-bold mb-4">Mesaj trimis</h2>
                        <p className="text-gray-700 mb-4">Mesajul tău a fost trimis cu succes. Îți mulțumim pentru contact!</p>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => setShowPopup(false)}
                        >
                            Închide
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-blue-600 p-4 text-white text-center">
                <p>&copy; 2024 Booking423F. Toate Drepturile Rezervate.</p>
            </footer>
        </div>
    );
}

export default Contact;
