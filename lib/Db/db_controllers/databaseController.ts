import { Request, Response } from "express";
import e = require("express");
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
} from "../common/service";
import UserService from "../db_user_model/member_service";
import StructureService from "../db_estructure_model/structure_service";
import { IStructure } from "../db_estructure_model/struc_model";
import { IUser, IUserC } from "../db_user_model/member_model";
import { IZone } from "../db_estructure_model/zone_model";
import { IRama } from "../db_estructure_model/rama_model";
import { IGroup } from "../db_estructure_model/grupo_model";

export class dbController {
  private user: UserService = new UserService();
  private structures: StructureService = new StructureService();

  ////                                                                                 ////
  ////                                                                                 ////
  //                               User Handling                                     //
  ////                                                                                 ////
  ////                                                                                 ////
  ///                                                                   ///
  //     Create User    //
  // dbController.create_user(req)
  ///                                                                   ///
  public create_user(req: Request) {
    // this check whether all the filds were send through the erquest or not
    if (
      req.body.name &&
      req.body.mail &&
      req.body.celular &&
      req.body.id &&
      req.body.direccion &&
      req.body.esMonitor
    ) {
      console.log(req)
      const user_params: IUser = {
        memberId: req.body.id,
        name: req.body.name,
        email: req.body.mail,
        telephone: req.body.celular,
        facilitator: String(req.body.esMonitor),
        rol: "groupMember",
        direction: req.body.direccion,
      };
      this.user.createUser(user_params,
        (err: any, data: JSON) => {
          if (err) {
            console.log("Error en mongo");
            //mongoError(err, res);
          } else {
            console.log(" Success !!!");
            //successResponse("Zona Creada", data, res);
          }
        });
    } else {
      console.log(" -- BD : Parametros insuficientes -- ");
      // error response if some fields are missing in request body
      //insufficientParameters(res);
    }
  }

  public get_user(req: Request) {
    if (req.body.id) {
      const user_filter = { memberId: req.body.id };
      this.user.filterUser(user_filter,
        (err: any, data: JSON) => {
          if (err) {
            console.log("Error en mongo");
            //mongoError(err, res);
          } else {
            console.log(" Success !!!");
            //successResponse("Zona Creada", data, res);
          }
        });
    } else {
      console.log(" -- BD : Parametros insuficientes -- ");
      //insufficientParameters(res);
    }
  }

  ///                                                                   ///
  //                        Cambia lo que ud le meta del miembro                         //
  ///                                                                                   ///
  public update_user(req: Request) {
    if (
      req.body.id && (req.body.name ||
      req.body.mail ||
      req.body.celular ||
      req.body.esMonitor ||
      req.body.direccion ||
      req.body.rol ||
      req.body.isDeleted)
    ) {
      const user_filter = { memberId: req.body.id };
      let previous: IUser;
      this.user.filterUser(user_filter, (err: any, user_data: IUser) => {
        previous = user_data;
      });
      if (previous.name != "") {
        const user_params: IUser = {
          memberId: req.body.id,
          name: req.body.name ? req.body.name : previous.name,
          email: req.body.mail ? req.body.mail : previous.email,
          telephone: req.body.celular ? req.body.celular : previous.telephone,
          direction: req.body.direccion
            ? req.body.direccion
            : previous.direction,
          facilitator: String(req.body.esMonitor)
            ? String(req.body.esMonitor)
            : previous.facilitator,
          rol: req.body.rol ? req.body.rol : previous.rol,
        };
        this.user.updateUser(user_params,
          (err: any, data: JSON) => {
            if (err) {
              console.log("Error en mongo");
              //mongoError(err, res);
            } else {
              console.log(" Success !!!");
              //successResponse("Zona Creada", data, res);
            }
          });
      } else {
        console.log("Not user found");
      }
    } else {
      console.log("User cannot be updated");
    }
  }

  ///                                                                   ///
  //     Delete User
  // params: req.body.id,
  // dbController.delete_user(req)
  ///                                                                   ///
  public delete_user(req: Request) {
    if (req.body.id) {
      this.user.deleteUser(req.body.id,
        (err: any, data: JSON) => {
          if (err) {
            console.log("Error en mongo");
            //mongoError(err, res);
          } else {
            console.log(" Success !!!");
            //successResponse("Zona Creada", data, res);
          }
        });
    } else {
      console.log("Insuficient parameters: User not Deleted");
      //insufficientParameters(res)
    }
  }

  ////                                                                                 ////
  ////                                                                                 ////
  //                            Organization Methods                                 //
  ////                                                                                ////
  ////                                                                                 ////

  // Create Orgaization ...................................Ejemplo Func
  //dbController.createOrganization(req.body.name, req.body.coutry,
  //    req.body.cedulaJuridica, req.body.webDirection, req.body.phone)
  public createOrganization(
    name: String,
    coutry: String,
    cedulaJuridica: String,
    webDirection: String,
    pPhone: String
  ) {
    if (
      name != "" &&
      coutry != "" &&
      cedulaJuridica != "" &&
      webDirection != "" &&
      pPhone != ""
    ) {
      const someParams: IStructure = {
        _id: 1,
        name: name,
        coutry: coutry,
        cedulaJuridica: cedulaJuridica,
        webDirection: webDirection,
        phone: pPhone,
        miembros: [],
        zonas: [],
      };
      this.structures.setOrganizationParams(someParams);
      console.log(" -- BD : Estructura creada con exito -- ");
    } else {
      console.log(
        " -- BD : Parametros insuficientes /n Fallo de registro de Organizacion -- "
      );
      //insufficientParameters(res)
    }
  }
  ///                                                                  ///
  /* Crear Estructura // Ejemplo de funcionamiento //
    {
      "nombreOrg": "AlianzaAfrica",
      "zone": {
          "name": "CostaRica",
          "id": "Pan588",
          "ramas":[
          {
              "name": "Pabajo",
              "id": "Pro"
          },
          {
              "name": "CesoLento",
              "id": "psle"
          }
          ]
      }
    }
  //                                  Explicacion                                   //
  Hay que llamar a las dos siguientes funciones de base de datos que hacen los insert
          app.post('/api/crearEstructura', (req: Request, res: Response) => {
              
              // Database //
              this.dbController.insertZone(req.body.zonaName, req.body.zonaName) 
              for(var _i = 0  _i < req.body.zone.ramas.length  _i++){
                  console.log("Elemento nuevo de rama ----"+_i) 
                  this.dbController.insertBranchTree(req.body.zonaName, 
                    req.body.ids[index], req.body.branches[index]) 
              } 
          }) 
  */
  /* Crear Estructura .. Insertar Zona ............................................. */
  //dbController.insertZone(req.body.zonaName, req.body.zonaName)
  public insertZoneTree(zoneName: String) {
    console.log("Creando zona");
    if (zoneName) {
      const someParams: IZone = {
        name: zoneName,
        id: zoneName,
        miembros: [],
        jefes: [],
        ramas: [],
      };
      this.structures.insertZone(someParams, (err: any, data: IZone) => {
        if (err) {
          console.log("Error en mongo");
          //mongoError(err, res);
        } else {
          console.log("Zona insertada");
          //successResponse("Zona Creada", data, res);
        }
      });
      console.log(" -- BD : Zona creada con exito -- ");
    } else {
      console.log(
        " -- BD : Parametros insuficientes /n Fallo de registro de zona -- "
      );
    }
  }
  ////                                                                            ////
  //Crear Estructura .. Insertar Rama ............................................. */
  //dbController.insertBranchTree(req.body.zonaName, req.body.ids[index], req.body.branches[index])
  public insertBranchTree(
    nombreZona: String,
    idRama: String,
    nombreRama: String
  ) {
    if (nombreZona != "" && nombreRama != "" && idRama != "") {
      const someParams: IRama = {
        name: nombreRama,
        id: idRama,
        monitores: [],
        miembros: [],
        jefes: [],
        grupos: [],
      };
      console.log(" -- BD : Rama creada con exito -- ");
      this.structures.insertBranch(
        someParams,
        nombreZona,
        (err: any, data: IRama) => {
          if (err) {
            console.log("Error en mongo");
            //mongoError(err, res);
          } else {
            console.log("Rama insertada");
            //successResponse("Zona Creada", data, res);
          }
        }
      );
    } else {
      console.log(
        " -- BD : Parametros insuficientes /n Fallo de registro de Rama -- "
      );
      //insufficientParameters(res)
    }
  }
  ////                                                                            ////
  // Crear Grupo ....................................................Ejemplo Func*/
  //dbController.insertGroupTree(req.body.zona, req.body.rama,
  //  req.body.grupoNombre, req.body.grupoId, req.body.monitor)
  ////                                                                            ////
  public insertGroupTree(
    pZona: String,
    pRama: String,
    pGrupo: String,
    pId: String,
    pMonitor: String
  ) {
    console.log("Creando Grupo");
    if (
      pZona != "" &&
      pGrupo != "" &&
      pRama != "" &&
      pId != "" &&
      pMonitor != ""
    ) {
      const someParams: IGroup = {
        name: pGrupo,
        id: pId,
        monitores: [pMonitor],
        jefes: [],
        miembros: [],
      };
      console.log("Insertando grupo");
      this.structures.insertGroup(
        someParams,
        pZona,
        pRama,
        (err: any, data: IGroup) => {
          if (err) {
            console.log("Error en mongo");
            //mongoError(err, res);
          } else {
            console.log("Grupo insertado");
            //successResponse("Zona Creada", data, res);
          }
        }
      );
    } else {
      console.log("Insuficient parameters: Group not Created");
      //insufficientParameters(res)
    }
  }

  ////                                                                            ////
  //                          Insertar Miembro en Grupo                             //
  // Ejemplo de funcionamiento ... //
  // dbController.insertMemberGroup(req.body.zoneName, req.body.branchName,
  //     req.body.groupName, req.body.memberId)
  ////                                                                            ////
  public insertMemberGroup(
    zoneName: String,
    branchId: String,
    groupId: String,
    memberId: String
  ) {
    console.log("Verificando Info");
    if (
      zoneName != "" &&
      branchId != "" &&
      groupId != "" &&
      memberId != ""
    ) {
      console.log("Insertando Miembro");
      this.structures.insertMemberGroupImp(
        zoneName,
        branchId,
        groupId,
        memberId,
        (err: any, data: JSON) => {
          if (err) {
            console.log("Error en mongo");
            //mongoError(err, res);
          } else {
            console.log("Miembro insertada");
            //successResponse("Zona Creada", data, res);
          }
        }

      );
    } else {
      console.log("insuficient parameters: miembro no insertado");
      //insufficientParameters(res)
    }
  }

  ////                                                                            ////
  //                          Insertar Monitor en Grupo                             //
  // Ejemplo de funcionamiento ... //
  // dbController.insertMonitorGroup(req.body.zoneName, req.body.branchName,
  //     req.body.groupName, req.body.memberId)
  ////                                                                            ////
  public insertMonitorGroup(
    zoneName: String,
    branchName: String,
    groupName: String,
    memberId: String
  ) {
    console.log("Verificando Info");
    if (
      zoneName != "" &&
      branchName != "" &&
      groupName != "" &&
      memberId != ""
    ) {
      console.log("Insertando Miembro");
      this.structures.insertMonitorGroupImp(
        zoneName,
        branchName,
        groupName,
        memberId,
        (err: any, data: JSON) => {
          if (err) {
            console.log("Error en mongo");
            //mongoError(err, res);
          } else {
            console.log(" Success !!!");
            //successResponse("Zona Creada", data, res);
          }
        }
      );
    } else {
      console.log("insuficient parameters: monitor no insertado");
      //insufficientParameters(res)
    }
  }

  ////                                                                            ////
  //                          Insertar Monitor en Grupo                             //
  // Ejemplo de funcionamiento ... //
  // dbController.insertMonitorBranch(req.body.zoneName, req.body.branchName,
  //  req.body.memberId)
  ////                                                                            ////
  public insertMonitorBranch(
    zoneName: String,
    branchName: String,
    memberId: String
  ) {
    console.log("Verificando Info");
    if (zoneName != "" && branchName != "" && memberId != "") {
      console.log("Insertando Miembro");
      this.structures.insertMonitorBranchImp(
        zoneName,
        branchName,
        memberId,
        (err: any, data: JSON) => {
          if (err) {
            console.log("Error en mongo");
            //mongoError(err, res);
          } else {
            console.log(" Success !!!");
            //successResponse("Zona Creada", data, res);
          }
        }
      );
    } else {
      console.log("insuficient parameters: monitor no insertado");
      //insufficientParameters(res)
    }
  }

  ////                                                                                 ////
  ////                                                                                 ////
  //                              Insertar Jefes     bien                              //
  ////                                                                                 ////
  ////                                                                                 ////

  ////                                                                            ////
  //                          Asignar Jefe a un Grupo                             //
  // Ejemplo de funcionamiento ... //
  // dbController.insertBossGroup(req.body.zoneName, req.body.branchName,
  //     req.body.groupName, req.body.memberId)
  ////                                                                            ////
  public assignBossGroup(
    zoneName: String,
    branchId: String,
    groupId: String,
    memberId: String,
    memberId2: String
  ) {
    console.log("Verificando Info");
    if (zoneName != "" && branchId != "" && groupId != "") {
      if (memberId != "") {
        console.log("Insertando Jefe en Grupo");
        this.structures.assignBossGroupImp(
          zoneName,
          branchId,
          groupId,
          memberId,
          (err: any, data: JSON) => {
            if (err) {
              console.log("Error en mongo");
              //mongoError(err, res);
            } else {
              console.log(" Success !!!");
              //successResponse("Zona Creada", data, res);
            }
          }
        );
      }
      if (memberId2 != "") {
        console.log("Insertando Jefe2 en Grupo");
        this.structures.assignBossGroupImp(
          zoneName,
          branchId,
          groupId,
          memberId2,
          (err: any, data: JSON) => {
            if (err) {
              console.log("Error en mongo");
              //mongoError(err, res);
            } else {
              console.log(" Success !!!");
              //successResponse("Zona Creada", data, res);
            }
          }
        );
      }
    } else {
      console.log("insuficient parameters: Jefes no insertados");
      //insufficientParameters(res)
    }
  }

  ////                                                                            ////
  //                          Asignar Jefe a una Rama                             //
  // Ejemplo de funcionamiento ... //
  // dbController.assignBossBranch(req.body.zoneName, req.body.branchName,
  //     req.body.memberId, req.body.memberId2)
  ////                                                                            ////
  public assignBossBranch(
    zoneName: String,
    branchId: String,
    memberId: String,
    memberId2: String
  ) {
    console.log("Verificando Info");
    if (zoneName != "" && branchId != "") {
      if (memberId != "") {
        console.log("Insertando Jefe en Rama");
        this.structures.assignBossBranchImp(
          zoneName,
          branchId,
          memberId,
          (err: any, data: JSON) => {
            if (err) {
              console.log("Error en mongo");
              //mongoError(err, res);
            } else {
              console.log(" Success !!!");
              //successResponse("Zona Creada", data, res);
            }
          }
        );
      }
      if (memberId2 != "") {
        console.log("Insertando Jefe en Rama");
        this.structures.assignBossBranchImp(
          zoneName,
          branchId,
          memberId2,
          (err: any, data: JSON) => {
            if (err) {
              console.log("Error en mongo");
              //mongoError(err, res);
            } else {
              console.log(" Success !!!");
              //successResponse("Zona Creada", data, res);
            }
          }
        );
      }
    } else {
      console.log("insuficient parameters: Jefes no insertados");
      //insufficientParameters(res)
    }
  }

  ////                                                                            ////
  //                          Insertar Jefe en Zona                                 //
  // Ejemplo de funcionamiento ... //
  // dbController.insertBossBranch(req.body.zoneName, req.body.memberId, req.body.memberId2)
  ////                                                                            ////
  public assignBossZone(zoneName: String, memberId: String, memberId2: String) {
    console.log("Verificando Info");
    if (zoneName != "" && memberId != "") {
      console.log("Insertando grupo");
      this.structures.assignBossZoneImp(
        zoneName,
        memberId,
        (err: any, data: JSON) => {
          if (err) {
            console.log("Error en mongo");
            //mongoError(err, res);
          } else {
            console.log(" Success !!!");
            //successResponse("Zona Creada", data, res);
          }
        }
      );
    }
    if (memberId2 != "" && zoneName != "") {
      this.structures.assignBossZoneImp(
        zoneName,
        memberId2,
        (err: any, data: JSON) => {
          if (err) {
            console.log("Error en mongo");
            //mongoError(err, res);
          } else {
            console.log(" Success !!!");
            //successResponse("Zona Creada", data, res);
          }
        }
      );
    }
  }

  ////                                                                                 ////
  ////                                                                                 ////
  //                                  Movimientos                                      //
  ////                                                                                 ////
  ////                                                                                 ////

  public moveMemberGroups(
    zoneName: String,
    oldbrachId: String,
    oldGroupId: String,
    zoneNameNew: String,
    newbrachId: String,
    newGroupId: String,
    memberId: String
  ) {
    console.log("Verificando Info");
    if (
      zoneName != "" &&
      oldbrachId != "" &&
      newGroupId != "" &&
      newbrachId != "" &&
      oldGroupId != "" &&
      zoneNameNew != ""
    ) {
      if (memberId != "") {
        console.log("Moviendo Miembro");
        this.structures.moveMemberGroupsImp(
          zoneName,
          zoneNameNew,
          oldbrachId,
          newbrachId,
          oldGroupId,
          newGroupId,
          memberId,
          (err: any, data: JSON) => {
            if (err) {
              console.log("Error en mongo");
              //mongoError(err, res);
            } else {
              console.log(" Success !!!");
              //successResponse("Zona Creada", data, res);
            }
          }
        );
      }
    }
  }
}

export default new dbController();
