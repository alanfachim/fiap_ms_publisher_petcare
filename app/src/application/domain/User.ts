import { Assessment } from "./Assessment";
import { Location } from "./Location";

export class User {
    isValid() {
        if (!this.id) {
            throw new Error('Id não informado');
        }
        if (this.id.match(/^[a-z0-9.]+@[a-z0-9].*$/i)==null) {
            throw new Error('Id inválido');
        }
        if (!this.imageUrl) {
            throw new Error('Url da imagem não informada');
        }
        if (this.imageUrl.match(/^https:\/\/[a-z0-9.]*\/.*/i)==null) {
            throw new Error('Url da imagem inválida');
        }
        if (!this.name) {
            throw new Error('Nome não informado');
        } else if (this.name.length < 3) {
            throw new Error('Nome inválido');
        }

    }
    getImpactRadius() {
        return this.assessment.map(assessment => assessment.rating).reduce((a, b) => a + b, 0) / this.assessment.length;
    }

    public constructor(public id: string,
        public imageUrl: string,
        public name: string,
        public assessment: Assessment[],
        public currentLocation: Location
    ) { }

    public static fromJSON(json: any): User {
        return new User(
            json.id,
            json.imageUrl,
            json.name,
            json.assessment,
            json.currentLocation
        );
    }

    public toJSON(): any {
        return {
            id: this.id,
            imageUrl: this.imageUrl,
            name: this.name,
            assessment: this.assessment,
            currentLocation: this.currentLocation
        };
    }
}