from flask import Flask, render_template, request, Response, stream_with_context
import requests
import json

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
            response = requests.post(
                'http://localhost:11434/api/generate',
                json={
                    'model': 'llama3.2',
                    'prompt': prompt,
                    'stream': True
                },
                stream=True,
                timeout=60
            )
            
            for line in response.iter_lines():
                if line:
                    chunk = json.loads(line.decode('utf-8'))
                    if 'response' in chunk:
                        yield chunk['response']
                    if chunk.get('done', False):
                        break
        except Exception as e:
            yield f"Error: {str(e)}"
    
    return Response(stream_with_context(stream_response()), mimetype='text/plain')

if __name__ == '__main__':
    app.run(debug=True)