import { Application, Request, Response } from 'express';
var path = require('path');
const htmlPath = __dirname + '../../../lib/view/HTML/';
import controller from '../controller/Controller'
import dbController from '../Db/db_controllers/databaseController'

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
            //console.log(req.body);
            var created: Boolean = controller.createNewZone(null, req.body.zonaName);
            ///                                             ///
            dbController.insertZoneTree(req.body.zonaName)
            ///                                             ///
            var notCreated: String[] = [];

            if (created) {
                for (let index = 0; index < req.body.branches.length; index++) {
                    var createdBranch: Boolean = controller.createNewBranch(req.body.zonaName, Number(req.body.ids[index]), req.body.branches[index]);
                    if (!createdBranch) {
                        notCreated.push(req.body.branches[index]);
                    }else{
                        ///                                                                                             ///
                        dbController.insertBranchTree(req.body.zonaName, req.body.ids[index], req.body.branches[index])
                        ///                                                                                             ///
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
                controller.addMonitor(req.body.zona,Number(idRama[1]),Number(req.body.idGrupo),Number(idMonitor[1]));
                controller.verEstructura();
                ///                                                                                             ///
                dbController.insertGroupTree(req.body.zona, idRama[1], req.body.grupo, req.body.idGrupo, idMonitor[1])
                ///                                                                                             ///
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
                ///                                                                      ///
                dbController.insertMonitorBranch(idDestino[0], idDestino[1], coachId)
                ///                                                                      ///
                res.send({ status: 1 });
            } else {
                res.send({ status: 0 });
            }
        })

        //Conformacion de coordinacion
        //----------------------------------------------------------------Consulta de Jefaturas
        app.post('/consultarExistenciaZona', function (req: Request, res: Response) {
            var zoneName = req.body.nombreZona;

            let result = controller.consultZoneManagement(zoneName);
            console.log(result);
            if(result.listBranchChief.length>0){
                res.send({ status: 1, listZoneChief:result.listZoneChief, listBranchChief:result.listBranchChief});
            }else{
                res.send({ status: 0 });
            }

            
        })

        app.post('/consultarExistenciaRama', function (req: Request, res: Response) {
            var zoneName = req.body.zonaName;
            var branchId = req.body.idRama;

            let result = controller.consultBranchManagement(zoneName,Number(branchId));
            
            if(result.listGroupChief.length>0){
                res.send({ status: 1,listBranchChief:result.listBranchChief, listGroupChief:result.listGroupChief});
            }else{
                res.send({ status: 0 });
            }
        })

        app.post('/consultarExistenciaGrupo', function (req: Request, res: Response) {
            var zoneName = req.body.zonaName;
            var branchId = req.body.ramaId;
            var groupId = req.body.grupoId;

            let result = controller.consultGroupManagement(zoneName,Number(branchId), Number(groupId));
            if(result.listMembersChief.length>0){
                res.send({ status: 1,listGroupChief:result.listGroupChief,listMembersChief:result.listMembersChief});
            }else{
                res.send({ status: 0 });
            }
        })
        //----------------------------------------------------------------Asignacion de Jefaturas
        app.post('/asignarJefesZona', function (req: Request, res: Response) {
            var zoneName = req.body.nombreZona;
            var first_Chief_Id = req.body.jefe1;
            var second_Chief_Id = req.body.jefe2;

            if(first_Chief_Id=="" && second_Chief_Id==""){
                res.send({ status: 2 });//no puede asignar
            }else if((first_Chief_Id!="" && second_Chief_Id=="")||(first_Chief_Id == second_Chief_Id)){  
                var result = controller.assignZoneManagement(zoneName, Number( String(first_Chief_Id).split("-",2)[1] ) );
                if(result){
                    ///                                                                      ///
                    dbController.assignBossZone(zoneName, String(first_Chief_Id).split("-",2)[1],"") 
                    ///                                                                      ///
                    res.send({ status: 1 });
                }else{
                    res.send({ status: 0 });
                }
            }else{

                var result = controller.assignZoneManagement(zoneName, Number( String(first_Chief_Id).split("-",2)[1] ) );
                var result2 = controller.assignZoneManagement(zoneName, Number( String(second_Chief_Id).split("-",2)[1] ) );
                if(result && result2){
                    ///                                                                      ///
                    dbController.assignBossZone(zoneName, String(first_Chief_Id).split("-",2)[1], String(second_Chief_Id).split("-",2)[1]) 
                    ///                                                                      ///
                    res.send({ status: 1 });
                }else{
                    res.send({ status: 0 });
                }
                
            }

            

            /*let result = controller.consultZoneManagement(zoneName);
            if (result>=2) {
                res.send({ status: 0 });
            } else{
                controller.assignZoneManagement(zoneName,first_Chief_Name,first_Chief_Id,second_Chief_Name,second_Chief_Id);
                res.send({ status: 1 });
            }*/
        })

        app.post('/asignarJefesRama', function (req: Request, res: Response) {
            var zoneName = req.body.nombreZona;
            var branchId = req.body.idRama;
            var first_Chief_Id = req.body.jefe1;
            var second_Chief_Id = req.body.jefe2;

            if(first_Chief_Id=="" && second_Chief_Id==""){
                res.send({ status: 2 });//no puede asignar
            }else if((first_Chief_Id!="" && second_Chief_Id=="")||(first_Chief_Id == second_Chief_Id)){  
                var result = controller.assignBranchManagement(zoneName, Number(branchId) ,Number( String(first_Chief_Id).split("-",2)[1] ) );
                if(result){
                    ///                                                                      ///
                    dbController.assignBossBranch(zoneName, branchId, String(first_Chief_Id).split("-",2)[1], "")
                    ///                                                                      ///
                    res.send({ status: 1 });
                }else{
                    res.send({ status: 0 });
                }
            }else{
                var result = controller.assignBranchManagement(zoneName, Number(branchId),  Number( String(first_Chief_Id).split("-",2)[1] ) );
                var result2 = controller.assignBranchManagement(zoneName, Number(branchId), Number( String(second_Chief_Id).split("-",2)[1] ) );
                if(result && result2){
                    ///                                                                      ///
                    dbController.assignBossBranch(zoneName, branchId, String(first_Chief_Id).split("-",2)[1], String(second_Chief_Id).split("-",2)[1]) 
                    ///                                                                      ///
                    res.send({ status: 1 });
                }else{
                    res.send({ status: 0 });
                }
            }

            /*let result = controller.assignBranchManagement(branchName, Number(branchId), first_Chief_Name, first_Chief_Id, second_Chief_Name, second_Chief_Id);
            if (result) {
                res.send({ status: 1 });
            } else {
                res.send({ status: 0 });
            }
            res.send({ status: 1 });*/
        })

        app.post('/asignarJefesGrupo', function (req: Request, res: Response) {
            var zoneName = req.body.nombreZona;
            var branchId = req.body.idRama;
            var groupId = req.body.idGrupo;
            var first_Chief_Id = req.body.jefe1;
            var second_Chief_Id = req.body.jefe2;

            console.log("Entra a ruta")

            if(first_Chief_Id=="" && second_Chief_Id==""){
                console.log("Entra 1")
                res.send({ status: 2 });//no puede asignar
            }else if((first_Chief_Id!="" && second_Chief_Id=="")||(first_Chief_Id == second_Chief_Id)){
                console.log("Entra 2")  
                var result = controller.assignGroupManagement(zoneName, Number(branchId), Number(groupId) ,Number( String(first_Chief_Id).split("-",2)[1] ) );
                if(result){
                    ///                                                                      ///
                    dbController.assignBossGroup(zoneName, branchId, groupId, String(first_Chief_Id).split("-",2)[1], "") 
                    ///                                                                      ///
                    res.send({ status: 1 });
                }else{
                    res.send({ status: 0 });
                }
            }else{
                console.log("Entra 3")
                var result = controller.assignGroupManagement(zoneName, Number(branchId), Number(groupId),  Number( String(first_Chief_Id).split("-",2)[1] ) );
                var result2 = controller.assignGroupManagement(zoneName, Number(branchId), Number(groupId), Number( String(second_Chief_Id).split("-",2)[1] ) );
                if(result && result2){
                    ///                                                                      ///
                    dbController.assignBossGroup(zoneName, branchId, groupId, String(first_Chief_Id).split("-",2)[1], String(second_Chief_Id).split("-",2)[1]) 
                    ///                                                                      ///
                    res.send({ status: 1 });
                }else{
                    res.send({ status: 0 });
                }
            }

            /*let result = controller.assignGroupManagement(groupName, Number(groupId), first_Chief_Name, first_Chief_Id, second_Chief_Name, second_Chief_Id);
            if (result) {
                res.send({ status: 1 });
            } else {
                res.send({ status: 0 });
            }
            res.send({ status: 1 });*/
        })


        //----------------------------------------------------------------Para la administracion de miembros
        app.post('/agregarUsuario',function (req: Request, res: Response){
            //console.log(req.body)
            controller.addMember(Number(req.body.id),req.body.name,Number(req.body.celular),req.body.mail,req.body.direccion,Boolean(req.body.esMonitor))
            controller.printMembers();
            ///                              ///
            dbController.create_user(req)
            ///                              ///
            res.send({status:1});
        })

        app.post('/actualizarUsuario',function (req: Request, res: Response){
            controller.upDateMember(Number(req.body.id),req.body.name,req.body.celular,req.body.mail,req.body.direccion,Boolean(req.body.esMonitor))
            controller.printMembers();
            ///                              ///
            //dbController.update_user(req)
            ///                              ///
            res.send({status:1});
        })

        app.post('/borrarUsuario'  ,function (req: Request, res: Response){
            controller.deleteMember(Number(req.body.id));
            controller.printMembers();
            ///                              ///
            dbController.delete_user(req)
            ///                              ///
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
                ///                                                                                 ///
                dbController.moveMemberGroups(procedenciaZonaName, procedenciaIdRama, procedenciaidGrupo,
                    destinoZonaName, destinoIdRama, destinoidGrupo, data)
                ///                                                                                 ///
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
            if(String(req.body.nivel)=="zona"){
                data=controller.getZoneManagement();
            }else if(String(req.body.nivel)=="rama"){
                data=controller.getBranchManagement();
            }else{
                data=controller.getGroupManagement();
            }
            if(data.length>0){
                res.send({ status: 1, miembros:data });
            }else{
                res.send({ status: 0 });
            }
            //res.send({status:1,miembros:["juan","pedro","juanito"]});
        })

        //----------------------------------------------------------------Agregar miembro a grupo
        app.post('/agregarMiembroAGrupo', function (req: Request, res: Response){
            console.log(req.body)//aqui se obtiene toda la info del mae
            var agregado = controller.addMemberToGroup(req.body.zona,Number(req.body.rama),Number(req.body.grupo),Number(req.body.idMiembro))
            
            if (agregado) {
                controller.verEstructura();
                ///                                                                                 ///
                dbController.insertMemberGroup(req.body.zona,req.body.rama,req.body.grupo,req.body.idMiembro)
                ///                                                                                 ///
                res.send({status:1});
            } else {
                res.send({status:0});
            }

        })

        //----------------------------------------------------------------Crear Movimiento
        app.post('/crearMovimiento'  ,function (req: Request, res: Response){
            //console.log(req.body)
            var status:boolean = controller.createMovement(Number(req.body.cedulaJuridica),
                req.body.nombre,req.body.web,req.body.pais,Number(req.body.telefono));
            if (status == true) {
                ///                                                                                 ///
                dbController.createOrganization(req.body.nombre, req.body.pais, req.body.cedulaJuridica,
                    req.body.web, req.body.telefono)
                ///                                                                                 ///
                res.send({status:1});
            } else {
                   res.send({status:0});
            }

        })
    }
}
