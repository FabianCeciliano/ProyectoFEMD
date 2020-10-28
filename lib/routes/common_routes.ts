import { Application, Request, Response } from 'express';
var path = require('path');
const htmlPath = __dirname+'../../../lib/view/HTML/';

export class CommonRoutes {
    public route(app: Application) {

        // Mismatch URL
        /*app.all('*', function (req: Request, res: Response) {
            res.status(404).send({ error: true, message: 'Check your URL please' });
        });*/

        app.get('/', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            res.render("hi");
        });

        app.get('/main', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            res.render(path.resolve(htmlPath+'mainPage.html'));
        });

        app.get('/login', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            res.render(path.resolve(htmlPath+'LogIn.html'));
        });
        
        app.get('/about', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            res.render(path.resolve(htmlPath+'about.html'));
        });

        app.post('/asesorMain', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            res.sendFile(path.resolve(htmlPath+'asesorGeneralMainPage.html'));
        });

        app.post('/userMain', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            res.sendFile(path.resolve(htmlPath+'userMainPage.html'));
        });

        app.get('/hi', function (req: Request, res: Response) {
            res.sendFile(path.resolve(htmlPath+'index.html'));
        });

    }
}
