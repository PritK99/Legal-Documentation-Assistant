import numpy as np
import json
import torch
import nltk
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
nltk.download('stopwords')
from nltk.corpus import stopwords

from dataset import ChatDataset
from utils import bag_of_words, tokenize, stemming
from model import Chatbot

stop_words = set(stopwords.words('english'))

with open('intents.json', 'r') as f:
    intents = json.load(f)

words = []
tags = []
pairs = []

for intent in intents['intents']:
    tag = intent['tag']
    tags.append(tag)
    for pattern in intent['patterns']:
        word = tokenize(pattern)
        filtered_words = [w for w in word if not w.lower() in stop_words]
        words.extend(filtered_words)
        pairs.append((filtered_words, tag))


words = stemming(words)
words = sorted(set(words))
tags = sorted(set(tags))

print(len(pairs), "pairs of training data")
print(len(tags), "unique tags:", tags)
print(len(words), "unique preprocessed words:", words)

X_train = []
Y_train = []
for (input, tag) in pairs:
    bag = bag_of_words(input, words)
    X_train.append(bag)
    label = tags.index(tag)
    Y_train.append(label)

X_train = np.array(X_train)
Y_train = np.array(Y_train)

num_epochs = 1000
batch_size = 4
learning_rate = 0.001
input_size = len(words)
hidden_size = [128, 64]
output_size = len(tags)
print(input_size, output_size)

dataset = ChatDataset(X_train, Y_train)
train_loader = DataLoader(dataset=dataset,
                          batch_size=batch_size,
                          shuffle=True,
                          num_workers=0)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

model = Chatbot(input_size, hidden_size, output_size).to(device)

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

for epoch in range(num_epochs):
    for (x, labels) in train_loader:
        x = x.to(device)
        labels = labels.to(dtype=torch.long).to(device)
        
        outputs = model(x)
        loss = criterion(outputs, labels)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
    if (epoch+1) % 100 == 0:
        print (f'Completing epoch [{epoch}/{num_epochs}], Loss: {loss.item():.4f}')


print(f'Final loss: {loss.item():.4f}')

data = {
"model_state": model.state_dict(),
"input_size": input_size,
"hidden_size": hidden_size,
"output_size": output_size,
"words": words,
"tags": tags
}

save_path = "trained_model.pth"
torch.save(data, save_path)

print(f'Training complete. file saved to {save_path}')