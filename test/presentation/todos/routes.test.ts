import request from "supertest";
import { server } from "../../TestServer";

describe('presentation/todos/routes.ts', () => {

    beforeAll( async ()=>{
        await server.start();
    })

    afterAll( ()=>{
        server.close();
    })

    test("should return TODO's", async () => {

        const {body} = await request(server.app)
            .get('/api/todos')
            .expect(200)

        console.log(body);
    })
})