from flask import Flask, render_template, request, jsonify
import requests

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
    
    try:
        response = requests.post(
            'http://localhost:11434/api/generate',
            json={
                'model': 'llama3.2',
                'prompt': prompt,
                'stream': False
            },
            timeout=60
        )
        description = response.json().get('response', 'Error generating description')
    except Exception as e:
        description = f"Error: {str(e)}"
    
    return jsonify({'description': description})

if __name__ == '__main__':
    app.run(debug=True)