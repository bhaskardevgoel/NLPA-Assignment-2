import pickle
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

MODEL_PATHS = {
    "German": "Data/model/ibm_model2_eng_german.pkl",
    "Hindi": "Data/model/ibm_model2_eng_hindi.pkl",
    "Spanish": "Data/model/ibm_model2_eng_spanish.pkl"
}

def load_ibm_model(filename):
    """Load the trained translation model from a file."""
    with open(filename, "rb") as f:
        model_data = pickle.load(f)
    return model_data["translation_table"]

def translate_text(english_text, translation_table):
    """Translate English text using the translation table."""
    words = english_text.lower().split()
    translated_words = []
    
    for word in words:
        if word in translation_table:
            translations = translation_table[word]
            if translations:
                best_translation = max(translations, key=translations.get)
                translated_words.append(best_translation)
            else:
                translated_words.append(word)
        else:
            translated_words.append(word)
    
    return " ".join(translated_words)

@app.route("/", methods=["GET", "POST"])
def index():
    """Render the web interface for translation."""
    if request.method == "POST":
        english_text = request.form.get("english_text", "").strip()
        target_language = request.form.get("target_language", "German")
        
        if not english_text:
            return jsonify({"error": "Please enter text to translate."})
        
        if target_language not in MODEL_PATHS:
            return jsonify({"error": "Invalid target language selected."})
        
        translation_table = load_ibm_model(MODEL_PATHS[target_language])
        translated_text = translate_text(english_text, translation_table)
        
        return jsonify({"translated_text": translated_text})
    
    return render_template("index.html", languages=MODEL_PATHS.keys())

if __name__ == "__main__":
    app.run(debug=True)
