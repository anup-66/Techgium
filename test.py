import numpy as np
from library_function import customModal
from sklearn.base import clone

username = 'Anup_66'
folder_path = 'test_folder'

from sklearn.svm import SVC

from sklearn.linear_model import SGDClassifier
model = customModal(clone(SVC()),folder_path,"csv",username = username,batch_size=16)
model1 = model.train_model()
prediction = model.predict([[1,2,3],[4,5,6]])

print(prediction)