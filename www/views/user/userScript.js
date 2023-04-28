const miFormulario = document.getElementById("formulario");

miFormulario.addEventListener("submit", function (event) {
    event.preventDefault(); // evita que el formulario se envíe por defecto

    const formData = new FormData(miFormulario); // crea un objeto FormData con los datos del formulario
    const jsonData = {};

    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    }

    const jsonString = JSON.stringify(jsonData); // convierte el objeto a una cadena JSON

    console.log(jsonString); // muestra la cadena JSON en la consola (puede ser enviada al servidor)



    let password = document.getElementById('password').value
    let repeatpassword = document.getElementById('repeatpasword').value


    if (password == repeatpassword) {

        fetch('http://localhost:3000/register/user',
            {
                method: "POST",
                body: jsonString,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        location.href = "/"
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
