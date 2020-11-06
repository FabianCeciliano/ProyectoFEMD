import controller from './controller/Controller'

controller.createMovement(123,"FEMD","www.femd.com","Costa Rica",123467);

//---------------------------------------------------------
controller.createNewZone(1,"Zona1",1);
    controller.createNewBranch("Zona1",1,"Rama1",1);
        controller.createNewGroup("Zona1","Rama1",1,"Grupo1",1);
            controller.addMemberToGroup("Zona1","Rama1","Grupo1",null,null,false,1,"Fabian","fabian@gmail.com",12345);
            controller.addMemberToGroup("Zona1","Rama1","Grupo1",null,null,false,2,"Valeria","valeria@gmail.com",12345);
            controller.addMemberToGroup("Zona1","Rama1","Grupo1",null,null,false,3,"Armando","armando@gmail.com",12345);
        controller.createNewGroup("Zona1","Rama1",2,"Grupo2",2);
            controller.addMemberToGroup("Zona1","Rama1","Grupo2",null,null,false,4,"Fabian","fabian@gmail.com",12345);
            controller.addMemberToGroup("Zona1","Rama1","Grupo2",null,null,false,5,"Valeria","valeria@gmail.com",12345);
            controller.addMemberToGroup("Zona1","Rama1","Grupo2",null,null,false,6,"Armando","armando@gmail.com",12345);
        controller.createNewGroup("Zona1","Rama1",3,"Grupo3",3);
            controller.addMemberToGroup("Zona1","Rama1","Grupo3",null,null,false,7,"Fabian","fabian@gmail.com",12345);
            controller.addMemberToGroup("Zona1","Rama1","Grupo3",null,null,false,8,"Valeria","valeria@gmail.com",12345);
            controller.addMemberToGroup("Zona1","Rama1","Grupo3",null,null,false,9,"Armando","armando@gmail.com",12345);
    controller.createNewBranch("Zona1",2,"Rama2",2);
        controller.createNewGroup("Zona1","Rama2",1,"Grupo1",1);
        controller.createNewGroup("Zona1","Rama2",2,"Grupo2",2);
        controller.createNewGroup("Zona1","Rama2",3,"Grupo3",3);
    controller.createNewBranch("Zona1",3,"Rama3",3);
        controller.createNewGroup("Zona1","Rama3",1,"Grupo1",1);
        controller.createNewGroup("Zona1","Rama3",2,"Grupo2",2);
        controller.createNewGroup("Zona1","Rama3",3,"Grupo3",3);

//---------------------------------------------------------
controller.createNewZone(2,"Zona2",2);


//---------------------------------------------------------
controller.createNewZone(3,"Zona3",3);


//---------------------------------------------------------
controller.createNewZone(4,"Zona4",4);


controller.verEstructura();
