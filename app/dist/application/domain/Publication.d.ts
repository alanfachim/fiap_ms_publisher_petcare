import { Location } from "./Location";
import { User } from "./User";
export declare class Publication {
    serverId: number;
    aspectRatio: number;
    description: string;
    createdAt: Date;
    id: string;
    imageUrl: string;
    owner: User;
    type: string;
    location: Location;
    impactFactor: number;
    getRadius(): any;
    constructor(serverId: number, aspectRatio: number, description: string, createdAt: Date, id: string, imageUrl: string, owner: User, type: string, location: Location);
    isValid(): void;
    static fromJson(item: any): Publication;
    toJson(): any;
}
