import base64
import io
import os
import zipfile

"""https://tutorial101.blogspot.com/2023/04/react-and-python-flask-login-register.html"""
from flask_cors import CORS
import os
import hashlib
import uuid

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from flask_jwt_extended import create_access_token
from flask import Flask, render_template, jsonify, request, send_file, send_from_directory, session
import csv
import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="anup@6536",
    database="techgium"
)
token = None
loggedin = False


def derive_key(username, mac_address):
    # Combine username and MAC address
    combined_data = f"{username}:{mac_address}".encode('utf-8')
    salt = hashlib.sha256(combined_data).digest()
    # Derive a key using PBKDF2 with Argon2 as the underlying hash function
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        iterations=100000,  # Adjust the number of iterations according to your security requirements
        # salt=os.urandom(16),
        salt=salt,
        length=32
    )

    key = kdf.derive(combined_data)
    return key


def get_mac_address():
    mac = uuid.getnode()
    return ':'.join(['{:02x}'.format((mac >> elements) & 0xff) for elements in range(0, 2 * 6, 2)][::-1])


app = Flask(__name__)
CORS(app)
app.secret_key = "anup_66"


# @app.route('/')
# def index():
#     return render_template('index.html')

@app.route("/datasets")
def datasets():
    folderName = request.args.get("folder")
    print(folderName)
    return jsonify(os.listdir(f"E:/techgium_work/Watermarking Datasets/backend/photo_test/{folderName}"))


@app.route('/csvdata/')
def view_csv():
    csv_data = []
    folder = request.args.get("folder")
    file = request.args.get("file")
    print(folder, file)

    with open(f"E:/techgium_work/Watermarking Datasets/backend/photo_test/{folder}/{file}/{file}.csv") as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            csv_data.append(row)
    return jsonify(csv_data)


@app.route("/get_image")
def get_image():
    image_path = "E:/techgium_work/Watermarking Datasets/backend/photo_test/" + request.args.get(
        "folder") + "/" + request.args.get("data") + "/" + request.args.get("image")
    print(image_path)
    return send_file(image_path, mimetype="image/jpg/jpeg")


@app.route("/image_files")
def get_images():
    folder = request.args.get('folder')
    image = request.args.get('data')
    images = []
    for image in os.listdir(f"E:/techgium_work/Watermarking Datasets/backend/photo_test/{folder}/{image}"):
        images.append(image)

    return jsonify(images)


@app.route("/folders")
def get_folders_list():
    folders = [os.listdir("E:/techgium_work/Watermarking Datasets/backend/photo_test")]
    return jsonify(folders)


from encryption_decryption import encrypt_folder, get_mac_address, derived_key


@app.route('/download')
def download_and_save():
    # Get the folder path, key, and username from the request
    folder = request.args.get('folder')
    sub_folder = request.args.get('data')
    folder_path = f"E:/techgium_work/Watermarking Datasets/backend/photo_test/{folder}/{sub_folder}"
    # key = request.form['key'].encode()  # Convert to bytes
    username = "Anup_66"
    mac_address = get_mac_address()
    key = derive_key(username, mac_address)

    # Create an in-memory buffer to hold the zip file
    zip_buffer = io.BytesIO()

    # Create a zip file containing the encrypted files in the in-memory buffer
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(folder_path):
            for file_name in files:
                # Construct the path of the file to be encrypted
                file_path = os.path.join(root, file_name)

                # Read the file data
                with open(file_path, 'rb') as file:
                    data = file.read()

                # Generate a random IV (Initialization Vector)
                iv = os.urandom(16)

                # Encrypt the file data
                cipher = Cipher(algorithms.AES(key), modes.CFB(iv), backend=default_backend())
                encryptor = cipher.encryptor()
                encrypted_data = encryptor.update(data) + encryptor.finalize()

                # Add the encrypted data to the zip file
                zipf.writestr(os.path.relpath(file_path + f".{username}", folder_path), iv + encrypted_data)
    print("ziped")
    # Seek to the beginning of the buffer
    zip_buffer.seek(0)

    # Return the zip file as a downloadable attachment
    return send_file(
        zip_buffer,
        as_attachment=True,
        download_name=f'{username}_encrypted_files.zip',
        mimetype='application/zip'
    )
    # return jsonify(["hello"])


import mysql.connector

token = "kokookkoko"


@app.route("/authorised")
def check_auth():
    global loggedin
    if loggedin:
        return jsonify({"message": "authorised"})
    else:
        return jsonify({"message": "login"})


@app.route("/login", methods=["GET","POST"])
def login():
    global loggedin
    print("jiiiij")
    data = request.json
    session["username"] = data.get("username")
    session["password"] = data.get("password")
    print(data)
    # auth = request.authorization
    # if not auth or not auth.username or not auth.password:
    #     return jsonify({"message":'could not verify'}),401
    mycursor = mydb.cursor()

    mycursor.execute('SELECT username, password FROM user_details WHERE username = %s', (session["username"],))
    result = mycursor.fetchone()
    print(result)
    print(session['password']==result[1])
    if result and result[1] == session['password']:
        loggedin = True

        # token = create_access_token(identity=session['username'])
        print("ok")
        return jsonify({"message": "ok"})
    else:
        print("not")
        return jsonify({"message": "Signup"})
    # if session["username"] in [user[0] for user in result]:
    #     Str = f"select password from user_details where username = %s;"
    #     mycursor.execute(Str,(session["username"],))
    #     passResult = mycursor.fetchall()
    #     if passResult and session["password"] == str(passResult[0][0]):
    #         return jsonify({"message":"logged in successfully."}),200
    #     else:
    #         return jsonify({"error:your password or username is wrong."}),401


@app.route("/signup", methods=['POST'])
def signup():
    global token
    data = request.json
    print(data)
    print("hello")
    session["username"] = data.get("username")
    session["mac_address"] = data.get("mac_address")
    session["password"] = data.get("password")
    session["email"] = data.get('email')
    print(session['username'])
    cursor = mydb.cursor()
    val = cursor.execute(
        "INSERT INTO user_details (username, email, mac_address, password) VALUES (%s, %s, %s, %s)",
        (session['username'], session['email'], session['mac_address'], session['password']))
    # Using parameterized query to prevent SQL injection
    # cursor.execute(
    #     "INSERT INTO user_details (username, email, mac_address, password) VALUES (%s, %s, %s, %s)",
    #     (session['username'], session['email'], session['mac_address'], session['password'])
    # )
    mydb.commit()
    cursor.close()
    # token = create_access_token(identity=session['username'])
    if val:
        return jsonify({"message": "successful"})
    else:
        return jsonify({"could not sign in ."})


if __name__ == '__main__':
    app.run(debug=True)
