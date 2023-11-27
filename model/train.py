import json
from utils import tokenize, stemming
import torch
from torch.nn import nn
from torch.utils.data import Dataset, DataLoader
from model import Chatbot
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

    for pattern in intent['pattern']:
        word_tokens = tokenize(pattern)
        filtered_words = [w for w in word_tokens if not w.lower() in stop_words]
        data.extend(filtered_words)
        xy.append((filtered_words, tag))

print(len(xy), "patterns")
print(len(labels), "labels:", labels)
print(len(filtered_words), "unique stemmed words:", filtered_words)

# # configuration
# num_epochs = 0
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# input_size = 0
# output_size = 0
# hidden_size = 0
# learning_rate = 0.001

# model = Chatbot(input_size, hidden_size, output_size).to(device)
# criterion = nn.CrossEntropyLoss()
# optimizer = torch.optim.Adam(model.parameter(), lr=learning_rate)

# for epoch in range(num_epochs):
#     for (words, labels) in train_loader:
#         words = words.to(device)
#         labels = labels.to(device)

#         output = model(words)
#         loss = criterion(output, labels)
#         optimizer.zero_grad()
#         loss.backward()
#         optimizer.step()

#     if (epoch % 100) == 0:
#         print(f"epoch {epoch+1}/{num_epochs}: loss={loss.item():.4f}")

# print(f"completed {num_epochs}: loss={loss.item():.4f}")

# data = {
# "model_state": model.state_dict(),
# "input_size": input_size,
# "hidden_size": hidden_size,
# "output_size": output_size,
# "all_words": all_words,
# "tags": tags
# }

# save_path = 'trained_model.pth'
# torch.save(data, save_path)

# print(f"Training Complete. Weights saved at {save_path}")

