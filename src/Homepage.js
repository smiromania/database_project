import React from 'react';
import { Link } from 'react-router-dom';
const Homepage = () => {
    return (
        <div className="bg-gray-100">
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

            <header className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://i.pinimg.com/originals/0a/85/f7/0a85f71e1011d74238b785d9b5401899.gif')" }}>
                <div className="container mx-auto h-full flex justify-center items-center">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-4">Find Your Perfect Flight</h1>
                        <p className="text-xl mb-8">Book flights to your favorite destinations easily and quickly.</p>
                        <a href="/flights" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">Search Flights</a>
                    </div>
                </div>
            </header>

            <section className="py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Why Book with Us</h2>
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full md:w-1/3 px-4 mb-8">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <svg className="h-16 w-16 mx-auto text-blue-600 mb-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927C9.569 1.74 10.43 1.74 10.951 2.927l1.285 3.021a1 1 0 00.86.618l3.354.24c1.292.092 1.878 1.8.865 2.763l-2.55 2.452a1 1 0 00-.286.88l.632 3.348c.228 1.205-1.054 2.15-2.084 1.586L10 15.356l-3.127 1.631c-1.03.564-2.313-.38-2.085-1.586l.632-3.348a1 1 0 00-.286-.88l-2.55-2.452c-1.013-.964-.427-2.671.865-2.763l3.354-.24a1 1 0 00.86-.618l1.285-3.021z"/></svg>
                                <h3 className="text-xl font-bold mb-2">Best Prices</h3>
                                <p className="text-gray-600">We offer the best prices for flights to your favorite destinations.</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-4 mb-8">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <svg className="h-16 w-16 mx-auto text-blue-600 mb-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3a7 7 0 00-7 7v3a3 3 0 002 2.83V17a3 3 0 003 3h4a3 3 0 003-3v-1.17A3 3 0 0017 13v-3a7 7 0 00-7-7zm-5 7a5 5 0 1110 0v3a1 1 0 01-1 1v1a1 1 0 01-1 1H8a1 1 0 01-1-1v-1a1 1 0 01-1-1v-3z"/></svg>
                                <h3 className="text-xl font-bold mb-2">Secure Booking</h3>
                                <p className="text-gray-600">Your information is safe with our secure booking system.</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-4 mb-8">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <svg className="h-16 w-16 mx-auto text-blue-600 mb-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 00-2 2v9a2 2 0 002 2h2.586l2 2H7a1 1 0 00-.707.293L5 19.586V20a1 1 0 001.293.707L9 19h6.586l2 2H13a1 1 0 00-.707.293L11 23.586V24a1 1 0 001.293.707L15 23h1a2 2 0 002-2V5a2 2 0 00-2-2H4z"/></svg>
                                <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                                <p className="text-gray-600">Our support team is available 24/7 to assist you with your booking needs.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-blue-600 p-4 text-white text-center">
                <p>&copy; 2024 Booking423F. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default Homepage;
