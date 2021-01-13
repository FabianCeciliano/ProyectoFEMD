import {IProxy} from "./IProxy"
import dbController from "../Db/db_controllers/databaseController"

export class AccesDirector implements IProxy{
    
    async verifyAcces(user: String, password: String): Promise<String> {
        
        var memberId:String = null;
        //var memberRol:Number = null;

        var x = await dbController.validateUser(user,password).then((value)=>{
            memberId=value;
            console.log(memberId);
        })
        
        return memberId;

        // if(memberId==null){
        //     console.log("Id null")
        //     return null;
        // }

        // await dbController.getMemberRol(memberId).then((value)=>{
        //     memberRol=value;
        //     console.log("El rol del miembro es:",value);
        // })

        // switch(memberRol){
        //     case 1: return "/vistaAsesor"
        //     case 2: return "/vistaJefeMonitor"
        //     case 3: return "/vistaMiembroGrupo"
        //     default: return null
        // }

        //Aqui ya con el id, toma el rol...
        //llama a la base de datos
        //verifica el usuario
        //A la vez obtiene el rol
        /*switch(user){
            case "rol1":
                return "/ruta1"
            case "rol2":
                return "/ruta2"
            case "rol3":
                return "ruta3"
        }*/
        /*var mynumber= Math.random() * (3 - 1) + 1;
        console.log(Math.round(mynumber));
        switch(Math.round(mynumber)){
            case 1:
                return "/ruta1"
            case 2:
                return "/ruta2"
            case 3:
                return "/ruta3"
            default:
                return "/ruta4"
        }*/
    }

    async getRol(memberId: String):Promise<String>{
        
        var memberRol:Number = null;

        await dbController.getMemberRol(memberId).then((value)=>{
            memberRol=value;
            console.log("El rol del miembro es:",value);
        })

        switch(memberRol){
            case 1: return "/vistaAsesor"
            case 2: return "/vistaJefeMonitor"
            case 3: return "/vistaMiembroGrupo"
            default: return null
        }
    }
    
}