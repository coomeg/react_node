import * as Express from 'express';
const router = Express.Router();

export default function get(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    console.log('test');
    res.status(501).json({ message: 'Not Implemented.' });
}