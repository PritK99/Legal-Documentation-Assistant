## Standalone Model

### Steps to Train

* Create your ```intents.json``` file with the following structure:
```
{
    "intents": [
        {
            "tag": "greeting",
            "patterns": [
                "Hi",
                "Hey",
                "How are you",
                "Hello"
            ],
            "responses": [
                "Hi, I am you legal assistant chatbot. How may I help you?",
                "Hello, how can I help you?",
                "Hey there, what can I do for you?"
            ]
        },
        {
            // Add more intents here
        }
    ]
}
```

* Run the ```train.py``` file to train the model.

```
python train.py
```

* Once the training is completed, a ```trained_model.pth``` file will be created. This file contains the weights learned during training process. The hyperparameters for training can be changed in the ```train.py``` file. The architecture of model is defined in the ```model.py``` file.

* To chat with the bot, run the ```chat.py``` file.

```
python chat.py
```