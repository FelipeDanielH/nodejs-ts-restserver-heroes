import express, { Request, Response, Router } from "express";
import path from "path";

interface ServerOptions {
    port: number;
    public_path: string;
    routes: Router;
};


export default class Server {

    private app = express();

    private readonly port: number;
    private readonly public_path:string;
    private readonly routes:Router;

    constructor(options: ServerOptions) {
        const { port, public_path = 'public', routes } = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    async start(): Promise<void> {

        this.app.use(express.static(this.public_path));

        this.app.use(this.routes)
        
        // RUTAS
        const indexPath = path.join(__dirname, '../../public/index.html');
        this.app.get('*', (req, res) => {
            res.sendFile(indexPath);
        });


        this.app.listen(3000, () => {
            console.log(`server running on PORT ${this.port}`);
        })
    }
}