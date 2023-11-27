import json
import numpy as np
from utils import tokenize, stemming, bag_of_words
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from model import Chatbot
from dataset import ChatDataset
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords

with open("intents.json", 'r') as f:
    intents = json.load(f)

data = []
labels = []
xy = []

stop_words = set(stopwords.words('english'))

for intent in intents['intents']:
    tag = intent['tag']
    labels.append(tag)

    for pattern in intent['patterns']:
        # print(pattern)
        word_tokens = tokenize(pattern)
        word_tokens = stemming(word_tokens)
        filtered_words = [w for w in word_tokens if not w.lower() in stop_words]
        print(filtered_words)
        data.extend(filtered_words)
        xy.append((filtered_words, tag))

data = sorted(set(data))
labels = sorted(set(labels))

print(len(xy), "pairs")
print(len(labels), "labels:", labels)
print(len(data), "unique words:", data)

X_train = []
Y_train = []

for (filtered_words, tag) in xy:
    bag = bag_of_words(filtered_words, data)
    X_train.append(bag)
    label = labels.index(tag)
    Y_train.append(label)

X_train = np.array(X_train)
Y_train = np.array(Y_train)

# configuration
num_epochs = 5000
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
input_size = len(X_train[0])
output_size = len(labels)
hidden_size = [256, 128]
learning_rate = 0.001
batch_size = 8

dataset = ChatDataset(X_train, Y_train)
train_loader = DataLoader(dataset=dataset,
                          batch_size=batch_size,
                          shuffle=True,
                          num_workers=0)

model = Chatbot(input_size, hidden_size, output_size).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

for epoch in range(num_epochs):
    for (words, labels) in train_loader:
        words = words.to(device)
        labels = labels.to(device)
        outputs = model(words.float())
        loss = criterion(outputs, labels.type(torch.LongTensor))
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    if (epoch % 100) == 0:
        print(f"epoch {epoch+1}/{num_epochs}: loss={loss.item()}")

print(f"completed {num_epochs}: loss={loss.item()}")

data = {
"model_state": model.state_dict(),
"input_size": input_size,
"hidden_size": hidden_size,
"output_size": output_size,
"data": data,
"labels": labels
}

save_path = 'trained_model.pth'
torch.save(data, save_path)

print(f"Training Complete. Weights saved at {save_path}")