
import { isThrowStatement } from "typescript";
import { Location } from "./Location";
import { User } from "./User";

export class Publication {
    impactFactor: number = 1000;
    getRadius(): any {
        const ir = this.owner.getImpactRadius() * this.impactFactor;
        return ir;
    }

    public constructor(public serverId: number,
        public aspectRatio: number,
        public description: string,
        public createdAt: Date,
        public id: string,
        public imageUrl: string,
        public owner: User,
        public type: string,
        public location: Location
    ) { this.isValid(); }

    public isValid(): void {
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
        if (!this.owner) {
            throw new Error('Usuário não informado');
        } else
            if (this.owner !== null && this.owner!.isValid()) {
                throw new Error('Usuário inválido');
            }
        if (!this.type) {
            throw new Error('Tipo não informado');
        }
        if (!this.location) {
            throw new Error('Localização não informada');
        } else {
            if (this.location !== null && this.location!.isValid()) {
                throw new Error('Localização inválida');
            }
        }

    }

    public static fromJson(item: any): Publication {
        return new Publication(
            item.serverId,
            item.aspectRatio,
            item.description,
            new Date(item.createdAt),
            item.id,
            item.imageUrl,
            item.owner,
            item.type,
            item.location
        );
    }

    public toJson(): any {
        return {
            serverId: this.serverId,
            aspectRatio: this.aspectRatio,
            description: this.description,
            createdAt: this.createdAt.toISOString(),
            id: this.id,
            imageUrl: this.imageUrl,
            owner: this.owner,
            type: this.type
        };
    }

}