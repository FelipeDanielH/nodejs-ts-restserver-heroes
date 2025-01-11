import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasouceImpl } from "../../infrastructure/datasources/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";

export class TodoRoutes {

    static get routes(): Router {

        const router = Router();

        // Datasources & Repositorios
        const todoDatasource = new TodoDatasouceImpl;
        const todoRepository = new TodoRepositoryImpl(todoDatasource)
        const todoController = new TodosController(todoRepository);

        // CONTROLLERS
        router.get('/', todoController.getTodos);

        router.get('/:id', todoController.getTodoById);
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}