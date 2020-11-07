import { Application, Request, Response } from 'express';
var path = require('path');
const htmlPath = __dirname+'../../../lib/view/HTML/';
import controller from '../controller/Controller'

export class AsesorRotes {
    public route(app: Application) {

        // Mismatch URL
        /*app.all('*', function (req: Request, res: Response) {
            res.status(404).send({ error: true, message: 'Check your URL please' });
        });*/

        app.get('/asesorMain', function (req: Request, res: Response) {
            res.render(path.resolve(htmlPath+'AsesorGeneral.html'));
        });

        app.post('/crearEstructura', function (req: Request, res: Response) {
            controller.createNewZone(null,req.body.zonaName,null);
            //manda a la base...
            for (let index = 0; index < req.body.branches; index++) {
                controller.createNewBranch(req.body.zonaName,null,req.body.branches[index],null);
                //manda a la base...
            }
            console.log(req.body);
        });

        

        //-----------------------------------------------------------------
/*
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

        app.get('/asesorMain', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            res.render(path.resolve(htmlPath+'AsesorGeneral.html'));
        });

        app.post('/asesorMain', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            //res.sendFile(path.resolve(htmlPath+'asesorGeneralMainPage.html'));
            console.log(req.body);
            console.log(req.body.zonaName);
            console.log(req.body.branches);
            res.send("jeje");
        });

        app.post('/userMain', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            res.sendFile(path.resolve(htmlPath+'userMainPage.html'));
        });

        app.get('/hi', function (req: Request, res: Response) {
            res.sendFile(path.resolve(htmlPath+'index.html'));
        });*/

    }
}
