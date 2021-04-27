from flask import Flask, jsonify, request 
from flask_cors import CORS
import pandas as pd
from wordcloud import WordCloud, STOPWORDS
# import matplotlib
# matplotlib.use('TkAgg')
# import matplotlib.pyplot as plt 
import csv
from cloudword import wordcloudgen
import io
import base64
from PIL import Image

app = Flask(__name__)
CORS(app)



@app.route('/health')
def helloIndex():
    return 'Hello World from Python Flask!'

def get_response_image():
    pil_img = Image.open('im.png', mode='r') # reads the PIL image
    byte_arr = io.BytesIO()
    pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
    encoded_img = base64.encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64
    return encoded_img

@app.route('/wordcloud', methods =['POST'])
def wordcloud():
    txt =  request.json['text']
    df = pd.DataFrame([x.split(';') for x in txt.split('\n')])
    df.to_csv('txt.csv')
    wordcloud_img = wordcloudgen()
    wordcloud_img.to_file('im.png')
    image = get_response_image()
    response =  { 'Status' : 'Success', 'ImageBytes': image} 
    return jsonify(response)

app.run(host='0.0.0.0', port=8050)