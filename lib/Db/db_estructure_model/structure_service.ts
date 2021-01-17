import { IRama } from "./rama_model";
import { IZone } from "./zone_model";
import { IStructure } from "./struc_model";
import structures from "./struc_schema";
import { IGroup } from "./grupo_model";
import { Request, response, Response } from "express";
import { verify } from "crypto";

export default class StructureService {
  /*
    Method used to create the basic structures in the 
    database and just setting the parameters of the 
    organization.
    */

  public async getOrganization():Promise<IStructure[]>{
    var structureFromDB:IStructure[]=null;
    await structures.find(function(err, result:IStructure[]) {
        if (err) {
            console.log(err); 
        } else {
        structureFromDB=result;
        }
    })
    return structureFromDB;
  }

  public setOrganizationParams(orgParams: IStructure) {
    const _session = new structures(orgParams);
    _session.save();
  }

  public insertZone(someParams: IZone, idMovement:number, callback: any){
    console.log("Prueba");
    structures.update({_id:idMovement}, {$push: { zonas: someParams  } },callback);
    console.log("Despues");
  }

  public insertBranch(someParams: IRama[], nombreZona: String, idMovement:number, callback: any) {
    console.log("Prueba");
    structures.update(
      {_id:idMovement},
      { $push: { "zonas.$[elem].ramas": {$each:someParams} } },
      { arrayFilters: [{ "elem.name": { $eq: nombreZona } }], multi: true },callback
    );

    console.log("Despues");
  }

  public insertGroup(
    someParams: IGroup,
    nombreZona: String,
    branchId: String,
    idMovement:number,
    callback: any
  ) {
    console.log(" -- DB --> Insertar Grupo --");
    structures.update(
      {_id:idMovement},
      { $push: { "zonas.$[elem].ramas.$[rma].grupos": someParams } },
      {
        arrayFilters: [
          { "elem.name": { $eq: nombreZona } },
          { "rma.id": { $eq: branchId } },
        ],
        multi: true,
      },callback
    );

    console.log(" -- DB --> Grupo Insertado -- ");
  }

  public insertMemberGroupImp(
    zoneName: String,
    branchId: String,
    groupId: String,
    memberId: String,
    idMovement:number,
    callback: any
  ) {
    console.log("-- Prueba Miembro en Grupo --");
    console.log(zoneName, branchId, groupId, memberId)
    structures.update(
      {_id:idMovement},
      {
        $push: {
          "zonas.$[elem].ramas.$[rma].grupos.$[grp].miembros": memberId,
        },
      },
      {
        arrayFilters: [
          { "elem.name": { $eq: zoneName } },
          { "rma.id": { $eq: branchId } },
          { "grp.id": { $eq: groupId } },
        ],
        multi: true,
      },callback
    );
    console.log(" -- Miembro Insertado -- ");
  }

  public insertMonitorGroupImp(
    zoneName: String,
    branchId: String,
    groupId: String,
    memberId: String,
    idMovement:number,
    callback: any
  ) {
    console.log(" -- Prueba Miembro en Grupo --");
    structures.update(
      {_id:idMovement},
      {
        $push: {
          "zonas.$[elem].ramas.$[rma].grupos.$[grp].monitores": memberId,
        },
      },
      {
        arrayFilters: [
          { "elem.name": { $eq: zoneName } },
          { "rma.id": { $eq: branchId } },
          { "grp.id": { $eq: groupId } },
        ],
        multi: true,
      },callback
    );
    console.log(" -- Miembro Insertado -- ");
  }

  public insertMonitorBranchImp(
    zoneName: String,
    branchId: String,
    memberId: String,
    idMovement:number,
    callback: any
  ) {
    console.log(" -- Prueba Miembro en Grupo --");
    structures.update(
      {_id:idMovement},
      { $push: { "zonas.$[elem].ramas.$[rma].monitores": memberId } },
      {
        arrayFilters: [
          { "elem.name": { $eq: zoneName } },
          { "rma.id": { $eq: branchId } },
        ],
        multi: true,
      },callback
    );
    console.log(" -- Miembro Insertado -- ");
  }

  public assignBossGroupImp(
    zoneName: String,
    branchId: String,
    groupId: String,
    memberId: String,
    idMovement:number,
    callback: any
  ) {
    console.log(" -- Prueba Jefe en Grupo --");
    structures.update(
	  {_id:idMovement},
		{ $push: { "zonas.$[elem].ramas.$[rma].grupos.$[grp].jefes": memberId } },
      {
        arrayFilters: [
          { "elem.name": { $eq: zoneName } },
          { "rma.id": { $eq: branchId } },
          { "grp.id": { $eq: groupId } },
        ],
        multi: true,
      },callback
    );
    structures.update(
      {_id:idMovement},
      { $pull: { "zonas.$[elem].ramas.$[rma].grupos.$[grp].miembros": memberId } },
        {
          arrayFilters: [
            { "elem.name": { $eq: zoneName } },
            { "rma.id": { $eq: branchId } },
            { "grp.id": { $eq: groupId } },
          ],
          multi: true,
        },callback
      );
    structures.update(
      {_id:idMovement},
      { $push: { "zonas.$[elem].ramas.$[rma].miembros": memberId } },
        {
          arrayFilters: [
            { "elem.name": { $eq: zoneName } },
            { "rma.id": { $eq: branchId } }
          ],
          multi: true,
        },callback
      );
    console.log(" -- Jefe Insertado -- ");
    structures.update(
      { _id:idMovement },
      { $set: { "zonas.$[elem].ramas.$[rma].grupos.$[grp].monitores": [] } },
      {
        arrayFilters: [
          { "elem.name": { $eq: zoneName } },
          { "rma.id": { $eq: branchId } },
          { "grp.id": { $eq: groupId } },
        ],
        multi: true,
      },callback
    );
    console.log(" -- Monitores deberia de estar vacía -- ");
  }

  public assignBossBranchImp(
    zoneName: String,
    branchId: String,
    memberId: String,
    idMovement:number,
    callback: any
  ) {
    console.log(" -- Prueba Jefe en Rama --");
    structures.update(
	  {_id:idMovement},
		{ $push: { "zonas.$[elem].ramas.$[rma].jefes": memberId } },
      {
        arrayFilters: [
          { "elem.name": { $eq: zoneName } },
          { "rma.id": { $eq: branchId } },
        ],
        multi: true,
      },callback
    );
    structures.update(
      {_id:idMovement},
      { $pull: { "zonas.$[elem].ramas.$[rma].miembros": memberId } },
        {
          arrayFilters: [
            { "elem.name": { $eq: zoneName } },
            { "rma.id": { $eq: branchId } },
          ],
          multi: true,
        },callback
      );
    structures.update(
      {_id:idMovement},
       { $push: { "zonas.$[elem].miembros": memberId } },
        {
          arrayFilters: [
            { "elem.name": { $eq: zoneName } },
          ],
          multi: true,
        },callback
      );
    console.log(" -- Jefe Insertado -- ");
  }

  public assignBossZoneImp(zoneName: String, memberId: String, idMovement:number, callback: any) {
    console.log(" -- Prueba Jefe en Grupo --");
    structures.update(
      {_id:idMovement},
      { $push: { "zonas.$[elem].jefes": memberId } },
      { arrayFilters: [{ "elem.name": { $eq: zoneName } }], multi: true },callback
    );
    structures.update(
      {_id:idMovement},
      { $pull: { "zonas.$[elem].miembros": memberId } },
      { arrayFilters: [{ "elem.name": { $eq: zoneName } }], multi: true },callback
    );
    console.log(" -- Jefe Insertado -- ");
  }

  public moveMemberGroupsImp(
    oldzoneName: String,
    newzoneName: String,
    oldbranchId: String,
    newbranchId: String,
    oldGroupId: String,
    newGroupId: String,
    memberId: String,
    idMovement:number,
    callback: any
  ) {
    console.log(" -- BD: Prueba Movimiento de Miembro en Grupos --");
    structures.update(
	  {_id:idMovement},
		{ $push: {"zonas.$[elem].ramas.$[rma].grupos.$[grp].miembros": memberId } },
      {
        arrayFilters: [
          { "elem.name": { $eq: newzoneName } },
          { "rma.id": { $eq: newbranchId } },
		  { "grp.id": { $eq: newGroupId } },
        ],
        multi: true,
      },callback
    );
    structures.update(
      {_id:idMovement},
      { $pull: {"zonas.$[oldelem].ramas.$[oldrma].grupos.$[oldgrp].miembros": memberId } },
      {
      arrayFilters: [
        { "oldelem.name": { $eq: oldzoneName } },
        { "oldrma.id": { $eq: oldbranchId } },
        { "oldgrp.id": { $eq: oldGroupId } },
      ],
      multi: true,
    },callback
  );
    console.log(" -- BD: Miembro Movido -- ");
  }



  /////////////////////////////////////////////////////////////////////////////////////////////////
  //    quitar JEFE DE ZONA                                                                      //
  //    quita persona de zona.jefes  pero sigue estando en zona.members                          //
  /////////////////////////////////////////////////////////////////////////////////////////////////
  public quitZoneChief(zoneName: String, memberId: String, idMovement:number, callback: any) {
    console.log(" -- Prueba Jefe en Grupo --");
    structures.update(
      {_id:idMovement},
      { $pull: { "zonas.$[elem].jefes": memberId } },
      { arrayFilters: [{ "elem.name": { $eq: zoneName } }], multi: true },callback
    );
    console.log(" -- Jefe Insertado -- ");
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  //    quitar JEFE DE RAMA                                                                      //
  //    quita persona de zona.jefes Y zona.members                                               //
  //    tambien la quita de branch.jefes .... pero la deja en branch.members                     //
  /////////////////////////////////////////////////////////////////////////////////////////////////
  
  public quitBranchChief(
		zoneName: String,
		branchId: String,
		memberId: String,
		idMovement:number,
		callback: any
	  ) {
		console.log(" -- DB: Quiting Chief from Branch --");
		structures.update(
		  {_id:idMovement},
			{ $pull: { "zonas.$[elem].ramas.$[rma].jefes": memberId } },
		  {
			arrayFilters: [
			  { "elem.name": { $eq: zoneName } },
			  { "rma.id": { $eq: branchId } },
			],
			multi: true,
		  },callback
    );
    structures.update(
		  {_id:idMovement},
			{ $pull: { "zonas.$[elem].jefes": memberId } },
		  {
			arrayFilters: [
			  { "elem.name": { $eq: zoneName } },
			],
			multi: true,
		  },callback
    );
    structures.update(
		  {_id:idMovement},
			{ $pull: { "zonas.$[elem].miembros": memberId } },
		  {
			arrayFilters: [
			  { "elem.name": { $eq: zoneName } },
			],
			multi: true,
		  },callback
    );
    
		console.log(" -- DB: JEFE RAMA DESTITUIDO -- ");
	  }
  
  /////////////////////////////////////////////////////////////////////////////////////////////////
  //    quitar JEFE DE ZONA                                                                      //
  //    quita persona de zona.jefes Y zona.members                                               //
  //    tambien la quita de branch.jefes .... pero la deja en branch.members                     //
  /////////////////////////////////////////////////////////////////////////////////////////////////
  
  public quitGroupChief (
		zoneName: String,
		branchId: String,
		groupId: String,
		memberId: String,
		idMovement:number,
		callback: any
	    ) {
		console.log(" -- Prueba Jefe en Grupo --");
		structures.update(
		  {_id:idMovement},
			{ $pull: { "zonas.$[elem].ramas.$[rma].grupos.$[grp].jefes": memberId } },
		  {
			arrayFilters: [
			  { "elem.name": { $eq: zoneName } },
			  { "rma.id": { $eq: branchId } },
			  { "grp.id": { $eq: groupId } },
			],
			multi: true,
		  },callback
    );
    structures.update(
		  {_id:idMovement},
			{ $pull: { "zonas.$[elem].ramas.$[rma].miembros": memberId } },
		  {
			arrayFilters: [
			  { "elem.name": { $eq: zoneName } },
			  { "rma.id": { $eq: branchId } },
			],
			multi: true,
		  },callback
    );
    structures.update(
		  {_id:idMovement},
			{ $pull: { "zonas.$[elem].ramas.$[rma].jefes": memberId } },
		  {
			arrayFilters: [
			  { "elem.name": { $eq: zoneName } },
			  { "rma.id": { $eq: branchId } },
			],
			multi: true,
		  },callback
    );
    structures.update(
		  {_id:idMovement},
			{ $pull: { "zonas.$[elem].jefes": memberId } },
		  {
			arrayFilters: [
			  { "elem.name": { $eq: zoneName } },
			],
			multi: true,
		  },callback
    );
    structures.update(
		  {_id:idMovement},	  
			{ $pull: { "zonas.$[elem].miembros": memberId } },
		  {
			arrayFilters: [
			  { "elem.name": { $eq: zoneName } },
			],
			multi: true,
		  },callback
		);
		console.log(" -- Jefe Insertado -- ");
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  //    FUNCIONES PARA NECESARIOS PARA OBTENER EL ROL SEGUN ALGUN ID                             //
  /////////////////////////////////////////////////////////////////////////////////////////////////
  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  /////////////////////////////////////////////////////////////////////////////////////////////////
  //    Verificar si un id esta en el nivel principal                                            //
  /////////////////////////////////////////////////////////////////////////////////////////////////

  public async isAsesor(memberId:String):Promise<Boolean>{
    var isAsesor:Boolean = null;

    await structures.find({"miembros":memberId},function(err,response:IStructure[]){
      if (err) {
        console.log("Error al obtener 'isAsesor'"); 
      } else {
        if(response.length>0){
          isAsesor=true;
        }else{
          isAsesor=false
        }
        // for (let index = 0; index < response.length; index++) {
        //   if(response[index].miembros.find(element=>element==memberId)){
        //     movementId=response[index]._id;
        //   }
        // }
      }      
    })
    this.delay(1000);

    return isAsesor;

  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  //    Verifica si el id es algun tipo de jefe o monitor y una que ejecura todas                //
  /////////////////////////////////////////////////////////////////////////////////////////////////

  public async isZoneChief(memberId:String):Promise<Boolean>{
    var isChief:Boolean = null;

    await structures.find({"zonas.jefes":memberId},function(err,response:IStructure[]){
      if(err){
        console.log("Error al obtener 'isZoneChief'")
      }else{
        if(response.length>0){
          isChief=true;
          console.log(response);
        }else{
          isChief=false
          console.log("lista vacia");
        }
      }
    })
    this.delay(1000);

    return isChief;

  }

  public async isBranchChief(memberId:String):Promise<Boolean>{
    var isChief:Boolean = null;

    await structures.find({"zonas.ramas.jefes":memberId},function(err,response:IStructure[]){
      if(err){
        console.log("Error al obtener 'isBranchChief'")
      }else{
        if(response.length>0){
          isChief=true;
          console.log(response);
        }else{
          isChief=false
          console.log("lista vacia");
        }
      }
    })
    this.delay(1000);

    return isChief;

  }

  public async isGroupChief(memberId:String):Promise<Boolean>{
    var isChief:Boolean = null;

    await structures.find({"zonas.ramas.grupos.jefes":memberId},function(err,response:IStructure[]){
      if(err){
        console.log("Error al obtener 'isGroupChief'")
      }else{
        if(response.length>0){
          isChief=true;
          console.log(response);
        }else{
          isChief=false
          console.log("lista vacia");
        }
      }
    })
    this.delay(1000);

    return isChief;

  }

  public async isMonitor(memberId:String):Promise<Boolean>{
    var isChief:Boolean = null;

    await structures.find({"zonas.ramas.monitores":memberId},function(err,response:IStructure[]){
      if(err){
        console.log("Error al obtener 'isMonitor'")
      }else{
        if(response.length>0){
          isChief=true;
          console.log(response);
        }else{
          isChief=false
          console.log("lista vacia");
        }
      }
    })
    this.delay(1000);

    return isChief;

  }

  public async isSomeChief(memberId:String):Promise<Boolean>{
    var isChief:Boolean = null;

    await this.isZoneChief(memberId).then(async (value)=>{
      if(!value){
        await this.isBranchChief(memberId).then(async (value)=>{
          if(!value){
            await this.isGroupChief(memberId).then(async (value)=>{
              if(!value){
                await this.isMonitor(memberId).then((value)=>{
                  if(!value){
                    isChief=false
                  }else{
                    isChief=true
                  }
                })
              }else{
                isChief=true
              }
            })
          }else{
            isChief=true
          }
        })
      }else{
        isChief=true
      }
    })
    this.delay(1000);

    return isChief

  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  //    Verifica si el id miembro de un grupo, para el rol mas simple                            //
  /////////////////////////////////////////////////////////////////////////////////////////////////

  public async isGroupMember(memberId:String):Promise<Boolean>{
    var isMember:Boolean = null;

    await structures.find({"zonas.ramas.grupos.miembros":memberId},function(err,response:IStructure[]){
      if(err){
        console.log("Error al obtener 'isMonitor'")
      }else{
        if(response.length>0){
          isMember=true;
          console.log(response);
        }else{
          isMember=false
          console.log("lista vacia");
        }
      }
    })
    this.delay(1000);

    return isMember;

  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  //    FUNCION QUE UNE A LAS ANTERIORES PARA OBTENER EL ROL EN SI                               //
  /////////////////////////////////////////////////////////////////////////////////////////////////

  public async getMemberRol(memberId:String):Promise<Number>{
    var typeRol:Number = null;

    await this.isAsesor(memberId).then(async (value)=>{
      if(!value){
        await this.isSomeChief(memberId).then(async (value)=>{
          if(!value){
            await this.isGroupMember(memberId).then((value)=>{
              if(value){
                typeRol=3 // rol del miembro de grupo
              }
            })
          }else{
            typeRol=2 // rol de los jefes y monitores
          }
        })
      }else{
        typeRol=1 // rol del Asesor general y comite
      }
    })
    this.delay(1000);

    //while(typeRol==null){}
    return typeRol;

  }


  
  public _addAsesor(
    idAsesor: String,
    idMovement:number,
    callback: any
  ) {
    console.log("-- Adding asesor to structure --");
    //structures.update({_id:idMovement}, {$push: { miembros: idAsesor  } },callback);

    structures.update(
      {_id:idMovement},
      { $push: { "miembros": idAsesor } },
      { arrayFilters: [], multi: true },callback
    );

    console.log(" -- Miembro Insertado -- ");
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  //    Quitar persona de la estructura                                                          //
  /////////////////////////////////////////////////////////////////////////////////////////////////

  public deleteCompleteMember( element: String, idMovement: Number, callback: any ) {
    //"GRUPO-ZoneChief-idZona-idRama-idGrupo-idPersona"
    var donde = element.split("-")[0];
    ///                                                                            ///
    if(donde == "ZONA"){
      var role = element.split("-")[1];
      var zoneName = element.split("-")[2];
      var memberId = element.split("-")[3];
      if ( role == "ZoneChief" ) {
        structures.update(
          {_id:idMovement},
          { $pull: { "zonas.$[elem].jefes": memberId } },
          { arrayFilters: [{ "elem.name": { $eq: zoneName } }], multi: true },callback
        );
      } else {
        structures.update(
          {_id:idMovement},
          { $pull: { "zonas.$[elem].miembros": memberId } },
          { arrayFilters: [{ "elem.name": { $eq: zoneName } }], multi: true },callback
        );
      }
    ///                                                                            ///
    }else if(donde == "RAMA"){
      var role = element.split("-")[1];
      var zoneName = element.split("-")[2];
      var ramaId = element.split("-")[3];
      var memberId = element.split("-")[4];
      console.log("borrando de la Rama");
      if ( role == "Monitor" ) {
        structures.updateOne(
          {_id:idMovement},
          { $pull: { "zonas.$[elem].ramas.$[rma].monitores": memberId } },
          {
          arrayFilters: [
            { "elem.name": { $eq: zoneName } },
            { "rma.id": { $eq: ramaId } }
          ],
          multi: true,
          },callback
        );
      } else if ( role == "BranchChief") {
        structures.updateOne(
          {_id:idMovement},
          { $pull: { "zonas.$[elem].ramas.$[rma].jefes": memberId } },
          {
          arrayFilters: [
            { "elem.name": { $eq: zoneName } },
            { "rma.id": { $eq: ramaId } }
          ],
          multi: true,
          },callback
        );
      } else {
        structures.updateOne(
          {_id:idMovement},
          { $pull: { "zonas.$[elem].ramas.$[rma].miembros": memberId } },
          {
          arrayFilters: [
            { "elem.name": { $eq: zoneName } },
            { "rma.id": { $eq: ramaId } }
          ],
          multi: true,
          },callback
        );
      }
    ///                                                                            ///
    }else{
      var role = element.split("-")[1];
      var zoneName = element.split("-")[2];
      var ramaId = element.split("-")[3];
      var groupId = element.split("-")[4];
      var memberId = element.split("-")[5];
    }
    if ( role == "Monitor" ) {
      structures.updateOne(
        {_id:idMovement},
        { $pull: { "zonas.$[elem].ramas.$[rma].grupos.$[grp].monitores": memberId } },
        {
        arrayFilters: [
          { "elem.name": { $eq: zoneName } },
          { "rma.id": { $eq: ramaId } },
          { "grp.id": { $eq: groupId } },
        ],
        multi: true,
        },callback
      );
    } else if ( role == "GroupChief") {
      structures.updateOne(
        {_id:idMovement},
        { $pull: { "zonas.$[elem].ramas.$[rma].grupos.$[grp].jefes": memberId } },
        {
        arrayFilters: [
          { "elem.name": { $eq: zoneName } },
          { "rma.id": { $eq: ramaId } },
          { "grp.id": { $eq: groupId } },
        ],
        multi: true,
        },callback
      );
    } else {
      structures.updateOne(
        {_id:idMovement},
        { $pull: { "zonas.$[elem].ramas.$[rma].grupos.$[grp].miembros": memberId } },
        {
        arrayFilters: [
          { "elem.name": { $eq: zoneName } },
          { "rma.id": { $eq: ramaId } },
          { "grp.id": { $eq: groupId } },
        ],
        multi: true,
        },callback
      );
    }

  }
}
