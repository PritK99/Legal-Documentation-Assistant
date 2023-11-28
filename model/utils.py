import numpy as np
import nltk
nltk.download('punkt')
from nltk.tokenize import RegexpTokenizer
from nltk.stem.porter import PorterStemmer

stemmer = PorterStemmer()

def tokenize(sentence):
    tokenizer = RegexpTokenizer(r'\w+')
    return tokenizer.tokenize(sentence)

def stemming(words):
    return [stemmer.stem(word.lower()) for word in words]

def bag_of_words(input_words, data):
    input_words = stemming(input_words)
    bag = np.zeros(len(data), dtype=np.float32)
    for input_word in input_words:
        for idx, all_word in enumerate(data):
            if (input_word == all_word):
                bag[idx]=1
                break
    
    return bag