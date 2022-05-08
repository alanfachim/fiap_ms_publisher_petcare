export declare class Assessment {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    rating: number;
    constructor(id: string, name: string, description: string, createdAt: Date, rating: number);
    isValid(): boolean;
    static fromJSON(json: any): Assessment;
    toJSON(): any;
}
