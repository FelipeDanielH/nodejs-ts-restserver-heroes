import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {

    static get routes(): Router {

        // ROUTER
        const router = Router();

        // RUTAS DE TODO'S 
        router.use('/api/todos', TodoRoutes.routes);

        return router;
    }
}