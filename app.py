from flask import Flask, request, jsonify, render_template
import ollama  # Utilisation d'un modèle IA local via Ollama

app = Flask(__name__)

# Charger le modèle une seule fois pour éviter le rechargement à chaque requête
MODEL_NAME = "mistral"  # Change par "gemma" si besoin

def ask_ollama(prompt):
    response = ollama.chat(model=MODEL_NAME, messages=[{"role": "user", "content": prompt}])
    return response["message"]["content"]

# Route pour afficher la page Web du chatbot
@app.route('/')
def home():
    return render_template('index.html')

# Route API pour gérer les requêtes du chatbot
@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    if not user_input:
        return jsonify({"error": "Message vide"}), 400
    
    # Obtenir la réponse de l'IA
    ai_response = ask_ollama(user_input)
    
    return jsonify({"response": ai_response})


if __name__ == '__main__':
    app.run(debug=True, threaded=True)  # Activation du mode multi-thread pour plus de rapidité
