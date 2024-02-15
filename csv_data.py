# import csv
# import io
# import torch
# from torch.utils.data import DataLoader
#
# # Define a function to parse CSV data and convert it into tensors
# # class C
# def parse_csv_data(csv_data):
#     # Initialize lists to store features and labels
#     features = []
#     labels = []
#
#     # Create a CSV reader from the CSV data
#     csv_reader = csv.reader(io.StringIO(csv_data))
#     print("kookokokokk")
#     print(csv_reader)
#     # Iterate over rows in the CSV data
#     for row in csv_reader:
#         # Assuming the first column contains features and the last column contains labels
#         features.append(list(map(float, row[:-1])))  # Convert features to floats
#         labels.append(int(row[-1]))  # Convert labels to integers
#
#     # Convert lists to tensors
#     features_tensor = torch.tensor(features)
#     labels_tensor = torch.tensor(labels)
#
#     return features_tensor, labels_tensor
# # parse_csv_data("fffffffff,1")
