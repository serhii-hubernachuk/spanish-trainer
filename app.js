let sentences = [];
let currentIndex = 0;

// Function to load JSON from a local file
const loadJsonFromFile = (file) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      sentences = JSON.parse(event.target.result);
      shuffleSentences();
      displaySentence();
      document.getElementById("training-container").style.display = "block";
      document.getElementById("selection-container").style.display = "none";
    } catch (error) {
      alert("Invalid JSON file. Please upload a valid file.");
    }
  };
  reader.readAsText(file);
};

// Shuffle the sentences
const shuffleSentences = () => {
  sentences.sort(() => Math.random() - 0.5);
};

// Display the current sentence
const displaySentence = () => {
  const sentenceElement = document.getElementById("sentence");
  const feedbackElement = document.getElementById("feedback");
  const infinitiveElement = document.getElementById("infinitive");

  feedbackElement.textContent = ""; // Clear feedback
  sentenceElement.textContent = sentences[currentIndex].sentence;
  infinitiveElement.textContent = `(${sentences[currentIndex].infinitive})`; // Display infinitive
};

// Check the user's answer
const checkAnswer = () => {
  const answerInput = document.getElementById("answerInput");
  const feedbackElement = document.getElementById("feedback");
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = sentences[currentIndex].correctVerb;

  if (userAnswer === correctAnswer) {
    feedbackElement.textContent = "Correct!";
    feedbackElement.className = "feedback correct";
  } else {
    feedbackElement.textContent = "Incorrect";
    feedbackElement.className = "feedback incorrect";
  }

  setTimeout(() => {
    answerInput.value = ""; // Clear input
    currentIndex = (currentIndex + 1) % sentences.length; // Move to next sentence
    displaySentence();
  }, 2000); // Wait 2 seconds before showing the next sentence
};

// Add event listener for file input
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("json-file-input")
    .addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        loadJsonFromFile(file);
      }
    });

  const answerInput = document.getElementById("answerInput");
  answerInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  });
});
