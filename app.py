from flask import Flask, render_template, request, Response, stream_with_context
from google import genai
from dotenv import load_dotenv
import os

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    product_name = data.get('product_name')
    features = data.get('features')

    prompt = f"""Write a compelling 150-word product description for an online seller.

Product: {product_name}
Key Features:
{features}

Write in a persuasive, professional tone. Highlight benefits, not just features. Make it sound exciting and trustworthy. Don't use headings or bullet points — write flowing prose."""

    def stream_response():
        try:
            response = client.models.generate_content_stream(
                model="gemini-2.5-flash",
                contents=prompt
            )
            for chunk in response:
                if chunk.text:
                    yield chunk.text
        except Exception as e:
            yield f"Error: {str(e)}"

    return Response(stream_with_context(stream_response()), mimetype='text/plain')

if __name__ == '__main__':
    app.run(debug=True)