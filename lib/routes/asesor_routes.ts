import { Application, Request, Response } from "express";
var path = require("path");
const htmlPath = __dirname + "../../../lib/view/HTML/";
import controller from "../controller/Controller";
import dbController from "../Db/db_controllers/databaseController";
import { IStructure } from "../Db/db_estructure_model/struc_model";
import { IUser } from "../Db/db_user_model/member_model";


export class AsesorRotes {
  public route(app: Application) {


    ////////////////////////////////////////////////////////////////////
    //            VALIDACION DEL MOVIMIENTO CREADO                    // 
    ////////////////////////////////////////////////////////////////////

    const movementValidation = async (req: Request, res: Response, next: any):Promise<void> => {
      var isCreated = controller.movementIsCreated();
      if (!isCreated) {
        console.log("Aun no instanciada");
        var movementFromDb:IStructure=null;
        var membersFromDb:IUser[]=[];

        await dbController.getOrganization().then((value)=>{
          movementFromDb=value;
        })

        await dbController.getAllMember().then((value)=>{
          membersFromDb=value;
        })
        
        if(movementFromDb!=null){
          var status: boolean = controller.createMovement(Number(movementFromDb.cedulaJuridica), movementFromDb.name, movementFromDb.webDirection, movementFromDb.coutry, Number(movementFromDb.phone));
          if (membersFromDb.length>0) {//iterar e insertar en el gestor de miembros
            console.log("Levantando miembros");
            membersFromDb.forEach(element => {
              var facilitator=false;
              if(element.facilitator=="true"){
                facilitator=true;
              }
              controller.addMember(Number(element.memberId), element.name, Number(element.telephone), element.email, element.direction, facilitator);
            })
            for (let zindex = 0; zindex < movementFromDb.zonas.length; zindex++) {
              controller.createNewZone(Number(movementFromDb.zonas[zindex].id), movementFromDb.zonas[zindex].name);
              for (let bindex = 0; bindex < movementFromDb.zonas[zindex].ramas.length; bindex++) {
                controller.createNewBranch(movementFromDb.zonas[zindex].name, Number(movementFromDb.zonas[zindex].ramas[bindex].id), movementFromDb.zonas[zindex].ramas[bindex].name);
                for (let gindex = 0; gindex < movementFromDb.zonas[zindex].ramas[bindex].grupos.length; gindex++) {
                  controller.createNewGroup(movementFromDb.zonas[zindex].name, Number(movementFromDb.zonas[zindex].ramas[bindex].id), Number(movementFromDb.zonas[zindex].ramas[bindex].grupos[gindex].id), movementFromDb.zonas[zindex].ramas[bindex].grupos[gindex].name);
                  
                  console.log("Asignando Los Miembros");
                  movementFromDb.zonas[zindex].ramas[bindex].grupos[gindex].miembros.forEach(element => {
                    controller.addMemberToGroup(
                      movementFromDb.zonas[zindex].name,
                      Number(movementFromDb.zonas[zindex].ramas[bindex].id),
                      Number(movementFromDb.zonas[zindex].ramas[bindex].grupos[gindex].id),
                      Number(element))
                  });

                  console.log("Asignando Los Jefes");
                  movementFromDb.zonas[zindex].ramas[bindex].grupos[gindex].jefes.forEach(element => {
                    controller.assignGroupManagement(
                      movementFromDb.zonas[zindex].name,
                      Number(movementFromDb.zonas[zindex].ramas[bindex].id),
                      Number(movementFromDb.zonas[zindex].ramas[bindex].grupos[gindex].id),
                      Number(element))
                  });
                  
                  console.log("Asignando Los monitores");
                  movementFromDb.zonas[zindex].ramas[bindex].grupos[gindex].monitores.forEach(element => {
                    controller.changeToMonitor(
                      movementFromDb.zonas[zindex].name,
                      Number(movementFromDb.zonas[zindex].ramas[bindex].id),
                      Number(movementFromDb.zonas[zindex].ramas[bindex].grupos[gindex].id),
                      Number(element))
                  });
  
                }
  
                movementFromDb.zonas[zindex].ramas[bindex].jefes.forEach(element => {
                  controller.assignBranchManagement(
                    movementFromDb.zonas[zindex].name,
                    Number(movementFromDb.zonas[zindex].ramas[bindex].id),
                    Number(element)
                  )
                })
  
                movementFromDb.zonas[zindex].ramas[bindex].monitores.forEach(element => {
                  controller.defineMonitor(
                    Number(element),
                    movementFromDb.zonas[zindex].name,
                    Number(movementFromDb.zonas[zindex].ramas[bindex].id)
                  );
                })
  
              }
              movementFromDb.zonas[zindex].jefes.forEach(element => {
                controller.assignZoneManagement(
                  movementFromDb.zonas[zindex].name,
                  Number(element)
                )
              })
  
            }
          }else{
            console.log("No levanto nada de los miembros")
          }
        }else{
          console.log("No levanto nada de la estructura")
        }

      }else{
        console.log("Estructura ya instanciada");
      }
      next();
    }

    //////////////////////////////////////////////////////////////////// 
    ////////////////////////////////////////////////////////////////////
    //                  RUTAS  EN ORDEN DE MENU                    // 
    ////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////// 

    //*****************************************************************//

    ////////////////////////////////////////////////////////////////////
    //            FUNCIONES PARA CREAR UNA ESTRUCTURA                 // 
    ////////////////////////////////////////////////////////////////////

    //*****************************************************************//
    app.post("/crearEstructura", function (req: Request, res: Response) {
      console.log(req.body);
      console.log("Verificando que hace ajax1");
      var created: Boolean = controller.createNewZone(null, req.body.zonaName);
      ///                                             ///
      dbController.insertZoneTree(req.body.zonaName);
      ///                                             ///
      var notCreated: String[] = [];

      if (created) {
        for (let index = 0; index < req.body.branches.length; index++) {
          var createdBranch: Boolean = controller.createNewBranch(
            req.body.zonaName,
            Number(req.body.ids[index]),
            req.body.branches[index]
          );
          if (!createdBranch) {
            notCreated.push(req.body.branches[index]);
          } else {
            ///                                                                                             ///
            dbController.insertBranchTree(
              req.body.zonaName,
              req.body.ids[index],
              req.body.branches[index]
            );
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




    //*****************************************************************//

    ////////////////////////////////////////////////////////////////////
    //                 FUNCIONES PARA CREAR GRUPO                     // 
    ////////////////////////////////////////////////////////////////////

    //*****************************************************************//

    ////////////////////////////////////////////////////////////////////
    //         MUESTRA LOS DATOS DE LA ZONA, RAMA Y MONITOR           //
    //                EN CRAERA GRUPO  AL INICIO                      //
    ////////////////////////////////////////////////////////////////////

    app.post('/getShowDataCrearGrupo', function (req: Request, res: Response) {

      var dataZone = controller.getZones();
      var dataBrach = controller.getBranches(dataZone[0]);

      var idRama = String(dataBrach[0]).split("-", 2);

      var listaMonitores = controller.getMonitors(dataZone[0], Number(idRama[1]));
      console.log(dataZone);
      console.log(listaMonitores);
      if (dataZone.length > 0) {
        res.send({ status: 1, zonas: dataZone, ramas: dataBrach, monitores: listaMonitores });
      } else {
        res.send({ status: 0, zonas: dataZone, ramas: dataBrach, monitores: listaMonitores });
      }

    });

    ////////////////////////////////////////////////////////////////////
    //                        CREA EL GRUPO                           //
    ////////////////////////////////////////////////////////////////////
    app.post("/crearGrupo", function (req: Request, res: Response) {
      console.log(req.body);
      //zona:zona,rama:rama,monitor:monitor,grupo:grupo,idGrupo:idGrupo
      var idRama = String(req.body.rama).split("-", 2);
      var idMonitor = String(req.body.monitor).split("-", 2);

      var created: Boolean = controller.createNewGroup(
        req.body.zona,
        Number(idRama[1]),
        Number(req.body.idGrupo),
        req.body.grupo
      );

      if (created) {
        controller.addMonitor(
          req.body.zona,
          Number(idRama[1]),
          Number(req.body.idGrupo),
          Number(idMonitor[1])
        );
        controller.verEstructura();
        ///                                                                                             ///
        dbController.insertGroupTree(
          req.body.zona,
          idRama[1],
          req.body.grupo,
          req.body.idGrupo,
          idMonitor[1]
        );
        ///                                                                                             ///
        res.send({ status: 1 });
      } else {
        res.send({ status: 0 });
      }
    });






    //*****************************************************************//

    ////////////////////////////////////////////////////////////////////
    //              FUNCIONES PARA ASIGNAR MONITORES                  // 
    ////////////////////////////////////////////////////////////////////

    //*****************************************************************//




    ////////////////////////////////////////////////////////////////////
    //                 FUNCION  PARA CARGAR DATOS EN                   //
    //                         ASIGNAR MONITOR                        // 
    ////////////////////////////////////////////////////////////////////
    app.post("/getShowDataAsigMonitor", function (req: Request, res: Response) {
      var branches = controller.getAllBranchesInNeed();// NOMB-ID
      var monitores = controller.getAllMonitors();

      if (branches.length > 0) {
        res.send({ status: 1, ramas: branches, monitor: monitores });
      } else {
        res.send({ status: 0, ramas: branches, monitor: monitores });
      }
    });




    ////////////////////////////////////////////////////////////////////
    //                       ASIGNA EL MONITOR                        // 
    ////////////////////////////////////////////////////////////////////
    //----------------------------------------------------------------Asignacion de monitores
    app.post("/asignarCoach", function (req: Request, res: Response) {
      var coachId = req.body.coach;
      var idDestino = String(req.body.grupo).split("-", 2);

      let result = controller.defineMonitor(
        Number(coachId),
        idDestino[0],
        Number(idDestino[1])
      );
      if (result) {
        ///                                                                      ///
        dbController.insertMonitorBranch(idDestino[0], idDestino[1], coachId);
        ///                                                                      ///
        res.send({ status: 1 });
      } else {
        res.send({ status: 0 });
      }
    });





    //*****************************************************************//

    ////////////////////////////////////////////////////////////////////
    //            FUNCIONES PARA CONFORMAR COORDINACION               // 
    ////////////////////////////////////////////////////////////////////

    //*****************************************************************//


    ////////////////////////////////////////////////////////////////////
    //                        FORMULARIO UNO                          // 
    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    //                CARGA LA LISTA DE ZONAS EN EL                   //
    //           FORMULARIO 1 DE CONFORMAR COORDINACION               // 
    ////////////////////////////////////////////////////////////////////
    app.post('/getShowDataCCF1', function (req: Request, res: Response) {
      var dataZone = controller.getZones();
      if (dataZone.length > 0) {
        res.send({ status: 1, zonas: dataZone });
      } else {
        res.send({ status: 0, zonas: dataZone });
      }
    });

    ////////////////////////////////////////////////////////////////////
    //                         CONSULTA ZONA                          //
    //                       FUNCION DEL BOTON                        // 
    ////////////////////////////////////////////////////////////////////
    app.post("/consultarExistenciaZona", function (req: Request, res: Response) {
      var zoneName = req.body.nombreZona;

      let result = controller.consultZoneManagement(zoneName);
      console.log(result);
      if (result.listBranchChief.length > 0) {
        res.send({
          status: 1,
          listZoneChief: result.listZoneChief,
          listBranchChief: result.listBranchChief,
        });
      } else {
        res.send({ status: 0 });
      }
    });

    ////////////////////////////////////////////////////////////////////
    //                        ACEPTAR LOS JEFES                       //
    //                       FUNCION DEL BOTON                        // 
    ////////////////////////////////////////////////////////////////////
    //----------------------------------------------------------------Asignacion de Jefaturas
    app.post("/asignarJefesZona", function (req: Request, res: Response) {
      var zoneName = req.body.nombreZona;
      var first_Chief_Id = req.body.jefe1;
      var second_Chief_Id = req.body.jefe2;

      if (first_Chief_Id == "" && second_Chief_Id == "") {
        res.send({ status: 2 }); //no puede asignar
      } else if (
        (first_Chief_Id != "" && second_Chief_Id == "") ||
        first_Chief_Id == second_Chief_Id
      ) {
        var result = controller.assignZoneManagement(
          zoneName,
          Number(String(first_Chief_Id).split("-", 2)[1])
        );
        if (result) {
          ///                                                                      ///
          dbController.assignBossZone(
            zoneName,
            String(first_Chief_Id).split("-", 2)[1],
            ""
          );
          ///                                                                      ///
          res.send({ status: 1 });
        } else {
          res.send({ status: 0 });
        }
      } else {
        var result = controller.assignZoneManagement(
          zoneName,
          Number(String(first_Chief_Id).split("-", 2)[1])
        );
        var result2 = controller.assignZoneManagement(
          zoneName,
          Number(String(second_Chief_Id).split("-", 2)[1])
        );
        if (result && result2) {
          ///                                                                      ///
          dbController.assignBossZone(
            zoneName,
            String(first_Chief_Id).split("-", 2)[1],
            String(second_Chief_Id).split("-", 2)[1]
          );
          ///                                                                      ///
          res.send({ status: 1 });
        } else {
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
    });




    ////////////////////////////////////////////////////////////////////
    //                        FORMULARIO DOS                          // 
    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    //                CARGA LA LISTA DE ZONAS Y RAMAS EN EL           //
    //           FORMULARIO 2 DE CONFORMAR COORDINACION               // 
    ////////////////////////////////////////////////////////////////////
    app.post('/getShowDataCCF2', function (req: Request, res: Response) {
      var dataZone = controller.getZones();
      var dataBrach = controller.getBranches(dataZone[0]);
      if (dataZone.length > 0) {
        res.send({ status: 1, zonas: dataZone, ramas: dataBrach });
      } else {
        res.send({ status: 0, zonas: dataZone, ramas: dataBrach });
      }
    });

    ////////////////////////////////////////////////////////////////////
    //    ACTUALIZA LAS LISTAS DE RAMAS DEPUES DE SELECCIONAR         //
    //                           UNA ZONA                             //
    ////////////////////////////////////////////////////////////////////
    app.post('/getShowRamasCCF2', function (req: Request, res: Response) {
      var dataBrach = controller.getBranches(req.body.id);
      if (dataBrach.length > 0) {
        res.send({ status: 1, ramas: dataBrach });
      } else {
        res.send({ status: 0, ramas: dataBrach });
      }

    });

    ////////////////////////////////////////////////////////////////////
    //                CONSULTA LA RAMA EN BUSCA DE JEFES              //
    //                     FUNCION DEL BOTON                          //
    ////////////////////////////////////////////////////////////////////
    app.post("/consultarExistenciaRama", function (req: Request, res: Response) {
      var zoneName = req.body.zonaName;
      var branchId = req.body.idRama;

      let result = controller.consultBranchManagement(
        zoneName,
        Number(branchId)
      );

      if (result.listGroupChief.length > 0) {
        res.send({
          status: 1,
          listBranchChief: result.listBranchChief,
          listGroupChief: result.listGroupChief,
        });
      } else {
        res.send({ status: 0 });
      }
    });


    ////////////////////////////////////////////////////////////////////
    //        ACEPTA LA CONSULTA LA RAMA EN BUSCA DE JEFES            //
    //                     FUNCION DEL BOTON                          //
    ////////////////////////////////////////////////////////////////////
    app.post("/asignarJefesRama", function (req: Request, res: Response) {
      var zoneName = req.body.nombreZona;
      var branchId = req.body.idRama;
      var first_Chief_Id = req.body.jefe1;
      var second_Chief_Id = req.body.jefe2;

      if (first_Chief_Id == "" && second_Chief_Id == "") {
        res.send({ status: 2 }); //no puede asignar
      } else if (
        (first_Chief_Id != "" && second_Chief_Id == "") ||
        first_Chief_Id == second_Chief_Id
      ) {
        var result = controller.assignBranchManagement(
          zoneName,
          Number(branchId),
          Number(String(first_Chief_Id).split("-", 2)[1])
        );
        if (result) {
          ///                                                                      ///
          dbController.assignBossBranch(
            zoneName,
            branchId,
            String(first_Chief_Id).split("-", 2)[1],
            ""
          );
          ///                                                                      ///
          res.send({ status: 1 });
        } else {
          res.send({ status: 0 });
        }
      } else {
        var result = controller.assignBranchManagement(
          zoneName,
          Number(branchId),
          Number(String(first_Chief_Id).split("-", 2)[1])
        );
        var result2 = controller.assignBranchManagement(
          zoneName,
          Number(branchId),
          Number(String(second_Chief_Id).split("-", 2)[1])
        );
        if (result && result2) {
          ///                                                                      ///
          dbController.assignBossBranch(
            zoneName,
            branchId,
            String(first_Chief_Id).split("-", 2)[1],
            String(second_Chief_Id).split("-", 2)[1]
          );
          ///                                                                      ///
          res.send({ status: 1 });
        } else {
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
    });



    ////////////////////////////////////////////////////////////////////
    //                        FORMULARIO TRES                         // 
    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    //             CONSULTA EL GRUPO EN BUSCA DE JEFES                //
    //                     FUNCION DEL BOTON                          //
    ////////////////////////////////////////////////////////////////////
    app.post("/consultarExistenciaGrupo", function (
      req: Request,
      res: Response
    ) {
      var zoneName = req.body.zonaName;
      var branchId = req.body.ramaId;
      var groupId = req.body.grupoId;

      let result = controller.consultGroupManagement(
        zoneName,
        Number(branchId),
        Number(groupId)
      );
      if (result.listMembersChief.length > 0) {
        res.send({
          status: 1,
          listGroupChief: result.listGroupChief,
          listMembersChief: result.listMembersChief,
        });
      } else {
        res.send({ status: 0 });
      }
    });

    ////////////////////////////////////////////////////////////////////
    //        ACEPTA LA CONSULTA LOS GRUPOS EN BUSCA DE JEFES         //
    //                     FUNCION DEL BOTON                          //
    ////////////////////////////////////////////////////////////////////
    app.post("/asignarJefesGrupo", function (req: Request, res: Response) {
      var zoneName = req.body.nombreZona;
      var branchId = req.body.idRama;
      var groupId = req.body.idGrupo;
      var first_Chief_Id = req.body.jefe1;
      var second_Chief_Id = req.body.jefe2;

      console.log("Entra a ruta");

      if (first_Chief_Id == "" && second_Chief_Id == "") {
        console.log("Entra 1");
        res.send({ status: 2 }); //no puede asignar
      } else if (
        (first_Chief_Id != "" && second_Chief_Id == "") ||
        first_Chief_Id == second_Chief_Id
      ) {
        console.log("Entra 2");
        var result = controller.assignGroupManagement(
          zoneName,
          Number(branchId),
          Number(groupId),
          Number(String(first_Chief_Id).split("-", 2)[1])
        );
        if (result) {
          ///                                                                      ///
          dbController.assignBossGroup(
            zoneName,
            branchId,
            groupId,
            String(first_Chief_Id).split("-", 2)[1],
            ""
          );
          ///                                                                      ///
          res.send({ status: 1 });
        } else {
          res.send({ status: 0 });
        }
      } else {
        console.log("Entra 3");
        var result = controller.assignGroupManagement(
          zoneName,
          Number(branchId),
          Number(groupId),
          Number(String(first_Chief_Id).split("-", 2)[1])
        );
        var result2 = controller.assignGroupManagement(
          zoneName,
          Number(branchId),
          Number(groupId),
          Number(String(second_Chief_Id).split("-", 2)[1])
        );
        if (result && result2) {
          ///                                                                      ///
          dbController.assignBossGroup(
            zoneName,
            branchId,
            groupId,
            String(first_Chief_Id).split("-", 2)[1],
            String(second_Chief_Id).split("-", 2)[1]
          );
          ///                                                                      ///
          res.send({ status: 1 });
        } else {
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
    });






    //*****************************************************************//

    ////////////////////////////////////////////////////////////////////
    //            FUNCIONES PARA ADMINISTRAR MIEMBROS                 // 
    ////////////////////////////////////////////////////////////////////

    //*****************************************************************//



    ////////////////////////////////////////////////////////////////////
    //                        FORMULARIO UNO                          // 
    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    //                      AGREGAR UN NUEVO USUARIO                  // 
    ////////////////////////////////////////////////////////////////////
    app.post("/agregarUsuario", function (req: Request, res: Response) {
      //console.log(req.body)
      controller.addMember(
        Number(req.body.id),
        req.body.name,
        Number(req.body.celular),
        req.body.mail,
        req.body.direccion,
        Boolean(req.body.esMonitor)
      );
      controller.printMembers();
      ///                              ///
      dbController.create_user(req);
      ///                              ///
      res.send({ status: 1 });
    });


    ////////////////////////////////////////////////////////////////////
    //                        FORMULARIO DOS                          // 
    ////////////////////////////////////////////////////////////////////

    app.post("/getShowUser", function (req: Request, res: Response) {
      ////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////
    });






    ////////////////////////////////////////////////////////////////////
    //                    ELIMINAR A CIERTO USUARIO                   // 
    ////////////////////////////////////////////////////////////////////

    app.post("/borrarUsuario", function (req: Request, res: Response) {
      //console.log(req.body)
      controller.deleteMember(Number(req.body.id));
      controller.printMembers();
      ///                              ///
      dbController.delete_user(req);
      ///                              ///
      res.send({ status: 1 });
    });



    ////////////////////////////////////////////////////////////////////
    //                        FORMULARIO TRES                         // 
    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    //                   MODIFICAR A CIERTO USUARIO                   // 
    ////////////////////////////////////////////////////////////////////
    app.post("/actualizarUsuario", function (req: Request, res: Response) {
      //console.log(req.body)
      controller.upDateMember(
        Number(req.body.id),
        req.body.name,
        req.body.celular,
        req.body.mail,
        req.body.direccion,
        Boolean(req.body.esMonitor)
      );
      controller.printMembers();
      ///                              ///
      // dbController.update_user(req)
      ///                              ///
      res.send({ status: 1 });
    });



    ////////////////////////////////////////////////////////////////////
    //                        FORMULARIO CUATRO                        // 
    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    //                       AUTORIZAR MOVIMIENTO                     // 
    ////////////////////////////////////////////////////////////////////
    app.post("/moverUsuario", function (req: Request, res: Response) {
      var data = req.body.id;
      var procedenciaZonaName = req.body.procedenciaZonaName;
      var procedenciaIdRama = req.body.procedenciaIdRama;
      var procedenciaidGrupo = req.body.procedenciaidGrupo;

      var destinoZonaName = req.body.destinoZonaName;
      var destinoIdRama = req.body.destinoIdRama;
      var destinoidGrupo = req.body.destinoidGrupo;

      var swaped = controller.swapGroup(
        procedenciaZonaName,
        Number(procedenciaIdRama),
        Number(procedenciaidGrupo),
        Number(data),
        destinoZonaName,
        Number(destinoIdRama),
        Number(destinoidGrupo)
      );
      if (swaped) {
        ///                                                                                 ///
        dbController.moveMemberGroups(
          procedenciaZonaName,
          procedenciaIdRama,
          procedenciaidGrupo,
          destinoZonaName,
          destinoIdRama,
          destinoidGrupo,
          data
        );
        ///                                                                                 ///
        res.send({ status: 1 });
      } else {
        res.send({ status: 0 });
      }
    });






    //*****************************************************************//

    ////////////////////////////////////////////////////////////////////
    //               FUNCIONES PARA CONSULTAS VARIAS                  // 
    ////////////////////////////////////////////////////////////////////

    //*****************************************************************//


    ////////////////////////////////////////////////////////////////////
    //                        FORMULARIO UNO                         // 
    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    //                       POSICION DE UN GRUPO                     // 
    ////////////////////////////////////////////////////////////////////
    app.post("/getGrupo", function (req: Request, res: Response) {
      console.log(req.body);
      var data = controller.consultGroup(Number(req.body.id), req.body.nombre);
      if (data != null) {
        res.send({ status: 1, zona: data.ZoneName, rama: data.BranchName });
      } else {
        res.send({ status: 0 });
      }
    });



    ////////////////////////////////////////////////////////////////////
    //                        FORMULARIO DOS                         // 
    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    //                 PARTICIPACION DE UN MIEMBOR                    // 
    ////////////////////////////////////////////////////////////////////
    app.post("/getParticipacion", function (req: Request, res: Response) {
      console.log(req.body); //aqui se obtiene el id del miembro
      var data = controller.consultMemberParticipation(Number(req.body.id));

      if (
        (data.zonas.length > 0 && data.ramas.length > 0, data.grupos.length > 0)
      ) {
        res.send({
          status: 1,
          zonas: data.zonas,
          ramas: data.ramas,
          grupos: data.grupos,
        });
      } else {
        res.send({ status: 0 });
      }

      //res.send({status:1,zonas:["zona1","zona2"],ramas:["rama1","rama2"],grupos:["grupo1","grupo2"]});
    });



    ////////////////////////////////////////////////////////////////////
    //                        FORMULARIO TRES                        // 
    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    //                     MIEMBRO POR ELEMENTO                       // 
    ////////////////////////////////////////////////////////////////////
    app.post("/getMiembrosNivel", function (req: Request, res: Response) {
      console.log(req.body); //aqui se obtiene el tipo de nivel, y el id de ese nivel
      var data: String[] = [];
      if (req.body.nivel == "Zona") {
        data = controller.getZoneManagement(req.body.id);
      } else if (req.body.nivel == "Rama") {
        data = controller.getBranchManagement(Number(req.body.id));
      } else {
        data = controller.getGroupManagement(Number(req.body.id));
      }
      //res.send({status:1,miembros:["juan","pedro","juanito"]});
    });








    //*****************************************************************//
    ////////////////////////////////////////////////////////////////////
    //              FUNCIONES PARA CREAR MOVIMIENTO                   // 
    ////////////////////////////////////////////////////////////////////
    //*****************************************************************//

    ////////////////////////////////////////////////////////////////////
    //                      CREAR MOVIMIENTO                          //
    //                     FUNCION DEL BOTON                          //
    ////////////////////////////////////////////////////////////////////
    app.post("/crearMovimiento", function (req: Request, res: Response) {
      //console.log(req.body)
      var status: boolean = controller.createMovement(
        Number(req.body.cedulaJuridica),
        req.body.nombre,
        req.body.web,
        req.body.pais,
        Number(req.body.telefono)
      );

      if (status == true) {
        ///                                                                                 ///
        dbController.createOrganization(
          req.body.nombre,
          req.body.pais,
          req.body.cedulaJuridica,
          req.body.web,
          req.body.telefono
        );
        ///                                                                                 ///
        res.send({ status: 1 });
      } else {
        res.send({ status: 0 });
      }
    });







    //*****************************************************************//
    ////////////////////////////////////////////////////////////////////
    //               FUNCIONES PARA AGREGAR MIEMBOR                   // 
    ////////////////////////////////////////////////////////////////////
    //*****************************************************************//


    ////////////////////////////////////////////////////////////////////
    //            MUESTRA LOS DATOS DE LA ZONA, RAMA Y GRUPO          //
    //               EN AGREGAR MIEMBRO   AL INICIO                   //
    ////////////////////////////////////////////////////////////////////
    app.post('/getShowDataMember', function (req: Request, res: Response) {
      var dataZone = controller.getZones();
      var dataBrach = controller.getBranches(dataZone[0]);
      var idBrach = String(dataBrach[0]).split("-", 2);
      var dataGrup = controller.getGroups(dataZone[0], Number(idBrach[1]));

      if (dataZone.length > 0) {
        res.send({ status: 1, zonas: dataZone, ramas: dataBrach, grupos: dataGrup });
      } else {
        res.send({ status: 0, zonas: dataZone, ramas: dataBrach, grupos: dataGrup });
      }

    });


    ////////////////////////////////////////////////////////////////////
    //    ACTUALIZA LAS LISTAS DE RAMAS DEPUES DE SELECCIONAR         //
    //                           UNA ZONA                             //
    ////////////////////////////////////////////////////////////////////
    app.post('/getShowRamasMember', function (req: Request, res: Response) {
      var dataBrach = controller.getBranches(req.body.id);
      if (dataBrach.length > 0) {
        res.send({ status: 1, ramas: dataBrach });
      } else {
        res.send({ status: 0, ramas: dataBrach });
      }

    });


    ////////////////////////////////////////////////////////////////////
    //    ACTUALIZA LAS LISTAS DE GRUPOS DEPUES DE SELECCIONAR        //
    //                     UNA ZONA Y UNA RAMA                        //
    ////////////////////////////////////////////////////////////////////
    app.post('/getShowGruposMember', function (req: Request, res: Response) {

      var idBrach = String(req.body.idR).split("-", 2);
      var dataGroup = controller.getGroups(req.body.idZ, Number(idBrach[1]));

      if (dataGroup.length > 0) {
        res.send({ status: 1, grupos: dataGroup });
      } else {
        res.send({ status: 0, grupos: dataGroup });
      }

    });






    ////////////////////////////////////////////////////////////////////
    //                    AGREGAR MIEMBRO A GRUPO                     //
    //                     FUNCION DEL BOTON                          //
    ////////////////////////////////////////////////////////////////////
    app.post("/agregarMiembroAGrupo", function (req: Request, res: Response) {
      console.log(req.body); //aqui se obtiene toda la info del mae
      var agregado = controller.addMemberToGroup(
        req.body.zona,
        Number(req.body.rama),
        Number(req.body.grupo),
        Number(req.body.idMiembro)
      );

      if (agregado) {
        controller.verEstructura();
        ///                                                                                 ///
        dbController.insertMemberGroup(
          req.body.zona,
          req.body.rama,
          req.body.grupo,
          req.body.idMiembro
        );
        ///                                                                                 ///
        res.send({ status: 1 });
      } else {
        res.send({ status: 0 });
      }
    });





    //*****************************************************************//

    ////////////////////////////////////////////////////////////////////
    //                      FUNCIONES AUXILIARES                      // 
    ////////////////////////////////////////////////////////////////////

    //*****************************************************************//

    app.get("/asesorMain", movementValidation, function (req: Request, res: Response) {
      res.render(path.resolve(htmlPath + "AsesorGeneral.html"));
    });

    app.post("/obtenerZonas", function (req: Request, res: Response) {
      //res.send({zonas:[1,2,3]});
      var listaZona: String[] = controller.getZones();

      if (listaZona.length > 0) {
        res.send({ status: 1, zonas: listaZona });
      } else {
        res.send({ status: 0, zonas: listaZona });
      }
    });

    app.post("/obtenerRamas", function (req: Request, res: Response) {
      console.log(req.body.zona); //aqui viene la zona que hay que buscar las ramas
      var listaBranches: String[] = controller.getBranches(req.body.zona);
      console.log(listaBranches);
      if (listaBranches.length > 0) {
        res.send({ status: 1, branches: listaBranches });
      } else {
        res.send({ status: 0, branches: listaBranches });
      }
      //res.send({ramas:["hola","mundo"]});
    });

    app.post("/obtenerMonitoresDisponibles", function (
      req: Request,
      res: Response
    ) {
      var listaMonitores: String[] = controller.getMonitors(
        req.body.zona,
        Number(req.body.ramaId)
      );

      if (listaMonitores.length > 0) {
        res.send({ status: 1, monitores: listaMonitores });
      } else {
        res.send({ status: 0, monitores: listaMonitores });
      }

      //res.send({monitores:["juan","perez"]});
    });

  }








}



