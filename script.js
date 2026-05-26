// Find the elements on the page using their IDs
const productNameInput = document.getElementById("product-name");
const featuresInput = document.getElementById("features");
const generateBtn = document.getElementById("generate-btn");
const outputDiv = document.getElementById("output");
const resultDiv = document.getElementById("result");

// What happens when the user clicks the button
generateBtn.addEventListener("click", function() {
  // Step 1: Read what the user typed
  const productName = productNameInput.value.trim();
  const featuresText = featuresInput.value.trim();

  // Step 2: Check both fields are filled
  if (!productName || !featuresText) {
    alert("Please fill in both the product name and features.");
    return;
  }

  // Step 3: Show "thinking" state
  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";

  // Step 4: Pretend the AI is working (1.5 second delay)
  setTimeout(function() {
    const description = fakeAIResponse(productName, featuresText);

    // Step 5: Show the result
    resultDiv.textContent = description;
    outputDiv.classList.remove("hidden");

    // Step 6: Reset the button
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Description";
  }, 1500);
});

// The fake AI function — returns a pre-built description
function fakeAIResponse(name, features) {
  const featureList = features.split("\n").filter(f => f.trim() !== "");
  const featureSentence = featureList.join(", ");

  return `Introducing the ${name} — designed for people who demand more from their everyday gear.

Built with ${featureSentence}, this product combines smart engineering with thoughtful design. Every detail has been considered to give you a seamless experience from the first use.

Whether you're at home, on the move, or pushing your limits, the ${name} keeps up. It's not just a product — it's an upgrade to your routine.

Order today and feel the difference.

---
SHORT VERSION (social media):
${name}: ${featureSentence}. Built for real life.

SEO KEYWORDS:
${name.toLowerCase()}, ${featureList.map(f => f.toLowerCase().trim()).join(", ")}`;
}