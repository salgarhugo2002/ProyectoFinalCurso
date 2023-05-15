publications = []


async function construirPublicaciones() {
    let response = await cargarPublicacionesDB()
    let id = document.getElementById('id').value

    console.log(id)
    response.forEach(element => {

        if (element.companyId == id) {

            publications.push(new Publication(
                element._id,
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
        if(element.getActive()){
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
    }

    });


    publications.forEach(element => {
       
        let row2 = document.createElement('tr');
        let title = document.createElement('td');
        let muni = document.createElement('td');
        let est = document.createElement('td');
        let tipo = document.createElement('td')
        let actionsCell2 = document.createElement('td')

        title.innerHTML = "<strong>" + element.getTitulo() + "</strong>";
        muni.innerHTML = element.getMunicipio();
        est.innerHTML = element.getEstudios();
        tipo.innerHTML = element.getTipo();


        let a2 = document.createElement('a');
        a2.className = 'btn btn-primary';
        a2.href = '/publication/' + element.getId();
        a2.innerHTML = 'ver más';

        actionsCell2.appendChild(a2);

        row2.appendChild(title);
        row2.appendChild(muni);
        row2.appendChild(est);
        row2.appendChild(tipo);
        row2.appendChild(actionsCell2);


        document.querySelector('#listado_publicaciones2').appendChild(row2);
    

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

        jsonData['companyId'] = idc;
        jsonData[key] = value;
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
        location.reload()

});


$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})




