import sys
import os
import json
import random
from sentence_transformers import SentenceTransformer, util

# Appending parent directory to import from local modules
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

tags = ["greeting", "goodbye", "thanks", "Contract Document", "Trademark and Copyright Documents", "Banking and Finance Documents", "Property Documents", "Bonds Documents", "Criminal Documents", "Divorce and Family affairs Documents", "Unknown"]

response = {
    "greeting": "Hi, I am your legal assistant chatbot. How may I help you?", 
    "goodbye": "See you later, thanks for consulting",
    "thanks": "Happy to help! Is there anything else I can assist you with?",
    "Contract Document": "Please refer to the Contract Documents section.", 
    "Trademark and Copyright Documents": "Please refer to the Trademark & Copyright Documents section.", 
    "Banking and Finance Documents": "Please refer to the Banking and Finance Documents section.", 
    "Property Documents": "Please refer to the Property Documents section.", 
    "Bonds Documents": "Please refer to the Bonds Documents section.", 
    "Criminal Documents": "Please refer to the Criminal Documents section.", 
    "Divorce and Family affairs Documents": "Please refer to the Divorce/Family Documents section.", 
    "Unknown": "Sorry I am unable to help you with that request. Please consult a lawyer for complex matters.",
}

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
        # print(f"Tag: {tag} with score {tag_score}")
        
        if tag_score > similarity_score:
            similarity_score = tag_score
            best_tag = tag
    
    # print(f"Best tag: {best_tag} with score {similarity_score}")
    reply = response[best_tag]

    return reply

# Uncomment the below lines to run the standalone model
# reply = get_document("My neighbor stole my car. I want to sue them.")
# print(reply)