class Validations {

    static isEmpty(data) {
        return data.trim() === '';
    }

    static nameSize(name) {
        return name.length <= 100;
    }

    static ingredientSize(ingredient) {
        return ingredient.length <= 100;
    }

    static categorySize(category) {
        return category.length <= 50;
    }

    static stepSize(step) {
        return step.length <= 200;
    }
}

module.exports = Validations;