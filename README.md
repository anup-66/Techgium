**🔒 Watermarking Datasets with PrivyML**
📌 Overview
This project was developed as part of Techgium to solve a critical challenge in data sharing: how can dataset owners share their data securely while retaining control and ownership?

We designed a privacy-preserving watermarking & encryption framework that:

Embeds invisible, robust watermarks into datasets (images / CSVs).

Encrypts datasets per-user using a key derived from username + device MAC address, ensuring only authorized users can access them.

Provides a secure ML pipeline (PrivyML) to train models directly on encrypted datasets.

Offers a React + Flask web interface for dataset owners and consumers to upload, visualize, encrypt, download, and use datasets safely.

🚀 In short: Data owners retain full control over how their datasets are accessed and used, protecting against misuse, leaks, and unauthorized training.

🎯 Motivation
Research and enterprise datasets are often shared without control, leading to misuse, unauthorized resale, or even competitor exploitation.

Simple encryption alone doesn’t solve provenance (who owns the dataset?).

Our approach combines cryptographic encryption with watermarking for ownership verification to ensure datasets remain both usable and protected.

🏗️ System Architecture
Frontend (React + Tailwind)

User authentication (Signup/Login with username & MAC binding).

Dataset upload (images, CSV).

Dataset browsing (view raw, tabular, or image previews).

Secure download of encrypted datasets.

Backend (Flask + MySQL)

User management & authentication.

Dataset storage, encryption & watermark embedding.

AES-based per-user encryption (username + MAC derived key).

REST APIs for dataset access & training support.

PrivyML Library (Python)

Transparent encrypted dataset loader for ML/DL.

Works with both CSV and image datasets.

Integrates seamlessly with scikit-learn models and PyTorch models.

Exposes customModal (ML) and customDlModel (DL) wrappers for training on encrypted datasets.

🔑 Core Features
✔️ Watermarking

Invisible watermarks embedded at dataset-level.

Robust against transformations (compression, cropping, scaling, noise).

Payload: includes user identity & ownership metadata.

✔️ Encryption

Per-user dataset encryption using AES (CFB mode).

Keys derived from username + MAC address with PBKDF2-HMAC.

Prevents unauthorized use of datasets even if copied.

✔️ Secure Training (PrivyML)

Train ML/DL models without ever exposing raw data.

Automatic decryption pipeline during model training.

Supports CSV datasets (structured features) & Image datasets.

Compatible with scikit-learn and PyTorch.

✔️ Web Interface

Easy dataset upload, preview, and download.

Automatic encryption & watermarking before distribution.

User-specific encrypted dataset ZIPs for download.

Owners retain full control of who can access what.

🛠️ Tech Stack
Backend: Python, Flask, Flask-JWT, MySQL, Cryptography library
Frontend: React.js, TailwindCSS
ML/DL: PyTorch, scikit-learn, NumPy, scikit-image
Security: AES (CFB), PBKDF2-HMAC, SHA-256, UUID/MAC binding

Project Strusture 

Watermarking Datasets/
│── backend/
│   ├── folder_render.py        # Flask backend APIs
│   ├── decrypt.py              # Encryption/Decryption module
│   ├── encryption_decryption.py
│   ├── library_function.py     # PrivyML core logic
│   ├── server.py
│   └── photo_test/             # Sample datasets
│
│── watermark/                  # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── tailwind.config.js
│
│── data/
│   ├── templates/              # SQL schema, reports
│   ├── csv_data.py
│   └── test_folder.encrypted   # Sample encrypted dataset
│
│── test.py                     # Example training on encrypted dataset
│── simple_cnn_model.pth        # Sample model checkpoint

🔬 Example: Training on Encrypted Dataset

from privyml import customDlModel
import torch.nn as nn
import torch.optim as optim

# Define model
class SimpleNN(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.fc2 = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        return self.fc2(torch.relu(self.fc1(x)))

model = SimpleNN(input_size=10, hidden_size=32, num_classes=3)

# Training
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
