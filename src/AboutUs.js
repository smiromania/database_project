import React from 'react';
import { Link } from 'react-router-dom';
import andreiImg from './img/andrei.jpg';
import ionelImg from './img/ionel.jpg';
import screenshotImg from './img/Screenshot_2.jpg';

const AboutUs = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
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
            <header className="bg-cover bg-center h-64" style={{ backgroundImage: "url('https://www.columbiathreadneedle.lu/uploads/2022/07/7261494b4139321e43bea28c6616b256/jumbo-jet-taking-off.jpg')" }}>
                <div className="container mx-auto h-full flex justify-center items-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-bold mb-2">Despre Noi</h1>
                    </div>
                </div>
            </header>
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6 text-center">Cine Suntem</h2>
                    <p className="text-gray-700 mb-6 text-lg">
                        La Booking423F, misiunea noastră este să facem călătoriile mai accesibile și mai plăcute pentru toată lumea. 
                        Cu o gamă variată de zboruri disponibile, ne străduim să oferim cele mai bune prețuri și cele mai convenabile opțiuni pentru clienții noștri.
                    </p>
                    <p className="text-gray-700 mb-6 text-lg">
                        Echipa noastră este formată din experți dedicați care lucrează non-stop pentru a se asigura că fiecare client are o experiență de rezervare ușoară și sigură. 
                        Credem în puterea călătoriilor de a deschide noi orizonturi și suntem aici să vă ajutăm să ajungeți la destinația dorită fără griji.
                    </p>

                    <div className="flex flex-wrap -mx-4 mt-8">
                        <div className="w-full md:w-1/3 px-4 mb-8">
                            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                                <img src={andreiImg} style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt="ȘTEFAN Marian-Ionel" className="mx-auto mb-4 rounded-full w-25 h-25 object-cover" />
                                <h3 className="text-xl font-bold mb-2">ȘTEFAN Marian-Ionel</h3>
                                <p className="text-gray-600">
                                    Să oferim servicii de înaltă calitate și prețuri competitive pentru toți clienții noștri.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-4 mb-8">
                            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                                <img src={ionelImg} style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt="POPA Andrei-Emanuel" className="mx-auto mb-4 rounded-full w-25 h-25 object-cover" />
                                <h3 className="text-xl font-bold mb-2">POPA Andrei-Emanuel</h3>
                                <p className="text-gray-600">
                                    Să devenim lideri pe piața de rezervări de zboruri prin inovație și excelență în servicii.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-4 mb-8">
                            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                                <img src={screenshotImg} style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt="PANGRATIE Alexandru-Gabriel" className="mx-auto mb-4 rounded-full w-25 h-25 object-cover" />
                                <h3 className="text-xl font-bold mb-2">PANGRATIE Alexandru-Gabriel</h3>
                                <p className="text-gray-600">
                                    Integritate, transparență și angajament față de satisfacția clientului.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-blue-600 p-4 text-white text-center">
                <p>&copy; 2024 Booking423F. Toate Drepturile Rezervate.</p>
            </footer>
        </div>
    );
}

export default AboutUs;
