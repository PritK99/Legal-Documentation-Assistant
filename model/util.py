import nltk
nltk.download('punkt')
from nltk.stem.porter import PorterStemmer

stemmer = PorterStemmer()

def tokenize(sentence):
    return nltk.word_tokenize(sentence)

def stemming(words):
    return [stemmer.stem(word.lower()) for word in words]

if __name__ == "__main__":
    input = "Hello from the custom bot organized"
    tokenized_input = tokenize(input)
    stemmed_input = stemming(tokenized_input)
    print(stemmed_input)
