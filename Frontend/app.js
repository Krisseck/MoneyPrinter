const generateButton = document.querySelector("#generateButton");
const cancelButton = document.querySelector("#cancelButton");

const advancedOptionsToggle = document.querySelector("#advancedOptionsToggle");

advancedOptionsToggle.addEventListener("click", () => {
  // Change Emoji, from ▼ to ▲ and vice versa
  const emoji = advancedOptionsToggle.textContent;
  advancedOptionsToggle.textContent = emoji.includes("▼")
    ? "Show less Options ▲"
    : "Show Advanced Options ▼";
  document.querySelector("#advancedOptions").classList.toggle("hidden");
});

const cancelGeneration = () => {
  console.log("Canceling generation...");
  // Send request to /cancel
  fetch("/api/cancel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      console.log(data);
    })
    .catch((error) => {
      alert("An error occurred. Please try again later.");
      console.log(error);
    });

  // Hide cancel button
  cancelButton.classList.add("hidden");

  // Enable generate button
  generateButton.disabled = false;
  generateButton.classList.remove("hidden");
};

const generateVideo = () => {
  console.log("Generating video...");
  // Disable button and change text
  generateButton.disabled = true;
  generateButton.classList.add("hidden");

  // Show cancel button
  cancelButton.classList.remove("hidden");

  const url = "/api/generate";

  // Construct data to be sent to the server
  const data = {
    videoSubject: document.querySelector("#videoSubject").value,
    aiModel: document.querySelector("#aiModel").value,
    voice: document.querySelector("#voice").value,
    wordCount: document.querySelector("#wordCount").value,
    automateYoutubeUpload: document.querySelector("#youtubeUploadToggle").checked,
    useMusic: document.querySelector("#useMusicToggle").checked,
    zipUrl: document.querySelector("#zipUrl").value,
    watermarkPath: document.querySelector("#watermarkPath").value,
    watermarkPosition: document.querySelector("#watermarkPosition").value,
    watermarkSize: document.querySelector("#watermarkSize").value,
    threads: document.querySelector("#threads").value,
    onlyVertical: document.querySelector("#onlyVertical").checked,
    subtitlesPosition: document.querySelector("#subtitlesPosition").value,
    customPrompt: document.querySelector("#customPrompt").value,
    color: document.querySelector("#subtitlesColor").value,
    metadataGeneration: document.querySelector("#metadataGeneration").checked
  };

  // Send the actual request to the server
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.message);
      // Hide cancel button after generation is complete
      generateButton.disabled = false;
      generateButton.classList.remove("hidden");
      cancelButton.classList.add("hidden");
    })
    .catch((error) => {
      alert("An error occurred. Please try again later.");
      console.log(error);
    });
};

generateButton.addEventListener("click", generateVideo);
cancelButton.addEventListener("click", cancelGeneration);

videoSubject.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    generateVideo();
  }
});

toggles = ["youtubeUploadToggle", "useMusicToggle", "reuseChoicesToggle", "onlyVertical", "metadataGeneration"];
fields = ["aiModel", "voice", "wordCount", "videoSubject", "zipUrl", "watermarkPath", "watermarkPosition", "watermarkSize", "customPrompt", "threads", "subtitlesPosition", "subtitlesColor"];

document.addEventListener("DOMContentLoaded", () => {

  // Load the data from localStorage on page load
  const voiceSelect = document.getElementById("voice");
  const storedVoiceValue = localStorage.getItem("voiceValue");

  if (storedVoiceValue) {
    voiceSelect.value = storedVoiceValue;
  }

  // Save the data to localStorage when the user changes the value

  toggles.forEach((id) => {
    const toggle = document.getElementById(id);
    const storedValue = localStorage.getItem(`${id}Value`);
    const storedReuseValue = localStorage.getItem("reuseChoicesToggleValue");

    if (toggle && storedValue !== null && storedReuseValue === "true") {
        toggle.checked = storedValue === "true";
    }
    // Attach change listener to update localStorage
    toggle.addEventListener("change", (event) => {
        localStorage.setItem(`${id}Value`, event.target.checked);
    });
  });

  fields.forEach((id) => {
    const select = document.getElementById(id);
    const storedValue = localStorage.getItem(`${id}Value`);
    const storedReuseValue = localStorage.getItem("reuseChoicesToggleValue");

    if (storedValue && storedReuseValue === "true") {
      select.value = storedValue;
    }
    // Attach change listener to update localStorage
    select.addEventListener("change", (event) => {
      localStorage.setItem(`${id}Value`, event.target.value);
    });
  });
});
