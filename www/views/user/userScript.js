const miFormulario = document.getElementById("formulario");

miFormulario.addEventListener("submit", async function (event) {
    event.preventDefault(); // evita que el formulario se envíe por defecto

    const formData = new FormData(miFormulario); // crea un objeto FormData con los datos del formulario
    const jsonData = {};

    for (const [key, value] of formData.entries()) {
        jsonData['id'] = await idmax()
        jsonData[key] = value;
    }

    const jsonString = JSON.stringify(jsonData); // convierte el objeto a una cadena JSON

    console.log(jsonString); // muestra la cadena JSON en la consola (puede ser enviada al servidor)
    
  
    
    let username = document.getElementById('username')
    let email = document.getElementById('email')
    let password = document.getElementById('password')
    let repeatpassword = document.getElementById('repeatpassword')


    if (password.value == repeatpassword.value) {

        fetch('http://localhost:3000/register/user',
            {
                method: "POST",
                body: jsonString,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            username.value = ""
            email.value = ""
            password.value = ""
            repeatpassword.value = ""
        //  location.href = "/"
       
    } else {
        let divMessage = document.getElementById('password-msg')
        let node = document.createElement('div')
        let boton = document.createElement('button')
        node.className = "alert alert-warning alert-dismissible fade show"
        node.role = "alert"
        node.textContent = "Las contraseñas no coinciden"
        boton.type = "button"
        boton.className = "btn-close"
        boton.setAttribute("data-bs-dismiss", "alert")
        node.appendChild(boton)
        divMessage.appendChild(node)
    }
});


function returnMaxId() {
    return fetch('http://localhost:3000/user/idmax')
        .then((res) => res.json());
        
}


async function idmax() {

    const response = await returnMaxId();

    try {

        let abc = response[0].id;
        return abc + 1;
    } catch (error) {
        console.log("no hi ha cap responsable a la BDD, pero hem posat que la id default sigui 0 , aquest misatge salta igual pero funciona tot");
    }
}


