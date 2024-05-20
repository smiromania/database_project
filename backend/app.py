from flask import Flask, request, jsonify, redirect, url_for
import mysql.connector
from datetime import datetime
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

conn = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="admin1", 
    database="DB",  
    auth_plugin='caching_sha2_password'
)

if conn.is_connected():
    print("Conexiunea la baza de date MySQL a fost realizată cu succes!")
else:
    print("Conexiunea la baza de date MySQL a eșuat.")
    
    
@app.route('/ticket/<ticket_id>', methods=['GET'])
def get_ticket(ticket_id):
    conn = mysql.connector.connect(
    host="localhost",
    user="root", 
    password="admin1", 
    database="DB",  
    auth_plugin='caching_sha2_password'
)

    if conn.is_connected():
        print("Conexiunea la baza de date MySQL a fost realizată cu succes!")
    else:
        print("Conexiunea la baza de date MySQL a eșuat.")
    cursor = conn.cursor(dictionary=True)
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute("SELECT * FROM Bilete WHERE bilet_id = %s", (ticket_id,))
        ticket_data = cursor.fetchone()

        if ticket_data:
            cursor.execute("""
                SELECT z.data_plecare, z.data_sosire, 
                       a1.nume_aeroport AS plecare, a2.nume_aeroport AS destinatie,
                       c.nume_companie, z.pret_bilet  -- Includem prețul biletului
                FROM Zboruri z
                JOIN Aeroporturi a1 ON z.aeroport_plecare_id = a1.aeroport_id
                JOIN Aeroporturi a2 ON z.aeroport_destinatie_id = a2.aeroport_id
                JOIN Companii_Aeriene c ON z.companie_id = c.companie_id
                WHERE z.zbor_id = %s
            """, (ticket_data['zbor_id'],))
            flight_data = cursor.fetchone()

            ticket_data.update(flight_data)

            pret_bilet = flight_data['pret_bilet']
            numar_locuri_rezervate = ticket_data['numar_locuri_rezervate']
            pret_total = pret_bilet * numar_locuri_rezervate
            ticket_data['pret_total'] = pret_total

            return jsonify(ticket_data)
        else:
            return jsonify({'error': 'Biletul nu a fost găsit.'}), 404

@app.route('/airport-id/<airport_name>', methods=['GET'])
def get_airport_id(airport_name):
    conn = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="admin1", 
    database="DB",  
    auth_plugin='caching_sha2_password'
)

# Verificarea conexiunii
    if conn.is_connected():
        print("Conexiunea la baza de date MySQL a fost realizată cu succes!")
    else:
        print("Conexiunea la baza de date MySQL a eșuat.")
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute("SELECT aeroport_id FROM Aeroporturi WHERE nume_aeroport = %s", (airport_name,))
        airport = cursor.fetchone()

    if airport:
        return jsonify(airport)
    else:
        return jsonify({'error': 'Aeroportul nu a fost găsit'}), 404

@app.route('/flights/<int:zbor_id>', methods=['GET'])
def get_flight_by_id(zbor_id):

    conn = mysql.connector.connect(
    host="localhost",
    user="root", 
    password="admin1",  
    database="DB", 
    auth_plugin='caching_sha2_password'
    )

    if conn.is_connected():
        print("Conexiunea la baza de date MySQL a fost realizată cu succes!")
    else:
        print("Conexiunea la baza de date MySQL a eșuat.")
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute("""
            SELECT z.zbor_id, z.data_plecare, z.data_sosire, z.numar_locuri_disponibile, z.pret_bilet,
                   a1.nume_aeroport AS plecare, a2.nume_aeroport AS destinatie,
                   c.nume_companie, c.companie_id
            FROM Zboruri z
            JOIN Aeroporturi a1 ON z.aeroport_plecare_id = a1.aeroport_id
            JOIN Aeroporturi a2 ON z.aeroport_destinatie_id = a2.aeroport_id
            JOIN Companii_Aeriene c ON z.companie_id = c.companie_id
            WHERE z.zbor_id = %s
        """, (zbor_id,))
        flight = cursor.fetchone()

    if flight:
        return jsonify(flight)
    else:
        return jsonify({'error': 'Zborul nu a fost găsit'}), 404
@app.route('/buy-ticket', methods=['POST'])    
def buy_ticket():
    conn = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="admin1",  
    database="DB",  
    auth_plugin='caching_sha2_password'
)

    if conn.is_connected():
        print("Conexiunea la baza de date MySQL a fost realizată cu succes!")
    else:
        print("Conexiunea la baza de date MySQL a eșuat.")

    data = request.get_json()

    if not all(key in data for key in ('zbor_id', 'numar_locuri', 'username', 'password')):
        return jsonify({'error': 'Unele date lipsesc din cerere.'}), 400


    zbor_id = data['zbor_id']
    numar_locuri = data['numar_locuri']
    username = data['username']
    password = data['password']

    if authenticate_user(username, password):
        try:
            cursor = conn.cursor()

            cursor.execute("SELECT numar_locuri_disponibile FROM Zboruri WHERE zbor_id = %s", (zbor_id,))
            result = cursor.fetchone()
            if result is None:
                return jsonify({'error': 'Zborul nu există.'}), 404

            numar_locuri_disponibile = result[0]

            if numar_locuri_disponibile < numar_locuri:
                return jsonify({'error': 'Nu sunt suficiente locuri disponibile pentru acest zbor.'}), 400

            new_numar_locuri_disponibile = numar_locuri_disponibile - numar_locuri
            cursor.execute("UPDATE Zboruri SET numar_locuri_disponibile = %s WHERE zbor_id = %s",
                           (new_numar_locuri_disponibile, zbor_id))

            data_achizitie = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            cursor.execute("INSERT INTO Bilete (zbor_id, user_id, numar_locuri_rezervate, data_achizitie) "
                           "VALUES (%s, %s, %s, %s)", (zbor_id, get_user_id(username), numar_locuri, data_achizitie))
            conn.commit()

            bilet_id = cursor.lastrowid
            cursor.execute("SELECT bilet_id FROM Bilete WHERE bilet_id = %s", (bilet_id,))
            bilet_id = cursor.fetchone()[0]
            return jsonify({'message': 'Bilet achiziționat cu succes!', 'ticket_id': bilet_id}), 200
        except Exception as e:
            print(e)
            return jsonify({'error': 'Eroare la achiziționarea biletului.'}), 500
        finally:
            cursor.close()
    else:
        return jsonify({'error': 'Autentificare eșuată. Nume de utilizator sau parolă incorectă.'}), 401
def authenticate_user(username, password):
    conn = mysql.connector.connect(
    host="localhost",
    user="root", 
    password="admin1",  
    database="DB",  
    auth_plugin='caching_sha2_password'
    )

    if conn.is_connected():
        print("Conexiunea la baza de date MySQL a fost realizată cu succes!")
    else:
        print("Conexiunea la baza de date MySQL a eșuat.")
    
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Utilizatori WHERE nume_utilizator = %s AND parola = %s", (username, password))
    user = cursor.fetchone()
    cursor.close()
    return user is not None

def get_user_id(username):
    conn = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="admin1",  
    database="DB",  
    auth_plugin='caching_sha2_password'
    )

    if conn.is_connected():
        print("Conexiunea la baza de date MySQL a fost realizată cu succes!")
    else:
        print("Conexiunea la baza de date MySQL a eșuat.")

    cursor = conn.cursor()
    cursor.execute("SELECT user_id FROM Utilizatori WHERE nume_utilizator = %s", (username,))
    user_id = cursor.fetchone()[0]
    cursor.close()
    return user_id


@app.route('/companies', methods=['GET'])
def get_companies():
    conn = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="admin1",  
    database="DB",  
    auth_plugin='caching_sha2_password'
    )

    if conn.is_connected():
        print("Conexiunea la baza de date MySQL a fost realizată cu succes!")
    else:
        print("Conexiunea la baza de date MySQL a eșuat.")
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute("SELECT * FROM Companii_Aeriene")
        companies = cursor.fetchall()
        return jsonify(companies)



@app.route('/flights', methods=['GET'])
def get_flights():
    conn = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="admin1",  
    database="DB",  
    auth_plugin='caching_sha2_password'
    )

    if conn.is_connected():
        print("Conexiunea la baza de date MySQL a fost realizată cu succes!")
    else:
        print("Conexiunea la baza de date MySQL a eșuat.")
    query_type = request.args.get('query_type')
    min_locuri = request.args.get('min_locuri', type=int)
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    companie_id = request.args.get('companie_id', type=int)

    print("Query type:", query_type)
    print("Min locuri:", min_locuri)
    print("Start date:", start_date)
    print("End date:", end_date)
    print("Companie ID:", companie_id)

    with conn.cursor(dictionary=True) as cursor:
        if query_type == 'locuri_disponibile':
            cursor.execute("""
                SELECT z.zbor_id, z.data_plecare, z.data_sosire, z.numar_locuri_disponibile, z.pret_bilet,
                       a1.nume_aeroport AS plecare, a2.nume_aeroport AS destinatie,
                       UPPER(c.nume_companie) AS nume_companie  -- Aplicam UPPER() aici
                FROM Zboruri z
                JOIN Aeroporturi a1 ON z.aeroport_plecare_id = a1.aeroport_id
                JOIN Aeroporturi a2 ON z.aeroport_destinatie_id = a2.aeroport_id
                JOIN Companii_Aeriene c ON z.companie_id = c.companie_id
                WHERE z.numar_locuri_disponibile > %s
            """, (request.args.get('min_locuri'),))
        elif query_type == 'data_plecare':
            cursor.execute("""
                SELECT z.zbor_id, z.data_plecare, z.data_sosire, z.numar_locuri_disponibile, z.pret_bilet,
                       a1.nume_aeroport AS plecare, a2.nume_aeroport AS destinatie,
                       UPPER(c.nume_companie) AS nume_companie  -- Aplicam UPPER() aici
                FROM Zboruri z
                JOIN Aeroporturi a1 ON z.aeroport_plecare_id = a1.aeroport_id
                JOIN Aeroporturi a2 ON z.aeroport_destinatie_id = a2.aeroport_id
                JOIN Companii_Aeriene c ON z.companie_id = c.companie_id
                WHERE z.data_plecare BETWEEN %s AND %s
            """, (request.args.get('start_date'), request.args.get('end_date')))
        elif query_type == 'companie_pret':
            cursor.execute("""
                SELECT z.zbor_id, z.data_plecare, z.data_sosire, z.numar_locuri_disponibile, z.pret_bilet,
                       a1.nume_aeroport AS plecare, a2.nume_aeroport AS destinatie,
                       UPPER(c.nume_companie) AS nume_companie  -- Aplicam UPPER() aici
                FROM Zboruri z
                JOIN Aeroporturi a1 ON z.aeroport_plecare_id = a1.aeroport_id
                JOIN Aeroporturi a2 ON z.aeroport_destinatie_id = a2.aeroport_id
                JOIN Companii_Aeriene c ON z.companie_id = c.companie_id
                WHERE z.companie_id = %s ORDER BY z.pret_bilet DESC
            """, (request.args.get('companie_id'),))

        elif query_type == 'pret_mediu':
            cursor.execute("""
                SELECT z.zbor_id, z.data_plecare, z.data_sosire, z.numar_locuri_disponibile, z.pret_bilet,
                       a1.nume_aeroport AS plecare, a2.nume_aeroport AS destinatie,
                       UPPER(c.nume_companie) AS nume_companie  -- Aplicam UPPER() aici
                FROM Zboruri z
                JOIN Aeroporturi a1 ON z.aeroport_plecare_id = a1.aeroport_id
                JOIN Aeroporturi a2 ON z.aeroport_destinatie_id = a2.aeroport_id
                JOIN Companii_Aeriene c ON z.companie_id = c.companie_id
                WHERE z.pret_bilet > (SELECT AVG(pret_bilet) FROM Zboruri)
            """)
        else:
            cursor.execute("""
                SELECT a1.nume_aeroport AS plecare, a2.nume_aeroport AS destinatie, 
                       UPPER(c.nume_companie) AS nume_companie, z.zbor_id, z.data_plecare, z.data_sosire, 
                       z.numar_locuri_disponibile, z.pret_bilet
                FROM Zboruri z
                JOIN Aeroporturi a1 ON z.aeroport_plecare_id = a1.aeroport_id
                JOIN Aeroporturi a2 ON z.aeroport_destinatie_id = a2.aeroport_id
                JOIN Companii_Aeriene c ON z.companie_id = c.companie_id
            """)

        results = cursor.fetchall()
        return jsonify(results)

@app.route('/query-flights', methods=['POST'])
def query_flights():
    conn = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="admin1",  
    database="DB", 
    auth_plugin='caching_sha2_password'
    )

    if conn.is_connected():
        print("Conexiunea la baza de date MySQL a fost realizată cu succes!")
    else:
        print("Conexiunea la baza de date MySQL a eșuat.")
    data = request.get_json()
    query_type = data.get('query_type')

    with conn.cursor(dictionary=True) as cursor:
        if query_type == 'locuri_disponibile':
            cursor.execute("""
                SELECT z.zbor_id, z.data_plecare, z.data_sosire, z.numar_locuri_disponibile, z.pret_bilet,
                       a1.nume_aeroport AS plecare, a2.nume_aeroport AS destinatie,
                       c.nume_companie
                FROM Zboruri z
                JOIN Aeroporturi a1 ON z.aeroport_plecare_id = a1.aeroport_id
                JOIN Aeroporturi a2 ON z.aeroport_destinatie_id = a2.aeroport_id
                JOIN Companii_Aeriene c ON z.companie_id = c.companie_id
                WHERE z.numar_locuri_disponibile > %s
            """, (data.get('min_locuri'),))
        elif query_type == 'data_plecare':
            cursor.execute("""
                SELECT z.zbor_id, z.data_plecare, z.data_sosire, z.numar_locuri_disponibile, z.pret_bilet,
                       a1.nume_aeroport AS plecare, a2.nume_aeroport AS destinatie,
                       c.nume_companie
                FROM Zboruri z
                JOIN Aeroporturi a1 ON z.aeroport_plecare_id = a1.aeroport_id
                JOIN Aeroporturi a2 ON z.aeroport_destinatie_id = a2.aeroport_id
                JOIN Companii_Aeriene c ON z.companie_id = c.companie_id
                WHERE z.data_plecare BETWEEN %s AND %s
            """, (data.get('start_date'), data.get('end_date')))
        elif query_type == 'companie_pret':
            companie_id = int(data.get('companie_id'))
            cursor.execute("""
                SELECT z.zbor_id, z.data_plecare, z.data_sosire, z.numar_locuri_disponibile, z.pret_bilet,
                       a1.nume_aeroport AS plecare, a2.nume_aeroport AS destinatie,
                       c.nume_companie
                FROM Zboruri z
                JOIN Aeroporturi a1 ON z.aeroport_plecare_id = a1.aeroport_id
                JOIN Aeroporturi a2 ON z.aeroport_destinatie_id = a2.aeroport_id
                JOIN Companii_Aeriene c ON z.companie_id = c.companie_id
                WHERE z.companie_id = %s 
                ORDER BY z.pret_bilet DESC
            """, (companie_id,))
        elif query_type == 'pret_mediu':
            cursor.execute("""
                SELECT z.zbor_id, z.data_plecare, z.data_sosire, z.numar_locuri_disponibile, z.pret_bilet,
                       a1.nume_aeroport AS plecare, a2.nume_aeroport AS destinatie,
                       c.nume_companie
                FROM Zboruri z
                JOIN Aeroporturi a1 ON z.aeroport_plecare_id = a1.aeroport_id
                JOIN Aeroporturi a2 ON z.aeroport_destinatie_id = a2.aeroport_id
                JOIN Companii_Aeriene c ON z.companie_id = c.companie_id
                WHERE z.pret_bilet > (SELECT AVG(pret_bilet) FROM Zboruri)
            """)

        results = cursor.fetchall()
        return jsonify(results)
@app.route('/add-flight', methods=['POST'])
def add_flight():
    conn = mysql.connector.connect(
    host="localhost",
    user="root", 
    password="admin1",  
    database="DB",  
    auth_plugin='caching_sha2_password'
    )

    if conn.is_connected():
        print("Conexiunea la baza de date MySQL a fost realizată cu succes!")
    else:
        print("Conexiunea la baza de date MySQL a eșuat.")

    data = request.json
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO Zboruri (aeroport_plecare_id, aeroport_destinatie_id, data_plecare, data_sosire, companie_id, numar_locuri_disponibile, pret_bilet)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (data['aeroport_plecare_id'], data['aeroport_destinatie_id'], data['data_plecare'], data['data_sosire'], data['companie_id'], data['numar_locuri_disponibile'], data['pret_bilet']))
    conn.commit()
    cursor.close()
    return jsonify({'message': 'Zbor adăugat cu succes!'})

@app.route('/update-flight/<int:zbor_id>', methods=['PUT'])
def update_flight(zbor_id):
    conn = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="admin1",  
    database="DB",  
    auth_plugin='caching_sha2_password'
    )

    if conn.is_connected():
        print("Conexiunea la baza de date MySQL a fost realizată cu succes!")
    else:
        print("Conexiunea la baza de date MySQL a eșuat.")
    
    data = request.json
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE Zboruri
        SET aeroport_plecare_id = %s, aeroport_destinatie_id = %s, data_plecare = %s, data_sosire = %s, companie_id = %s, numar_locuri_disponibile = %s, pret_bilet = %s
        WHERE zbor_id = %s
    """, (data['aeroport_plecare_id'], data['aeroport_destinatie_id'], data['data_plecare'], data['data_sosire'], data['companie_id'], data['numar_locuri_disponibile'], data['pret_bilet'], zbor_id))
    conn.commit()
    cursor.close()
    return jsonify({'message': 'Zbor actualizat cu succes!'})

@app.route('/delete-flight/<int:zbor_id>', methods=['DELETE'])
def delete_flight(zbor_id):
    conn = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="admin1",  
    database="DB",  
    auth_plugin='caching_sha2_password'
    )

    if conn.is_connected():
        print("Conexiunea la baza de date MySQL a fost realizată cu succes!")
    else:
        print("Conexiunea la baza de date MySQL a eșuat.")
    
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Zboruri WHERE zbor_id = %s", (zbor_id,))
    conn.commit()
    cursor.close()
    return jsonify({'message': 'Zbor șters cu succes!'})

@app.route('/login', methods=['POST'])
def login():
    conn = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="admin1", 
    database="DB",  
    auth_plugin='caching_sha2_password'
    )


    if conn.is_connected():
        print("Conexiunea la baza de date MySQL a fost realizată cu succes!")
    else:
        print("Conexiunea la baza de date MySQL a eșuat.")

    data = request.json
    username = data['username']
    password = data['password']


    cursor = conn.cursor()

    cursor.execute("SELECT * FROM Utilizatori WHERE nume_utilizator = %s AND parola = %s", (username, password))

    row = cursor.fetchone()

    cursor.close()

    if row:
        return jsonify({'redirect': '/homepage-js'})
    else:
        return jsonify({'message': 'Nume de utilizator sau parolă incorecte!'}), 401

@app.route('/register', methods=['POST'])
def register():
    conn = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="admin1",  
    database="DB",  
    auth_plugin='caching_sha2_password'
    )

    if conn.is_connected():
        print("Conexiunea la baza de date MySQL a fost realizată cu succes!")
    else:
        print("Conexiunea la baza de date MySQL a eșuat.")

    data = request.json
    username = data['username']
    password = data['password']
    email = data['email']

    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO Utilizatori (nume_utilizator, parola, email) VALUES (%s, %s, %s)", (username, password, email))
        conn.commit()
        return jsonify({'message': 'Utilizator înregistrat cu succes!'}), 201
    except mysql.connector.Error as err:
        return jsonify({'message': f'Eroare la înregistrare: {err}'}), 500
    finally:
        cursor.close()

@app.teardown_appcontext
def close_connection(exception):
    if conn is not None:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)
