const scrollContainer = document.querySelector(".project-scroll");
const cards = scrollContainer.querySelectorAll(".project-card");

scrollContainer.addEventListener("scroll", () => {
  const scrollLeft = scrollContainer.scrollLeft;
  const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
  const progress = scrollLeft / maxScroll;

  cards.forEach((card, i) => {
    const offset = i / cards.length - progress;
    card.style.transform = `rotateY(${offset * 10}deg)`;
  });
});
