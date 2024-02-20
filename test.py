import numpy as np
# from library_function import customModal,customDlModel
from sklearn.base import clone
from skimage.io import imread
import torch
from privyml import customModal,customDlModel
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
        print(x)
        # Flatten the input if needed
        x = x.view(x.size(0), -1)
        # x = torch.cat([t.view(-1) for t in x])
        # x = torch.cat([t.view for t in x], dim=0)
        # x = x.flatten()
        # Pass through the first fully connected layer with ReLU activation
        x = F.relu(self.fc1(x))
        # Pass through the second fully connected layer with ReLU activation
        x = F.relu(self.fc2(x))
        # Pass through the third fully connected layer with ReLU activation
        x = F.relu(self.fc3(x))
        # Pass through the output layer (fully connected) without activation
        x = self.fc4(x)
        print(np.shape(x),"ttttt")
        return x


class SimpleCNN(nn.Module):
    def __init__(self, num_classes):
        super(SimpleCNN, self).__init__()
        # Convolutional layers
        self.conv1 = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3, stride=1, padding=1)
        self.conv2 = nn.Conv2d(in_channels=16, out_channels=32, kernel_size=3, stride=1, padding=1)
        self.conv3 = nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3, stride=1, padding=1)
        # Max pooling layer
        self.pool = nn.MaxPool2d(kernel_size=2, stride=2, padding=0)
        # Fully connected layers
        self.fc1 = nn.Linear(64 * 32 * 32, 512)  # Assuming input image size is 224x224
        self.fc2 = nn.Linear(512, num_classes)

    def forward(self, x):
        # Convolutional layers with ReLU activation and max pooling
        x = F.relu(self.conv1(x))
        x = self.pool(x)
        x = F.relu(self.conv2(x))
        x = self.pool(x)
        x = F.relu(self.conv3(x))
        x = self.pool(x)
        print(np.shape(x))
        # Flatten the output of the convolutional layers
        # x = x.view(-1, 64 * 32 * 32)  # Adjust this based on the input image size
        x = x.reshape(-1, 64 * 32 * 32)
        # Fully connected layers with ReLU activation
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Define the model parameters
input_size = 3
hidden_size1 = 256
hidden_size2 = 128
hidden_size3 = 64
num_classes = 3  # Number of classes in MNIST dataset

# Initialize the model
model_dl = SimpleNN(input_size, hidden_size1, hidden_size2, hidden_size3, num_classes)
# model_dl = SimpleCNN(6)
# Define the loss function
criterion = nn.CrossEntropyLoss()

# Define the optimizer
optimizer = optim.SGD(model_dl.parameters(), lr=0.01)

from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import SGDClassifier
from sklearn.ensemble import AdaBoostClassifier
# model = customModal(clone(AdaBoostClassifier(base_estimator=DecisionTreeClassifier(), n_estimators=2, learning_rate=1.0)),folder_path,"image",username = username,batch_size=16)

#This is the ml model part that has been completed .Danger dont touch
# try:
# model1 = model.train_model()
# pred = model.predict([[5,6,7]])
# print(pred)
# except ValueError as e:
#     print(e)

# prediction = model.predict(imread("photo_test/images_dataset/1.jpeg",'rb'))
# print(prediction)
model = customDlModel(model_dl,criterion,optimizer,5,folder_path,folder_path,"csv",username,1)
model.train_model()


