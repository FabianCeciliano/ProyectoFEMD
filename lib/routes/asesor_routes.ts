import { Application, Request, Response } from 'express';
var path = require('path');
const htmlPath = __dirname + '../../../lib/view/HTML/';
import controller from '../controller/Controller'

export class AsesorRotes {
    public route(app: Application) {

        // Mismatch URL
        /*app.all('*', function (req: Request, res: Response) {
            res.status(404).send({ error: true, message: 'Check your URL please' });
        });*/

        app.get('/asesorMain', function (req: Request, res: Response) {
            res.render(path.resolve(htmlPath + 'AsesorGeneral.html'));
        });

        //----------------------------------------------------------------Creacion de estructura
        app.post('/crearEstructura', function (req: Request, res: Response) {
            console.log(req.body);
            console.log("Verificando que hace ajax1");
            var created: Boolean = controller.createNewZone(null, req.body.zonaName);
            //manda a la base...
            var notCreated: String[] = [];

            if (created) {
                for (let index = 0; index < req.body.branches.length; index++) {
                    var createdBranch: Boolean = controller.createNewBranch(req.body.zonaName, Number(req.body.ids[index]), req.body.branches[index]);
                    if (!createdBranch) {
                        notCreated.push(req.body.branches[index]);
                    }
                }
                if (notCreated.length > 0) {
                    res.send({ status: 2, notCreated: notCreated });
                } else {
                    res.send({ status: 1 });
                }
            } else {
                res.send({ status: 0 }).end();
            }


        });

        //----------------------------------------------------------------Crear Grupo
        app.post('/obtenerZonas', function (req: Request, res: Response) {
            //res.send({zonas:[1,2,3]});
            var listaZona: String[] = controller.getZones();

            if (listaZona.length > 0) {
                res.send({ status: 1, zonas: listaZona });
            } else {
                res.send({ status: 0, zonas: listaZona });
            }

        })

        app.post('/obtenerRamas', function (req: Request, res: Response) {
            console.log(req.body.zona)//aqui viene la zona que hay que buscar las ramas
            var listaBranches: String[] = controller.getBranches(req.body.zona);
            console.log(listaBranches);
            if (listaBranches.length > 0) {
                res.send({ status: 1, branches: listaBranches });
            } else {
                res.send({ status: 0, branches: listaBranches });
            }
            //res.send({ramas:["hola","mundo"]});
        })

        app.post('/obtenerMonitoresDisponibles', function (req: Request, res: Response) {
            var listaMonitores: String[] = controller.getMonitors(req.body.zona,Number(req.body.ramaId));

            if (listaMonitores.length > 0) {
                res.send({ status: 1, monitores: listaMonitores });
            } else {
                res.send({ status: 0, monitores: listaMonitores });
            }

            //res.send({monitores:["juan","perez"]});
        })

        app.post('/crearGrupo', function (req: Request, res: Response) {
            console.log(req.body)
            //zona:zona,rama:rama,monitor:monitor,grupo:grupo,idGrupo:idGrupo
            var idRama = String(req.body.rama).split('-', 2)
            var idMonitor = String(req.body.monitor).split('-', 2)

            var created: Boolean = controller.createNewGroup(req.body.zona, Number(idRama[1]), Number(req.body.idGrupo), req.body.grupo)

            if (created) {
                controller.addMonitor(req.body.zona,Number(idRama[1]),Number(req.body.idGrupo),Number(idMonitor));
                controller.verEstructura();
                res.send({ status: 1 });
            } else {
                res.send({ status: 0 });
            }

        })

        //----------------------------------------------------------------Asignacion de monitores
        app.post('/asignarCoach', function (req: Request, res: Response) {

            var coachId = req.body.coach;
            var idDestino = String(req.body.grupo).split("-",2);                        
            
            let result = controller.defineMonitor(Number(coachId), idDestino[0],Number(idDestino[1]));
            if (result) {
                res.send({ status: 1 });
            } else {
                res.send({ status: 0 });
            }
        })

        //Conformacion de coordinacion
        //----------------------------------------------------------------Consulta de Jefaturas
        app.post('/consultarExistenciaZona', function (req: Request, res: Response) {

            var zoneName = req.body.jefeZonaZName;
            let result = controller.consultZoneManagement(zoneName);
            res.send({ status: result });
        })

        app.post('/consultarExistenciaRama', function (req: Request, res: Response) {

            var branchId = req.body.jefeRamaRId;
            let result = controller.consultBranchManagement(branchId);
            res.send({ status: result });
        })

        app.post('/consultarExistenciaGrupo', function (req: Request, res: Response) {

            var groupId = req.body.jefeGrupoGId;
            let result = controller.consultGroupManagement(groupId);
            res.send({ status: result });
        })
        //----------------------------------------------------------------Asignacion de Jefaturas
        app.post('/asignarJefesZona', function (req: Request, res: Response) {
            var zoneName = req.body.jefeZonaZName;
            var first_Chief_Name = req.body.jefeZonaP1Name;
            var first_Chief_Id = req.body.jefeZonaP1Id;
            var second_Chief_Name = req.body.jefeZonaP2Name;
            var second_Chief_Id = req.body.jefeZonaP2Id;
            let result = controller.consultZoneManagement(zoneName);
            if (result>=2) {
                res.send({ status: 0 });
            } else{
                controller.assignZoneManagement(zoneName,first_Chief_Name,first_Chief_Id,second_Chief_Name,second_Chief_Id);
                res.send({ status: 1 });
            }
        })

        app.post('/asignarJefesRama', function (req: Request, res: Response) {
            var branchName = req.body.jefeRamaRName;
            var branchId = req.body.jefeRamaRId;
            var first_Chief_Name = req.body.jefeRamaP1Name;
            var first_Chief_Id = req.body.jefeRamaP1Id;
            var second_Chief_Name = req.body.jefeRamaP2Name;
            var second_Chief_Id = req.body.jefeRamaP2Id;
            let result = controller.assignBranchManagement(branchName, Number(branchId), first_Chief_Name, first_Chief_Id, second_Chief_Name, second_Chief_Id);
            if (result) {
                res.send({ status: 1 });
            } else {
                res.send({ status: 0 });
            }
            res.send({ status: 1 });
        })

        app.post('/asignarJefesGrupo', function (req: Request, res: Response) {
            var groupName = req.body.jefeGrupoGName;
            var groupId = req.body.jefeGrupoGId;
            var first_Chief_Name = req.body.jefeGrupoP1Name;
            var first_Chief_Id = req.body.jefeGrupoP1Id;
            var second_Chief_Name = req.body.jefeGrupoP2Name;
            var second_Chief_Id = req.body.jefeGrupoP2Id;
            let result = controller.assignGroupManagement(groupName, Number(groupId), first_Chief_Name, first_Chief_Id, second_Chief_Name, second_Chief_Id);
            if (result) {
                res.send({ status: 1 });
            } else {
                res.send({ status: 0 });
            }
            res.send({ status: 1 });
        })


        //----------------------------------------------------------------Para la administracion de miembros
        app.post('/agregarUsuario',function (req: Request, res: Response){
            //console.log(req.body)
            controller.addMember(Number(req.body.id),req.body.name,Number(req.body.celular),req.body.mail,req.body.direccion,Boolean(req.body.esMonitor))
            controller.printMembers();
            res.send({status:1});
        })

        app.post('/actualizarUsuario',function (req: Request, res: Response){
            //console.log(req.body)
            controller.upDateMember(Number(req.body.id),req.body.name,req.body.celular,req.body.mail,req.body.direccion,Boolean(req.body.esMonitor))
            controller.printMembers();
            res.send({status:1});
        })

        app.post('/borrarUsuario'  ,function (req: Request, res: Response){
            //console.log(req.body)
            controller.deleteMember(Number(req.body.id));
            controller.printMembers();
            res.send({status:1});
        })

        app.post('/moverUsuario',  function (req: Request, res: Response){
            var data = req.body.id;            
            var procedenciaZonaName = req.body.procedenciaZonaName;
            var procedenciaIdRama = req.body.procedenciaIdRama;
            var procedenciaidGrupo = req.body.procedenciaidGrupo;
            
            var destinoZonaName = req.body.destinoZonaName;
            var destinoIdRama = req.body.destinoIdRama;
            var destinoidGrupo = req.body.destinoidGrupo;
            
            var swaped = controller.swapGroup(procedenciaZonaName,Number(procedenciaIdRama),Number(procedenciaidGrupo),Number(data),destinoZonaName,Number(destinoIdRama),Number(destinoidGrupo));
            if (swaped) {
                res.send({status:1});
            } else {
                res.send({ status: 0 });
            }
        })

        //----------------------------------------------------------------Para consultas varias
        app.post('/getGrupo', function (req: Request, res: Response){
            console.log(req.body)
            var data = controller.consultGroup(Number(req.body.id),req.body.nombre)
            if (data!=null) {
                res.send({status:1,zona:data.ZoneName,rama:data.BranchName});
            } else {
                res.send({ status: 0 });
            }
            
        })

        app.post('/getParticipacion', function (req: Request, res: Response){
            console.log(req.body)//aqui se obtiene el id del miembro
            var data = controller.consultMemberParticipation(Number(req.body.id));

            if(data.zonas.length>0 && data.ramas.length>0,data.grupos.length>0){
                res.send({status:1,zonas:data.zonas,ramas:data.ramas,grupos:data.grupos});
            } else {
                res.send({ status: 0 });
            }

            //res.send({status:1,zonas:["zona1","zona2"],ramas:["rama1","rama2"],grupos:["grupo1","grupo2"]});
        })

        app.post('/getMiembrosNivel', function (req: Request, res: Response) {
            console.log(req.body)//aqui se obtiene el tipo de nivel, y el id de ese nivel
            var data:String[] = [];
            if(req.body.nivel=="Zona"){
                data=controller.getZoneManagement(req.body.id);
            }else if(req.body.nivel=="Rama"){
                data=controller.getBranchManagement(Number(req.body.id));
            }else{
                data=controller.getGroupManagement(Number(req.body.id));
            }
            //res.send({status:1,miembros:["juan","pedro","juanito"]});
        })

        //----------------------------------------------------------------Agregar miembro a grupo
        app.post('/agregarMiembroAGrupo', function (req: Request, res: Response){
            console.log(req.body)//aqui se obtiene toda la info del mae
            var agregado = controller.addMemberToGroup(req.body.zona,Number(req.body.rama),Number(req.body.grupo),Number(req.body.idMiembro))
            
            if (agregado) {
                controller.verEstructura();
                res.send({status:1});
            } else {
                res.send({status:0});
            }

        })

        //----------------------------------------------------------------Crear Movimiento
        app.post('/crearMovimiento'  ,function (req: Request, res: Response){
            //console.log(req.body)
            var status:boolean = controller.createMovement(Number(req.body.cedulaJuridica),req.body.nombre,req.body.web,req.body.pais,Number(req.body.telefono));

            if (status == true) {
                res.send({status:1});
            } else {
                   res.send({status:0});
            }

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
