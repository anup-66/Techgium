# # import csv
# # import io
# # import torch
# # from torch.utils.data import DataLoader
# #
# # # Define a function to parse CSV data and convert it into tensors
# # # class C
# # def parse_csv_data(csv_data):
# #     # Initialize lists to store features and labels
# #     features = []
# #     labels = []
# #
# #     # Create a CSV reader from the CSV data
# #     csv_reader = csv.reader(io.StringIO(csv_data))
# #     print("kookokokokk")
# #     print(csv_reader)
# #     # Iterate over rows in the CSV data
# #     for row in csv_reader:
# #         # Assuming the first column contains features and the last column contains labels
# #         features.append(list(map(float, row[:-1])))  # Convert features to floats
# #         labels.append(int(row[-1]))  # Convert labels to integers
# #
# #     # Convert lists to tensors
# #     features_tensor = torch.tensor(features)
# #     labels_tensor = torch.tensor(labels)
# #
# #     return features_tensor, labels_tensor
# # # parse_csv_data("fffffffff,1")
# import torch
# import torch.nn as nn
# import torch.optim as optim
# from torch.utils.data import DataLoader, TensorDataset
# import numpy as np
#
# # Define the linear model
# class LinearModel(nn.Module):
#     def __init__(self, input_size, num_classes):
#         super(LinearModel, self).__init__()
#         self.fc = nn.Linear(input_size, num_classes)
#
#     def forward(self, x):
#         x = self.fc(x)
#         return x
#
# # Prepare the data
# data = np.array([
#     [1, 2, 3],
#     [5, 6, 7],
#     [9, 87, 5]
# ], dtype=np.float32)
#
# X = data  # Features
# y = [0,1,2]   # Labels
# print(np.shape(X))
# print(np.shape(y))
# # Convert data to PyTorch tensors
# X_tensor = torch.tensor(X)
# y_tensor = torch.tensor(y, dtype=torch.long)  # Assuming labels are integers
#
# # Define dataset and data loader
# dataset = TensorDataset(X_tensor, y_tensor)
# data_loader = DataLoader(dataset, batch_size=1, shuffle=True)
#
# # Define model, loss function, and optimizer
# input_size = X.shape[1]
# num_classes = len(np.unique(y))
# model = LinearModel(input_size, num_classes)
# criterion = nn.CrossEntropyLoss()
# optimizer = optim.SGD(model.parameters(), lr=0.01)
#
# # Training loop
# num_epochs = 1
# for epoch in range(num_epochs):
#     running_loss = 0.0
#     i = 0
#     for inputs, labels in data_loader:
#         print(i)
#         i+=1
#         optimizer.zero_grad()
#         outputs = model(inputs)
#         print(np.shape(outputs))
#         print(np.shape(labels))
#         loss = criterion(outputs, labels)
#         loss.backward()
#         optimizer.step()
#         running_loss += loss.item()
#     print(f"Epoch {epoch + 1}, Loss: {running_loss / len(data_loader)}")
#
# # Testing the trained model
# with torch.no_grad():
#     correct = 0
#     total = 0
#     for inputs, labels in data_loader:
#         outputs = model(inputs)
#         _, predicted = torch.max(outputs.data, 1)
#         total += labels.size(0)
#         correct += (predicted == labels).sum().item()
#
# print(f"Accuracy: {100 * correct / total}%")

from sklearn.base import clone
username = 'Anup_66'
folder_path = 'E:/techgium_work/test_folder'

from privyml import customModal

from sklearn.svm import SVC

from sklearn.tree import DecisionTreeClassifier

from sklearn.linear_model import SGDClassifier

from sklearn.ensemble import AdaBoostClassifier
test_folder = folder_path
model = customModal(clone(SVC()),folder_path,"csv",username = username,batch_size=5)

model.train_model()

pred = model.predict([[5,6,7]])
print(pred)

