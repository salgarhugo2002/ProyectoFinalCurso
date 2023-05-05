var publications = [];


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

                    console.log(publications)
                    mostrarPublicaciones()

                }

                function mostrarPublicaciones() {

                    publications.forEach(element => {
                        publi = document.createElement('div')

                        publi.appendChild(document.createTextNode( "Titulo: " +element.getTitulo() + "."));
                        publi.appendChild(document.createElement('br'))
                        publi.appendChild(document.createTextNode("Tasca: " + element.getTexto()));


                        document.querySelector('#listado_publicaciones').appendChild(publi);
                    })

                }
