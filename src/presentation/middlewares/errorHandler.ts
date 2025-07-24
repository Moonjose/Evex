import { Request, Response, NextFunction } from 'express';
import { ConflictError, NotFoundError, UnauthorizedError, ValidationError } from '@/domain/errors/DomainErrors';
import { getLogger } from '@/infrastructure/utils/Logger';

const errorStatusMap = new Map<Function, number>([
    [ConflictError, 409],
    [NotFoundError, 404],
    [UnauthorizedError, 401],
    [ValidationError, 400]
]);

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    const LOGGER = getLogger();
    const statusCode = errorStatusMap.get(err.constructor as Function) ?? 500;
    LOGGER.error(`[${err.name}] ${err.message}`);

    return res.status(statusCode).json({
        error: err.message
    });
}