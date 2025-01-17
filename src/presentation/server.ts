import express, { Request, Response, Router } from "express";
import path from "path";

interface ServerOptions {
    port: number;
    public_path: string;
    routes: Router;
};


export default class Server {

    public app = express();

    private serverListener?:any
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(options: ServerOptions) {   
        const { port, public_path = 'public', routes } = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    async start(): Promise<void> {

        // MIDDLEWARES
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        // DIRECTORIO PUBLICO
        this.app.use(express.static(this.public_path));

        // RUTAS
        this.app.use(this.routes);

        // SPA
        const indexPath = path.join(__dirname, `../../${this.public_path}/index.html`);
        this.app.get('*', (req, res) => {
            res.sendFile(indexPath);
        });

        // LISTEN DE PUERTOS
        this.serverListener = this.app.listen(3000, () => {
            console.log(`server running on PORT ${this.port}`);
        })
    }

    public close(){
        this.serverListener?.close();
    }
}