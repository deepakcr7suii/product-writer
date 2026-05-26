document.getElementById('generate-btn').addEventListener('click', async () => {
  const productName = document.getElementById('product-name').value;
  const features = document.getElementById('features').value;
  const btn = document.getElementById('generate-btn');
  const output = document.getElementById('output');
  const result = document.getElementById('result');

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
  } catch (error) {
    alert('Something went wrong. Check the terminal for errors.');
    console.error(error);
  }

  btn.disabled = false;
  btn.textContent = 'Generate Description';
});