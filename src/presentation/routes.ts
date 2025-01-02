import { Request, Response, Router } from "express";


export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.get('/', (req: Request, res: Response) => {
            res.send([
                {
                    id: 1,
                    text: 'texto 1',
                    completedAt: new Date()
                },
                {
                    id: 2,
                    text: 'texto 2',
                    completedAt: new Date()
                },
                {
                    id: 3,
                    text: 'texto 3',
                    completedAt: new Date()
                }
            ])
        })

        return router;
    }
}