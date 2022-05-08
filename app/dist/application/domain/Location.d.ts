export declare class Location {
    latitude: number;
    longitude: number;
    isValid(): void;
    distance(location: Location): number;
    constructor(latitude: number, longitude: number);
}
