import pandas as pd
from wordcloud import WordCloud, STOPWORDS 
import matplotlib.pyplot as plt 
import csv

def wordcloudgen():
    cloud_words = '' 
    stopwords = set(STOPWORDS) 
    with open("txt.csv", "r") as f:
        reader = csv.reader(f, delimiter="\t")
        for i, line in enumerate(reader):
            for val in line: 
                val = str(val) 
                tokens = val.split() 
                for i in range(len(tokens)): 
                    tokens[i] = tokens[i].lower() 
                    cloud_words += " ".join(tokens)+" "  

    wordcloud = WordCloud(width = 800, height = 800, background_color ='white', stopwords = stopwords, min_font_size = 10).generate(cloud_words)
    return wordcloud

