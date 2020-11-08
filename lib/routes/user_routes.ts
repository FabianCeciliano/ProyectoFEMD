import { Application, Request, Response } from 'express';
import { dbController } from '../Db/db_controllers/databaseController';

export class TestRoutes {

    private dbController: dbController = new dbController();

    public route(app: Application) {
        
        app.post('/api/user', (req: Request, res: Response) => {
            this.dbController.create_user(req, res);
        });

        app.get('/api/user/:id', (req: Request, res: Response) => {
            this.dbController.get_user(req, res);
        });

        app.put('/api/user/:id', (req: Request, res: Response) => {
            this.dbController.update_user(req, res);
        });

        app.delete('/api/user/:id', (req: Request, res: Response) => {
            this.dbController.delete_user(req, res);
        });

    }
}