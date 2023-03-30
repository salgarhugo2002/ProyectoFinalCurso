/*Funcio que agafa la informacio dels inputs crea i guarda un objecte de la classe responsable */



async function ObtenirDadesFormResponsables() {
    let ida = await idmaxresp();
    let nomRes = document.getElementById('nomresponsable').value
    if (nomRes == "") {
        document.getElementById('nomresponsable').value = null
        alert("Omple les dades")
    } else {
        document.getElementById('nomresponsable').value = null
        let responsable = {
            "id": ida,
            "nom": nomRes
        }


        let resp = new Responsable(ida, nomRes)

        responsables.push(resp);

        afegirUsuaris()
        return responsable

    }


}


/* /*Funcio que agafa la informacio dels inputs elimina un objecte de la classe responsable */
async function eliminarResponsable() {
    let id = retornideresponsable(document.getElementById('borrarResp').value);
    await borrarResponsable(id)
    let cont = 0
    responsables.forEach(element => {
        if (element.RetornId() == id) {
            responsables.splice(cont, 1);

        } else {
            cont++;
        }
    })
    afegirUsuaris()
}


/*Funcio que mostra en el camp select de la creacio de tasca tots els responsables creats */
function afegirUsuaris() {

    document.getElementById('resp').innerHTML = ""
    document.getElementById('borrarResp').innerHTML = ""
    responsables.forEach(element => {

        var responsables2 = document.getElementById('resp')
        var txt = element.RetornNom()
        var o = document.createElement("option")
        o.text = txt
        responsables2.add(o)


    })
    responsables.forEach(element => {

        var responsableseliminar = document.getElementById('borrarResp')
        var txts = element.RetornNom()
        var op = document.createElement("option")
        op.text = txts

        responsableseliminar.add(op)


    })

}




async function construirResponsable() {
    try {
        let response = await retornresponsabledb();

        response.forEach(element => {
            responsables.push(new Responsable(
                element.id,
                element.nom))
        });
        mostrar();
        afegirUsuaris()
    } catch (error) {
        console.error(error);
    }
}




async function idmaxresp() {

    const response = await retornidmaxresp();

    try {

        let abc = response[0].id;
        return abc + 1;
    } catch (error) {
        console.log("no hi ha cap responsable a la BDD, pero hem posat que la id default sigui 0 , aquest misatge salta igual pero funciona tot");
    }
}

function retornideresponsable(resp) {
    let id = 0;
    responsables.forEach(element => {
        if (resp == element.RetornNom()) {
            id = element.RetornId();
        }

    })
    return id;

}
