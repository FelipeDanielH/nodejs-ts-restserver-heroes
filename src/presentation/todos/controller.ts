import { CreateTodoDto } from './../../domain/dtos/todos/create-todo.dto';
import { prisma } from '../../data/postgres';
import { Request, Response } from "express";
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';

interface Todo {
    id?: number;
    text: string
    completedAt: Date | null
}

export class TodosController {

    constructor() { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        return res.status(200).json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: `el id: '${id}' no es un numero` })

        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        (todo)
            ? res.status(200).json(todo)
            : res.status(404).json({ error: `tarea no encontrada` })

        return todo
    }


    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if(error) return res.status(404).json({error});

        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        return res.status(200).json(todo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, todoDto] = UpdateTodoDto.update({...req.body,id});
        if(error) return res.status(400).json({error});

        const todo = await prisma.todo.findFirst({
            where: { id }
        })
        if (!todo) return res.status(404).json({ error: `el todo con el id '${id}' no existe` });
        
        const updatedTodo = await prisma.todo.update({
            where: {id},
            data: todoDto!.values
        })

        res.json(updatedTodo);

    }

    public deleteTodo = async (req: Request, res: Response) =>{
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: `el id ${id}, no es un numero `});

        const todo = await prisma.todo.findFirst({
            where: {id}
        })
        if(!todo) return res.status(404).json({ error: `el todo con el id ${id} no existe`});

        await prisma.todo.delete({
            where: {id}
        })

        return res.json(todo)
    }


}