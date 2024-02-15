import numpy as np
from library_function import customModal,customDlModel
from sklearn.base import clone
from skimage.io import imread
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
import io
from skimage.transform import resize
username = 'Anup_66'
folder_path = 'test_folder'
class SimpleNN(nn.Module):
    def __init__(self, input_size, hidden_size1, hidden_size2, hidden_size3, num_classes):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size1)
        self.fc2 = nn.Linear(hidden_size1, hidden_size2)
        self.fc3 = nn.Linear(hidden_size2, hidden_size3)
        self.fc4 = nn.Linear(hidden_size3, num_classes)
        print(self.fc1.weight.dtype)

    def forward(self, x):
        # Flatten the input if needed
        x = x.view(x.size(0), -1)
        # Pass through the first fully connected layer with ReLU activation
        x = F.relu(self.fc1(x))
        # Pass through the second fully connected layer with ReLU activation
        x = F.relu(self.fc2(x))
        # Pass through the third fully connected layer with ReLU activation
        x = F.relu(self.fc3(x))
        # Pass through the output layer (fully connected) without activation
        x = self.fc4(x)
        return x


# Define the model parameters
input_size = 196608
hidden_size1 = 256
hidden_size2 = 128
hidden_size3 = 64
num_classes = 10  # Number of classes in MNIST dataset

# Initialize the model
model_dl = SimpleNN(input_size, hidden_size1, hidden_size2, hidden_size3, num_classes)

# Define the loss function
criterion = nn.CrossEntropyLoss()

# Define the optimizer
optimizer = optim.SGD(model_dl.parameters(), lr=0.01)

from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import SGDClassifier
from sklearn.ensemble import AdaBoostClassifier
model = customModal(clone(AdaBoostClassifier(base_estimator=DecisionTreeClassifier(), n_estimators=2, learning_rate=1.0)),folder_path,"csv",username = username,batch_size=16)

#This is the ml model part that has been completed .Danger dont touch
# try:
#     model1 = model.train_model()
#     pred = model.predict([[5,6,7]])
# except ValueError as e:
#     print(e)

# prediction = model.predict(imread("photo_test/1.jpeg",'rb'))
model = customDlModel(model_dl,criterion,optimizer,5,folder_path,folder_path,"image",username,10)
model.train()

