# Importing necessary libraries
import numpy as np
import nltk

# Downloading necessary NLTK resources
nltk.download('punkt')
from nltk.tokenize import RegexpTokenizer
from nltk.stem.porter import PorterStemmer

# Initialize the Porter Stemmer
stemmer = PorterStemmer()

def tokenize(sentence):
    """
    Tokenize the input sentence into individual words.

    Args:
        sentence (str): Input sentence to be tokenized.

    Returns:
        list: List of tokens (words) extracted from the input sentence.
    """
    tokenizer = RegexpTokenizer(r'\w+')  # Regular expression based tokenizer to extract words
    return tokenizer.tokenize(sentence)

def stemming(words):
    """
    Perform stemming on a list of words.

    Args:
        words (list): List of words to be stemmed.

    Returns:
        list: List of stemmed words.
    """
    return [stemmer.stem(word.lower()) for word in words]  # Stem each word in the list and convert to lowercase

def bag_of_words(input_words, data):
    """
    Convert input words into a bag-of-words representation based on a given dataset.

    Args:
        input_words (list): List of input words to be converted into bag-of-words representation.
        data (list): List of all words in the dataset.

    Returns:
        numpy.ndarray: Bag-of-words representation of the input words.
    """
    input_words = stemming(input_words)  # Perform stemming on the input words
    bag = np.zeros(len(data), dtype=np.float32)  # Initialize bag-of-words array with zeros
    for input_word in input_words:
        for idx, all_word in enumerate(data):
            if input_word == all_word:
                bag[idx] = 1  # Set the corresponding index to 1 if the word is present in the input
                break

    return bag