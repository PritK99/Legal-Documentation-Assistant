# Importing necessary libraries
import numpy as np
import json
import torch
import nltk
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader

# Download NLTK stopwords
nltk.download('stopwords')
from nltk.corpus import stopwords

# Import local modules
from dataset import ChatDataset
from utils import bag_of_words, tokenize, stemming
from model import Chatbot

# Set of English stopwords
stop_words = set(stopwords.words('english'))

# Load intents data from JSON file
with open('intents.json', 'r') as f:
    intents = json.load(f)

# Initialize empty lists for words, tags, and pairs
words = []
tags = []
pairs = []

# Extract unique tags and words from intents, tokenize words, and create pairs
for intent in intents['intents']:
    tag = intent['tag']
    tags.append(tag)
    for pattern in intent['patterns']:
        word = tokenize(pattern)
        # Remove stopwords and convert words to lowercase
        filtered_words = [w for w in word if not w.lower() in stop_words]
        words.extend(filtered_words)
        # Append pairs of (filtered_words, tag)
        pairs.append((filtered_words, tag))

# Stem the words to reduce them to their root form
words = stemming(words)
# Remove duplicates and sort the words and tags
words = sorted(set(words))
tags = sorted(set(tags))

# Print information about the training data
print(len(pairs), "pairs of training data")
print(len(tags), "unique tags:", tags)
print(len(words), "unique preprocessed words:", words)

# Create training data
X_train = []
Y_train = []
for (input, tag) in pairs:
    # Convert input words into bag-of-words representation
    bag = bag_of_words(input, words)
    X_train.append(bag)
    # Convert tags into numerical labels
    label = tags.index(tag)
    Y_train.append(label)

# Convert training data to numpy arrays
X_train = np.array(X_train)
Y_train = np.array(Y_train)

# Define Hyperparameters
num_epochs = 1000
batch_size = 4
learning_rate = 0.001
input_size = len(words)
hidden_size = [128, 64]
output_size = len(tags)
print(input_size, output_size)

# Create dataset and data loader for training
dataset = ChatDataset(X_train, Y_train)
train_loader = DataLoader(dataset=dataset,
                          batch_size=batch_size,
                          shuffle=True,
                          num_workers=0)

# Check for device availability (GPU or CPU)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Instantiate the Chatbot model and move it to the appropriate device
model = Chatbot(input_size, hidden_size, output_size).to(device)

# Define loss function and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

# Training loop
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

# Print final loss
print(f'Final loss: {loss.item():.4f}')

# Prepare data to be saved
data = {
    "model_state": model.state_dict(),
    "input_size": input_size,
    "hidden_size": hidden_size,
    "output_size": output_size,
    "words": words,
    "tags": tags
}

# Save the trained model as a checkpoint
save_path = "trained_model.pth"
torch.save(data, save_path)

# Print completion message
print(f'Training complete. Model saved to {save_path}')