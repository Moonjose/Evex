export abstract class InfrastructureError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class DatabaseError extends InfrastructureError {
    constructor(message: string) {
        super(message);
        this.name = 'DatabaseError';
    }
}