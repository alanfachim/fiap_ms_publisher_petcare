import { Assessment } from "./Assessment";
import { Location } from "./Location";
export declare class User {
    id: string;
    imageUrl: string;
    name: string;
    assessment: Assessment[];
    currentLocation: Location;
    isValid(): void;
    getImpactRadius(): number;
    constructor(id: string, imageUrl: string, name: string, assessment: Assessment[], currentLocation: Location);
    static fromJSON(json: any): User;
    toJSON(): any;
}
