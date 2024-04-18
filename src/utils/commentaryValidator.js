class Validations {

    static isEmpty(data) {
        return data.trim() === '';
    }

    static commentarySize(commentary) {
        return commentary.length <= 280;
    }
}

module.exports = Validations;