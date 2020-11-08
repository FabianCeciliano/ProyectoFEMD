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
            for (let index = 0; index < req.body.branches.length; index++) {
                controller.createNewBranch(req.body.zonaName,null,req.body.branches[index],null);
                //manda a la base...
            }
            console.log(req.body);
        });

        // Crear Grupo
        app.post('/obtenerZonas',function (req: Request, res: Response){
            res.send({zonas:[1,2,3]});
        })

        app.post('/obtenerRamas',function (req: Request, res: Response){
            console.log(req.body.zona)//aqui viene la zona que hay que buscar las ramas
            res.send({ramas:["hola","mundo"]});
        })
        
        app.post('/obtenerMonitoresDisponibles',function (req: Request, res: Response){
            res.send({monitores:["juan","perez"]});
        })

        app.post('/crearGrupo',function (req: Request, res: Response){
            console.log(req.body)
        })

        // Asignacion de monitores
        app.post('/asignarCoach',function (req: Request, res: Response){
            console.log(req.body)
        })


                

        //Conformacion de coordinacion
        //----------------------------------------------------------------------------Para asignarZonas
        app.post('/consultarExistenciaZona',function (req: Request, res: Response){
            console.log(req.body)
            res.send({status:1});
        })      

        app.post('/asignarJefesZona',function (req: Request, res: Response){
            console.log(req.body)
            res.send({status:1});
        })
        
        //----------------------------------------------------------------------------Para asignarRamas
        app.post('/consultarExistenciaRama',function (req: Request, res: Response){
            console.log(req.body)
            res.send({status:1});
        })      

        app.post('/asignarJefesRama',function (req: Request, res: Response){
            console.log(req.body)
            res.send({status:1});
        })

        //----------------------------------------------------------------------------Para asignarGrupos
        app.post('/consultarExistenciaGrupo',function (req: Request, res: Response){
            console.log(req.body)
            res.send({status:1});
        })      

        app.post('/asignarJefesGrupo',function (req: Request, res: Response){
            console.log(req.body)
            res.send({status:1});
        })   


        //Para la administracion de miembros

        app.post('/agregarUsuario',function (req: Request, res: Response){
            console.log(req.body)
            res.send({status:1});
        })

        app.post('/actualizarUsuario',function (req: Request, res: Response){
            console.log(req.body)
            res.send({status:1});
        })

        app.post('/borrarUsuario',function (req: Request, res: Response){
            console.log(req.body)
            res.send({status:1});
        })

        app.post('/moverUsuario',function (req: Request, res: Response){
            console.log(req.body)
            res.send({status:1});
        })

        

        

        

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
