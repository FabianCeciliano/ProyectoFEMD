import { IComponent } from '../model/IComponent';
import { Composite_Level } from '../model/Composite_Level';
import { StructureType } from '../model/StructureType';
import { Member } from '../model/Member';
import { Rol } from '../model/Rol';


export class Gestor {

    private structure: Composite_Level;

    constructor() {
        this.structure = new Composite_Level(1, "Coordinacion", StructureType.Coordination);
    }

    public addAssessor(direction : String,rol : Rol,facilitador : boolean,id:number,name:String,email:String,telephone:number){
        this.structure.members.push(new Member(direction,rol,false,id,name,email,telephone));
    }

    public addAssesor(member:Member){
        this.structure.members.push(member);
    }

    public getAssesor() :Member{
        for (let index = 0; index < this.structure.members.length; index++) {
            if(this.structure.members[index].get_rol()==5){
                return this.structure.members[index];
            }
        }
        return null;
    }

    public existZone(name: String) {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == name) {
                return true;
            }

        }
        return false;
    }

    public addZone(pDato: IComponent): Boolean {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == pDato.name) {
                return false;
            }

        }
        this.structure.addComposite(pDato);
        return true;
    }

    public branchExists(pDato: number): Boolean {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == pDato) {
                    return true;
                }
            }
        }
        return false;
    }

    public getZones(): String[] {
        let zones: String[] = [];
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            zones.push(this.structure.groupComposite[zindex].name);
        }
        return zones;
    }

    public getBranches(zoneName: String) {
        let branches: String[] = [];
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    //console.log("ANTES ID : ---------------------> ", this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id)
                    branches.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id);
                    //console.log("ANTES ID : ---------------------> ", this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id)
                }
            }
        }
        return branches;
    }

    public getAllBranches() {
        let branches: String[] = [];
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                branches.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id);
            }
        }
        return branches;
    }

    public addBranch(pDato: IComponent, zoneName: String): Boolean {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == pDato.id) {
                        return false;
                    }
                }
                this.structure.groupComposite[zindex].addComposite(pDato);
                return true;
            }
        }

    }

    public addGroup(pDato: IComponent, zoneName: String, branchId: number): Boolean {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == branchId) {
                        for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id == pDato.id) {
                                return false;
                            }
                        }
                        this.structure.groupComposite[zindex].getCompositeGroup()[bindex].addComposite(pDato);
                        return true;
                    }
                }
            }
        }
    }

    public addMember(pDato: Member, zoneName: String, branchId: Number, groupId: Number): Boolean {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == branchId) {
                        for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id == groupId) {
                                this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.push(pDato);
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }



    public addMonitor(zoneName: String, branchId: number, idGroup: number, monitor: Member) {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == branchId) {
                        for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id == idGroup) {
                                this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.push(monitor);
                            }
                        }
                    }
                }
            }
        }
    }

    public changeToMonitor(zoneName: String, branchId: number, idGroup: number, idMonitor: number) {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == branchId) {
                        for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id == idGroup) {
                                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id == idMonitor) {
                                        this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].set_facilitador(true);
                                        this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].set_rol(Rol.monitor);
                                    }

                                }
                            }
                        }
                    }
                }
            }
        }
    }

    public deleteMemberFromGroup(zoneName: String, branchId: number, idGroup: number, pIdData: number): Member {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == branchId) {
                        for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id == idGroup) {
                                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id == pIdData) {
                                        return this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.splice(mindex, 1)[0];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return null;
    }


    public deleteGroupChief(zoneName: String, branchId: number, idGroup: number, pIdData: number): Member {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == branchId) {
                        for (let index = 0; index < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; index++) {
                            if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[index].get_rol() == 2){
                                console.log("DELETING GROUP CHIEF PAPU")
                                return this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.splice(index, 1)[0];
                            }                            
                        }
                    }
                }
            }
        }
        return null;
    }

    public verEstructura() {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            console.log("Zona: ", this.structure.groupComposite[zindex].name);
            for (let jindex = 0; jindex < this.structure.groupComposite[zindex].members.length; jindex++) {
                console.log("\tJefe: ", this.structure.groupComposite[zindex].members[jindex].name);
                console.log("\t  Id    : ", this.structure.groupComposite[zindex].members[jindex].id);
                console.log("\t  Email : ", this.structure.groupComposite[zindex].members[jindex].email);
            }
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                console.log("\t\tRama: ", this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name);
                for (let jindex = 0; jindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; jindex++) {
                    console.log("\t\t\tJefe: ", this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[jindex].name);
                    console.log("\t\t\t  Id      : ", this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[jindex].id);
                    console.log("\t\t\t  Email   : ", this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[jindex].email);
                }
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    console.log("\t\t\t\tGrupo: ", this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name);
                    console.log("\t\t\t\t\t\tMiembros:")
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                        console.log("\t\t\t\t\t\t\t-> ", this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].name);
                    }
                }
            }
        }
    }



    public getRol(pData: number) {
        var auxRol = "Miembro de Grupo";
        if (pData == 0) {
            auxRol = "Jefe de Rama";
            return auxRol;
        }
        else if (pData == 1) {
            auxRol = "Jefe de Zona";
            return auxRol;

        }
        else if (pData == 2) {
            auxRol = "Jefe de Grupo";
            return auxRol;

        }
        else if (pData == 3) {
            auxRol = "Monitor";
            return auxRol;
        }
        else if (pData == 5){
            auxRol = "Asesor";
            return auxRol;
        }
        else {
            return auxRol;
        }
    }

    public getEst() {
        let dataEst: String[] = [];
        let assessor : Member = this.getAssesor();
        dataEst.push("Jefatura de Movimiento");
        dataEst.push('</br>');
        for(let index = 0 ; index < this.structure.members.length ; index++){
            dataEst.push("\t|_Nombre: ", this.structure.members[index].name);
            dataEst.push('</br>');
            dataEst.push("\t|_Id    : ", this.structure.members[index].id.toString());
            dataEst.push('</br>');
            dataEst.push("\t|_Rol    : ",this.getRol(this.structure.members[index].get_rol())); 
            dataEst.push('</br>');
            dataEst.push("\t|_Email : ", this.structure.members[index].email);
            dataEst.push('</br>');
            dataEst.push('</br>');
        }
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            dataEst.push("ZONA:");
            dataEst.push('</br>');
            dataEst.push("   |___" + this.structure.groupComposite[zindex].name);
            dataEst.push('</br>');
            for (let jindex = 0; jindex < this.structure.groupComposite[zindex].members.length; jindex++) {
                dataEst.push("\t|_Nombre: ", this.structure.groupComposite[zindex].members[jindex].name);
                dataEst.push('</br>');
                dataEst.push("\t|_Id    : ", this.structure.groupComposite[zindex].members[jindex].id.toString());
                dataEst.push('</br>');
                dataEst.push("\t|_Rol    : ",this.getRol(this.structure.groupComposite[zindex].members[jindex].get_rol())); 
                dataEst.push('</br>');
                dataEst.push("\t|_Email : ", this.structure.groupComposite[zindex].members[jindex].email);
                dataEst.push('</br>');
                dataEst.push('</br>');
            }
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                dataEst.push("\t  |__")
                dataEst.push("RAMA:");
                dataEst.push('</br>');
                dataEst.push("\t\t|__" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name + ", ID: " + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id)
                dataEst.push('</br>');
                for (let jindex = 0; jindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; jindex++) {
                    dataEst.push("\t\t\t|__Nombre: ", this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[jindex].name);
                    dataEst.push('</br>');
                    dataEst.push("\t\t\t|__Id: ",  this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[jindex].id.toString());
                    dataEst.push('</br>');
                    dataEst.push("\t\t\t|__Rol: ",this.getRol(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[jindex].get_rol()));  
                    dataEst.push('</br>');
                    dataEst.push("\t\t\t|__Email: ", this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[jindex].email);
                    dataEst.push('</br>');
                    dataEst.push('</br>');
                }
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    dataEst.push("\t\t\t\t    |__")
                    dataEst.push("GRUPO:");
                    dataEst.push('</br>');
                    dataEst.push("\t\t\t\t\t  |__" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name + ", ID: " + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id);
                    dataEst.push('</br>');
                    dataEst.push("\t\t\t\t\t\t\t|__")
                    dataEst.push("MIEMBRO:")
                    dataEst.push('</br>');
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                        dataEst.push("\t\t\t\t\t\t\t\t|___", this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].name + ", Rol: " + this.getRol(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].get_rol()));
                        dataEst.push('</br>');
                    }
                }
            }
            dataEst.push('</br>');
            dataEst.push('//===========================================================================================================//');
            dataEst.push('</br>');
        }
        return dataEst;
    }



    public deleteObject(list: Member[], pIdData: number) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == pIdData) {
                list.splice(i, 1);
            }
        }
    }

    public deleteMember(pIdData: number) {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            this.deleteObject(this.structure.groupComposite[zindex].members, pIdData);
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                this.deleteObject(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members, pIdData);
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    this.deleteObject(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members, pIdData)
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                        if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id == pIdData) {
                            let member = this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex];
                            this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.splice(mindex, 1);
                            //return member;
                        }
                    }
                }
            }
        }
        //return null;
    }

    public consultGroup(pIdData: number, groupName: String) {
        let ZoneName;
        let BranchName;
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
     
               for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name == groupName
                        && this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id == pIdData) {
                        //Devuelve los datos a vista "Consulta de Grupo"
                        BranchName = this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name;
                        ZoneName = this.structure.groupComposite[zindex].name;
                        return { BranchName: BranchName, ZoneName: ZoneName };
                        console.log(ZoneName);
                        console.log(BranchName);
                        console.log(groupName);
                    }
                }
            }
        }
        return null;
    }

    public isIncluded(list: String[], value: String): String[] {
        let flag: Boolean = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i] == value) {
                flag = true;
            }
        }
        if (!flag) {
            list.push(value);
            return list;
        }
        return list;
    }


    public isMemberIncluded(list: Number[], value: Number): Number[] {
        let flag: Boolean = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i] == value) {
                flag = true;
            }
        }
        if (!flag) {
            list.push(value);
            return list;
        }
        return list;
    }

    public isMemberIncludedMember(list: Member[], value: Member): Member[] {
        let flag: Boolean = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == value.id) {
                flag = true;
            }
        }
        if (!flag) {
            list.push(value);
            return list;
        }
        return list;
    }

    public consultMemberParticipation(pIdData: number) {
        let ZoneList: String[] = []; // [zone1]
        let BranchList: String[] = []; //[zona1-rama1]
        let groupList: String[] = []; // [zona1-rama2-groupo3]
 
        //[zona1(rol),zona1-rama1(rol),zona1-rama2-groupo3(rol)]
        
        //Zona
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for(let mindex = 0 ; mindex < this.structure.groupComposite[zindex].members.length ; mindex++ ){
                if(this.structure.groupComposite[zindex].members[mindex].id == pIdData){
                    ZoneList.push(this.structure.groupComposite[zindex].name+"("+ this.getRol(this.structure.groupComposite[zindex].members[mindex].get_rol())+")");
                    console.log(ZoneList);
                }
            }
            //Rama
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    for(let mindex = 0 ; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length ; mindex++ ){
                        if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].id == pIdData){
                            BranchList.push(this.structure.groupComposite[zindex].name + "-"+
                                this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name +
                                "("+ this.getRol(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].get_rol())+")");
                                console.log(BranchList);
                        }
                    }
                //Grupo
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    //zona1-rama1-grupo1  [zona1-rama1-grupo, zona1-rama1] 
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                        if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id == pIdData) {
                            groupList.push(this.structure.groupComposite[zindex].name + "-"+
                            this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name + "-" +
                            this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name + 
                            "("+ this.getRol(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].get_rol())+")");
                            console.log(groupList);
                        }
                    }
                }
            }
        }
        return { zonas: ZoneList, ramas: BranchList, grupos: groupList };
    }


    public consultMemberParticipationEliminar(pIdData: number) {
        let ZoneList: String[] = [];
        let BranchList: String[] = [];
        let groupList: String[] = [];

        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                        if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id == pIdData) {
                            ZoneList = this.isIncluded(ZoneList, this.structure.groupComposite[zindex].name + "-");
                            BranchList = this.isIncluded(BranchList, this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id);
                            groupList = this.isIncluded(groupList, this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id);

                        }
                    }
                }
            }

        }
        return { zonas: ZoneList, ramas: BranchList, grupos: groupList };
    }

    public getMemberParticipation(pIdData: number): String[] {
        let memberParticipation: String[] = [];
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                        if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id == pIdData) {
                            memberParticipation.push(this.structure.groupComposite[zindex].name + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id);
                        }
                    }
                }
            }
            // [  "zona1-rama-idR-grupo-id","zona1-rama-idR-grupo-idg" ......                          ]
        }   // [ [zona1,zona2] ,[rama1 rama2], [ g1 ,g2 ] ]
        return memberParticipation;
    }

    public swapGroup(precedenceGroup: number, newGroup: number, pIdData: number) {
        let member = this.deleteMember(pIdData);
        if (member != null) {
            let ZoneName;
            let BranchName;
            let groupName;
            for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                        if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id == newGroup) {
                            BranchName = this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name;
                            ZoneName = this.structure.groupComposite[zindex].name;
                            groupName = this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name;
                            //this.addMember(member, ZoneName, BranchName, groupName);
                        }
                    }
                }
            }
        } else {
            console.log("No se pudo eliminar. Usuario no encontrado");
        }
    };

    public assignZoneManagement(zoneName: String, idMember: number, member: Member) {
        this.structure.members.push(member);
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].members.length; mindex++) {
                    if (this.structure.groupComposite[zindex].members[mindex].id == idMember) {
                        this.structure.groupComposite[zindex].members[mindex].set_rol(Rol.zoneChief);
                        return true;
                    }
                }
            }
        }
        return false;
    };

    public assignBranchManagement(zoneName: String, idBranch: number, member: Member) {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                this.structure.groupComposite[zindex].members.push(member);
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == idBranch) {
                        for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; mindex++) {
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].id == member.id) {
                                this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].set_rol(Rol.BranchChief);
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };

    public quitarMonitor(zoneName: String, idBranch: number, idGroup: number, memberId: number) {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == idBranch) {
                        for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id != idGroup) {
                                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id == memberId && (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].get_rol() == Rol.monitor || this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].get_facilitador()==true)) {
                                        return false;//el mae esta como monitor en otro grupo, no lo puedo quitar
                                    }
                                }
                            }

                        }
                        for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; mindex++) {
                            if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].id==memberId){
                                this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.splice(mindex,1);
                                return true;
                            }
                        }
                        //se elimina al mae...
                    }
                }
            }
        }
        return false;
    }

    public assignGroupManagement(zoneName: String, idBranch: number, idGroup: number, member: Member) {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == idBranch) {
                        this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.push(member);

                        for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id == idGroup) {
                                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].get_rol() == Rol.monitor || this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].get_facilitador()==true){
                                        this.quitarMonitor(zoneName,idBranch,idGroup,this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id);
                                        this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.splice(mindex,1);
                                    }
                                }
                                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id == member.id) {
                                        this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].set_rol(Rol.groupChief);
                                        return true;
                                    }
                                }
                                var temp:Member = member.clone();
                                temp.set_rol(Rol.groupChief);
                                this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.push(temp);
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    public addCoach(coach: Member, zoneName: String, ramaId: number): Boolean {

        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == ramaId) {
                        this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.push(coach);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public getMonitors(zoneName: String, ramaId: number): String[] {
        var monitors: String[] = [];
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == ramaId) {
                        for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; mindex++) {
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].get_facilitador() == true) {
                                monitors.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].name + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].id);
                            }
                        }
                    }
                }
            }
        }
        return monitors;
    }

    public getMember(idMember: number): Member {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                        if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id == idMember) {
                            //return Object.assign({}, this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex]);//Clones object
                            return this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex]
                        }
                    }
                }
            }
        }
    }
    public consultZoneManagement(zoneName: String) {
        var listZoneChief: String[] = [];
        var listBranchChief: String[] = [];

        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            console.log("Original:", this.structure.groupComposite[zindex].name, "\n", "entra:", zoneName);
            if (this.structure.groupComposite[zindex].name == zoneName) {
                console.log("Miembros desde estructura: ", this.structure.groupComposite[zindex].members);
                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].members.length; mindex++) {
                    if (this.structure.groupComposite[zindex].members[mindex].get_rol() == Rol.zoneChief) {
                        listZoneChief.push(this.structure.groupComposite[zindex].members[mindex].name + "-" + this.structure.groupComposite[zindex].members[mindex].id);
                    }
                    listBranchChief.push(this.structure.groupComposite[zindex].members[mindex].name + "-" + this.structure.groupComposite[zindex].members[mindex].id)
                }
            }
        }
        return { listZoneChief: listZoneChief, listBranchChief: listBranchChief }
    }
    public consultBranchManagement(zoneName: String, branchId: Number) {
        var listBranchChief: String[] = [];
        var listGroupChief: String[] = [];

        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == branchId) {
                        for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; mindex++) {
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].get_rol() == Rol.BranchChief) {
                                listBranchChief.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].name + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].id);
                            }
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].get_facilitador() != true || this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].get_rol() != Rol.monitor) {
                                listGroupChief.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].name + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].id);
                            }
                        }
                    }
                }
            }
        }
        return { listBranchChief: listBranchChief, listGroupChief: listGroupChief }
    }

    public consultGroupManagement(zoneName: String, branchId: Number, groupId: Number) {
        var listGroupChief: String[] = [];
        var listMembersChief: String[] = [];

        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == branchId) {
                        for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id == groupId) {
                                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].get_rol() == Rol.groupChief) {
                                        listGroupChief.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].name + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id);
                                    } else if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].get_rol() != Rol.monitor) {
                                        listMembersChief.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].name + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        //console.log("Lista chief --> ", listGroupChief)
        //console.log("\n Lista members --> ", listMembersChief)
        return { listGroupChief: listGroupChief, listMembersChief: listMembersChief };
    }

    public getZoneManagement(zoneName: String): String[] {
        let zoneNames: String[] = [];
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let jindex = 0; jindex < this.structure.groupComposite[zindex].members.length; jindex++) {
                    zoneNames.push(this.structure.groupComposite[zindex].members[jindex].name);
                }
            }
        }
        return zoneNames;
    }

    public getBranchManagement(pIdBrach: number): String[] {
        let brachNames: String[] = [];
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == pIdBrach) {
                    for (let jindex = 0; jindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; jindex++) {
                        brachNames.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[jindex].name);
                    }
                }
            }
        }
        return brachNames;
    }

    public getGroupManagement(pIdGroup: number): String[] {
        let groupNames: String[] = [];
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id == pIdGroup) {
                        for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].get_facilitador() == true ||
                                this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].get_rol() == Rol.groupChief) {
                                groupNames.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].name);
                            }
                        }
                    }
                }
            }
        }
        return groupNames;
    }

    public getBranchesInNeed(): String[] {
        let branches: String[] = [];
        let branchInNeed: number = 0;
        let branch: String;

        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                for (let jindex = 0; jindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; jindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[jindex].get_facilitador() == true) {
                        branchInNeed += 1;
                    }
                }
                if (branchInNeed == 0 || branchInNeed == 1) {
                    branch = this.structure.groupComposite[zindex].name + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id;
                    this.isIncluded(branches, branch);
                }
                branchInNeed = 0;
            }
        }

        return branches;
    }

    public getGroups(zoneName: String, branchId: number): String[] {
        let groups: String[] = [];
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == branchId) {
                        for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                            groups.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id);
                        }
                    }
                }
            }
        }
        return groups;
    }

    public getAllGroups(): String[] {
        let groups: String[] = [];
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    groups.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name + "-" + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id);
                }
            }
        }
        return groups;
    }

    // Le quita el rol de jefe de zona pero lo deja como miembro de la misma        //
    // Ya que siguie siendo jefe de rama                                            //
    public removeZoneChief(zoneName: String, pIdData: number): Boolean {
        let result: Boolean = false;
        for (let index = 0; index < this.structure.members.length; index++) {
            if(this.structure.members[index].id == pIdData){
                this.structure.members.splice(index, 1);
            }
        }
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].members.length; mindex++) {
                    if (this.structure.groupComposite[zindex].members[mindex].id == pIdData) {
                        this.structure.groupComposite[zindex].members[mindex].set_rol(Rol.BranchChief);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // Le quita el rol de jefe de rama, sigue dentro de ella como jefe de grupo     //
    // Lo elimina de la jefatura de zona                                            //
    //////////////////////////////////////////////////////////////////////////////////
    public removeBranchChief(zoneName: String, branchId: number, pIdData: number): Boolean {
        let flag: Boolean = false;
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].members.length; mindex++) {
                    if (this.structure.groupComposite[zindex].members[mindex].id == pIdData) {
                        //  ELIMINA JEFE DE RAMA EN ZONA  //
                        this.structure.groupComposite[zindex].members.splice(mindex, 1);
                        flag = true;
                    }
                }
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == branchId) {
                        for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; mindex++) {
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].id == pIdData && flag == true) {
                                //  Reestablece ROL ... JEFE DE RAMA  //
                                this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].set_rol(Rol.groupChief);
                                //this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.splice(mindex,1);
                                console.log("BORRE UN JEFE DE RAMA");
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    // Le quita el rol de jefe de rama, sigue dentro de ella como jefe de grupo     //
    // Lo elimina de la jefatura de zona                                            //
    //////////////////////////////////////////////////////////////////////////////////
    public removeGroupChief(zoneName: String, branchId: number, idGroup: number, pIdData: number) {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].members.length; mindex++) {
                    if (this.structure.groupComposite[zindex].members[mindex].id == pIdData) {
                        //  ELIMINA JEFE DE RAMA EN ZONA  //
                        this.structure.groupComposite[zindex].members.splice(mindex, 1);
                    }
                }
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == branchId) {
                        for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; mindex++) {
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].id == pIdData) {
                                //  ELIMINA JEFE DE RAMA  //
                                this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.splice(mindex, 1);
                            } //holisssss
                        }
                        for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                            for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                                if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id == pIdData) {
                                    this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].set_rol(Rol.groupMember);
                                    console.log("BORRE UN MIEMBRO DE GRUPO");
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    public getSubscribers(nivel : String, ruta : String) : Number[]{
        var subscribers:Number[]=[];

        if(nivel=="Zona"){ //zona
            for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
                if(this.structure.groupComposite[zindex].name==ruta){    
                    // for para jefatura de zona
                    //isMemberIncluded
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].members.length; mindex++){
                        this.isMemberIncluded(subscribers,this.structure.groupComposite[zindex].members[mindex].id);
                    }
                    // FIN for para jefatura de zona

                    for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                        // for para jefatura de zona
                        for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; mindex++){
                            this.isMemberIncluded(subscribers,this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].id);
                        }
                        // FIN for para jefatura de zona

                        for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                            //for para miembros de grupos
                            for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++){
                                this.isMemberIncluded(subscribers,this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id);
                            }
                            // FIN for para jefatura de zona
                        }
                    }                    
                }
            }
        }else if(nivel=="Rama"){ //zona-rama
            var parseRoute = ruta.split("-", 2); // ["zone", "rama"] 
            //Itera Zona
            for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
                //Encuentra zona indicada
                if(this.structure.groupComposite[zindex].name == parseRoute[0]){
                    //Itera las ramas
                    for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                        //Encuentra la rama indicada
                        if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id== Number(parseRoute[1])){

                            //Inserta los Miembros de la Rama
                            for (let bMindex = 0; bMindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; bMindex++) {
                                this.isMemberIncluded(subscribers,this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[bMindex].id);
                            }
                            //Itera los grupos
                            for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                                //Itera los miembros de cada grupo
                                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                                    this.isMemberIncluded(subscribers,this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id);
                                }
                            }  
                        }
                    }   
                }
            }
        }else{ //zona-rama-grupo
            var parseRoute = ruta.split("-", 3); // ["zone", "rama", "grupo"] 
            //Itera Zona
            for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
                //Encuentra zona indicada
                if(this.structure.groupComposite[zindex].name == parseRoute[0]){
                    //Itera las ramas
                    for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                        //Encuentra la rama indicada
                        if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id== Number(parseRoute[1])){
                            //Itera los grupos
                            for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                                //Encuentra grupo indicado
                                if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id==Number(parseRoute[2])){
                                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                                        this.isMemberIncluded(subscribers,this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id);
                                    }
                                }
                            }  
                        }
                    }   
                }
            }
        }
    
        return subscribers;        

    }
    //cambio
    public consultarNodo(ruta : String) {
        var subscribers:Member[]=[];
        var rutaElem=ruta.split("-")
        
        if(rutaElem.length==1){ //zona
            for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
                if(this.structure.groupComposite[zindex].name==ruta){    
                    // for para jefatura de zona
                    //isMemberIncluded
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].members.length; mindex++){
                        this.isMemberIncludedMember(subscribers,this.structure.groupComposite[zindex].members[mindex]);
                    }
                    // FIN for para jefatura de zona

                    for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                        // for para jefatura de zona
                        for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; mindex++){
                            this.isMemberIncludedMember(subscribers,this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex]);
                        }
                        // FIN for para jefatura de zona

                    }                    
                }
            }
        }else if(rutaElem.length==2){ //zona-rama
            var parseRoute = ruta.split("-", 2); // ["zone", "rama"] 
            //Itera Zona
            for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
                //Encuentra zona indicada
                if(this.structure.groupComposite[zindex].name == parseRoute[0]){
                    //Itera las ramas
                    for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                        //Encuentra la rama indicada
                        if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id== Number(parseRoute[1])){

                            //Inserta los Miembros de la Rama
                            for (let bMindex = 0; bMindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; bMindex++) {
                                this.isMemberIncludedMember(subscribers,this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[bMindex]);
                            }
                            //Itera los grupos
                            for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                                //Itera los miembros de cada grupo
                                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                                    this.isMemberIncludedMember(subscribers,this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex]);
                                }
                            }  
                        }
                    }   
                }
            }
        }else{ //zona-rama-grupo
            var parseRoute = ruta.split("-", 3); // ["zone", "rama", "grupo"] 
            //Itera Zona
            for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
                //Encuentra zona indicada
                if(this.structure.groupComposite[zindex].name == parseRoute[0]){
                    //Itera las ramas
                    for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                        //Encuentra la rama indicada
                        if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id== Number(parseRoute[1])){
                            //Itera los grupos
                            for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                                //Encuentra grupo indicado
                                if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id==Number(parseRoute[2])){
                                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                                        this.isMemberIncludedMember(subscribers,this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex]);
                                    }
                                }
                            }  
                        }
                    }   
                }
            }
        }
    
        return subscribers;        

    }

    public getRoute(emissor : Number) : String[]{
        var ruta:String[]=[]
        
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    //for para miembros de grupos
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++){
                        if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id==emissor){
                            return [this.structure.groupComposite[zindex].name,this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name,this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name];
                        }
                    }
                    // FIN for para jefatura de zona
                }
            } 
        }

        return ruta;
    }

    public consultarGrupos( idSesion : Number){
        var nombresGrupos:String[]=[];
        var miembros:Member[][]=[]

        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    //for para miembros de grupos
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++){
                        if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id==idSesion){
                            nombresGrupos.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name + "  " + this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id.toString())
                            miembros.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members);
                            break;
                        }
                    }
                }
            } 
        }
        return {nombresGrupos:nombresGrupos,miembros:miembros}
    }
    
    public consultarGruposLiderazgo( idSesion : Number){
        var nombresGrupos:String[]=[];
        var miembros:Member[][]=[]
        var roles : String [];

        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    //for para miembros de grupos
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++){
                        if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id==idSesion
                            && (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].get_rol()==Rol.monitor
                            || this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].get_rol()==Rol.groupChief))
                        {
                            nombresGrupos.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name + " "+ this.getRol(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].get_rol()));
                            miembros.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members);
                            break;
                        }
                    }
                }
            } 
        }
        return {nombresGrupos:nombresGrupos,miembros:miembros}
    }

    public consultarRamasZonas( idSesion : Number){
        var nombresNivel:String[]=[];
        var miembros:Member[][]=[]

        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            // for para jefatura de zona
            //isMemberIncluded
            for (let mindex = 0; mindex < this.structure.groupComposite[zindex].members.length; mindex++){
                if(this.structure.groupComposite[zindex].members[mindex].id==idSesion){
                    nombresNivel.push(this.structure.groupComposite[zindex].name);
                    miembros.push(this.structure.groupComposite[zindex].members);
                    break;
                }
            }
            // FIN for para jefatura de zona

            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                // for para jefatura de zona
                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; mindex++){
                    if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].id==idSesion){
                        nombresNivel.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name);
                        miembros.push(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members);
                        break;
                    }
                }
                // FIN for para jefatura de zona
            } 
        }
        return {nombresNivel:nombresNivel,miembros:miembros}
    }

    public resumenConsolidado(idSesion : Number){

        var participacion = [];
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            // for para jefatura de zona
            //isMemberIncluded
            for (let mindex = 0; mindex < this.structure.groupComposite[zindex].members.length; mindex++){
                if(this.structure.groupComposite[zindex].members[mindex].id==idSesion){
                    participacion.push({nivel:'Zona',nombre:this.structure.groupComposite[zindex].name,id:null});
                }
            }
            // FIN for para jefatura de zona
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                // for para jefatura de zona
                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; mindex++){
                    if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].id==idSesion){
                        participacion.push({nivel:'Rama',nombre:this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name, id:this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id});
                    }
                }
                // FIN for para jefatura de zona
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    //for para miembros de grupos
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++){
                        if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id==idSesion){
                            participacion.push({nivel:'Grupo',nombre:this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name,id:this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id});
                        }
                    }
                    // FIN for para jefatura de zona
                }
            }                    
        }
        return participacion;
    }

    


    // ! FUNCION BD ----------------------------------------------------------------------------------------------------------------------//
    public getMemberSpecificParticipation(pIdData: number): String[] {
        let memberParticipation: String[] = [];

        // * ZONAS
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            // * Pasar por todos los miembros de la zona y verificar si el id esta ahi //
            // * Para el miembro encontrado BUSCAR CUAL ES EL ROL QUE TIENE (MiembroZona o JefeZona)//
            for (let mindex = 0; mindex < this.structure.groupComposite[zindex].members.length; mindex++) {
                if (this.structure.groupComposite[zindex].members[mindex].id == pIdData) {
                    var toBePushed = "ZONA-"; 
                    if (this.structure.groupComposite[zindex].members[mindex].get_rol() == Rol.zoneChief){
                    toBePushed += "ZoneChief-";
                    }else{
                        toBePushed += "ZoneMember-";
                    }
                    toBePushed = toBePushed + this.structure.groupComposite[zindex].name + "-";
                    toBePushed += this.structure.groupComposite[zindex].members[mindex].id.toString();
                    memberParticipation.push(toBePushed);             
                }
            }
            // * RAMAS
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                // ! Pasar por todos los miembros de las ramas y verificar si esta ahi //
                // ! Para el miembro encontrado BUSCAR EL ROL QUE TIENE //
                // Monitores Miembros(groupChief) o Jefes
                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; mindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].id == pIdData) {
                        var toBePushed = "RAMA-"; 
                        if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].get_rol() == Rol.monitor){
                        toBePushed += "Monitor-";
                        } else if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].get_rol() == Rol.BranchChief){
                            toBePushed += "BranchChief-";
                        } else {
                            toBePushed += "GroupChief-";
                        }
                        toBePushed = toBePushed + this.structure.groupComposite[zindex].name + "-" + 
                                                this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id + "-";
                        toBePushed += this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].id.toString();
                        memberParticipation.push(toBePushed);             
                    }
                }

                // * GRUPOS
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    // ! Pasar por todos los miembros de las ramas y verificar si esta ahi //
                    // ! Para el miembro encontrado BUSCAR EL ROL QUE TIENE (MONITORIES, MIEMBROS, JEFES DE GRUPO) //
                    // * Anadir a la lista de cosas a borrar de la base de datos //
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                        if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id == pIdData) {
                            var toBePushed = "GRUPO-"; 
                            if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].get_rol() == Rol.groupChief){
                                toBePushed += "GroupChief-";
                            } else if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].get_rol() == Rol.monitor){
                                toBePushed += "Monitor-";
                            } else {
                                toBePushed += "GroupMember-";
                            }
                            toBePushed = toBePushed + this.structure.groupComposite[zindex].name + "-" + 
                                                    this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id + "-" +
                                                    this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id + "-";
                            toBePushed += this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id.toString();
                            memberParticipation.push(toBePushed); 
                        }
                    }
                }
            }
            // [ "ZONA-ZoneChief-idZona-idPersona", "RAMA-BranchChief-idZona-idRama-idPersona", "GRUPO-ZoneChief-idZona-idRama-idGrupo-idPersona" ]
        }
        return memberParticipation;
    }
    // ! BD ----------------------------------------------------------------------------------------------------------------------//


    public add(pDato: IComponent): void { };
    public delete(pDato: IComponent): void { };
    public search(pDato: IComponent): void { };
    public getStructure(): [IComponent] { return null };
    public setStructure(pData: [IComponent]): void { };

}