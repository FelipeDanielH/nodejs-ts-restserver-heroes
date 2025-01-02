import { Request, RequestHandler, Response } from "express";

const todos = [
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
];

export class TodosController {

    constructor() {}

    public getTodos = (req: Request, res: Response):Response => {
        return res.send(todos);
    }
}