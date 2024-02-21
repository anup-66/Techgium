import base64
import os
"""https://tutorial101.blogspot.com/2023/04/react-and-python-flask-login-register.html"""
from flask_cors import CORS

from flask import Flask, render_template, jsonify, request, send_file, send_from_directory
import csv

app = Flask(__name__)
CORS(app)

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
    # with open('/test_folder/test_csv1.csv', 'r') as file:
    #     csv_reader = csv.reader(file)
    #     for row in csv_reader:
    #         csv_data.append(row)
    file = request.args.get("file")
    with open(f"E:/techgium_work/Watermarking Datasets/backend/photo_test/Text_dataset/{file}") as files:
        csv_data.append(files.read())
    return jsonify(csv_data)

@app.route("/get_image")
def get_image():
    image_path = "E:/techgium_work/Watermarking Datasets/backend/photo_test/" + request.args.get("folder") + "/" + request.args.get("data") + "/" + request.args.get("image")
    print(image_path)
    return send_file(image_path,mimetype = "image/jpg/jpeg")
@app.route("/image_files")
def get_images():
    folder  = request.args.get('folder')
    image  = request.args.get('data')
    images = []
    for image in os.listdir(f"E:/techgium_work/Watermarking Datasets/backend/photo_test/{folder}/{image}"):
        images.append(image)

    return jsonify(images)
@app.route("/folders")
def get_folders_list():
    folders = [os.listdir("E:/techgium_work/Watermarking Datasets/backend/templates")]
    return jsonify(folders)
if __name__ == '__main__':
    app.run(debug=True)