import request from "supertest";
import { server } from "../../TestServer";
import { prisma } from "../../../src/data/postgres";

describe('presentation/todos/routes.ts', () => {

    beforeAll( async ()=>{
        await server.start();
    })

    afterAll( ()=>{
        server.close();
    })

    beforeEach( async ()=> {
        await prisma.todo.deleteMany();
    })

    const todo1 = {text: 'mensaje de prueba'};
    const todo2 = {text: 'mensaje de prueba 2'};

    test("should return TODO's api/todos", async () => {

        await prisma.todo.createMany({
            data: [todo1,todo2]
        })

        const { body } = await request(server.app)
            .get('/api/todos')
            .expect(200)

        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(2);
        expect(body[0].text).toEqual(todo1.text);
        expect(body[1].text).toEqual(todo2.text);
        expect(body[0].completedAt).toBeNull;


    })
})