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

def bag_of_words(input_words, all_words):
    bag = np.zeros(len(all_words))
    for input_word in input_words:
        for idx, all_word in enumerate(all_words):
            if (input_word == all_word):
                bag[idx]=1
                break
    
    return bag

print(bag_of_words(["hello", "how", "are", "you"],["hi", "hello", "I", "you", "bye", "thank", "cool"]))