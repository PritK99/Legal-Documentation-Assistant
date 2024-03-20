# Importing necessary libraries
import random
import json
import torch

from model import Chatbot  # Importing the Chatbot model
from utils import bag_of_words, tokenize  # Importing utility functions

# Checking device availability (GPU or CPU)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Loading intents from JSON file
with open('intents.json', 'r') as json_data:
    intents = json.load(json_data)

# Load the trained model and related data
save_path = "trained_model.pth"
data = torch.load(save_path)

# Extracting model and data parameters
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

# Define the bot's name
bot_name = "DocBuddy"

# Main loop for chatting
print("Let's chat! (type 'quit' to exit)")
while True:
    sentence = input("You: ")  # Take input from the user
    if sentence == "quit":
        break  # Exit the loop if user types 'quit'

    sentence = tokenize(sentence)  # Tokenize the input sentence
    X = bag_of_words(sentence, words)  # Convert input sentence to bag of words representation
    X = X.reshape(1, X.shape[0])  # Reshape the input for compatibility with the model
    X = torch.from_numpy(X).to(device)  # Convert input to PyTorch tensor and move to device

    output = model(X)  # Forward pass through the model
    _, predicted = torch.max(output, dim=1)  # Get the predicted label

    tag = tags[predicted.item()]  # Get the tag associated with the predicted label

    # Check if the predicted tag has high confidence
    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        # If high confidence, randomly select and print a response from the intents
        for intent in intents['intents']:
            if tag == intent["tag"]:
                print(f"{bot_name}: {random.choice(intent['responses'])}")
    else:
        # If low confidence, inform the user that the bot couldn't process the query
        print(f"{bot_name}: I am unable to process the given query. Please try again")