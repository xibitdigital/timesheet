import { checkJwt } from '../middleware/authz.middleware';
import express, { Request, Response } from "express";

/**
 * Router Definition
 */
export const testRouter = express.Router();

testRouter.get('/', async (req: Request, res: Response) => {
    res.status(200).send({ status: 'ok' })
});

testRouter.get('/protected', checkJwt ,async (req: Request, res: Response) => {
    res.status(200).send({ status: 'ok' })
});