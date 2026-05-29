let loadingInterval = null;

document.getElementById('generate-btn').addEventListener('click', async () => {
  const productName = document.getElementById('product-name').value;
  const features = document.getElementById('features').value;
  const btn = document.getElementById('generate-btn');
  const output = document.getElementById('output');
  const result = document.getElementById('result');
  const counter = document.getElementById('counter');

  if (!productName || !features) {
    alert('Please fill in both fields');
    return;
  }

  // Reset and show output area
  result.textContent = '';
  counter.textContent = '';
  output.classList.remove('hidden');

  btn.disabled = true;
  startLoadingMessages(btn);

  try {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_name: productName,
        features: features
      })
    });

    // Handle non-OK responses BEFORE trying to read the stream
    if (!response.ok) {
      if (response.status === 429) {
        result.textContent = "⏳ You're going too fast! Please wait a minute before trying again.";
      } else {
        result.textContent = "Something went wrong. Please try again in a moment.";
      }
      stopLoadingMessages(btn);
      btn.disabled = false;
      return;
    }

    // Read the stream chunk by chunk
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;
      result.textContent = fullText;
    }

    // Update counter with final text
    const wordCount = fullText.trim().split(/\s+/).length;
    const charCount = fullText.length;
    counter.textContent = `${wordCount} words · ${charCount} characters`;

  } catch (error) {
    alert('Something went wrong. Check the terminal for errors.');
    console.error(error);
  }

  stopLoadingMessages(btn);
  btn.disabled = false;
});

function startLoadingMessages(btn) {
  const messages = [
    '⚡ Analyzing your product...',
    '✍️ Crafting the description...',
    '🎨 Adding creative touches...',
    '✨ Polishing the final result...',
    '⏳ Almost there...'
  ];
  
  let index = 0;
  btn.textContent = messages[0];
  
  loadingInterval = setInterval(() => {
    index = (index + 1) % messages.length;
    btn.textContent = messages[index];
  }, 3500);
}

function stopLoadingMessages(btn) {
  if (loadingInterval) {
    clearInterval(loadingInterval);
    loadingInterval = null;
  }
  btn.textContent = 'Generate Description';
}

document.getElementById('copy-btn').addEventListener('click', () => {
  const result = document.getElementById('result').textContent;
  const copyBtn = document.getElementById('copy-btn');

  navigator.clipboard.writeText(result).then(() => {
    copyBtn.textContent = '✓ Copied!';
    copyBtn.classList.add('copied');

    setTimeout(() => {
      copyBtn.textContent = '📋 Copy';
      copyBtn.classList.remove('copied');
    }, 2000);
  });
});