class Validations {

    static isEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isEmpty(data) {
        return data.trim() === '';
    }

    static hasSpace(data) {
        return /\s/.test(data);
    }

    static usernameSize(username) {
        return username.length <= 20;
    }

    static emailSize(email) {
        return email.length <= 100;
    }

    static nameSize(name) {
        return name.length <= 100;
    }

    static biographySize(bio) {
        return bio.length <= 100;
    }
}

module.exports = Validations;