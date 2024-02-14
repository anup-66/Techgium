import hashlib

from flask import Flask, request, send_from_directory
import os
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

def derive_key(username, mac_address):
    # Combine username and MAC address
    combined_data = f"{username}:{mac_address}".encode('utf-8')
    salt = hashlib.sha256(combined_data).digest()
    # Derive a key using PBKDF2 with Argon2 as the underlying hash function
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        iterations=100000,  # Adjust the number of iterations according to your security requirements
        # salt=os.urandom(16),
        salt = salt,
        length=32
    )

    key = kdf.derive(combined_data)
    return key

def encrypt_file(file_path,saving_path, key,username):
    with open(file_path, 'rb') as file:
        data = file.read()

    # Generate a random IV (Initialization Vector)
    iv = os.urandom(16)

    cipher = Cipher(algorithms.AES(key), modes.CFB(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    encrypted_data = encryptor.update(data) + encryptor.finalize()

    # Ensure the saving_path folder exists
    if not os.path.exists(saving_path):
        os.makedirs(saving_path)

    # Construct the output file path within the saving_path folder
    output_file_path = os.path.join(saving_path, os.path.basename(file_path) + f'.{username}')

    # Write the encrypted data to the output file
    with open(output_file_path, 'wb') as encrypted_file:
        encrypted_file.write(iv + encrypted_data)

@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.form
    username = data['username']
    mac_address = data['mac_address']
    print(username)
    key = derive_key(username, mac_address)
    folder_path = 'E:/techgium_work/photo_test'
    saving_path = 'test_folder'
    print(key)
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if os.path.isfile(file_path):
            encrypt_file(file_path, saving_path, key, username)

    return 'Encryption successful'

@app.route('/download/<username>')
def download(username):
    folder_path = 'E:/techgium_work/photo_test'
    # saving_path = 'test_folder'
    return send_from_directory(folder_path, f'encrypted_files.{username}.zip', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
