import { Identifier } from './../../../node_modules/acorn/dist/acorn.d';
import { Request, RequestHandler, Response } from "express";

interface Todo {
    id: number;
    text: string
    completedAt: Date | null
}

const todos: Todo[] = [
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

    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        return res.send(todos);
    }

    public getTodoById = (req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: `el id: '${id}' no es un numero` })

        const todo = todos.find(todo => todo.id === id);

        (todo)
            ? res.status(200).json(todo)
            : res.status(404).json({ error: `tarea no encontrada` })

        return todo
    }


    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: `falta texto` });

        const todo = {
            id: todos.length + 1,
            text,
            completedAt: new Date()
        }

        todos.push(todo);

        return res.status(200).json(todo);
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: `el id: ${id} no es un numero` });

        const todo = todos.find(todo => todo.id === id);

        if (!todo) return res.status(404).json({ error: `el todo con el id: ${id}` });


        const { text, completedAt } = req.body;

        todo.text = text || todo.text;
        (todo.completedAt === null)
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt)

        res.json(todo)

    }

    public deleteTodo = (req: Request, res: Response) =>{
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: `el id ${id}, no es un numero `});


        const todo = todos.find( todo => todo.id === id);
        if(!todo) return res.status(404).json({ error: `el todo con el id ${id} no existe`});

        todos.splice(todos.indexOf(todo),1);

        return res.json(todo)
    }


}