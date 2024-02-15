import numpy as np
from library_function import customModal
from sklearn.base import clone
from skimage.io import imread
# from skimage import io
import io
from skimage.transform import resize
username = 'Anup_66'
folder_path = 'test_folder'

from sklearn.svm import SVC

from sklearn.linear_model import SGDClassifier
model = customModal(clone(SVC()),folder_path,"image",username = username,batch_size=16)
model1 = model.train_model()
prediction = model.predict(imread("photo_test/1.jpeg",'rb'))

print(prediction)