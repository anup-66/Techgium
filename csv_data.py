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
#
import os

from PIL import Image


def resize_image(input_image_path, output_image_path, size):
    """
    Resize the input image to the specified size.

    Args:
        input_image_path (str): The file path of the input image.
        output_image_path (str): The file path where the resized image will be saved.
        size (tuple): A tuple specifying the desired width and height of the resized image.
    """
    with Image.open(input_image_path) as image:
        resized_image = image.resize(size)
        resized_image.save(output_image_path)

size = (256, 256)  # Desired width and height
output_folder = "test_folder"
folder_path = "photo_test"
for img in os.listdir(folder_path):
    file_path = os.path.join(folder_path,img)
    if os.path.isfile(file_path):
        resize_image(folder_path,output_folder,size)
# resize_image(input_image_path, output_image_path, target_size)
