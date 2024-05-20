CREATE DATABASE DB;
USE DB;


CREATE TABLE Utilizatori (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    nume_utilizator VARCHAR(50) NOT NULL,
    parola VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    data_inregistrare DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
select * from Utilizatori;
CREATE TABLE Companii_Aeriene (
    companie_id INT AUTO_INCREMENT PRIMARY KEY,
    nume_companie VARCHAR(100) NOT NULL,
    tara_baza VARCHAR(50) NOT NULL
);

CREATE TABLE Aeroporturi (
    aeroport_id INT AUTO_INCREMENT PRIMARY KEY,
    nume_aeroport VARCHAR(100) NOT NULL,
    oras VARCHAR(100) NOT NULL,
    tara VARCHAR(100) NOT NULL
);

CREATE TABLE Zboruri (
    zbor_id INT AUTO_INCREMENT PRIMARY KEY,
    aeroport_plecare_id INT NOT NULL,
    aeroport_destinatie_id INT NOT NULL,
    data_plecare DATETIME NOT NULL,
    data_sosire DATETIME NOT NULL,
    companie_id INT NOT NULL,
    numar_locuri_disponibile INT NOT NULL,
    pret_bilet DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (aeroport_plecare_id) REFERENCES Aeroporturi(aeroport_id),
    FOREIGN KEY (aeroport_destinatie_id) REFERENCES Aeroporturi(aeroport_id),
    FOREIGN KEY (companie_id) REFERENCES Companii_Aeriene(companie_id)
);

CREATE TABLE Bilete (
    bilet_id INT AUTO_INCREMENT PRIMARY KEY,
    zbor_id INT NOT NULL,
    user_id INT NOT NULL,
    numar_locuri_rezervate INT NOT NULL,
    data_achizitie DATETIME NOT NULL,
    FOREIGN KEY (zbor_id) REFERENCES Zboruri(zbor_id),
    FOREIGN KEY (user_id) REFERENCES Utilizatori(user_id)
);

select * from Aeroporturi;

INSERT INTO Aeroporturi (nume_aeroport, oras, tara) VALUES
('Henri Coanda International Airport', 'Bucharest', 'Romania'),
('Heathrow Airport', 'London', 'United Kingdom'),
('John F. Kennedy International Airport', 'New York', 'USA'),
('Charles de Gaulle Airport', 'Paris', 'France'),
('Dubai International Airport', 'Dubai', 'UAE');

select * from Companii_Aeriene;

INSERT INTO Companii_Aeriene (nume_companie, tara_baza) VALUES
('Tarom', 'Romania'),
('British Airways', 'United Kingdom'),
('American Airlines', 'USA'),
('Air France', 'France'),
('Emirates', 'UAE');

INSERT INTO Zboruri (aeroport_plecare_id, aeroport_destinatie_id, data_plecare, data_sosire, companie_id, numar_locuri_disponibile, pret_bilet)
VALUES
    (6, 7, '2024-05-25 10:00:00', '2024-05-25 12:00:00', 1, 150, 300.00),
    (7, 6, '2024-05-26 11:00:00', '2024-05-26 13:00:00', 2, 120, 250.00),
    (8, 9, '2024-05-27 12:00:00', '2024-05-27 14:00:00', 3, 200, 350.00),
    (9, 8, '2024-05-28 13:00:00', '2024-05-28 15:00:00', 4, 180, 400.00),
    (10, 6, '2024-05-29 14:00:00', '2024-05-29 16:00:00', 5, 220, 280.00),
    (6, 10, '2024-05-30 15:00:00', '2024-05-30 17:00:00', 6, 190, 320.00),
    (7, 8, '2024-05-31 16:00:00', '2024-05-31 18:00:00', 7, 170, 380.00),
    (8, 7, '2024-06-01 17:00:00', '2024-06-01 19:00:00', 8, 240, 420.00),
    (9, 6, '2024-06-02 18:00:00', '2024-06-02 20:00:00', 9, 260, 300.00),
    (10, 7, '2024-06-03 19:00:00', '2024-06-03 21:00:00', 10, 210, 350.00);

ALTER TABLE Bilete
DROP FOREIGN KEY bilete_ibfk_1;

ALTER TABLE Bilete
ADD CONSTRAINT bilete_ibfk_1 FOREIGN KEY (zbor_id) REFERENCES Zboruri(zbor_id) ON DELETE CASCADE;



select * from Bilete;

SELECT * FROM Zboruri WHERE companie_id = 'Tarom' ORDER BY pret_bilet DESC;
