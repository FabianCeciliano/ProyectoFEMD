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

    public existZone (name:String){
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if(this.structure.groupComposite[zindex].name==name){
                return true;
            }
            
        }
        return false;
    }
    
    public addZone(pDato : IComponent) : Boolean{
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
                                //this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].addMonitor(monitor);
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


    public getEst() {
        let dataEst: String[] = [];
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            dataEst.push("ZONA:");
            dataEst.push(this.structure.groupComposite[zindex].name);
            dataEst.push('</br>');
            for (let jindex = 0; jindex < this.structure.groupComposite[zindex].members.length; jindex++) {
                dataEst.push("\tJefe: ", this.structure.groupComposite[zindex].members[jindex].name);
                dataEst.push('</br>');
                dataEst.push("\t  Id    : ", this.structure.groupComposite[zindex].members[jindex].id.toString());
                dataEst.push('</br>');
                dataEst.push("\t  Rol    : ", this.structure.groupComposite[zindex].members[jindex].get_rol().toString());
                dataEst.push('</br>');
                dataEst.push("\t  Email : ", this.structure.groupComposite[zindex].members[jindex].email);
                dataEst.push('</br>');
            }
            for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                dataEst.push("\t\t")
                dataEst.push("RAMA:");
                dataEst.push(" "+this.structure.groupComposite[zindex].getCompositeGroup()[bindex].name)
                dataEst.push('</br>');
                for (let jindex = 0; jindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; jindex++) {
                    dataEst.push("\t\t\tJefe: ", this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[jindex].name);
                    dataEst.push('</br>');
                    dataEst.push("\t\t\t  Id      : ", this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[jindex].id.toString());
                    dataEst.push('</br>');
                    dataEst.push("\t\t\t  Rol      : ", this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[jindex].get_rol().toString());
                    dataEst.push('</br>');
                    dataEst.push("\t\t\t  Email   : ", this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[jindex].email);
                    dataEst.push('</br>');
                }
                for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                    dataEst.push("\t\t\t\t")
                    dataEst.push("GRUPO:");
                    dataEst.push(" "+this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].name);
                    dataEst.push('</br>');
                    dataEst.push("\t\t\t\t\t\t")
                    dataEst.push("MIEMBRO:")
                    for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                        dataEst.push('</br>');
                        dataEst.push("\t\t\t\t\t\t\t--> ", this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].name);
                        dataEst.push("\t\t\t\t\t\t\t\t",+"Rol: "+this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].get_rol().toString());
                        dataEst.push('</br>');
                    }
                }
            }
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

    public consultMemberParticipation(pIdData: number) {
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

    public assignZoneManagement(zoneName: String, idMember: number) {
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
    public assignGroupManagement(zoneName: String, idBranch: number, idGroup: number, member: Member) {
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id == idBranch) {
                        this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.push(member);
                        for (let gindex = 0; gindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup().length; gindex++) {
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].id == idGroup) {
                                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members.length; mindex++) {
                                    if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].id == member.id) {
                                        this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex].set_rol(Rol.groupChief);
                                        return true;
                                    }
                                }
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
                            return Object.assign({}, this.structure.groupComposite[zindex].getCompositeGroup()[bindex].getCompositeGroup()[gindex].members[mindex]);//Clones object
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
        let zoneNames: String[]=[];
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
        let brachNames: String[]=[];
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
        let groupNames: String[]=[];
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

    // Le quita el rol de jefe de zona pero lo deja como miembro de la misma        //
    // Ya que siguie siendo jefe de rama                                            //
    public removeZoneChief(zoneName: String, pIdData: number): Boolean {
        let result: Boolean = false;
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if (this.structure.groupComposite[zindex].name == zoneName) {
                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].members.length; mindex++) {
                    if (this.structure.groupComposite[zindex].members[mindex].id == pIdData) {
                        this.structure.groupComposite[zindex].members[mindex].set_rol(Rol.BranchChief);
                        console.log("BORRE UN JEFE DE ZONA");
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
        let flag : Boolean = false;
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
                            if (this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].id == pIdData && flag==true) {
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
    public removeGroupChief(zoneName:String, branchId:number, idGroup:number, pIdData:number){
        for (let zindex = 0; zindex < this.structure.groupComposite.length; zindex++) {
            if(this.structure.groupComposite[zindex].name==zoneName){
                for (let mindex = 0; mindex < this.structure.groupComposite[zindex].members.length; mindex++) {
                    if(this.structure.groupComposite[zindex].members[mindex].id==pIdData){
                        //  ELIMINA JEFE DE RAMA EN ZONA  //
                        this.structure.groupComposite[zindex].members.splice(mindex,1);
                    }
                } 
                for (let bindex = 0; bindex < this.structure.groupComposite[zindex].getCompositeGroup().length; bindex++) {
                    if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].id==branchId){
                        for (let mindex = 0; mindex < this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.length; mindex++) {
                            if(this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members[mindex].id==pIdData){
                                //  ELIMINA JEFE DE RAMA  //
                                this.structure.groupComposite[zindex].getCompositeGroup()[bindex].members.splice(mindex,1);
                            }
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
    
    public add(pDato: IComponent): void { };
    public delete(pDato: IComponent): void { };
    public search(pDato: IComponent): void { };
    public getStructure(): [IComponent] { return null };
    public setStructure(pData: [IComponent]): void { };

}