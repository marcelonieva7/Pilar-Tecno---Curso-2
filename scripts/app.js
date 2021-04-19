const footer = document.querySelector(".dionne-footer");

footer.innerHTML = footerComponent;

const openEls = document.querySelectorAll("[data-open]");
const isVisible = "is-visible";
 
for(const el of openEls) {
  el.addEventListener("click", function() {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
    ScrollTrigger.getAll().forEach(ST => ST.disable());
  });
}

const closeEls = document.querySelectorAll("[data-close]");
 
for (const el of closeEls) {
  el.addEventListener("click", function() {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    ScrollTrigger.getAll().forEach(ST => ST.enable());
  });
}
 
document.addEventListener("click", e => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
    ScrollTrigger.getAll().forEach(ST => ST.enable());
  }
});

 
document.addEventListener("keyup", e => {
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
    ScrollTrigger.getAll().forEach(ST => ST.enable());
  }
});

for (let i = 1; i < 6; i++) {
  document.getElementById(`modal-header${i}`).childNodes[0].nodeValue = document.querySelector(`[data-open='faq${i}']`).childNodes[0].nodeValue;  
}