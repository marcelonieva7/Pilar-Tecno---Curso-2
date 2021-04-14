const
    area = document.querySelector("#dionneJobs-main-form__area"),
    province = document.querySelector("#dionneJobs-main-form__province"),
    form = document.querySelector(".dionneJobs-main-form"),
    jobsBlock = document.querySelector(".dionneJobs-main-list"),
    experience =[document.querySelector("#dionneJobs-experience__j"), document.querySelector("#dionneJobs-experience__ss"), document.querySelector("#dionneJobs-experience__s")];
        
let exp;

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
            jobList.length === 0 ? console.log("array vacio") : (
                jobList.forEach(job => {
                    jobsBlock.insertAdjacentHTML("afterbegin", `
                    <div class="dionne-jobs-block-card">
                    <a href="">
                        <strong>${area.value}</strong>
                        <h3>${job.title}</h3>
                        <p>J${job.description}</p>
                    </a>
                    </div<
                    `);
                })
            )
        })
        .catch(error => alert('Hubo un problema con la petición Fetch:' + error.message));
}

form.addEventListener("submit", () => {
    area.addEventListener("change", (event) => {
        expCheck();
        callJson(province, event.target, exp);
    })

    province.addEventListener("change", (event) => {
        expCheck();
        callJson(event.target, area, exp);
    })
    
    experience.forEach(el => {        
        el.addEventListener("change", (event) => {
        callJson(province, area, event.target)
        })
    })
}, {once: true})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    expCheck();
    callJson(event.target[1], event.target[0], exp);
})