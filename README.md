# 🔒 Watermarking Datasets with PrivyML
This is a full-stack **dataset watermarking and encryption system** built with **Flask, React, and PyTorch**, along with a custom Python library `PrivyML`.  
The application allows dataset owners to upload, watermark, encrypt, and distribute datasets securely.  
Encrypted datasets can only be decrypted by authorized users (username + MAC binding), ensuring **ownership control** and **protection from misuse**.  

The system also integrates with ML pipelines, enabling models to be trained directly on encrypted datasets without exposing raw data.  

## Table of Contents
+ Overview
+ Technologies Used
+ File Structure
+ Setup Instructions
+ Usage
+ Techniques Used
  - Dataset Watermarking
  - Encryption with MAC + Username Key
  - Secure Training with PrivyML
  - Web-based Dataset Access
+ API Endpoints
+ Future Enhancements

### Overview
This project is a full-stack dataset security application that supports:

- Uploading CSV and image datasets via a web interface.  
- Embedding **robust, invisible watermarks** for ownership proof.  
- Encrypting datasets per-user using AES (key derived from username + MAC address).  
- Training ML/DL models directly on encrypted datasets using the `PrivyML` library.  
- Secure dataset sharing through **React frontend + Flask backend**.  

The core feature is a **dual-layer ownership mechanism**:
1. **Encryption** → Only the intended user can decrypt the dataset.  
2. **Watermarking** → Ownership can always be proven, even if the dataset leaks.  

---

## Technologies Used
### Flask:  
Backend framework handling APIs for encryption, authentication, and dataset access.  

### React + TailwindCSS:  
Frontend interface for dataset upload, browsing, and download.  

### MySQL:  
Stores user credentials and manages authentication.  

### Cryptography (AES + PBKDF2-HMAC):  
Encryption scheme where keys are derived from username + MAC address.  

### PyTorch & scikit-learn:  
Machine learning and deep learning model training directly on encrypted datasets.  

### scikit-image:  
Used for processing and watermark embedding in image datasets.  

---

## File Structure
```
.
├── backend
│   ├── folder_render.py        # Flask backend APIs
│   ├── decrypt.py              # File/folder decryption module
│   ├── encryption_decryption.py# Encryption/Decryption utilities
│   ├── library_function.py     # PrivyML core logic
│   ├── server.py               # Flask app runner
│   └── photo_test/             # Sample datasets
│
├── watermark                   # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── tailwind.config.js
│
├── data
│   ├── templates/              # SQL schema, reports
│   ├── csv_data.py
│   └── test_folder.encrypted   # Sample encrypted dataset
│
├── test.py                     # Example training with PrivyML
├── simple_cnn_model.pth        # Sample trained model checkpoint
└── README.md
```

---

## File Descriptions
### folder_render.py:  
Flask routes for dataset access, encryption, image serving, login/signup, and download APIs.  

### decrypt.py:  
Handles AES encryption/decryption of files and folders using keys derived from username + MAC address.  

### library_function.py (PrivyML):  
Implements `_EncryptedFile` and `_SecureDataLoader` for training ML/DL models on encrypted datasets.  
Supports both **CSV** and **image datasets** with PyTorch and scikit-learn compatibility.  

### test.py:  
Example usage showing how to train ML/DL models with encrypted datasets via PrivyML.  

### watermark/src (Frontend):  
React UI for dataset upload, browsing, previewing CSVs/images, and downloading encrypted datasets.  

---

## Setup Instructions
1. Clone the repository
```
git clone <repository-url>
cd watermarking-datasets
```

2. Install the required dependencies
```
pip install -r requirements.txt
```

3. Setup MySQL Database
- Create a database `techgium`
- Run schema inside `/data/templates`
- Update credentials in `folder_render.py`

4. Run the backend
```
cd backend
python server.py
```

5. Run the frontend
```
cd watermark
npm install
npm start
```

The app will be running at `http://127.0.0.1:3000` (React) and `http://127.0.0.1:5000` (Flask backend).  

---

## Usage
**Dataset Uploading:**  
- Users can upload CSV or image datasets through the React UI.  
- Datasets are automatically watermarked and encrypted.  

**Dataset Downloading:**  
- Only authorized users (username + MAC) can download & decrypt datasets.  
- Encrypted ZIPs are generated dynamically per user.  

**Training on Encrypted Datasets:**  
PrivyML allows seamless training on encrypted datasets without exposing raw data.  

### Example
```
from privyml import customDlModel
import torch.nn as nn
import torch.optim as optim

class SimpleNN(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.fc2 = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        return self.fc2(torch.relu(self.fc1(x)))

model = SimpleNN(input_size=10, hidden_size=32, num_classes=3)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

trainer = customDlModel(
    model, criterion, optimizer,
    num_epochs=10,
    train_folder_path="data/train_encrypted",
    test_folder_path="data/test_encrypted",
    datatype="csv",
    username="Anup_66",
    batch_size=16
)
trainer.train_model()
```

---

## Techniques Used
### Dataset Watermarking  
Invisible watermarking embedded into dataset samples for ownership proof.  

### Encryption with MAC + Username Key  
AES-CFB encryption with PBKDF2-HMAC key derived from username + MAC address, ensuring per-user access.  

### Secure Training with PrivyML  
- `_EncryptedFile` decrypts data on-the-fly during training.  
- Works for **both CSV and images**.  
- Supports PyTorch deep learning and scikit-learn models.  

### Web-based Dataset Access  
React + Flask interface for uploading, browsing, and securely downloading datasets.  

---

## API Endpoints
**Get Datasets**  
```
GET /datasets?folder=<folder>
```

**Get CSV Data**  
```
GET /csvdata?folder=<folder>&file=<filename>
```

**Get Image File**  
```
GET /get_image?folder=<folder>&data=<subfolder>&image=<filename>
```

**Download Encrypted Dataset**  
```
GET /download?folder=<folder>&data=<subfolder>
```

**User Login**  
```
POST /login
```

**User Signup**  
```
POST /signup
```

---

## Future Enhancements
- Add distributed watermark embedding for stronger robustness.  
- Extend PrivyML to support **federated learning** on encrypted datasets.  
- Add audit logs for dataset downloads.  
- Integrate blockchain for immutable watermark verification.  

---



