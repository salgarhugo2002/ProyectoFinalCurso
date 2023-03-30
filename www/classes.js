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
    constructor(calles, numeroCalles, municipios, codigoPostals, nifs, teachers) {
        this.calle = calles
        this.numeroCalle = numeroCalles
        this.municipio = municipios
        this.codigoPostal = codigoPostals
        this.nif = nifs
        this.teachers = []
    }
}