import random
import json
import torch
import os
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

from .model import Chatbot
from .utils import bag_of_words, tokenize

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

def get_response(sentence):

    file_path = os.path.join(os.path.dirname(__file__), 'intents.json')
    with open(file_path, 'r') as json_data:
        intents = json.load(json_data)

    save_path = os.path.join(os.path.dirname(__file__), 'trained_model.pth')
    data = torch.load(save_path)

    input_size = data["input_size"]
    hidden_size = data["hidden_size"]
    output_size = data["output_size"]
    words = data['words']
    tags = data['tags']
    model_state = data["model_state"]
    model = Chatbot(input_size, hidden_size, output_size).to(device)
    model.load_state_dict(model_state)

    model.eval()

    sentence = tokenize(sentence)
    X = bag_of_words(sentence, words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                return random.choice(intent['responses'])
    else:
        return "I am unable to process the given query. Please try again"