import { TodoDatasource } from "../../domain/datasources/todo.datasources";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { TodoRepository } from "../../domain/repositories/todo.repository";
import { TodoDatasouceImpl } from "../datasources/todo.datasource.impl";

export class TodoRepositoryImpl implements TodoRepository{

    constructor(
        private readonly todoDatasaource: TodoDatasource
    ){}

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.todoDatasaource.create(createTodoDto);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.todoDatasaource.getAll();
    }
    findById(id: number): Promise<TodoEntity> {
        return this.todoDatasaource.findById(id);
    }
    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoDatasaource.updateById(updateTodoDto);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.todoDatasaource.deleteById(id);
    }
}