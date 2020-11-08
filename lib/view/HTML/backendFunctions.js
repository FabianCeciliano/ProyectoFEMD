//Funciones para Crear estructura
function agregarRama(){
    if(document.getElementById("structRName").value!=""){
        var text = document.getElementById("structRName").value;
        var option = "<option style='border: 0; background: transparent'>" + text + "</option>"
        document.getElementById("structRList").innerHTML += option;
        document.getElementById("structRName").value = "";    
    }else{
        alert('Ingrese una rama');
    }
}

function structConfirm(){
    var zonaName = document.getElementById("structZName").value;
    var list  = []
    $('#structRList > option').each(function(){
        list.push($(this).val())
    })
    
    if(zonaName!="" & list.length>0){
        $.ajax({ 
            url: '/crearEstructura',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({'zonaName':zonaName, 'branches': list}),
            success: function(data){
                
            }
            /*, error: function(jqXHR, textStatus, err){
                alert('text status '+textStatus+', err '+err)
            }*/
        })
        document.getElementById("structZName").value = "";
        $("#structRList > option").remove();
        document.getElementById("overlayCrearESt").style.display = "none";
    }else{
        alert('Recuerde ingresar la zona y al menos una rama');
    }

}

//funciones para crear grupo

function actualizarMonitoresDisponibles(){
    $.ajax({ 
        url: '/obtenerMonitoresDisponibles',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data : {},
        success: function(data){
            console.log(data.monitores);
            for (let index = 0; index < data.monitores.length; index++) {
                var option = "<option value='"+data.monitores[index]+"' style='border: 0; background: transparent'>" + data.monitores[index] + "</option>"
                document.getElementById("grupoMoniList").innerHTML += option;
            }
        }
    })
}

function actualizarZonas(){
    $.ajax({ 
        url: '/obtenerZonas',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data : {},
        success: function(data){
            console.log(data.zonas);
            for (let index = 0; index < data.zonas.length; index++) {
                var option = "<option value='"+data.zonas[index]+"' style='border: 0; background: transparent'>" + data.zonas[index] + "</option>"
                document.getElementById("grupoZList").innerHTML += option;
            }
        }
    })
}

function actualizarRamas(val){
    $.ajax({ 
        url: '/obtenerRamas',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data : JSON.stringify({zona:val.value}),
        success: function(data){
            console.log(data.zonas);
            for (let index = 0; index < data.ramas.length; index++) {
                var option = "<option value='"+data.ramas[index]+"' style='border: 0; background: transparent'>" + data.ramas[index] + "</option>"
                document.getElementById("grupoRList").innerHTML += option;
            }
        }
    })
}

function grupoCrear(){
    var zona = document.getElementById("grupoZList").value;
    var rama = document.getElementById("grupoRList").value;
    var monitor = document.getElementById("grupoMoniList").value;
    var grupo = document.getElementById("grupoGName").value;
    var idGrupo = document.getElementById("grupoGId").value;

    if(zona!="" & rama!="" & monitor!="" & grupo!="" & idGrupo!=""){
        $.ajax({ 
            url: '/crearGrupo',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({zona:zona,rama:rama,monitor:monitor,grupo:grupo,idGrupo:idGrupo}),
            success: function(data){
                
            }
        })
        document.getElementById("overlayAsignarMonitor").style.display = "none";
    }else{
        alert('Ingresar todos los datos');
    }
    

    

}


//funciones para Asignar Coach

function asigAsignar(){
    var idCoach = document.getElementById("asigCoaId").value;
    var idGrupo = document.getElementById("asigGrupoId").value;

    if(idCoach!="" & idGrupo!=""){
        $.ajax({ 
            url: '/asignarCoach',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({coach:idCoach,grupo:idGrupo}),
            success: function(data){
                
            }
        })
        document.getElementById("overlayAsignarMonitor").style.display = "none";
    }else{
        alert('Recuerde ingresar el ID del Coach y del Grupo');
    }
}

//funciones para Conformar Coordinacion

//-----------------------------------------------------------------------Definir Jefes de Zona

function aceptarAsignacionZona(){
    var nombre1 = document.getElementById("jefeZonaP1Name").value;
    var id1 = document.getElementById("jefeZonaP1Id").value;
    var nombre2 = document.getElementById("jefeZonaP2Name").value;
    var id2 = document.getElementById("jefeZonaP2Id").value;

    if((nombre1!="" & id1!="")|(nombre2!="" & id2!="")){
        $.ajax({ 
            url: '/asignarJefesZona',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({jefe1Name:nombre1,jefe1Id:id1,jefe2Name:nombre2,jefe2Id:id2}),
            success: function(data){
                if(data.status==1){
                    alert("Bien");
                }else{
                    alert("Mal");
                }
            }
        })
    }else{
        alert("Ingrese al menos 1 nombre y un id para asignar");
    }

}

function consulZona(){
    var nombre = document.getElementById("jefeZonaZName").value;
    var id = document.getElementById("jefeZonaZId").value;

    if(nombre!="" & id!=""){
        $.ajax({ 
            url: '/consultarExistenciaZona',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({nombreZona:nombre,idZona:id}),
            success: function(data){
                if(data.status==1){
                    alert("La zona existe, ahora puede asignar los monitores");
                    document.getElementById("acepAsigZona").disabled = false;
                }else{
                    alert("La zona no existe");
                }
            }
        })
    }else{
        alert("Ingrese el nombre y id de Zona");
    }
}


//-----------------------------------------------------------------------Definir Jefes de Rama

function aceptarAsignacionRama(){
    var nombre1 = document.getElementById("jefeRamaP1Name").value;
    var id1 = document.getElementById("jefeRamaP1Id").value;
    var nombre2 = document.getElementById("jefeRamaP2Name").value;
    var id2 = document.getElementById("jefeRamaP2Id").value;

    if((nombre1!="" & id1!="")|(nombre2!="" & id2!="")){
        $.ajax({ 
            url: '/asignarJefesRama',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({jefe1Name:nombre1,jefe1Id:id1,jefe2Name:nombre2,jefe2Id:id2}),
            success: function(data){
                if(data.status==1){
                    alert("Bien");
                }else{
                    alert("Mal");
                }
            }
        })
    }else{
        alert("Ingrese al menos 1 nombre y un id para asignar");
    }

}

function consulRama(){
    var nombre = document.getElementById("jefeRamaRName").value;
    var id = document.getElementById("jefeRamaRId").value;

    if(nombre!="" & id!=""){
        $.ajax({ 
            url: '/consultarExistenciaRama',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({nombreRama:nombre,idRama:id}),
            success: function(data){
                if(data.status==1){
                    alert("La rama existe, ahora puede asignar los monitores");
                    document.getElementById("acepAsigRama").disabled = false;
                }else{
                    alert("La rama no existe");
                }
            }
        })
    }else{
        alert("Ingrese el nombre y id de Rama");
    }
}

//-----------------------------------------------------------------------Definir Jefes de Grupo

function aceptarAsignacionGrupo(){
    var nombre1 = document.getElementById("jefeGrupoP1Name").value;
    var id1 = document.getElementById("jefeGrupoP1Id").value;
    var nombre2 = document.getElementById("jefeGrupoP2Name").value;
    var id2 = document.getElementById("jefeGrupoP2Id").value;

    if((nombre1!="" & id1!="")|(nombre2!="" & id2!="")){
        $.ajax({ 
            url: '/asignarJefesGrupo',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({jefe1Name:nombre1,jefe1Id:id1,jefe2Name:nombre2,jefe2Id:id2}),
            success: function(data){
                if(data.status==1){
                    alert("Bien");
                }else{
                    alert("Mal");
                }
            }
        })
    }else{
        alert("Ingrese al menos 1 nombre y un id para asignar");
    }

}

function consulGrupo(){
    var nombre = document.getElementById("jefeGrupoGName").value;
    var id = document.getElementById("jefeGrupoGId").value;

    if(nombre!="" & id!=""){
        $.ajax({ 
            url: '/consultarExistenciaGrupo',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({nombreGrupo:nombre,idGrupo:id}),
            success: function(data){
                if(data.status==1){
                    alert("El grupo existe, ahora puede asignar los monitores");
                    document.getElementById("acepAsigGrupo").disabled = false;
                }else{
                    alert("El grupo no existe");
                }
            }
        })
    }else{
        alert("Ingrese el nombre y id de Grupo");
    }
}

//funciones para la administracion de miembros

//Nuevo usuario

function agregarUsuario(){
    var id = document.getElementById("nuevoUserId").value;
    var nombre = document.getElementById("nuevoUserNombre").value;
    var celular = document.getElementById("nuevoUserCelular").value;
    var mail = document.getElementById("nuevoUserMail").value;
    var direccion = document.getElementById("nuevoUserDireccion").value;

    if(id!="" & nombre!="" & celular!="" & mail!="" & direccion!=""){
        $.ajax({ 
            url: '/agregarUsuario',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({id:id,nombre:nombre,celular:celular,mail:mail,direccion:direccion}),
            success: function(data){
                if(data.status==1){
                    alert("bien");
                }else{
                    alert("Mal");
                }
            }
        })
    }else{
        alert("Ingrese todos los campos");
    }

}

//Modificar info

function modificarUsuario(){
    var id = document.getElementById("updateUserId").value;
    var nombre = document.getElementById("updateUserName").value;
    var celular = document.getElementById("updateUserCelular").value;
    var mail = document.getElementById("updateUserMail").value;
    var direccion = document.getElementById("updateUserDireccion").value;
    var esMonitor = document.getElementById("esMonitor").checked;
    
    if(id!="" & (nombre!="" | celular!="" | mail!="" | direccion!="")){
        $.ajax({ 
            url: '/actualizarUsuario',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({id:id,nombre:nombre,celular:celular,mail:mail,direccion:direccion,esMonitor:esMonitor}),
            success: function(data){
                if(data.status==1){
                    alert("bien");
                }else{
                    alert("Mal");
                }
            }
        })
    }else{
        alert("Ingrese al menos un campo");
    }

}

//Eliminar usuario

function borrarUsuario(){
    var id = document.getElementById("borrarUserId").value;
    var nombre = document.getElementById("borrarUserName").value;

    if(id!="" & nombre!=""){
        $.ajax({ 
            url: '/borrarUsuario',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({id:id,nombre:nombre}),
            success: function(data){
                if(data.status==1){
                    alert("bien");
                }else{
                    alert("Mal");
                }
            }
        })
    }else{
        alert("Ingrese todos los campos");
    }

}

//Autorizar movimiento

function moverUsuario(){
    var id = document.getElementById("moverUserId").value;
    var nombre = document.getElementById("moverUserNombre").value;
    var idProcedencia = document.getElementById("moverUserProcedenciaId").value;
    var idDestino = document.getElementById("moverUserDestinoId").value;
    
    if(id!="" & nombre!="" & idProcedencia!="" & idDestino!=""){
        $.ajax({ 
            url: '/borrarUsuario',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({id:id,nombre:nombre,idProcedencia:idProcedencia,idDestino:idDestino}),
            success: function(data){
                if(data.status==1){
                    alert("bien");
                }else{
                    alert("Mal");
                }
            }
        })
    }else{
        alert("Ingrese todos los campos");
    }
}
