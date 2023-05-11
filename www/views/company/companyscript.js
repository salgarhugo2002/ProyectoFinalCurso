publications = []


async function construirPublicaciones() {
    let response = await cargarPublicacionesDB()
    let id = document.getElementById('id').value

    console.log(id)
    response.forEach(element => {

        if (element.active == true && element.companyId == id) {

            publications.push(new Publication(
                element.id,
                element.companyId,
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

    mostrar()

}

async function cargarPublicacionesDB() {

    return await fetch('http://localhost:3000/publication/show')
        .then((res) => res.json())


}



function mostrar() {

    publications.sort(function (a, b) {
        return new Date(a.getCaducidad()) - new Date(b.getCaducidad());
    });

    publications.forEach(element => {
        let row = document.createElement('tr');
        let titleCell = document.createElement('td');
        let expirationCell = document.createElement('td');
        let actionsCell = document.createElement('td');

        titleCell.innerHTML = "<strong>" + element.getTitulo() + "";
        expirationCell.innerHTML = element.getCaducidad();

        let a = document.createElement('a');
        a.className = 'btn btn-primary';
        a.href = '/publication/' + element.getId();
        a.innerHTML = 'ver más';

        actionsCell.appendChild(a);

        row.appendChild(titleCell);
        row.appendChild(expirationCell);
        row.appendChild(actionsCell);

        document.querySelector('#listado_publicaciones').appendChild(row);
    });
}


const miFormulario = document.getElementById("formulario");

miFormulario.addEventListener("submit", async function (event) {
    console.log("aaaa")
    let idc = document.getElementById('idc').value
    event.preventDefault(); // evita que el formulario se envíe por defecto

    const formData = new FormData(miFormulario); // crea un objeto FormData con los datos del formulario
    const jsonData = {};
    miFormulario.reset()
    for (const [key, value] of formData.entries()) {
        jsonData['id'] = await idmax2()
        jsonData['companyId'] = idc;
        jsonData[key] = value;
    }

    if (jsonData['id'] == undefined) {
        jsonData['id'] = 1;
    }


    const jsonString = JSON.stringify(jsonData); // convierte el objeto a una cadena JSON

    console.log(jsonString); // muestra la cadena JSON en la consola (puede ser enviada al servidor)

    fetch('http://localhost:3000/publication/create',
        {
            method: "POST",
            body: jsonString,
            headers: {
                'Content-Type': 'application/json'
            }
        })

});



function returnMaxId2() {
    return fetch('http://localhost:3000/publication/idmax')
        .then((res) => res.json());

}

async function idmax2() {

    const response = await returnMaxId2();

    try {

        let abc = response[0].id;
        return abc + 1;
    } catch (error) {
        console.log("no hi ha cap publicacio a la BDD, pero hem posat que la id default sigui 0 , aquest misatge salta igual pero funciona tot");
    }
}

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})




