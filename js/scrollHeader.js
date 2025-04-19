const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("visible");
  } else {
    header.classList.remove("visible");
  }
});


function updateHeaderVisibility() {
  if (window.scrollY > 100) {
    header.classList.add("visible");
  } else {
    header.classList.remove("visible");
  }
}

window.addEventListener("scroll", updateHeaderVisibility);
window.addEventListener("load", updateHeaderVisibility);