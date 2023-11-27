import json
from utils import tokenize, stemming


with open("intents.json", 'r') as f:
    intents = json.load(f)

data = []
labels = []
xy = []

for intent in intents['intents']:
    tag = intent['tag']
    labels.append(tag)

    for pattern in intent['pattern']:
        w = tokenize(pattern)
        data.extend(w)
        xy.append((w, tag))
