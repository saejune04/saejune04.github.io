const descriptors = ["Software Engineer", "Hiker", "Pianist", "Builder", "Coffee addict"];
const target = document.getElementById("type-target");

let index = 0;
let charIndex = 0;
let typing = true;

function updateText() {
  const currentWord = descriptors[index];
  if (typing) {
    charIndex++;
    target.textContent = charIndex > 0 ? currentWord.substring(0, charIndex) : '\u00A0';
    if (charIndex === currentWord.length) {
      typing = false;
      setTimeout(updateText, 1000); // Pause before deleting
    } else {
      setTimeout(updateText, 75);
    }
  } else {
    charIndex--;
    target.textContent = currentWord.substring(0, charIndex);
    if (charIndex === 0) {
      typing = true;
      index = (index + 1) % descriptors.length;
      setTimeout(updateText, 250); // Brief pause before typing next word
    } else {
      setTimeout(updateText, 50);
    }
  }
}

window.addEventListener("DOMContentLoaded", () => updateText());
