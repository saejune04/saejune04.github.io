const projectData = {
  project1: {
    title: "Sentient Sandbox",
    video: "https://www.youtube.com/embed/325YhBNQv1o",
    description: "Built with Unity and integrated with OpenAI’s language models, Sentient Sandbox allows users to modify 3D environments through conversational commands. The system interprets spatial language to identify specific objects and applies collision-aware transformations.",
    tech: ["Unity", "Three.js", "OpenAI", "Meta Quest 3"]
  },
  project2: {
    title: "Geospatial Upscaling Network",
    pdf: "https://github.com/saejune04/Geospatial-Upscaling-Network/blob/main/Geospatial%20Upscaling%20Network.pdf",
    description: "",
    tech: ["Numpy", "Pytorch"]
  },
  project3: {
    title: "CHIP-8 Emulator",
    localVideo: "./public/chip8.mp4",
    description: "A fully functional emulator for the CHIP-8 virtual machine, built from scratch in Java! Accurately replicates the behavior of the original 1970s-era 8-bit interpreted langauge used for simple games and emulation.",
    tech: ["Java", "Emulator"]
  },
  project4: {
    title: "Glitch in the Simulation",
    video: "https://youtube.com/embed/u8-hXTWFbCM",
    description: "",
    tech: ["Unity", "Blender"]
  },
  project5: {
    title: "DriftCar",
    localVideo: "./public/driftcar.mp4",
    description: "A 2D top-down car simulation featuring slippery, hard to control drifting physics. I trained a reinforcement learning agent using Double DQN to navigate custom tracks with high precision - often outperforming human players (me and my friends).",
    tech: ["Javascript", "Pytorch", "Numpy"]
  },
};
function openProjectModal(key) {
  const data = projectData[key];
  if (!data) return;

  document.getElementById("modal-title").textContent = data.title;
  document.getElementById("modal-description").textContent = data.description;

  const videoEl = document.getElementById("modal-video");
  const pdfEl = document.getElementById("modal-pdf");

  if (data.video) {
    videoEl.src = data.video;
    videoEl.style.display = "block";
    pdfEl.style.display = "none";
  } else if (data.pdf) {
    videoEl.src = "";
    videoEl.style.display = "none";
    pdfEl.href = data.pdf;
    pdfEl.style.display = "block";
    pdfEl.textContent = "View PDF";
  } else {
    videoEl.src = "";
    videoEl.style.display = "none";
    pdfEl.style.display = "none";
  }

  // Tech tags
  const techContainer = document.getElementById("modal-tech");
  techContainer.innerHTML = "";
  data.tech.forEach(t => {
    const tag = document.createElement("span");
    tag.className = "tech-tag";
    tag.textContent = t;
    techContainer.appendChild(tag);
  });

  // for local video
  const localVideoEl = document.getElementById("modal-local-video");
  const localSourceEl = localVideoEl.querySelector("source");

  if (data.localVideo) {
    videoEl.style.display = "none";
    pdfEl.style.display = "none";
    console.log(data.localVideo);
    localSourceEl.src = data.localVideo;
    localVideoEl.load(); // Reload the video with the new source
    localVideoEl.style.display = "block";
  } else {
    localVideoEl.pause();
    localVideoEl.style.display = "none";
  }


  document.getElementById("project-modal").style.display = "flex";
}


function closeProjectModal() {
  document.getElementById("project-modal").style.display = "none";
  document.getElementById("modal-video").src = "";
  document.getElementById("modal-local-video").pause();

}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal();
  }
});

// Close modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  const modal = document.getElementById("project-modal");
  const content = document.querySelector(".modal-content");

  if (event.target === modal) {
    closeProjectModal();
  }
});