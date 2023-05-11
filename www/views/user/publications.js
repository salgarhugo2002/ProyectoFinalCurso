let FiltEstudi = ""
let FiltMuni = ""
let FiltTipo = ""
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
                element.tipo,
                element.caducidad,
                element.active
            ))
        }

    });

    mostrarPublicaciones()

}

function mostrarPublicaciones() {
    let aux = []
    let filtrado = []
    document.getElementById('listado_publicaciones').innerHTML = ""
    if (FiltEstudi == "" && FiltMuni == "" && FiltTipo == "") {

        filtrado = publications
    }

    if (!FiltEstudi == "") {

        publications.forEach(element => {
            if (element.getEstudios() == FiltEstudi) {
                aux.push(element)
            }
        })
        filtrado = aux;
    }

    if (!FiltMuni == "") {
        aux = []
        if (filtrado.length > 0) {
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


    if (!FiltTipo == "") {
        aux = []
        if (filtrado.length > 0) {
            filtrado.forEach(element => {
                if (element.getTipo() == FiltTipo) {
                    aux.push(element)
                }
            })
        } else {
            publications.forEach(element => {
                if (element.getTipo() == FiltTipo) {
                    aux.push(element)
                }
            })
        }
        filtrado = aux;
    }

    mostrar(filtrado)
}


function mostrar(a) {
    a.forEach(elemento => {
        const columna = document.createElement("div");
        columna.classList.add("col-sm-3");

        const button = document.createElement("a")
        button.className = "btn"
        button.style.backgroundColor = "#9146ff"
        button.href = "/publication/" + elemento.getId()
        button.textContent = "Ver más"

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");
        tarjeta.style.marginRight = "5px";
        tarjeta.style.marginBottom = "5px";

        const imagen = document.createElement("img");
        imagen.classList.add("card-img-top");
        imagen.src = "../imagenes/hol.jpg";
        

        const cuerpoTarjeta = document.createElement("div");
        cuerpoTarjeta.style.backgroundColor = "#1e172a"
        cuerpoTarjeta.classList.add("card-body");

        const titulo = document.createElement("h5");
        titulo.classList.add("card-title");
        titulo.textContent = elemento.getTitulo();



        const estudios = document.createElement("label");
        estudios.textContent = "Estudios: " + elemento.getEstudios();

        const municipio = document.createElement("label");
        municipio.textContent = "Municipio: " + elemento.getMunicipio();

        const tipo = document.createElement("label");
        tipo.textContent = "Tipo: " + elemento.getTipo();

        // Agregar los elementos creados a la tarjeta y a la columna
        cuerpoTarjeta.appendChild(titulo);

        cuerpoTarjeta.appendChild(estudios);
        cuerpoTarjeta.appendChild(document.createElement("br"));
        cuerpoTarjeta.appendChild(municipio);
        cuerpoTarjeta.appendChild(document.createElement("br"));
        cuerpoTarjeta.appendChild(tipo);
        cuerpoTarjeta.appendChild(document.createElement("br"));
        cuerpoTarjeta.appendChild(document.createElement("br"));
        cuerpoTarjeta.appendChild(button);
        cuerpoTarjeta.appendChild(document.createElement("br"));
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(cuerpoTarjeta);

        columna.appendChild(tarjeta);

        // Agregar la columna al contenedor
        
        document.querySelector('#listado_publicaciones').appendChild(columna);

    })
    filtroEstudios()
}

function filtroEstudios() {
    document.getElementById('estudios').innerHTML = ""
    document.getElementById('municipios').innerHTML = ""
    document.getElementById('tipo').innerHTML = ""
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

    let nada3 = document.createElement('option')
    nada3.value = ""
    nada3.text = "Nada"
    document.querySelector('#tipo').appendChild(nada3);

    let fct = document.createElement('option')
    fct.value = "FCT"
    fct.text = "FCT"
    document.querySelector('#tipo').appendChild(fct);

    let dual = document.createElement('option')
    dual.value = "DUAL"
    dual.text = "DUAL"
    document.querySelector('#tipo').appendChild(dual);



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
    FiltTipo = document.getElementById('tipo').value

    mostrarPublicaciones()
}
