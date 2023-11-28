import torch
import torch.nn as nn

class Chatbot(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.model = nn.Sequential(
            nn.Linear(input_size, hidden_size[0]),
            nn.BatchNorm1d(hidden_size[0]),
            nn.ReLU(),
            nn.Linear(hidden_size[0], hidden_size[1]),
            nn.BatchNorm1d(hidden_size[1]),
            nn.ReLU(),
            nn.Linear(hidden_size[1], output_size),
        )

    def forward(self, x):
        return self.model(x)