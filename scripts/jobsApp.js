const footerJobs = document.querySelector("#dionneJobs-footer");

footerJobs.innerHTML = footerComponent;

const
    area = document.querySelector("#dionneJobs-main-form__area"),
    province = document.querySelector("#dionneJobs-main-form__province"),
    form = document.querySelector(".dionneJobs-main-form"),
    jobsBlock = document.querySelector(".dionneJobs-main-list"),
    experience =[document.querySelector("#dionneJobs-experience__j"), document.querySelector("#dionneJobs-experience__ss"), document.querySelector("#dionneJobs-experience__s")];
        
let exp;

const animer = gsap.from('.dionneJobs-main-list', { 
    opacity: 0,
    paused: true,
    duration: 0.865});

const expCheck = () => {
    experience.forEach( e => {
        e.checked === true && (exp = e);
    });
}

const callJson = (prov, are, ex)=> {    
    fetch('../data/jobsData.json')
        .then(response => response.json())
        .then(data => {
            let jobList = data[prov.value][are.value][ex.value];
        
            jobsBlock.innerHTML = "";
            
            if (jobList.length === 0) {
                jobsBlock.insertAdjacentHTML("afterbegin", `
                <div class="dionne-jobs-block-card" style="width:auto; padding:2rem;">                    
                    <h3 style="text-align: center;">Sin resultados para la busqueda realizada</h3>
                </div>
                `);
            } 
            else {
                jobList.forEach(job => {
                    jobsBlock.insertAdjacentHTML("afterbegin", `
                    <div class="dionne-jobs-block-card">                    
                        <strong>${area.value}</strong>
                        <h3>${job.title}</h3>
                        <p>J${job.description}</p>
                        <button class="btn btn--sm">Ver Detalle</button>                    
                    </div>
                    `);                    
                })
            }
        })
        .catch(error => alert('Hubo un problema con la petición Fetch:' + error.message));
}

form.addEventListener("submit", () => {
    area.addEventListener("change", (event) => {
        animer.reverse()
        setTimeout(() => {animer.play()
        expCheck()
        callJson(province, event.target, exp);},1000)
    })

    province.addEventListener("change", (event) => {
        animer.reverse()
        setTimeout(() => {animer.play()
        expCheck()
        callJson(event.target, area, exp);},1000)
    })
    
    experience.forEach(el => {        
        el.addEventListener("change", (event) => {
            animer.reverse()
        setTimeout(() => {animer.play()
        callJson(province, area, event.target)},1000)
        })
    })
}, {once: true})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    animer.play()
    expCheck();
    callJson(event.target[1], event.target[0], exp);
})