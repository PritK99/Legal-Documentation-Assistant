# Importing necessary libraries
import random
import json
import torch
import os
import sys

# Appending parent directory to import from local modules
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

# Importing Chatbot model and utility functions from local modules
from .model import Chatbot
from .utils import bag_of_words, tokenize

# Checking device availability (GPU or CPU)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Function to get response from the chatbot model
def get_response(sentence):
    # Load intents from JSON file
    file_path = os.path.join(os.path.dirname(__file__), 'intents.json')
    with open(file_path, 'r') as json_data:
        intents = json.load(json_data)

    # Load the trained model and related data
    save_path = os.path.join(os.path.dirname(__file__), 'trained_model.pth')
    data = torch.load(save_path)

    # Extract model and data parameters
    input_size = data["input_size"]
    hidden_size = data["hidden_size"]
    output_size = data["output_size"]
    words = data['words']
    tags = data['tags']
    model_state = data["model_state"]

    # Instantiate the model and load the trained weights
    model = Chatbot(input_size, hidden_size, output_size).to(device)
    model.load_state_dict(model_state)

    # Set the model to evaluation mode
    model.eval()

    # Tokenize the input sentence
    sentence = tokenize(sentence)
    # Convert input sentence to bag of words representation
    X = bag_of_words(sentence, words)
    # Reshape the input for compatibility with the model
    X = X.reshape(1, X.shape[0])
    # Convert input to PyTorch tensor and move to device
    X = torch.from_numpy(X).to(device)

    # Forward pass through the model
    output = model(X)
    # Get the predicted label
    _, predicted = torch.max(output, dim=1)
    # Get the tag associated with the predicted label
    tag = tags[predicted.item()]

    # Check if the predicted tag has high confidence
    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        # If high confidence, randomly select and return a response from the intents
        for intent in intents['intents']:
            if tag == intent["tag"]:
                return random.choice(intent['responses'])
    else:
        # If low confidence, return a message indicating inability to process the query
        return "I am unable to process the given query. Please try again"