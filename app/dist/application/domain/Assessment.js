"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assessment = void 0;
class Assessment {
    constructor(id, name, description, createdAt, rating) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.rating = rating;
        this.isValid();
    }
    isValid() {
        if (!this.id) {
            throw new Error('Id não informado');
        }
        if (this.id.match(/^[a-z0-9.]+@[a-z0-9].*$/i) == null) {
            throw new Error('Id inválido');
        }
        if (!this.name) {
            throw new Error('Nome não informado');
        }
        else if (this.name.length < 3) {
            throw new Error('Nome inválido');
        }
        if (!this.description) {
            throw new Error('Descrição não informada');
        }
        if (!this.createdAt) {
            throw new Error('Data de criação não informada');
        }
        if (!this.rating) {
            throw new Error('Avaliação não informada');
        }
        if (this.rating < 1 || this.rating > 5) {
            throw new Error('Avaliação inválida');
        }
        return true;
    }
    static fromJSON(json) {
        return new Assessment(json.id, json.name, json.description, new Date(json.createdAt), json.rating);
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            createdAt: this.createdAt.toISOString(),
            rating: this.rating
        };
    }
}
exports.Assessment = Assessment;
//# sourceMappingURL=Assessment.js.map