let FiltEstudi = ""
let FiltMuni = ""
var publications = []


async function cargarPublicacionesDB() {

    return await fetch('http://localhost:3000/publication/show')
        .then((res) => res.json())


}


async function construirPublicaciones() {
    let response = await cargarPublicacionesDB()

    response.forEach(element => {

        if (element.active = true) {
            publications.push(new Publication(
                element.id,
                element.idCompany,
                element.titulo,
                element.texto,
                element.filtroEstudios,
                element.filtroMunicipio,
                element.caducidad,
                element.active
            ))
        }

    });

    mostrarPublicaciones()

}

function mostrarPublicaciones() {
    
    let filtrado = []
    document.getElementById('listado_publicaciones').innerHTML = ""
    if (FiltEstudi == "" && FiltMuni == "") {

        filtrado = publications
    }

    if (!FiltEstudi == "") {
        let aux = []
        publications.forEach(element => {
            if (element.getEstudios() == FiltEstudi) {
                aux.push(element)
            }
        })
            filtrado = aux;
    }
    
    if (!FiltMuni == "") {
        let aux = []
        if (aux.length > 0) {
            filtrado.forEach(element => {
                if (element.getMunicipio() == FiltMuni) {
                    aux.push(element)
                }
            })
        } else {
            publications.forEach(element => {
                if (element.getMunicipio() == FiltMuni) {
                    aux.push(element)
                }
            })
        }
        filtrado = aux;
    }
        mostrar(filtrado)
}


function mostrar(a){
    a.forEach(element => {
            let publi = document.createElement('div')
            let img = document.createElement('img')
            img.width = "140"
            img.height = "140"
            img.className = "bd-placeholder-img rounded-circle"
            img.src = "../imagenes/hol.jpg" 
            publi.className = "col-lg-4"
            let titol = document.createElement('h2')
            titol.className = "fw-normal text-info text-break"
            titol.innerHTML = "<strong>" + element.getTitulo() + "</strong>"
            publi.appendChild(img)
            publi.appendChild(titol)
        
            publi.appendChild(document.createTextNode(element.getTexto()));
            publi.appendChild(document.createElement('br'))
            publi.appendChild(document.createTextNode("Estudios: " + element.getEstudios()));
            publi.appendChild(document.createElement('br'))
            publi.appendChild(document.createTextNode("Municipio: " + element.getMunicipio()));
            publi.appendChild(document.createElement('br'))
            
            let a = document.createElement('a')
            a.className = "btn btn-primary"
            a.href = "/publication/" + element.getId();
            a.innerHTML = "ver mas "
            publi.appendChild(document.createElement('br'))
            publi.appendChild(a)
            publi.appendChild(document.createElement('br'))
            publi.appendChild(document.createElement('br'))
            document.querySelector('#listado_publicaciones').appendChild(publi);

        })
        filtroEstudios()
}

function filtroEstudios() {
    document.getElementById('estudios').innerHTML = ""
    document.getElementById('municipios').innerHTML = ""
    let result = []
    let estudios = []
    let muni = []
    publications.forEach(element => {

        estudios.push(element.getEstudios())
        muni.push(element.getMunicipio())

    })
    result = estudios.filter((item, index) => {
        return estudios.indexOf(item) === index;
    })
    result2 = muni.filter((item, index) => {
        return muni.indexOf(item) === index;
    })

    let nada = document.createElement('option')
    nada.value = ""
    nada.text = "Nada"
    document.querySelector('#estudios').appendChild(nada);

    let nada2 = document.createElement('option')
    nada2.value = ""
    nada2.text = "Nada"

    document.querySelector('#municipios').appendChild(nada2);

    result.forEach(element => {
        let opt = document.createElement('option')
        opt.appendChild(document.createTextNode(element));

        document.querySelector('#estudios').appendChild(opt);
    });
    result2.forEach(element => {
        let opt = document.createElement('option')
        opt.appendChild(document.createTextNode(element));

        document.querySelector('#municipios').appendChild(opt);
    });



}


function filtrar() {

    FiltEstudi = document.getElementById('estudios').value
    FiltMuni = document.getElementById('municipios').value


    mostrarPublicaciones()
}
