const miFormulario = document.getElementById("formulario");

miFormulario.addEventListener("submit", function(event) {
  event.preventDefault(); // evita que el formulario se envíe por defecto

  const formData = new FormData(miFormulario); // crea un objeto FormData con los datos del formulario
  const jsonData = {};

  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }

  const jsonString = JSON.stringify(jsonData); // convierte el objeto a una cadena JSON

  console.log(jsonString); // muestra la cadena JSON en la consola (puede ser enviada al servidor)

  fetch('http://localhost:3000/register/company',
        {
            method: "POST",
            body: jsonString,
            headers: {
                'Content-Type': 'application/json'
            }
        })

});
