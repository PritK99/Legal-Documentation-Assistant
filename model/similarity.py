import sys
import os
import json
import random
from sentence_transformers import SentenceTransformer, util

# Appending parent directory to import from local modules
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

tags = ["greeting", "goodbye", "thanks", "Contract Document", "Trademark & Copyright Documents", "Banking/Finance Documents", "Property Documents", "Bonds Documents", "Criminal Documents", "Divorce/Family Documents", "Unknown"]

def get_document(prompt):
    """
    Selects the category by calculating cosine similarity between the prompt and tags using a pre-trained sentence transformer model.

    Args:
    - prompt (str): The prompt text.

    Returns:
    - reply (str): The category of document.
    """

    model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

    file_path = os.path.join(os.path.dirname(__file__), 'intents.json')
    with open(file_path, 'r') as json_data:
        intents = json.load(json_data)

    prompt_embedding = model.encode(prompt, convert_to_tensor=True)

    best_tag = ""
    similarity_score = -1 # -1 is the lowest possible score

    for tag in tags:
        essay_embedding = model.encode(tag, convert_to_tensor=True)
        tag_score = util.pytorch_cos_sim(prompt_embedding, essay_embedding).item()
        
        if tag_score > similarity_score:
            similarity_score = tag_score
            best_tag = tag
    
    reply = ""
    for intent in intents['intents']:
            if best_tag == intent["tag"]:
                reply = random.choice(intent['responses'])

    return reply

# Uncomment the below lines to run the standalone model
# document = get_document("I need to rent a house in banglore")
# print(document)