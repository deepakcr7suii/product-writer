from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    product_name = data.get('product_name')
    features = data.get('features')
    
    description = f"Introducing the amazing {product_name}! This product offers {features}. Perfect for anyone looking for quality and value. Order yours today and experience the difference!"
    
    return jsonify({'description': description})

if __name__ == '__main__':
    app.run(debug=True)