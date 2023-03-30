
//Responsables



async function afegirResponsable() {

    /*Obtenir dades del formulari*/
    const responsable = await ObtenirDadesFormResponsables();

    fetch('http://localhost:3000/api/responsable',
        {
            method: "POST",
            body: JSON.stringify(responsable),
            headers: {
                'Content-Type': 'application/json'
            }
        })



}

function retornidmaxresp() {
    return fetch('http://localhost:3000/api/idmax')
        .then((res) => res.json());
}

function retornresponsabledb() {
    return fetch('http://localhost:3000/api/responsable')
        .then((res) => res.json());
}

 function borrarResponsable(id) {
    fetch('http://localhost:3000/api/responsable/' + id,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })

}


//Tasques


async function afegirTasca() {

    /*Obtenir dades del formulari*/
    const tasca = await guardarToDo();

    if (tasca != undefined) {
        fetch('http://localhost:3000/api/tasca',
            {
                method: "POST",
                body: JSON.stringify(tasca),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    } else {
        alert("Hi han dades sense definr")
    }


}

async function retorntasquesdb() {
    return fetch('http://localhost:3000/api/tasca')
        .then((res) => res.json());
}
function retornidmaxtasca() {
    return fetch('http://localhost:3000/api/idmaxtasca')
        .then((res) => res.json());
}


function borrarTasca(id) {
    fetch('http://localhost:3000/api/tasca/'+id,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })

}


function modificarLista(id,list) {

    let tasca1 = {
        "_titol": "",
        "_text": "",
        "_codi": "" ,
        "_data_creacio": "",
        "_data_previsio_finalitzacio": "",
        "_responsable": "",
        "_Lista": "",
        "_prioridad": ""
    }
    todo.forEach(element => {
        if (id == element.Retorncodi()) {
            tasca1 = {
                "_titol": element.RetornTitol(),
                "_text": element.RetornText(),
                "_codi": element.Retorncodi() ,
                "_data_creacio": element.RetornDataCreacio(),
                "_data_previsio_finalitzacio": element.ReturnDataFinal(),
                "_responsable": element.RetornResponsable(),
                "_Lista": list,
                "_prioridad": element.Prio()
            }
        }
    });
    
    
    fetch('http://localhost:3000/api/tasca/'+id,
        {
            method: "PUT",
            body: JSON.stringify(tasca1),
            headers: {
                'Content-Type': 'application/json'
            }
        })

}


function modificarTascaDB(responsable) {

    let titol = document.getElementById("modtitol").value;
    let dato = document.getElementById("modtext1").value;
    let data = new Date(document.getElementById("modPrevFinalitzacio").value).toLocaleDateString();
    let prio = document.getElementById('pri').value
    let iid =parseInt(document.getElementById('modid').value)
    
    let tasca1 = {
        "_titol": "",
        "_text": "",
        "_codi": "" ,
        "_data_creacio": "",
        "_data_previsio_finalitzacio": "",
        "_responsable": "",
        "_Lista": "",
        "_prioridad": ""
    }
    todo.forEach(element => {
        if (iid == element.Retorncodi()) {
            tasca1 = {
                "_titol": titol,
                "_text": dato,
                "_codi": iid ,
                "_data_creacio": element.RetornDataCreacio(),
                "_data_previsio_finalitzacio": data,
                "_responsable": responsable,
                "_Lista": element.RetornLista(),
                "_prioridad": prio
            }
        }
    });
    
    
    fetch('http://localhost:3000/api/tasca/'+iid,
        {
            method: "PUT",
            body: JSON.stringify(tasca1),
            headers: {
                'Content-Type': 'application/json'
            }
        })

}