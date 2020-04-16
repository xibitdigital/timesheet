import express, { Request, Response } from "express";

/**
 * Router Definition
 */
export const authRouter = express.Router();

authRouter.get('/', async (req: Request, res: Response) => {
    console.log(res);
    res.status(200).send({ status: 'ok' })
});
