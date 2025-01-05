from flask import Flask, render_template, request
from googletrans import Translator

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def translate_text():
    result = ""
    if request.method == "POST":
        user_text = request.form.get("user_text")
        target_language = request.form.get("target_language")

        # Create translator object
        translator = Translator()
        
        try:
            # Translate the text
            translation = translator.translate(user_text, dest=target_language.lower())
            result = f"Translated Text: {translation.text}"
        except Exception as e:
            result = "Error: Unable to translate. Please check the input and try again."

    return render_template("index.html", result=result)

if __name__ == "__main__":
    app.run(debug=True)
