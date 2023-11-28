import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader

class ChatDataset(Dataset):

    def __init__(self, X_train, Y_train):
        self.n_samples = len(X_train)
        self.X_data = X_train
        self.Y_data = Y_train

    def __getitem__(self, index):
        return self.X_data[index], self.Y_data[index]

    def __len__(self):
        return self.n_samples
    