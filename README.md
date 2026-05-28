# product-writer

An AI-powered tool that generates compelling, ready-to-use product descriptions for online sellers. Enter a product name and a few key features, and it streams back persuasive marketing copy in seconds — powered by Google's Gemini API.

![Demo](demo.png)

## Features

- **AI-generated descriptions** — turns a product name and rough feature list into polished, ~150-word marketing copy
- **Real-time streaming** — the description appears word by word as it's generated, instead of waiting for the full result
- **Benefit-focused writing** — the model is prompted to sell benefits, not just list specs
- **Clean, simple interface** — type and generate, no clutter
- **Free to run** — uses Gemini's free API tier, no payment required

## Tech Stack

- **Backend:** Python, Flask
- **AI model:** Google Gemini (`gemini-2.5-flash`) via the `google-genai` SDK
- **Frontend:** HTML, CSS, vanilla JavaScript
- **Streaming:** Flask streamed responses (chunked HTTP) read live by the frontend

## How It Works

1. The user enters a product name and key features in the browser.
2. The frontend sends them to the Flask `/generate` endpoint.
3. Flask builds a prompt and calls the Gemini API in streaming mode.
4. Each chunk of generated text is sent to the browser as it arrives, so the description types itself out in real time.

## Setup

**1. Clone the repository**

```
git clone https://github.com/deepakcr7suii/product-writer.git
cd product-writer
```

**2. Install dependencies**

```
pip install -r requirements.txt
```

**3. Add your Gemini API key**

Create a free API key at [Google AI Studio](https://aistudio.google.com) (no credit card required). Then create a file named `.env` in the project root:

```
GEMINI_API_KEY=your_key_here
```

**4. Run the app**

```
python app.py
```

Open `http://127.0.0.1:5000` in your browser.

## Usage

Enter a product name and its key features, then click **Generate**. A persuasive product description streams into the result area. Use the copy button to grab it.

## License

Licensed under the terms of the LICENSE file in this repository.