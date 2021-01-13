import { Application, Request, Response } from 'express';
var path = require('path');
var session=require('express-session');
const htmlPath = __dirname+'../../../lib/view/HTML/';
import controller from '../controller/Controller'
import dbController from "../Db/db_controllers/databaseController";

import {Proxy} from  "../controller/Proxy";
import {AccesDirector} from "../controller/AccesDirector"

export class CommonRoutes {
    public route(app: Application) {

        app.get('/prueba', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            var promise=dbController.getAllMember();
            promise.then((value)=>{
                if(value.length>0){
                    console.log(value);
                }else{
                    console.log("vacio");
                }
            })
        });

        app.get('/prueba2', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            var promise=dbController.getOrganization();
            promise.then((value)=>{
                if(value!=null){
                    console.log(value);
                }else{
                    console.log("no hay estructura");
                }
            })
        });

        app.get('/', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            res.send("hi");
        });

        app.get('/main', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            res.render(path.resolve(htmlPath+'mainPage.html'));
        });

        app.get('/singup',function(req: Request, res: Response){
            res.render(path.resolve(htmlPath+'singUp.html'));            
        })

        app.post('/singup',function(req: Request, res: Response){
            
            var username = req.body.userName;
            var password = req.body.password;

        })

        app.get('/login', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            res.render(path.resolve(htmlPath+'LogIn.html'));
        });

        app.post('/login', async function (req: Request, res: Response) {
            console.log(req.body);
            var facade = new Proxy(new AccesDirector());
            //res.send(facade.verifyAcces(req.body.userName,req.body.password));
            var memberId:String = null;
            await facade.verifyAcces(req.body.userName,req.body.password).then((value)=>{
                memberId=value;
            })
            
            if(memberId==""){
                console.log("usuario no autorizado");
                res.send({ status: 0 });// 0 es que no es un usuario, creo que deberia ser redireccionado al singUp
            }else{
                var memberRol:String = null;
                await facade.getRol(memberId).then((value)=>{
                    memberRol=value
                })
                if(memberRol!=null){
                    res.send({ status: 1 , route:memberRol});
                }else{
                    res.send({ status: 2 });// 2 es que no tiene rol, so...?
                }
            }

            /*if((req.body.userName=="fabian" && req.body.password=="123")){
                req.session.user="fabian";
                res.send("10/10");
            }else{
                res.send({ status: 1 , route:"/main"});
            }*/
            
        });
        
        app.get('/comprobar', function (req: Request, res: Response) {
            if(req.session.user){
                res.send("iniciada");
            }else{
                res.send("no Iniciada");
            }
            
        });

        app.get('/logOut', function (req: Request, res: Response) {
            req.session.user=null;
            res.send("logOuting")
        });

        app.get('/about', function (req: Request, res: Response) {
            //res.send({ message: 'Hola amigos'});
            res.render(path.resolve(htmlPath+'about.html'));
        });

    }
}
