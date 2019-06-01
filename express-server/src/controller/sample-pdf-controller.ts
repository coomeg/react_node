import { Response, Request } from "express";
export class SamplePdfController {
    async prop(req: Request, res: Response) {
        for (let i =0; i < 5; i++) {
            console.log(`普通のfor分${i}`);
        }
    }
}
