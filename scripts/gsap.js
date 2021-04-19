const showAnim = gsap.from('.dionne-header', { 
    yPercent: -150,
    paused: true,
    duration: 0.365})
    .progress(1);

const menu = gsap.to('.nav-links', { 
    "clip-path": "circle(1000px at 90% -10%)",
    paused: true,
    duration: 0.025});
  
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


const addMenuLinks = (kj) => {
    links.forEach(link => {
        link.addEventListener("click", kj, {once: true})
    })
}

function zx() {
    navLinks.classList.toggle("open")
    links.forEach(lin => {
        lin.classList.toggle("fade")
        lin.removeEventListener("click", zx, {once: true})
    })
    menu.reverse()
    ScrollTrigger.getAll().forEach(ST => ST.enable())
    hamburger.removeEventListener("click", tre);
    ad()
}

function rem() {
    hamburger.addEventListener("click", tre, {once: true})
}

function ad() {
    hamburger.addEventListener("click", () => {
        ScrollTrigger.getAll().forEach(ST => ST.disable());
        navLinks.classList.toggle("open");
        menu.play()
        links.forEach(link => {
            link.classList.toggle("fade");
        })
        rem()
        addMenuLinks(zx)
    }, {once: true})
    
}

function tre() {
    menu.reverse()
    ScrollTrigger.getAll().forEach(ST => ST.enable());
    navLinks.classList.toggle("open");
    ad()
    links.forEach(link => {
        link.classList.toggle("fade");
    })
}


ad()