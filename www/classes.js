class User {
    constructor(ids, names, emails, passwords) {
        this.id = ids
        this.name = names
        this.email = emails
        this.password = passwords
    }
    getId() {
        return this.id
    }
    setId(ids) {
        this.id = ids
    }

    getName() {
        return this.name
    }
    setName(names) {
        this.name = names
    }

    getEmail() {
        return this.email
    }
    setEmail(emails) {
        this.email = emails
    }

    getPassword() {
        return this.password
    }
    setPassword(passwords) {
        this.password = passwords
    }
}




class Company extends User {
    constructor(ids, names, emails, passwords, calles, numeroCalles, municipios, codigoPostals, nifs) {
        super(ids, names, emails, passwords)
        this.calle = calles
        this.numeroCalle = numeroCalles
        this.municipio = municipios
        this.codigoPostal = codigoPostals
        this.nif = nifs
    }

    getCalle() {
        return this.calle;
    }
    setCalle(a) {
        this.calle = a;
    }

    getNumeroCalle() {
        return this.numerocalle;
    }
    setNumeroCalle(a) {
        this.numeroCalle = a;
    }

    getMunicipio() {
        return this.municipio;
    }
    setMunicipio(a) {
        this.municipio = a;
    }
    getCodigoPostal() {
        return this.codigoPostal;
    }
    setCodigoPostal(a) {
        this.codigoPostal = a;
    }

    getNif() {
        return this.nif;
    }
    setNif(a) {
        this.nif = a;
    }


}

class EducativeCenter extends User {
    constructor(ids, names, emails, passwords, calles, numeroCalles, municipios, codigoPostals, identificadors) {
        super(ids, names, emails, passwords)
        this.calle = calles
        this.numeroCalle = numeroCalles
        this.municipio = municipios
        this.codigoPostal = codigoPostals
        this.identificador = identificadors
    }

    getCalle() {
        return this.calle
    }
    setCalle(x) {
        this.calle = x
    }

    getNumeroCalle() {
        return this.numeroCalle
    }
    setNumeroCalle(x) {
        this.numeroCalle = x
    }

    getMunicipio() {
        return this.municipio
    }
    setMunicipio(x) {
        this.municipio = x
    }

    getCodigoPostal() {
        return this.codigoPostal
    }
    setCodigoPostal(x) {
        this.codigoPostal = x
    }

    getIdentificador() {
        return this.identificador
    }
    setIdentificador(x) {
        this.identificador = x;
    }
}


class Publication {

    constructor(ida, idempresaa, titola, texta, estudios, municipio, caducidada, activo) {
        this.id = ida
        this.idCompany = idempresaa
        this.titulo = titola
        this.texto = texta
        this.filtroEstudios = estudios
        this.filtroMunicipio = municipio
        this.caducidad = caducidada
        this.active = activo
    }

    getId() {
        return this.id
    }
    setId(x) {
        this.id = x;
    }
    getIdCompany() {
        return this.idCompany
    }
    setIdCompany(x) {
        this.idCompany = x;
    }

    getTitulo() {
        return this.titulo
    }
    setTitulo(x) {
        this.titulo = x;
    }

    getTexto() {
        return this.texto
    }
    setTexto(x) {
        this.texto = x;
    }

    getEstudios() {
        return this.filtroEstudios
    }
    setEstudios(x) {
        this.filtroEstudios = x;
    }

    getMunicipio() {
        return this.filtroMunicipio
    }
    setMunicipio(x) {
        this.filtroMunicipio = x;
    }

    getCaducidad() {
        return this.caducidad
    }
    setCaducidad(x) {
        this.caducidad = x;
    }

    getActive() {
        return this.active
    }
    setActive(x) {
        this.active = x;
    }


}

