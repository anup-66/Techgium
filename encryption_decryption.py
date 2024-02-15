import os
import hashlib
import uuid

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

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
def encrypt_folder(folder_path,saving_path, key,username):
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if os.path.isfile(file_path):
            encrypt_file(file_path,saving_path, key,username)

def decrypt_file(encrypted_file_path, key,username):
    with open(encrypted_file_path, 'rb') as encrypted_file:
        encrypted_data = encrypted_file.read()

    # Extract IV from the first 16 bytes
    iv = encrypted_data[:16]
    data = encrypted_data[16:]

    cipher = Cipher(algorithms.AES(key), modes.CFB(iv), backend=default_backend())
    decryptor = cipher.decryptor()
    decrypted_data = decryptor.update(data) + decryptor.finalize()

    # Construct the output file path without the '.encrypted' extension
    user_len = len(username)
    output_file_path = encrypted_file_path[:-1*(user_len)]

    # Write the decrypted data to the output file
    with open(output_file_path, 'wb') as decrypted_file:
        decrypted_file.write(decrypted_data)

def decrypt_folder(encrypted_folder_path, key,username):
    for filename in os.listdir(encrypted_folder_path):
        encrypted_file_path = os.path.join(encrypted_folder_path, filename)
        if os.path.isfile(encrypted_file_path) and encrypted_file_path.endswith(f'.{username}'):
            decrypt_file(encrypted_file_path, key,username)

# Example usage:
def get_mac_address():
    mac = uuid.getnode()
    return ':'.join(['{:02x}'.format((mac >> elements) & 0xff) for elements in range(0,2*6,2)][::-1])

# Replace 'your_username' and 'your_mac_address' with your actual username and MAC address
username = 'Anup_66'
mac_address = get_mac_address()
# Derive the key from username and MAC address
derived_key = derive_key(username, mac_address)
print(derived_key)
# derived_key = b"\x84k-\x11\xe0\xcd\x99Q\x13!M\xc2a\x06Y\x85\xa6\xcd\xf0\xfe:\xc1/\xf3\xa8t\xc2Ii\xf3F\xf5"
# Encrypt a folder using the derived key
folder_path = 'E:/techgium_work/photo_test'
saving_path = 'test_folder'
encrypt_folder(folder_path,saving_path, derived_key,username)

# Decrypt the folder using the derived key
# decrypt_folder(saving_path, derived_key,username)

import os

from PIL import Image

