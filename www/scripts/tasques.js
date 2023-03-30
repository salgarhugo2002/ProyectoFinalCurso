
/* Agafa els valors dels inputs i crea una tasca nova, introduint-la a la matriu. */
async function guardarToDo() {
    /* Try-catch que detecta si algun titol esta repetit o i ha algun camp buit. */

    try {
        let responsable = document.getElementById('resp').value
        let titol = document.getElementById("titol1").value;
        let dato = document.getElementById("text1").value;
        let data = new Date(document.getElementById("PrevFinalitzacio").value).toLocaleDateString()
        let data1 = new Date().toLocaleDateString();
        let prio = document.getElementById('pri').value
        let codiiii = await idmaxtasques();

        if (codiiii== undefined) {
            codiiii = 0;
        }

        if (!validarTitol()) {
            throw "No pots repetir titol";
        } else {

            if (dato == "" || dato == null) {
                throw "Inserta un text";
            }
            else {
                if (titol == "" || titol == null) {
                    throw "Inserta un títol";
                } else {

                    document.getElementById("text1").value = null;
                    document.getElementById("titol1").value = null;
                    let tasca = new Task(titol, dato, codiiii, data1, data, retornideresponsable(responsable), "ToDo", prio);
                    

                    let tasca1 = {
                        "_titol": titol,
                        "_text": dato,
                        "_codi": codiiii ,
                        "_data_creacio": data1,
                        "_data_previsio_finalitzacio": data,
                        "_responsable": retornideresponsable(responsable),
                        "_Lista": "ToDo",
                        "_prioridad": prio
                    }


                    todo.push(tasca);


                    mostrar();
                    return tasca1

                }

            }
        }

    } catch (err) {
        alert(err);
    }

}

/* Comprova si el títol de la tasca nova ja és a la llista de tasques. Retorna un valor booleà. */

function validarTitol() {

    let bool = true;
    for (element of todo) {
        if (element.RetornTitol() == document.getElementById("titol1").value) {
            bool = false;
            break;
        }
        else {
            bool = true;
        }
    };


    return bool;
}



async function eliminarToDo(text = "") {
    
    
    let cont = 0;
    let pos = text.indexOf('.')
    let text2 = text.substring(0, pos)
    let id = returnIdTitol(text2)
    await borrarTasca(id)
    todo.forEach(element => {
        if (text2.trim() == element.RetornTitol()) {


            todo.splice(cont, 1);

        } else {
            cont++;
        }

    });

    mostrar();
}

function returnIdTitol(txt){
    let id = 0;
    todo.forEach(element => {
        if (txt == element.RetornTitol()) {
            id = element.Retorncodi()
        }

    })
    return id;
}
/* Pren les dades de la matriu 'todo', la variable codi , la matriu responsables i la variable de identificaciò i les desa a l'emmagatzematge en local. */


/* Funcio per cambiar l'atribut llista de la classe responsable depenguen d'on es mogui el element */

async function CambiarLista(text = "", lista) {
    let pos = text.indexOf('.')

    let text2 = text.substring(0, pos)
    let id =returnIdTitol(text2)
    text = text.trim()
    
    await modificarLista(id,lista)
    todo.forEach(element => {
        if (id == element.Retorncodi()) {

            element.setLista(lista);

        }

    });
}



async function construirTasca() {
    try {
        const response = await retorntasquesdb();

        response.forEach(element => {
            todo.push(new Task(
                element._titol,
                element._text,
                element._codi,
                element._data_creacio,
                element._data_previsio_finalitzacio,
                element._responsable,
                element._Lista,
                element._prioridad
            ));
        });
        mostrar();
    } catch (error) {
        console.error(error);
    }



}


async function idmaxtasques(){

    const response = await retornidmaxtasca();

    try {
        let abc = response[0]._codi;
       return abc + 1 ;
    } catch (error) {
        console.log("no hi ha cap tasca a la BDD, pero hem posat que la id default sigui 0 , aquest misatge salta igual pero funciona tot");

    }
}


async function modificarTasca(){
    let responsable =retornideresponsable(document.getElementById('modresp').value)
    let titol = document.getElementById("modtitol").value;
    let dato = document.getElementById("modtext1").value;
    let data = new Date(document.getElementById("modPrevFinalitzacio").value).toLocaleDateString();
    let prio = document.getElementById('modpri').value
    let iid = document.getElementById('modid').value
    todo.forEach(element => {
        if (iid == element.Retorncodi()) {
            element.modTitol(titol)
            element.modText(dato)
            element.modPrio(prio)
            element.modDataFinal(data)
            element.modResponsable(responsable)
        }
    });
    
   await modificarTascaDB(responsable)
   mostrar()
   
}


