import controller from './controller/Controller'

/*controller.createMovement(123,"FEMD","www.femd.com","Costa Rica",123467);
//---------------------------------------------------------
//controller.swapGroup(2,3,5);controller.swapGroup(2,3,5);
controller.createNewZone(1,"Zona1");
    controller.createNewBranch("Zona1",1,"Rama1");
        controller.createNewGroup("Zona1","Rama1",1,"Grupo1");
            controller.addMemberToGroup("Zona1","Rama1","Grupo1",null,null,false,1,"Fabian","fabian@gmail.com",12345);
            controller.addMemberToGroup("Zona1","Rama1","Grupo1",null,null,false,2,"Valeria","valeria@gmail.com",12345);
            controller.addMemberToGroup("Zona1","Rama1","Grupo1",null,null,false,3,"Armando","armando@gmail.com",12345);
        controller.createNewGroup("Zona1","Rama1",2,"Grupo2");
            controller.addMemberToGroup("Zona1","Rama1","Grupo2",null,null,false,4,"Fabian","fabian@gmail.com",12345);
            controller.addMemberToGroup("Zona1","Rama1","Grupo2",null,null,false,5,"Valeria","valeria@gmail.com",12345);
            controller.addMemberToGroup("Zona1","Rama1","Grupo2",null,null,false,6,"Armando","armando@gmail.com",12345);
        controller.createNewGroup("Zona1","Rama1",3,"Grupo3");
            controller.addMemberToGroup("Zona1","Rama1","Grupo3",null,null,false,7,"Fabian","fabian@gmail.com",12345);
            controller.addMemberToGroup("Zona1","Rama1","Grupo3",null,null,false,8,"Fernanda","valeria@gmail.com",12345);
            controller.addMemberToGroup("Zona1","Rama1","Grupo3",null,null,false,9,"Armando","armando@gmail.com",12345);
    controller.createNewBranch("Zona1",2,"Rama2");
        controller.createNewGroup("Zona1","Rama2",4,"Grupo1");
        controller.createNewGroup("Zona1","Rama2",5,"Grupo2");
        controller.createNewGroup("Zona1","Rama2",6,"Grupo3");
    controller.createNewBranch("Zona1",3,"Rama3");
        controller.createNewGroup("Zona1","Rama3",7,"Grupo1");
        controller.createNewGroup("Zona1","Rama3",8,"Grupo2");
        controller.createNewGroup("Zona1","Rama3",9,"Grupo3");
*/
//---------------------------------------------------------
//controller.createNewZone(2,"Zona2");


//---------------------------------------------------------
//controller.createNewZone(3,"Zona3");


//---------------------------------------------------------
//controller.createNewZone(4,"Zona4");


//controller.verEstructura();
//--------------------Consultar Grupo-------------------------------------

/*controller.consultMember(7);

controller.consultGroup(2,"Grupo2");
controller.consultGroup(6,"Grupo3");

//--------------------Cambios de Grupo-------------------------------------
controller.swapGroup(2,3,5);

controller.swapGroup(3,5,7);

controller.verEstructura();*/


//--------------------Insertar Jefatura de Zona-------------------------------------
//controller.assignZoneManagement("Zona2",2,"Fabian",1, "Armando",6);
//controller.assignBranchManagement("Rama2",2,"Valeria",2, "Armando",3);
// controller.assignGroupManagement("Grupo1",7,"Fabian",7,"Armando",9);
// controller.verEstructura();
class animal{
    public tipo:String;
    constructor(tipo:String){
        this.tipo=tipo;
    }
}

class Persona{
    public nombre:String;
    public apellido:String;
    public animal:animal;

    constructor(nombre:String,apellido:String,animal:animal){
        this.apellido=apellido;
        this.nombre=nombre;
        this.animal=animal;
    }

    ver(){
        console.log("-------------------------");
        console.log("Nombre: ",this.nombre);
        console.log("Apellido: ",this.apellido);
        console.log("-------------------------");
    }

}

var personas:Persona[]=[];

personas.push(new Persona("fabian","ceciliano",new animal("perro")));
personas.push(new Persona("valeria","martinez",new animal("gato")));
personas.push(new Persona("adriana","abarca",new animal("caballo")));


var yo:Persona = personas[1];
yo.nombre="Andres";
yo.apellido="no se";
yo.animal.tipo="Otro perro";

console.log(personas);

