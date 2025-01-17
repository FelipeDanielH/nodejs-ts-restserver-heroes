import { CreateTodoDto } from './../../domain/dtos/todos/create-todo.dto';
import { Request, Response } from "express";
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { GetTodo } from '../../domain/usecases/todo/get-todo';
import { GetTodos } from '../../domain/usecases/todo/get-todos';
import { CreateTodo } from '../../domain/usecases/todo/create-todo';
import { UpdateTodo } from '../../domain/usecases/todo/update-todo';
import { DeleteTodo } from '../../domain/usecases/todo/delete-todo';

interface Todo {
    id?: number;
    text: string;
    completedAt: Date | null
}

export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public getTodos = (req: Request, res: Response) => {
        new GetTodos(this.todoRepository).execute()
            .then(todo => res.status(200).json(todo))
            .catch(error => res.status(400).json(error))
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;

        new GetTodo(this.todoRepository).execute(id)
            .then(todo => res.status(200).json(todo))
            .catch(error => res.status(400).json(error))
    }

    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if (error) return res.status(404).json({ error });

        new CreateTodo(this.todoRepository).execute(createTodoDto!)
            .then(todo => res.status(200).json(todo))
            .catch(error => res.status(400).json(error))
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, todoDto] = UpdateTodoDto.update({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        new UpdateTodo(this.todoRepository).execute(todoDto!)
            .then(todo => res.status(200).json(todo))
            .catch(error => res.status(400).json(error))
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: `el id ${id}, no es un numero ` });

        new DeleteTodo(this.todoRepository).execute(id)
            .then(todo => res.status(200).json(todo))
            .catch(error => res.status(400).json(error))
    }


}