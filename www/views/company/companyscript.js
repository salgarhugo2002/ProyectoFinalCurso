const miFormulario = document.getElementById("formulario");

miFormulario.addEventListener("submit",async function(event) {
  event.preventDefault(); // evita que el formulario se envíe por defecto

  const formData = new FormData(miFormulario); // crea un objeto FormData con los datos del formulario
  const jsonData = {};

  for (const [key, value] of formData.entries()) {
    jsonData['id'] = await idmax()
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



function returnMaxId() {
  return fetch('http://localhost:3000/company/idmax')
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
