import json
import torch
import random

from utils import tokenize, bag_of_words, stemming
from model import Chatbot

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('intents.json', 'r') as json_data:
    intents = json.load(json_data)

save_path = 'trained_model.pth'
pretrained = torch.load(save_path)

input_size = pretrained["input_size"]
hidden_size = pretrained["hidden_size"]
output_size = pretrained["output_size"]
data = pretrained["data"]
labels = pretrained["labels"]
model_state = pretrained["model_state"]

model = Chatbot(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

print("Legal Documentation Chatbot simulation. Enter q to quit")

while (True):
    sentence = input("User: ")
    if (sentence == "q"):
        break

    sentence = tokenize(sentence)
    word_tokens = stemming(sentence)
    X = bag_of_words(word_tokens, data)

    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X.float())
    _, predicted = torch.max(output, dim=1)
    label = intents['intents'][predicted.item()]["tag"]
    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if label == intent["tag"]:
                print(f"Legal Assistant: {random.choice(intent['responses'])}")
    else:
        print(f"Legal Assistant: I do not understand...")
