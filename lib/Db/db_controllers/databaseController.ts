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
import ContributionService from "../db_contribution_model/contribution_service";
import { IContribution } from "../db_contribution_model/contribution_model";
import { IStructure } from "../db_estructure_model/struc_model";
import { IUser, IUserC } from "../db_user_model/member_model";
import { IZone } from "../db_estructure_model/zone_model";
import { IRama } from "../db_estructure_model/rama_model";
import { IGroup } from "../db_estructure_model/grupo_model";
import { MyNotification } from "../../model/MyNotification";
import { INotification } from "../db_notification_model/notification_model";

export class dbController {

  private user: UserService = new UserService();
  private structures: StructureService = new StructureService();
  private contribution: ContributionService = new ContributionService();

  // ! ================================================================================================ //
  // ! Retrieve Information From Database============================================================== //
  // ! ================================================================================================ //
  ///                                                                   ///
  //                       Get All Members                               //
  ///                                                                   ///
  
  public async getAllMember():Promise<IUser[]>{
    var usersFromDB:IUser[]=null;
    var promise=this.user.getAllMembersImp();
    await promise.then((value)=>{
      usersFromDB = value
    })
    return usersFromDB;
  }

  ///                                                                   ///
  //                       Get All Structure                             //
  ///                                                                   ///
  public async getOrganization():Promise<IStructure[]>{
    var structureFromDB:IStructure[]=null;
    var promise=this.structures.getOrganization();
    await promise.then((value)=>{
      structureFromDB = value
    })
    return structureFromDB;
  }
  
  ///                                                                   ///
  //                         Validate User                               //
  //               validar que existan las credenciales en la base       //
  ///                                                                   ///
  public async validateUser(user: String, password: String):Promise<String>{
    var idMember:String=null;
    var x = await this.user.validateUser(user,password).then((value)=>{
      idMember = value
    })
    
    return idMember;
  }

      ///                                                                ///
  //                          getMemberRol                                //
  //                  obtener el rol mas alto de un miembro               //
  ///                                                                   ///
  
  public async getMemberRol(memberId:String):Promise<Number>{
    var typeRol:Number = null;

    await this.structures.getMemberRol(memberId).then((value)=>{
      typeRol=value;
    })

    return typeRol;
  }

  // ! ================================================================================================ //
  // ! User Handling ================================================================================== //
  // ! ================================================================================================ //
  ///                                                                   ///
  //                          Create User                                //
  //                  dbController.create_user(req)                      //
  ///                                                                   ///
  public create_user(req: Request) {
    // this check whether all the filds were send through the erquest or not
    if (
      req.body.name &&
      req.body.mail &&
      req.body.celular &&
      req.body.id &&
      req.body.direccion &&
      req.body.esMonitor!=null
    ) {
      //console.log(req)
      const user_params: IUser = {
        memberId: req.body.id.toString(),
        name: req.body.name,
        email: req.body.mail,
        telephone: req.body.celular,
        facilitator: String(req.body.esMonitor),
        rol: "groupMember",
        direction: req.body.direccion,
        password: "hola",
        notifications: [],
      };
      //console.log("Aqui1");
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
    }
  }

  ///                                                                   ///
  //                          Create Asesor                              //
  ///                                                                   ///
  public createAsesor(req: Request) {
    // this check whether all the filds were send through the erquest or not
    if (
      req.body.nombreAsesor &&
      req.body.correoAsesor &&
      req.body.celularAsesor &&
      req.body.idAsesor &&
      req.body.direccionAsesor
    ) {
      //console.log(req)
      const user_params: IUser = {
        memberId: req.body.idAsesor,
        name: req.body.nombreAsesor,
        email: req.body.correoAsesor,
        telephone: req.body.celularAsesor,
        facilitator: "false",
        rol: "asesor",
        direction: req.body.direccionAsesor,
        password: "",
        notifications: [],
      };
      //console.log("Aqui1");
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
  ///                                                                   ///
  //                          Get User                                   //
  ///                                                                   ///
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

  ///                                                                                   ///
  //                                     Set Password                                    //
  ///                                                                                   ///
  public async setPassword(id:String, password:String) : Promise<Boolean> {
    let returning = false;
    if ( password != "" && id != "" ) {
      const user_filter = { memberId: id };
      let previous;
      previous = this.user.filterUser(user_filter, (err: any, user_data: IUser) => {});
      if (previous.name != "") {
        var res = await this.user.setPassword_(id, password,
          (err: any, data: JSON) => {  });
        return res;
      } else {
        console.log("Not user found SET PASSWORD");
      }
    } else {
      console.log("User cannot be updated");
    }
    console.log(returning);
    return returning;
  }


  ///                                                                                   ///
  //                              Update User Information                                //
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
      let previous;
      previous = this.user.filterUser(user_filter, (err: any, user_data: IUser) => { });
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
          password: req.body.password ? req.body.password : previous.password,//
          notifications: previous.notifications
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
  //                         Delete User                                 //
  //                  dbController.delete_user(req)                      //
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

  // ! ================================================================================================ //
  // ! Organization Methods =========================================================================== //
  // ! ================================================================================================ //


  ////                                                                                 ////
  //                             Create Orgaization                                      //
  //          dbController.createOrganization(req.body.name, req.body.coutry,            //
  //            req.body.cedulaJuridica, req.body.webDirection, req.body.phone)          //
  ////                                                                                 ////
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
        _id: Number(cedulaJuridica),
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

  ////                                                                                 ////
  //                           Create / Insert New Zone                                  //
  ////                                                                                 ////

  /* Crear Estructura .. Insertar Zona ............................................. */
  // dbController.insertZone(req.body.zonaName, req.body.zonaName)
  public insertZoneTree(zoneName: String, idMovement:number) {
    console.log("Creando zona");
    if (zoneName && idMovement!=null) {
      const someParams: IZone = {
        name: zoneName,
        id: zoneName,
        miembros: [],
        jefes: [],
        ramas: [],
      };
      this.structures.insertZone(someParams,idMovement, (err: any, data: IZone) => {
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
  
  ////                                                                                               ////
  //                          Crear Estructura => Insertar Rama                                        //
  //  dbController.insertBranchTree(req.body.zonaName, req.body.ids[index], req.body.branches[index])  //
  ////                                                                                               ////
  public insertBranchTree(
    nombreZona: String,
    ramas:IRama[],
    idMovement:number
  ) {
    //console.log("Desde Rutas: ",ramas);
    if (nombreZona != "" &&  idMovement!=null) {
      console.log(" -- BD : Rama creada con exito -- ");
      this.structures.insertBranch(
        ramas,
        nombreZona,
        idMovement,
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
    pMonitor: String, 
    idMovement:number
  ) {
    console.log("Creando Grupo");
    if (
      pZona != "" &&
      pGrupo != "" &&
      pRama != "" &&
      pId != "" &&
      pMonitor != "" &&
      idMovement != null
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
        idMovement,
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
    memberId: String, 
    idMovement:number
  ) {
    console.log("Verificando Info");
    if (
      zoneName != "" &&
      branchId != "" &&
      groupId != "" &&
      memberId != "" &&
      idMovement !=null
    ) {
      console.log("Insertando Miembro");
      this.structures.insertMemberGroupImp(
        zoneName,
        branchId,
        groupId,
        memberId,
        idMovement,
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
    memberId: String, 
    idMovement:number
  ) {
    console.log("Verificando Info");
    if (
      zoneName != "" &&
      branchName != "" &&
      groupName != "" &&
      memberId != "" &&
      idMovement != null
    ) {
      console.log("Insertando Miembro");
      this.structures.insertMonitorGroupImp(
        zoneName,
        branchName,
        groupName,
        memberId,
        idMovement,
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
    memberId: String, 
    idMovement:number
  ) {
    console.log("Verificando Info");
    if (zoneName != "" && branchName != "" && memberId != "" && idMovement != null) {
      console.log("Insertando Miembro");
      this.structures.insertMonitorBranchImp(
        zoneName,
        branchName,
        memberId,
        idMovement,
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
    memberId2: String, 
    idMovement:number
  ) {
    console.log("Verificando Info");
    if (zoneName != "" && branchId != "" && groupId != "" && idMovement != null) {
      if (memberId != "") {
        console.log("Insertando Jefe en Grupo");
        this.structures.assignBossGroupImp(
          zoneName,
          branchId,
          groupId,
          memberId,
          idMovement,
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
          idMovement,
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
    memberId2: String, 
    idMovement:number
  ) {
    console.log("Verificando Info");
    if (zoneName != "" && branchId != "" && idMovement != null) {
      if (memberId != "") {
        console.log("Insertando Jefe en Rama");
        this.structures.assignBossBranchImp(
          zoneName,
          branchId,
          memberId,
          idMovement,
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
          idMovement,
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
  public assignBossZone(zoneName: String, memberId: String, memberId2: String, idMovement:number) {
    console.log("Verificando Info");
    if (zoneName != "" && memberId != "" && idMovement!=null) {
      console.log("Insertando grupo");
      this.structures.assignBossZoneImp(
        zoneName,
        memberId,
        idMovement,
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
        idMovement,
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
    memberId: String, 
    idMovement:number
  ) {
    console.log("Verificando Info");
    if (
      zoneName != "" &&
      oldbrachId != "" &&
      newGroupId != "" &&
      newbrachId != "" &&
      oldGroupId != "" &&
      zoneNameNew != "" &&
      idMovement != null
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
          idMovement,
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

  ////                                                                            ////
  //                          Quitar Jefe en Zona                                 //
  // Ejemplo de funcionamiento ... //
  // dbController.removeZoneChief(req.body.zona,Number(req.body.id));
  ////                                                                            ////
  public removeZoneChief( nombreZona: String, idMemberToDelete: String, idMovement:number) {
    if (
      nombreZona != "" &&
      idMemberToDelete != ""
    ){
      this.structures.quitZoneChief(
        nombreZona,idMemberToDelete,idMovement,
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

  ////                                                                            ////
  //                          Quitar Jefe en Rama                                   //
  //                    Ejemplo de funcionamiento ...                                //
  ////                                                                            ////
  public removeBranchChief( nombreZona: String, 
    branchId: String, idMemberToDelete: String, 
    idMovement:number) {
    if (
      nombreZona != "" &&
      idMemberToDelete != "" && 
      branchId != ""
    ){
      this.structures.quitBranchChief(
        nombreZona, branchId, idMemberToDelete,idMovement,
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

  ////                                                                            ////
  //                          Quitar Jefe en Grupo                                   //
  //                    Ejemplo de funcionamiento ...                                //
  ////                                                                            ////
  public removeChiefGroupDB 
  ( nombreZona: String, 
    branchId: String, groupId:String, idMemberToDelete: String, 
    idMovement:number) {
    if (
      nombreZona != "" &&
      idMemberToDelete != "" && 
      branchId != ""
    ){
      this.structures.quitGroupChief(
        nombreZona, branchId, groupId, idMemberToDelete, idMovement,
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

  ////                                                                            ////
  //                                  Add asesor                                    //
  ////                                                                            ////
  public addAsesor 
  ( idAsesor: String, 
    idMovement: number) {
    if (
      idAsesor != "" && idMovement != null
    ){
      this.structures._addAsesor(
        idAsesor, idMovement,
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
  
  // ! ================================================================================================ //
  // ! Contributions ================================================================================== //
  // ! ================================================================================================ //

  ///                                                                                   ///
  //                                  Create Contribution                                //
  ///                                                                                   ///

  public createContribution(idMovimiento: Number, emissor: String, type: String, date: String, description: String ) {
    if ( emissor && type && date && description ) {
      const contrib_params: IContribution = {
          idMovimiento: idMovimiento.toString(),
          emissor: emissor,
          type: type,
          date: date,
          descripcion: description,
          deleted: false
        };
      this.contribution.uploadContribution(contrib_params,
        (err: any, data: JSON) => {
          if (err) {
            console.log("Error en mongo");
          } else {
            console.log(" Contribution Uploaded !!!");
          }
        });
    } else {
      console.log(" -- BD : Parametros insuficientes -- ");
    }
  }

  ///                                                                                   ///
  //                                "Delete" Contribution                                //
  ///                                                                                   ///
  public delete_Contribution(date: String) {
    if (
      date != ""
    ) {
      const contributionQuery = { date: date };
      let previous;

      previous = this.contribution.findContribution(contributionQuery, (err: any, contrib_data: IContribution) => { });
      if (previous.emissor != "") {
        const contrib_params: IContribution = {
          idMovimiento: previous.idMovimiento,
          emissor: previous.emissor,
          type: previous.type,
          date: date,
          descripcion: previous.description,
          deleted: true
        };
        this.contribution.updateContribution(contrib_params,
          (err: any, data: JSON) => {
            if (err) {
              console.log("Error en mongo");
              //mongoError(err, res);
            } else {
              console.log(" Contribution \"Deleted\" from DB !!!");
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

  ///                                                                                   ///
  //                                Get All Contributions                                //
  ///                                                                                   ///
  public async getAllContributions() : Promise <IContribution[]> {
    var contributionsDB:IContribution[] = null;
    var promise = this.contribution.getAllContributions();
    await promise.then((value) => {
      contributionsDB = value
    })
    return contributionsDB;
  }

  ///                                                                                   ///
  //                                "Delete" Contributions                               //
  ///                                                                                   ///
  public async deleteAllContributions() {
    var contributionsDB: IContribution[] = null;
    var promise = this.contribution.getAllContributions();
    await promise.then((value) => {
      contributionsDB = value
    });
    
    contributionsDB.forEach(contributionA => {
      const contrib_params: IContribution = {
        idMovimiento: contributionA.idMovimiento,
        emissor: contributionA.emissor,
        type: contributionA.type,
        date: contributionA.date,
        descripcion: contributionA.descripcion,
        deleted: true
      }
      this.contribution.updateContribution(contrib_params,
        (err: any, data: JSON) => {
          if (err) {
            console.log("Error en mongo");
            //mongoError(err, res);
          } else {
            console.log(" Contribution \"Deleted\" from DB !!!");
            //successResponse("Zona Creada", data, res);
          }
        }
      );
    })
  }
  // ! Contributions ================================================================================== //


  // ! ================================================================================================ //
  // ! Notifications ================================================================================== //
  // ! ================================================================================================ //
  ////                                                                                 ////
  //                          Insert new Notification                                    //
  ////                                                                                 ////

  public insertNewNotification(idSuscriber: String, notification: MyNotification) {
    console.log("Insertando Notificacion");
    if (idSuscriber != "" && notification!=null) {
      const newNotification: INotification = {
        nombre: notification.getNewName(),
        nombreEmisor: notification.getnombreEmisor(),
        currentDate: notification.getDate(),
        mensaje: notification.getMessage(),
        estado: false,
      };
      this.user.insertNotification(newNotification,idSuscriber, (err: any, data: IZone) => {
          console.log("Error en Mongo --> Creo");   
        });
      console.log(" -- BD : Zona creada con exito -- ");
      }else {
      console.log( " -- BD : Parametros insuficientes ");
    }
  }

  ////                                                                                 ////
  //                          Update Notification State                                  //
  ////                                                                                 ////
  public updateNotification(suscriberId: String, notificationDate: String){
    console.log("Hola gente");
    this.user.updateNotification(notificationDate, suscriberId, (err: any, data: IZone) => {
      console.log(" >> BD --> Creo que cambio, o puede ser un msj de error");     
    });
  }

  // ! Notifications ================================================================================== //

  public deleteSpecificUser(suscriber: String, movementId: Number){
    this.structures.deleteCompleteMember(suscriber, 
      movementId, (err: any, data: JSON) => {
      if (err) {
        console.log("Error en mongo");
        //mongoError(err, res);
      } else {
        console.log(" Success !!!");
        //successResponse("Zona Creada", data, res);
      }
    });
  }

}

export default new dbController();

