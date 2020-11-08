import { IRama } from './rama_model';
import { IZone } from './zone_model';
import { IStructure } from './struc_model';
import structure from './struc_schema'
import { IGroup } from './grupo_model';
import { Request, Response } from "express";

export default class StructureService {
    
    /*
    Method used to create the basic structure in the 
    database and just setting the parameters of the 
    organization.
    */
    public setOrganizationParams(orgParams: IStructure, callback: any){
        const _session = new structure( orgParams );
        _session.save(callback);
    }

    public insertZone(someParams: IZone, nombreOrg: String,  callback: any){
        console.log("Prueba");
        structure.updateOne({name: nombreOrg}, {$push: { zonas: someParams  } },callback);
        console.log("Despues");
    }
    
    public insertBranch(someParams: IRama, nombreOrg: String, nombreZona: String,  callback: any){
        console.log("Prueba");
        structure.updateOne({"name": nombreOrg, "zonas.name": nombreZona },   
            {$push: { "zonas.$.ramas": someParams  } },callback);
        console.log("Despues");
    }

    public insertGroup(someParams: IGroup, nombreOrg: String, nombreZona: String, nombreRama: String, callback: any){
        console.log(" -- Prueba Insertar Grupo --");
        structure.update({},
        { $push: { "zonas.$[elem].ramas.$[rma].grupos" : someParams } },
        { arrayFilters: [ { "elem.name": { $eq: nombreZona } }, {"rma.name": { $eq: nombreRama }} ], multi: true }, callback);
                        
        console.log(" -- Grupo Insertado -- ");
    }

    public insertMemberGroupImp(req: Request, callback: any){
        console.log(" -- Prueba Miembro en Grupo --");
        structure.update({},
        { $push: { "zonas.$[elem].ramas.$[rma].grupos.$[grp].miembros" : req.body.memberId } },
        { arrayFilters: [ { "elem.name": { $eq: req.body.zoneName } }, 
        {"rma.name": { $eq: req.body.branchName }}, { "grp.name ": { $eq: req.body.name } } 
         ], multi: true }, callback);          
        console.log(" -- Miembro Insertado -- ");
    }


        // add 
        //add members

        //modify jefes en cualquier nivel
        //modificar monitores
        // modificar info de personas
        // mover persona de una rama a otra

        //
        //
        //

}