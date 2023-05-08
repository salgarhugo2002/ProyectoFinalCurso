let FiltEstudi = []
let FiltMuni = []
var publications = []


function cargarPublicacionesDB() {

    return fetch('http://localhost:3000/publication/show')
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
    document.getElementById('listado_publicaciones').innerHTML = ""


    if (FiltEstudi == "" && FiltMuni == "") {
        publications.forEach(element => {
            let publi = document.createElement('div')
            publi.className = "card"
            publi.appendChild(document.createTextNode("Titulo: " + element.getTitulo() + "."));
            publi.appendChild(document.createElement('br'))
            publi.appendChild(document.createTextNode("Dexc: " + element.getTexto()));
            publi.appendChild(document.createElement('br'))
            publi.appendChild(document.createTextNode("Estudios: " + element.getEstudios()));
            publi.appendChild(document.createElement('br'))
            publi.appendChild(document.createTextNode("Municipio: " + element.getMunicipio()));
            document.getElementById('listado_publicaciones').appendChild(publi);
        })
    } else if (FiltEstudi == "" && !FiltMuni == "") {

        publications.forEach(element => {
            if (element.getMunicipio() == FiltMuni) {
                let publi = document.createElement('div')
                publi.appendChild(document.createTextNode("Titulo: " + element.getTitulo() + "."));
                publi.appendChild(document.createElement('br'))
                publi.appendChild(document.createTextNode("Dexc: " + element.getTexto()));
                publi.appendChild(document.createElement('br'))
                publi.appendChild(document.createTextNode("Estudios: " + element.getEstudios()));
                publi.appendChild(document.createElement('br'))
                publi.appendChild(document.createTextNode("Municipio: " + element.getMunicipio()));
                document.getElementById('listado_publicaciones').appendChild(publi);
            }
        })

    } else if (!FiltEstudi == "" && FiltMuni == "") {
        publications.forEach(element => {
            if (element.getEstudios() == FiltEstudi) {
                let publi = document.createElement('div')
                publi.appendChild(document.createTextNode("Titulo: " + element.getTitulo() + "."));
                publi.appendChild(document.createElement('br'))
                publi.appendChild(document.createTextNode("Dexc: " + element.getTexto()));
                publi.appendChild(document.createElement('br'))
                publi.appendChild(document.createTextNode("Estudios: " + element.getEstudios()));
                publi.appendChild(document.createElement('br'))
                publi.appendChild(document.createTextNode("Municipio: " + element.getMunicipio()));
                document.getElementById('listado_publicaciones').appendChild(publi);
            }
        })
    } else {
        publications.forEach(element => {
            if (element.getEstudios() == FiltEstudi && element.getMunicipio() == FiltMuni) {
                let publi = document.createElement('div')
                publi.appendChild(document.createTextNode("Titulo: " + element.getTitulo() + "."));
                publi.appendChild(document.createElement('br'))
                publi.appendChild(document.createTextNode("Dexc: " + element.getTexto()));
                publi.appendChild(document.createElement('br'))
                publi.appendChild(document.createTextNode("Estudios: " + element.getEstudios()));
                publi.appendChild(document.createElement('br'))
                publi.appendChild(document.createTextNode("Municipio: " + element.getMunicipio()));
                document.getElementById('listado_publicaciones').appendChild(publi);
            }
        })
    }

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
