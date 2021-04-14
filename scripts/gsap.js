const showAnim = gsap.from('.dionne-header', { 
    yPercent: -150,
    paused: true,
    duration: 0.365})
    .progress(1);
  
ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse()
    }
});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", () => {
    ScrollTrigger.getAll().forEach(ST => ST.disable());
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    })
    !(navLinks.classList.contains("open")) && ScrollTrigger.getAll().forEach(ST => ST.enable());
})

// const addMenuLinks = () => {
//     links.forEach(link => {
//         link.addEventListener("click", () => {
//             navLinks.classList.toggle("open")
//             links.forEach(lin => {
//                 lin.classList.toggle("fade");
//             })
//         })
//     })
// }

// const remMenulinks = () => {
//     links.forEach(link => {
//         link.removeEventListener("click", () => {
//             navLinks.classList.toggle("open")
//             links.forEach(lin => {
//                 lin.classList.toggle("fade");
//             })
//         })
//     })
// }
