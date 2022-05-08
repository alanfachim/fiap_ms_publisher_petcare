export class Assessment {
    constructor(public id: string, public name: string, public description: string, public createdAt: Date, public rating :number) { this.isValid();}
    isValid(): boolean {
        if (!this.id) {
            throw new Error('Id não informado');
        }
        if (this.id.match(/^[a-z0-9.]+@[a-z0-9].*$/i)==null) {
            throw new Error('Id inválido');
        }
        if (!this.name) {
            throw new Error('Nome não informado');
        } else if (this.name.length < 3) {
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
    public static fromJSON(json: any): Assessment {
        return new Assessment(
            json.id,
            json.name,
            json.description,
            new Date(json.createdAt),
            json.rating
        );
    }
    public toJSON(): any {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            createdAt: this.createdAt.toISOString(),
            rating: this.rating
        };
    }
}