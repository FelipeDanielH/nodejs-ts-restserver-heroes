import { CreateTodoDto } from './../../domain/dtos/todos/create-todo.dto';
import { prisma } from '../../data/postgres';
import { Request, Response } from "express";
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';
import { TodoDatasouceImpl } from '../../infrastructure/datasources/todo.datasource.impl';

interface Todo {
    id?: number;
    text: string
    completedAt: Date | null
}

export class TodosController {

    constructor(
        private readonly todoDatasource: TodoDatasouceImpl
    ) { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = this.todoDatasource.getAll();
        return res.status(200).json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: `el id: '${id}' no es un numero` })

        const todo = this.todoDatasource.findById(id);

        (todo)
            ? res.status(200).json(todo)
            : res.status(404).json({ error: `tarea no encontrada` })

        return todo
    }


    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if(error) return res.status(404).json({error});

        const todo = this.todoDatasource.create(createTodoDto!)

        return res.status(200).json(todo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, todoDto] = UpdateTodoDto.update({...req.body,id});
        if(error) return res.status(400).json({error});

        const todo = this.todoDatasource.updateById(todoDto!)

        res.json(todo);
    }

    public deleteTodo = async (req: Request, res: Response) =>{
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: `el id ${id}, no es un numero `});

        const todo = this.todoDatasource.deleteById(id);

        return res.json(todo)
    }


}