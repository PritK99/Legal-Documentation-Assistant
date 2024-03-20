# Importing necessary libraries
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader

# Define the custom dataset class
class ChatDataset(Dataset):
    """
    Custom dataset class for handling chatbot training data.

    Args:
        X_train (list): List of input data.
        Y_train (list): List of target labels.

    Attributes:
        n_samples (int): Number of samples in the dataset.
        X_data (list): Input data.
        Y_data (list): Target labels.

    Methods:
        __getitem__(index): Retrieve a sample (input, label) from the dataset at the specified index.
        __len__(): Get the total number of samples in the dataset.
    """

    def __init__(self, X_train, Y_train):
        """
        Initialize the ChatDataset with input data and target labels.

        Args:
            X_train (list): List of input data.
            Y_train (list): List of target labels.
        """
        self.n_samples = len(X_train)  # Number of samples in the dataset
        self.X_data = X_train  # Input data
        self.Y_data = Y_train  # Target labels

    def __getitem__(self, index):
        """
        Retrieve a sample (input, label) from the dataset at the specified index.

        Args:
            index (int): Index of the sample to retrieve.

        Returns:
            tuple: A tuple containing the input data and its corresponding target label.
        """
        return self.X_data[index], self.Y_data[index]

    def __len__(self):
        """
        Get the total number of samples in the dataset.

        Returns:
            int: Number of samples in the dataset.
        """
        return self.n_samples