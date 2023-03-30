/* Declaració de variables. */

var todo = [];
var codi = [1];
var idresponsable = [1];
var responsables = [];


/* És una classe que crea un objecte de tasca amb un títol, text, codi, data de creació, data de venciment,
responsable, llista i prioritat. */
class Task {

    constructor(_titols, _textp, _codip, data1, data, responsables, listas, prioridad) {
        this._titol = _titols;
        this._text = _textp;
        this._codi = _codip;
        this._data_creacio = data1;
        this._data_previsio_finalitzacio = data;
        this._responsable = responsables;
        this._Lista = listas;
        this._prioridad = prioridad
    }
    RetornTitol() {
        return this._titol
    }

     modTitol(x){
        this._titol = x
    }

    RetornDataCreacio(){
        return this._data_creacio
    }
     dataCreacio(x){
        this._data_creacio = x
    }

    Retorncodi() {
        return this._codi;
    }
    set codi(codi2) {
        this.codi = codi2;
    }

    set Text(text) {
        this.text = text;
    }
    modText(x){
        this._text = x
    }

    getTask() {
        return this;
    }

    RetornText() {
        return this._text;
    }


    RetornResponsable() {
        return this._responsable;
    }

     modResponsable(x){
        this._responsable = x
    }

    RetornLista() {
        return this._Lista;
    }

    setLista(llista) {
        this._Lista = llista
    }
    Prio() {
        return this._prioridad
    }

     modPrio(x){
        this._prioridad = x
    }

    ReturnDataFinal(){
        return this._data_previsio_finalitzacio
    }

     modDataFinal(x){
        this._data_previsio_finalitzacio =x
    }

}

/* Crea una classe anomenada Responsable. */
class Responsable {

    constructor(_ids, _noms) {
        this._id = _ids;
        this._nom = _noms;

    }
    RetornId() {
        return this._id;
    }
    set Id(a) {
        this._id = a;
    }

    RetornNom() {
        return this._nom;
    }
    set Nom(a) {
        this._nom = a;
    }
}

/* Carregant l'emmagatzematge local. */
construirTasca();
construirResponsable()

/* Crea un element de llista per a cada element de la matriu i l'afegeix a la llista adequada */

function mostrar() {
    var node;
    document.getElementById('listaToDo').innerHTML = '';
    document.getElementById('listaDoing').innerHTML = '';
    document.getElementById('listaDone').innerHTML = '';
    let cont = 1
    let boto;

    todo.forEach(element => {
        node = document.createElement('div');
        boto = document.createElement('button')
        boto.innerHTML = "Modificar"
        boto.setAttribute('data-bs-target','#exampleModal4');
        boto.setAttribute("data-bs-toggle","modal")
        
        node.draggable = true
        node.className = "task card text-center"
        node.id = cont
        boto.addEventListener('click',()=>{
            document.getElementById('modid').value = element.Retorncodi()
            document.getElementById('modtext1').value = element.RetornText()
            document.getElementById('modtitol').value = element.RetornTitol()
            document.getElementById('modpri').value = element.Prio()
            let calendar = element.ReturnDataFinal().replaceAll("/","-")
            
            console.log(typeof calendar)
            document.getElementById('modPrevFinalitzacio').value = new Date().toISOString().split('T')[0]
            console.log( document.getElementById('modPrevFinalitzacio').value)
            document.getElementById('modPrevFinalitzacio').min = new Date().toISOString().split('T')[0]


            document.getElementById('modresp').innerHTML = ""
            
            responsables.forEach(elements => {
        
                var responsables2 = document.getElementById('modresp')
                var txt = elements.RetornNom()
                var o = document.createElement("option")
                o.text = txt
                if (element.RetornResponsable() == elements.RetornId()) {
                    o.defaultSelected = elements.RetornNom()
                }
                
                responsables2.add(o)
        
        
            })
        })
        
        if (element.Prio() == "Alta") {
            node.style.backgroundColor = "#FF4F29"
            boto.className = "btn btn-success"
        } else if (element.Prio() == "Normal") {
            node.style.backgroundColor = "#CADCD3"
            boto.className = "btn btn-danger"
        }
        else if (element.Prio() == "Baixa") {
            node.style.backgroundColor = "#82F8E1"
            boto.className = "btn btn-warning"
        }
        cont++;
        
        node.appendChild(document.createTextNode( element.RetornTitol() + "." ));
        node.appendChild(document.createElement('br'))
        node.appendChild(document.createTextNode("Tasca: " + element.RetornText()));
        
        
        node.appendChild(document.createElement('br'))
        
        responsables.forEach(e =>{
            
            if (element.RetornResponsable()  == e.RetornId() ) {
                
                node.appendChild(document.createTextNode(" Responsable: "  + e.RetornNom()));
                node.appendChild(document.createElement('br'))
                
            }

        })
        
        node.appendChild(document.createTextNode("Data Final: " + element.ReturnDataFinal() + " "));
        
        node.appendChild(boto)

        if (element.RetornLista() == "ToDo") {
            document.querySelector('#listaToDo').appendChild(node);
        } else if (element.RetornLista() == "Doing") {
            document.querySelector('#listaDoing').appendChild(node);
        } else if (element.RetornLista() == "Done") {

            document.querySelector('#listaDone').appendChild(node);
        }

        
    });
    
}


/* Si es prem la tecla Intro, a continuació, activarà l'event 'clic al botó'
amb l'id 'btng'. */
document.getElementById("text1").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("btng").click();
    }
})


/* Creació de variables per als diferents divs i llistes. */
const dragToDo = document.getElementById('divToDo')
const dragDoing = document.getElementById('divDoing')
const dragDone = document.getElementById('divDone')
const papelera = document.getElementById('papelera')
const listaDoing = document.getElementById('listaDoing')
const listaToDo = document.getElementById('listaToDo')
const listaDone = document.getElementById('listaDone')

/*CODI PER CREAR EL SISTEMA D'ARROSSEGAMENT DE LES TASQUES TODO */
dragToDo.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id)
})

dragToDo.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

dragToDo.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})

dragToDo.addEventListener('dragover', (e) => {
    e.preventDefault()
})

/*CODI PER CREAR EL SISTEMA D'ARROSSEGAMENT DE LES TASQUES DOING */

dragDoing.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id)
})

dragDoing.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

dragDoing.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})

dragDoing.addEventListener('dragover', (e) => {
    e.preventDefault()
})


/*CODI PER CREAR EL SISTEMA D'ARROSSEGAMENT DE LES TASQUES DONE */
dragDone.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id)
})

dragDone.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

dragDone.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})

dragDone.addEventListener('dragover', (e) => {
    e.preventDefault()
})





dragDoing.addEventListener('drop', (e) => {
    try {
        e.preventDefault()
        const element = document.getElementById(e.dataTransfer.getData('text'))
        element.classList.remove('active')
        listaDoing.appendChild(listaToDo.removeChild(element))
    
        a = element.innerHTML;
        CambiarLista(a, "Doing")
    } catch (error) {
        
    }


})

dragToDo.addEventListener('drop', (e) => {
    try {
        e.preventDefault()
        const element = document.getElementById(e.dataTransfer.getData('text'))
        element.classList.remove('active')
        listaToDo.appendChild(listaDoing.removeChild(element))
    
        a = element.innerHTML;
        CambiarLista(a, "ToDo")
    } catch (error) {
        
    }


})

dragDone.addEventListener('drop', (e) => {
    try {
        e.preventDefault()
        const element = document.getElementById(e.dataTransfer.getData('text'))
        element.classList.remove('active')
        listaDone.appendChild(listaDoing.removeChild(element))
    
        a = element.innerHTML;
        CambiarLista(a, "Done")
    } catch (error) {
        
    }


})

dragDoing.addEventListener('drop', (e) => {
try {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    element.classList.remove('active')
    listaDoing.appendChild(listaDone.removeChild(element))


    a = element.innerHTML;
    CambiarLista(a, "Doing")
} catch (error) {
    
}

})


/*CODI PER CREAR EL SISTEMA D'ARROSSEGAMENT DE LES TASQUES A LA PAPERERA */

papelera.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id)

})

papelera.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

papelera.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})

papelera.addEventListener('dragover', (e) => {
    e.preventDefault()
})

papelera.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    element.classList.remove('active')

    a = element.innerHTML;
    eliminarToDo(a)

})



/*Codi per la modificacio automatica del camp min i value del calendari */
document.getElementById('PrevFinalitzacio').value = new Date().toISOString().split('T')[0]
document.getElementById('PrevFinalitzacio').min = new Date().toISOString().split('T')[0]