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

  btn.disabled = true;
  btn.textContent = 'Generating...';

  try {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_name: productName,
        features: features
      })
    });

    const data = await response.json();
    result.textContent = data.description;
    output.classList.remove('hidden');

    const wordCount = data.description.trim().split(/\s+/).length;
    const charCount = data.description.length;
    counter.textContent = `${wordCount} words · ${charCount} characters`;

  } catch (error) {
    alert('Something went wrong. Check the terminal for errors.');
    console.error(error);
  }

  btn.disabled = false;
  btn.textContent = 'Generate Description';
});

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