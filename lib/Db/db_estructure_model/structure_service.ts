import { IRama } from "./rama_model";
import { IZone } from "./zone_model";
import { IStructure } from "./struc_model";
import structures from "./struc_schema";
import { IGroup } from "./grupo_model";
import { Request, response, Response } from "express";

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
    console.log(" -- Prueba Miembro en Grupo --");
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
  
  public quitGroupChief(
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

}