"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publication = void 0;
class Publication {
    constructor(serverId, aspectRatio, description, createdAt, id, imageUrl, owner, type, location) {
        this.serverId = serverId;
        this.aspectRatio = aspectRatio;
        this.description = description;
        this.createdAt = createdAt;
        this.id = id;
        this.imageUrl = imageUrl;
        this.owner = owner;
        this.type = type;
        this.location = location;
        this.impactFactor = 1000;
        this.isValid();
    }
    getRadius() {
        const ir = this.owner.getImpactRadius() * this.impactFactor;
        return ir;
    }
    isValid() {
        if (!this.id) {
            throw new Error('Id não informado');
        }
        if (this.id.match(/^[a-z0-9.]+@[a-z0-9].*$/i) == null) {
            throw new Error('Id inválido');
        }
        if (!this.imageUrl) {
            throw new Error('Url da imagem não informada');
        }
        if (this.imageUrl.match(/^https:\/\/[a-z0-9.]*\/.*/i) == null) {
            throw new Error('Url da imagem inválida');
        }
        if (!this.owner) {
            throw new Error('Usuário não informado');
        }
        else if (this.owner !== null && this.owner.isValid()) {
            throw new Error('Usuário inválido');
        }
        if (!this.type) {
            throw new Error('Tipo não informado');
        }
        if (!this.location) {
            throw new Error('Localização não informada');
        }
        else {
            if (this.location !== null && this.location.isValid()) {
                throw new Error('Localização inválida');
            }
        }
    }
    static fromJson(item) {
        return new Publication(item.serverId, item.aspectRatio, item.description, new Date(item.createdAt), item.id, item.imageUrl, item.owner, item.type, item.location);
    }
    toJson() {
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
exports.Publication = Publication;
//# sourceMappingURL=Publication.js.map