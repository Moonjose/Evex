export abstract class DomainError extends Error {
    constructor(message: string) {
        super(message); 
        this.name = this.constructor.name;
    }
}

export class ConflictError extends DomainError {
    constructor(message: string) {
        super(message);
        this.name = 'ConflictError';
    }
}

export class NotFoundError extends DomainError {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class ValidationError extends DomainError {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class UnauthorizedError extends DomainError {
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedError';
    }
}