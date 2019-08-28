import { Request, Response, NextFunction } from 'express';
import { cypher } from '../util/cypher'
import * as validator from 'validator';
import { LOGGER } from '../util/logger';

export async function updateAssignment(req: Request, res: Response, next: NextFunction) {
    const message = "this is an ecripted message";
    return res.send({ message : cypher.encrypt(message) });
}