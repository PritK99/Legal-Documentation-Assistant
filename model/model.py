# Importing necessary libraries
import torch
import torch.nn as nn

# Defining the Chatbot model class
class Chatbot(nn.Module):
    """
    Chatbot model class representing a Bag of Words (BoW) model with a neural network architecture.

    Args:
        input_size (int): The size of the input vector.
        hidden_size (list): A list containing sizes of hidden layers.
        output_size (int): The size of the output vector.

    Attributes:
        model (nn.Sequential): Neural network model composed of linear layers and ReLU activation functions.

    Methods:
        forward(x): Forward pass through the neural network model.
    """

    def __init__(self, input_size, hidden_size, output_size):
        """
        Initialize the Chatbot model with specified input, hidden, and output sizes.

        Args:
            input_size (int): The size of the input vector.
            hidden_size (list): A list containing sizes of hidden layers.
            output_size (int): The size of the output vector.
        """
        super().__init__()
        # Define the neural network architecture using nn.Sequential
        self.model = nn.Sequential(
            nn.Linear(input_size, hidden_size[0]),  # Linear layer 1
            nn.ReLU(),  # ReLU activation function 1
            nn.Linear(hidden_size[0], hidden_size[1]),  # Linear layer 2
            nn.ReLU(),  # ReLU activation function 2
            nn.Linear(hidden_size[1], output_size),  # Output layer
        )

    def forward(self, x):
        """
        Perform a forward pass through the neural network model.

        Args:
            x (torch.Tensor): Input tensor.

        Returns:
            torch.Tensor: Output tensor.
        """
        return self.model(x)