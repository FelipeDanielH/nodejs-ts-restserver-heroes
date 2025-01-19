import request from "supertest";
import { server } from "../../TestServer";
import { prisma } from "../../../src/data/postgres";

describe('presentation/todos/routes.ts', () => {

    beforeAll(async () => {
        await server.start();
    })

    afterAll(() => {
        server.close();
    })

    beforeEach(async () => {
        await prisma.todo.deleteMany();
    })

    const todo1 = { text: 'mensaje de prueba' };
    const todo2 = { text: 'mensaje de prueba 2' };

    test("should return TODO's api/todos", async () => {

        await prisma.todo.createMany({
            data: [todo1, todo2]
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

    test('should return a TODO api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: todo1 });

        const { body } = await request(server.app)
            .get(`/api/todos/${todo.id}`)
            .expect(200);

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo.text,
            completedAt: null
        })
    })

    test('should return 404 not found in api/todos/:id', async () => {

        const badId = 9999;

        const { body } = await request(server.app)
            .get(`/api/todos/${badId}`)
            .expect(404)

            expect(body).toBe("todo no encontrado") 
    })

    test('should return a new Todo POST api/todos', async () => {

        const { body } = await request(server.app)
            .post('/api/todos')
            .send(todo1)
            .expect(200)

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: null
        })
    })

    test('should return error if text is not sended', async () => {

        const { body } = await request(server.app)
            .post('/api/todos')
            .send({})
            .expect(400)

        expect(body).toEqual({ error: 'la property text es requerida' })
    })

    test('should return error if text length is 0 sending POST to api/todos', async () => {

        const todoTest = { text: '' }

        const { body } = await request(server.app)
            .post('/api/todos')
            .send(todoTest)
            .expect(400)

        expect(body).toEqual({ error: 'la property text es requerida' })
    })

    test('should return an updated TODO: PUT api/todos/:id', async () => {

        const todo = await prisma.todo.create({ data: todo1 })
        const date = new Date(Date.now())

        const { body } = await request(server.app)
            .put(`/api/todos/${todo.id}`)
            .send({
                text: 'text actualizado',
                completedAt: date
            })
            .expect(200)

        expect(body.id).toEqual(expect.any(Number));
        expect(body.text).toBe('text actualizado');
        expect(new Date(body.completedAt)).toEqual(date);

    })

    test('should return 404 if todo not found', async () => {
        const id = 9999

        const { body } = await request(server.app)
            .put(`/api/todos/${id}`)
            .send(todo1)
            .expect(404)

        // expect(body).toEqual({});

        expect(body).toBe("todo no encontrado")

    })

    test('should return an updated todo only with date passed', async () => {
        const todoTest = await prisma.todo.create({
            data: {
                text: 'texto ejemplo',
                completedAt: new Date(Date.now())
            }
        })

        const updateDate: Date = new Date('1995-08-15')

        const { body } = await request(server.app)
            .put(`/api/todos/${todoTest.id}`)
            .send({ completedAt: updateDate })
            .expect(200)

        expect(body).toEqual({
            id: expect.any(Number),
            text: todoTest.text,
            completedAt: updateDate.toISOString()
        })
    })

    test('should delete a todo DELETE /api/todos/:id',async () => {

        const todoTest = await prisma.todo.create({data: todo1})

        const { body } = await request(server.app)
            .delete(`/api/todos/${todoTest.id}`)
            .expect(200)

        expect(body).toEqual(todoTest);
    })

    test('should return a 404 if todo do not exist', async ()=> {
        const id = 9999

        const { body } = await request(server.app)
        .delete(`/api/todos/${id}`)
        .expect(404)

        expect(body).toBe("todo no encontrado")
    })
})