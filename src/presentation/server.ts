import express from "express";
import path from "path";

interface ServerOptions {
    port: number;
    public_path: string;
};


export default class Server {

    private app = express();

    private readonly port: number;
    private readonly public_path:string;

    constructor(options: ServerOptions) {
        const { port, public_path = 'public' } = options;
        this.port = port;
        this.public_path = public_path;
    }

    async start(): Promise<void> {

        this.app.use(express.static(this.public_path));

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