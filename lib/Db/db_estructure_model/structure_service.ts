import { IRama } from "./rama_model";
import { IZone } from "./zone_model";
import { IStructure } from "./struc_model";
import structure from "./struc_schema";
import { IGroup } from "./grupo_model";
import { Request, Response } from "express";

export default class StructureService {
  /*
    Method used to create the basic structure in the 
    database and just setting the parameters of the 
    organization.
    */
  public setOrganizationParams(orgParams: IStructure) {
    const _session = new structure(orgParams);
    _session.save();
  }

  public insertZone(someParams: IZone) {
    console.log("Prueba");
    structure.updateOne({}, { $push: { zonas: someParams } });
    console.log("Despues");
  }

  public insertBranch(someParams: IRama, nombreZona: String) {
    console.log("Prueba");
    structure.update(
      {},
      { $push: { "zonas.$[elem].ramas": someParams } },
      { arrayFilters: [{ "elem.name": { $eq: nombreZona } }], multi: true }
    );

    console.log("Despues");
  }

  public insertGroup(
    someParams: IGroup,
    nombreZona: String,
    nombreRama: String
  ) {
    console.log(" -- DB --> Insertar Grupo --");
    structure.update(
      {},
      { $push: { "zonas.$[elem].ramas.$[rma].grupos": someParams } },
      {
        arrayFilters: [
          { "elem.name": { $eq: nombreZona } },
          { "rma.name": { $eq: nombreRama } },
        ],
        multi: true,
      }
    );

    console.log(" -- DB --> Grupo Insertado -- ");
  }

  public insertMemberGroupImp(
    zoneName: String,
    branchName: String,
    groupName: String,
    memberId: String
  ) {
    console.log(" -- Prueba Miembro en Grupo --");
    console.log(zoneName, branchName, groupName, memberId)
    structure.update(
      {},
      {
        $push: {
          "zonas.$[elem].ramas.$[rma].grupos.$[grp].miembros": memberId,
        },
      },
      {
        arrayFilters: [
          { "elem.name": { $eq: zoneName } },
          { "rma.name": { $eq: branchName } },
          { "grp.name ": { $eq: groupName } },
        ],
        multi: true,
      }
    );
    console.log(" -- Miembro Insertado -- ");
  }

  public insertMonitorGroupImp(
    zoneName: String,
    branchName: String,
    groupName: String,
    memberId: String
  ) {
    console.log(" -- Prueba Miembro en Grupo --");
    structure.update(
      {},
      {
        $push: {
          "zonas.$[elem].ramas.$[rma].grupos.$[grp].monitores": memberId,
        },
      },
      {
        arrayFilters: [
          { "elem.name": { $eq: zoneName } },
          { "rma.name": { $eq: branchName } },
          { "grp.name ": { $eq: groupName } },
        ],
        multi: true,
      }
    );
    console.log(" -- Miembro Insertado -- ");
  }

  public insertMonitorBranchImp(
    zoneName: String,
    branchName: String,
    memberId: String
  ) {
    console.log(" -- Prueba Miembro en Grupo --");
    structure.update(
      {},
      { $push: { "zonas.$[elem].ramas.$[rma].monitores": memberId } },
      {
        arrayFilters: [
          { "elem.name": { $eq: zoneName } },
          { "rma.name": { $eq: branchName } },
        ],
        multi: true,
      }
    );
    console.log(" -- Miembro Insertado -- ");
  }

  public assignBossGroupImp(
    zoneName: String,
    branchId: String,
    groupId: String,
    memberId: String
  ) {
    console.log(" -- Prueba Jefe en Grupo --");
    structure.update(
      {},
      { $push: { "zonas.$[elem].ramas.$[rma].grupos.$[grp].jefes": memberId } },
      {
        arrayFilters: [
          { "elem.name": { $eq: zoneName } },
          { "rma.id": { $eq: branchId } },
          { "grp.id ": { $eq: groupId } },
        ],
        multi: true,
      }
    );
    structure.update(
      {},
      { $push: { "zonas.$[elem].ramas.$[rma].miembros": memberId } },
      {
        arrayFilters: [
          { "elem.name": { $eq: zoneName } },
          { "rma.id": { $eq: branchId } },
        ],
        multi: true,
      }
    );
    console.log(" -- Jefe Insertado -- ");
  }

  public assignBossBranchImp(
    zoneName: String,
    branchId: String,
    memberId: String
  ) {
    console.log(" -- Prueba Jefe en Rama --");
    structure.update(
      {},
      { $push: { "zonas.$[elem].ramas.$[rma].jefes": memberId } },
      {
        arrayFilters: [
          { "elem.name": { $eq: zoneName } },
          { "rma.id": { $eq: branchId } },
        ],
        multi: true,
      }
    );
    structure.update(
      {},
      { $push: { "zonas.$[elem].miembros": memberId } },
      {
        arrayFilters: [
          { "elem.name": { $eq: zoneName } },
        ],
        multi: true,
      }
    );
    console.log(" -- Jefe Insertado -- ");
  }

  public assignBossZoneImp(zoneName: String, memberId: String) {
    console.log(" -- Prueba Jefe en Grupo --");
    structure.update(
      {},
      { $push: { "zonas.$[elem].jefes": memberId } },
      { arrayFilters: [{ "elem.name": { $eq: zoneName } }], multi: true }
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
    memberId: String
  ) {
    console.log(" -- BD: Prueba Movimiento de Miembro en Grupos --");
    structure.update(
      {},
      {
        $push: {
          "zonas.$[elem].ramas.$[rma].grupos.$[grp].miembros": memberId,
        },
      },
      {
        arrayFilters: [
          { "elem.name": { $eq: newzoneName } },
          { "rma.id": { $eq: newbranchId } },
          { "grp.id ": { $eq: newGroupId } },
        ],
        multi: true,
      }
    );
    structure.update(
        {},
        {
          $pull: {
            "zonas.$[elem].ramas.$[rma].grupos.$[grp].miembros": memberId,
          },
        },
        {
          arrayFilters: [
            { "elem.name": { $eq: oldzoneName } },
            { "rma.id": { $eq: oldbranchId } },
            { "grp.id ": { $eq: oldGroupId } },
          ],
          multi: true,
        }
      );
    console.log(" -- BD: Miembro Movido -- ");
  }
  
}
