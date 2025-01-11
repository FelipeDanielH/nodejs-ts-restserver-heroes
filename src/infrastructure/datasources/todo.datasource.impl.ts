import { prisma } from "../../data/postgres";
import { TodoDatasource } from "../../domain/datasources/todo.datasources";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../../domain/entities/todo.entity";

export class TodoDatasouceImpl implements TodoDatasource{

    async create (createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        return TodoEntity.fromObject(todo)
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();

        return todos.map(TodoEntity.fromObject)
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        return TodoEntity.fromObject(todo!)
    }

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        const todo = await this.findById(updateTodoDto.id);

        const updatedTodo = await prisma.todo.update({
            where: {id: todo.id},
            data: todo
        })

        return TodoEntity.fromObject(updateTodoDto)
    }

    async deleteById(id: number): Promise<TodoEntity> {
        const todo = await this.findById(id);

        await prisma.todo.delete({
            where: {id: todo.id}
        })

        return TodoEntity.fromObject(todo)
    }

}