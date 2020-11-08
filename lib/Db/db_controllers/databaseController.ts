import { Request, Response } from "express";
import e = require("express");
import { insufficientParameters, mongoError, successResponse, failureResponse} from "../common/service";
import UserService from "../db_user_model/member_service";
import StructureService from "../db_estructure_model/structure_service";
import { IStructure } from "../db_estructure_model/struc_model";
import { IUser } from "../db_user_model/member_model";
import { IZone } from "../db_estructure_model/zone_model";
import { IRama } from "../db_estructure_model/rama_model";
import { IGroup } from "Db/db_estructure_model/grupo_model";

export class dbController {
  private user: UserService = new UserService();
  private structure: StructureService = new StructureService();

  public create_user(req: Request, res: Response) {
    // this check whether all the filds were send through the erquest or not
    if (
      req.body.name &&
      req.body.email &&
      req.body.telephone &&
      req.body.cedula &&
      req.body.direction.details &&
      req.body.direction.canton &&
      req.body.direction.district &&
      req.body.direction.province
    ) {
      const user_params: IUser = {
        cedula: req.body.cedula,
        name: req.body.name,
        email: req.body.email,
        telephone: req.body.phone_number,
        facilitador: req.body.facilitador,
        is_deleted: false,
        rol: req.body.rol,
        direction: {
          details: req.body.direction.details,
          canton: req.body.direction.canton,
          district: req.body.direction.district,
          province: req.body.direction.province,
        },
      };
      this.user.createUser(
        user_params,
        (err: any, user_data: IUser) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse("create user successfull", user_data, res);
          }
        }
      );
    } else {
      // error response if some fields are missing in request body
      insufficientParameters(res);
    }
  }

  public get_user(req: Request, res: Response) {
    if (req.params.id) {
      const user_filter = { _id: req.params.id };
      this.user.filterUser(
        user_filter,
        (err: any, user_data: IUser) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse("get user successfull", user_data, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public update_user(req: Request, res: Response) {
    if (
      (req.params.id && req.body.name) ||
      req.body.name.first_name ||
      req.body.name.middle_name ||
      req.body.name.last_name ||
      req.body.email ||
      req.body.phone_number ||
      req.body.gender
    ) {
      const user_filter = { _id: req.params.id };
      this.user.filterUser(
        user_filter,
        (err: any, user_data: IUser) => {
          if (err) {
            mongoError(err, res);
          } else if (user_data) {
            /*const user_params: IUser = {
                        _id: req.params.id,
                        name: req.body.name ? {
                            name: req.body.name ? req.body.name : user_data.name,
                        } : user_data.name,
                        email: req.body.email ? req.body.email : user_data.email,
                        phone_number: req.body.phone_number ? req.body.phone_number : user_data.phone_number,
                        gender: req.body.gender ? req.body.gender : user_data.gender,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : user_data.is_deleted,
                        modification_notes: user_data.modification_notes
                    };
                    this.user_service.updateUser(user_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update user successfull', null, res);
                        }
                    });*/
          } else {
            failureResponse("invalid user", null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public delete_user(req: Request, res: Response) {
    if (req.body.cedula) {
      this.user.deleteUser(
        req.body.cedula,
        (err: any, delete_details) => {
          if (err) {
            mongoError(err, res);
          } else if (delete_details.deletedCount !== 0) {
            successResponse("delete user successfull", null, res);
          } else {
            failureResponse("invalid user", null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                            //
  //                                      Structure Methods                                     //
  //                                                                                            //
  ////////////////////////////////////////////////////////////////////////////////////////////////
  /* Create Orgaization ...................................Ejemplo Func//
  {
      "name": "AlianzaAfrica",
      "coutry": "KostaRiko",
      "cedulaJuridica": "yy5iofw34",
      "webDirection": "www.hola.com",
      "phone": 87990808
  }
  */
  public createOrganization(req: Request, res: Response) {
    if (
      req.body.name &&
      req.body.coutry &&
      req.body.cedulaJuridica &&
      req.body.webDirection &&
      req.body.phone
    ) {
      const someParams: IStructure = {
        name: req.body.name,
        coutry: req.body.coutry,
        cedulaJuridica: req.body.cedulaJuridica,
        webDirection: req.body.webDirection,
        phone: req.body.phone,
        jefes: [],
        zonas: [],
      };
      this.structure.setOrganizationParams(
        someParams,
        (err: any, data: IStructure) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse("create user successfull", data, res);
          }
        }
      );
    } else {
      // error response if some fields are missing in request body
      insufficientParameters(res);
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
              this.dbControl.insertZone(req,res);
              for(var _i = 0; _i < req.body.zone.ramas.length; _i++){
                  console.log("Elemento nuevo de rama ----"+_i);
                  this.dbControl.insertBranchTree(req, _i);
              } 
          });
  */
  /* Crear Estructura .. Insertar Zona ............................................. */
  public insertZone(req: Request, res: Response) {
    console.log("Creando zona");
    if (req.body.zone.name && req.body.zone.id && req.body.nombreOrg){
      const someParams: IZone = {
        name: req.body.zone.name,
        id: req.body.zone.id,
        jefes: [],
        ramas: [],
      };
    this.structure.insertZone(
      someParams, req.body.nombreOrg, 
      (err: any, data: IZone) => {
        if (err) {
          mongoError(err, res);
        } else {
          successResponse("Zona Creada", data, res);
        }
      }
    );
    } else {
      insufficientParameters(res);
    }
  }

  /* Crear Estructura .. Insertar Rama ............................................. */
  public insertBranchTree(req: Request, index: number) {
    console.log("Creando Rama");
    
    if (req.body.zone.name && req.body.nombreOrg && req.body.zone.ramas[index].name 
       && req.body.zone.ramas[index].id){
      const someParams: IRama = {
        name: req.body.zone.ramas[index].name,
        id: req.body.zone.ramas[index].id,
        jefes: [],
        grupos: [],
      };
      console.log("Insertando rama")
    this.structure.insertBranch(
      someParams, req.body.nombreOrg, req.body.zone.name, 
      (err: any, data: IZone) => {
        if (err) {
         // mongoError(err, res);
        } else {
          //successResponse("Rama Creada e Insertada", data, res);
        }
      }
    );
    } else {
      //insufficientParameters(res);
    }
  }


  //                  Insertar(Crear) Grupo            ///

  /* Crear Grupo ....................................................Ejemplo Func//
  {
      "nombreOrg": "AlianzaAfrica",
      "zoneName": "Nicaragua",
      "branchName": "Perez Zeledon",
      "group": {"name": "Arriba Africa", "id": "AAFF", "monitorId": 555 }
  }
  */
  public insertGroupTree(req: Request, res: Response) {
    console.log("Creando Grupo");
    if (req.body.zoneName && req.body.nombreOrg && req.body.branchName 
       && req.body.group.name && req.body.group.id && req.body.group.monitorId){
      const someParams: IGroup = {
        name: req.body.group.name,
        id: req.body.group.id,
        monitores: [ req.body.group.monitorId ],
        jefes: [],
        miembros: [],
      };
      console.log("Insertando grupo")
    this.structure.insertGroup(
      someParams, req.body.nombreOrg, req.body.zoneName, req.body.branchName,
      (err: any, data: IGroup) => {
        if (err) {
          mongoError(err, res);
        } else {
          successResponse(" -- Grupo Creado --", data, res);
        }
      }
    );
    } else {
      insufficientParameters(res);
    }
  }

  ////                                                                            ////
  //                          Insertar Miembro en Grupo                             //
  ////                                                                            ////
  /* Ejemplo de funcionamiento ... //
  {
    "nombreOrg": "AlianzaAfrica",
    "zoneName": "Nicaragua",
    "branchName": "Perez Zeledon",
    "groupName": "Arriba Africa",
    "memberId": "117500317"
  }
  */
  public insertMemberGroup(req: Request, res: Response) {
    console.log("Verificando Info");
    if (req.body.zoneName && req.body.branchName 
        && req.body.groupName && req.body.memberId){
      console.log("Insertando grupo")
    this.structure.insertMemberGroupImp(req,
      (err: any, data: String) => {
        if (err) {
          mongoError(err, res);
        } else {
          successResponse(" -- Miembro insertado en grupo! --", data, res);
        }
      }
    );
    } else {
      insufficientParameters(res);
    }
  }
  

}
