import { Application, Request, Response } from 'express';
var path = require('path');

export class CommonRoutes {
    public route(app: Application) {

        // Mismatch URL
        /*app.all('*', function (req: Request, res: Response) {
            res.status(404).send({ error: true, message: 'Check your URL please' });
        });*/

        app.get('/', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            res.sendFile(path.resolve(__dirname+'../../../lib/view/LogIn.html'));
        });
        app.get('/LogIn', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            res.sendFile(path.resolve(__dirname+'../../../lib/view/LogIn.html'));
        });
        app.post('/enviar', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            console.log(req.body);
            res.sendFile(path.resolve(__dirname+'../../../lib/view/about.html'));
        });

        app.get('/about', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            res.sendFile(path.resolve(__dirname+'../../../lib/view/about.html'));
        });

        app.get('/hi', function (req: Request, res: Response) {
            //res.sendFile('C:/Users/DELL/Documents/TEC/Semestre II - 2020/Diseño/Proyecto/Proyecto/Proyecto_FEMD/lib/view/index.html');
            //res.sendFile(__dirname+ '../lib/view/' + 'index1.html');
            //res.sendFile('index.html', { root: path.join(__dirname, '../lib/view') });
            //res.sendFile('../lib/view/index.html', {root: __dirname});
            //res.sendFile(path.resolve(__dirname+'../../view/index.html'));
            res.sendFile(path.resolve(__dirname+'../../../lib/view/index.html'));
            //res.send(path.resolve(__dirname+'../../view/index.html'));
        });

    }
}
