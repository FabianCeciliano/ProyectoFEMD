//Funciones para Crear estructura
function agregarRama(){
    if(document.getElementById("structRName").value!="" & document.getElementById("structRId").value!=""){
        var text = document.getElementById("structRName").value;
        var idRama = document.getElementById("structRId").value;
        
        var option = "<option style='border: 0; background: transparent'>" + text + "</option>"
        document.getElementById("structRList").innerHTML += option;
        document.getElementById("structRName").value = "";    

        var optionId = "<option style='border: 0; background: transparent'>" + idRama + "</option>"
        document.getElementById("structRIdList").innerHTML += optionId;
        document.getElementById("structRId").value = "";

    }else{
        alert('Ingrese una rama y su id');
    }
}
// structRId - structRIdList

function structConfirm(){
    var zonaName = document.getElementById("structZName").value;
    var list  = []
    var listId  = []
    $('#structRList > option').each(function(){
        list.push($(this).val())
    })
    $('#structRIdList > option').each(function(){
        listId.push($(this).val())
    })
    
    if(zonaName!="" & list.length>0 & listId.length>0){
        console.log("Todo verifica bien");
        $.ajax({ 
            url: '/crearEstructura',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({'zonaName':zonaName, 'branches': list, 'ids':listId}),
            success: function(data){
                console.log("Verificando que hace ajax1");
                if(data.status==1){
                    alert("Zona y ramas creadas");
                    document.getElementById("overlayCrearESt").style.display = "none";
                }else if(data.status==0){
                    alert("La Zona ya existe");
                }else{
                    var msg = "No se crearon las ramas: \n";
                    for (let index = 0; index < data.notCreated.length; index++) {
                        msg+="\t"+data.notCreated[index]+"\n";
                    }
                    alert(msg);
                }
            }
        })
        document.getElementById("structZName").value = "";
        $("#structRList > option").remove();

        $("#structRIdList > option").remove();

        document.getElementById("overlayCrearESt").style.display = "none";
    }else{
        alert('Recuerde ingresar la zona y al menos una rama');
    }

}

//funciones para crear grupo

function actualizarMonitoresDisponibles(val){
    $("#grupoMoniList > option").remove();
    var zonaName = document.getElementById("grupoZList").value;
    var data = String(val.value).split("-",2);

    $.ajax({ 
        url: '/obtenerMonitoresDisponibles',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data : JSON.stringify({zona:zonaName,ramaId:data[1]}),
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
    $("#grupoZList > option").remove();
    $.ajax({ 
        url: '/obtenerZonas',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data : {},
        success: function(data){
            if(data.status==1){
                console.log(data.zonas);
                for (let index = 0; index < data.zonas.length; index++) {
                    var option = "<option value='"+data.zonas[index]+"' style='border: 0; background: transparent'>" + data.zonas[index] + "</option>"
                    document.getElementById("grupoZList").innerHTML += option;
                }
            }else{
                alert('Aun no hay zonas disponibles');
                document.getElementById("overlayCrearGrupo").style.display = "none";
            }
        }
    })
}

function actualizarRamas(val){
    $("#grupoRList > option").remove();
    $.ajax({ 
        url: '/obtenerRamas',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data : JSON.stringify({zona:val.value}),
        success: function(data){
            if(data.status==1){
                console.log(data.branches);
                for (let index = 0; index < data.branches.length; index++) {
                    var option = "<option value='"+data.branches[index]+"' style='border: 0; background: transparent'>" + data.branches[index] + "</option>"
                    document.getElementById("grupoRList").innerHTML += option;
                }
            }else{
                alert('No hay ramas en esta zona');
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
                if(data.status==1){
                    alert("Grupo creado exitosamente");
                    document.getElementById("overlayCrearGrupo").style.display = "none";
                }else{
                    alert('Verifique que el ID de grupo sea distinto');
                }
            }
        })
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
                if(data.status==1){
                    alert("Coach asignado a rama");
                    document.getElementById("asigCoaId").value = "";
                    document.getElementById("asigGrupoId").value = "";
                    document.getElementById("overlayAsignarMonitor").style.display = "none";
                }else{
                    alert('Error al asignar Coach');
                }    
            }
        })
    }else{
        alert('Recuerde ingresar el ID del Coach y del Grupo');
    }
}

//funciones para Conformar Coordinacion

//-----------------------------------------------------------------------Definir Jefes de Zona

function aceptarAsignacionZona(){
    var nombreZona = document.getElementById("jefeZonaZName").value;
    //var idZona = document.getElementById("jefeZonaZId").value;
    var nombre1 = document.getElementById("jefeZonaP1Name").value;
    var id1 = document.getElementById("jefeZonaP1Id").value;
    var nombre2 = document.getElementById("jefeZonaP2Name").value;
    var id2 = document.getElementById("jefeZonaP2Id").value;

    if((nombreZona!="" & idZona!="") & ((nombre1!="" & id1!="")|(nombre2!="" & id2!=""))){
        $.ajax({ 
            url: '/asignarJefesZona',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({nombreZona:nombreZona,idZona:idZona,jefe1Name:nombre1,jefe1Id:id1,jefe2Name:nombre2,jefe2Id:id2}),
            success: function(data){
                if(data.status==0){
                    alert("Esta zona ya cuenta con jefatura!")
                }else{
                    alert("Jefatura insertada exitosamente!")
                }
            }
        })
    }else{
        alert("Ingrese al menos 1 nombre y un id para asignar");
    }

}

function consulZona(){
    var nombre = document.getElementById("jefeZonaZName").value;
    //var id = document.getElementById("jefeZonaZId").value;

    if(nombre!="" & id!=""){
        $.ajax({ 
            url: '/consultarExistenciaZona',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({nombreZona:nombre,idZona:id}),
            success: function(data){
                if(data.status==0){
                    document.getElementById("jefeZonaP1Name").disabled = false;
                    document.getElementById("jefeZonaP1Id").disabled = false;
                    document.getElementById("jefeZonaP2Name").disabled = false;
                    document.getElementById("jefeZonaP2Id").disabled = false;
 
                }else if(data.status==1){
                    document.getElementById("jefeZonaP1Name").disabled = false;
                    document.getElementById("jefeZonaP1Id").disabled = false;
                }else{
                    alert("La zona no existe o ya tiene jefes asignados.");
                }
            }
        })
    }else{
        alert("Ingrese el nombre y id de Zona");
    }
}


//-----------------------------------------------------------------------Definir Jefes de Rama

function aceptarAsignacionRama(){
    var nombreRama = document.getElementById("jefeRamaRName").value;
    var idRama = document.getElementById("jefeRamaRId").value;
    var nombre1 = document.getElementById("jefeRamaP1Name").value;
    var id1 = document.getElementById("jefeRamaP1Id").value;
    var nombre2 = document.getElementById("jefeRamaP2Name").value;
    var id2 = document.getElementById("jefeRamaP2Id").value;

    if((nombreRama!="" & idRama!="") & ((nombre1!="" & id1!="")|(nombre2!="" & id2!=""))){
        $.ajax({ 
            url: '/asignarJefesRama',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({nombreRama:nombreRama,idRama:idRama,jefe1Name:nombre1,jefe1Id:id1,jefe2Name:nombre2,jefe2Id:id2}),
            success: function(data){
                if(data.status==1){
                    alert("Bien");
                    document.getElementById("FormularioRama").style.display = "none";
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
    var nombreGrupo = document.getElementById("jefeGrupoGName").value;
    var idGrupo = document.getElementById("jefeGrupoGId").value;
    var nombre1 = document.getElementById("jefeGrupoP1Name").value;
    var id1 = document.getElementById("jefeGrupoP1Id").value;
    var nombre2 = document.getElementById("jefeGrupoP2Name").value;
    var id2 = document.getElementById("jefeGrupoP2Id").value;

    if((nombreGrupo!="" & idGrupo!="")&((nombre1!="" & id1!="")|(nombre2!="" & id2!=""))){
        $.ajax({ 
            url: '/asignarJefesGrupo',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({nombreGrupo:nombreGrupo,idGrupo:idGrupo,jefe1Name:nombre1,jefe1Id:id1,jefe2Name:nombre2,jefe2Id:id2}),
            success: function(data){
                if(data.status==1){
                    alert("Bien");
                    document.getElementById("FormularioGrupo").style.display = "none";
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

function limpiarCoordinacion(){
    document.getElementById("jefeZonaZName").value="";

    document.getElementById("jefeRamaZName").value="";
    document.getElementById("jefeRamaRId").value="";

    
    document.getElementById("jefeGrupoZName").value="";
    document.getElementById("jefeGrupoRId").value="";
    document.getElementById("jefeGrupoGId").value="";

    
    $("#jefe1ZonaList > option").remove();
    $("#jefe2ZonaList > option").remove();
    $("#jefe1RamaList > option").remove();
    $("#jefe2RamaList > option").remove();
    $("#jefe1GrupoList > option").remove();
    $("#jefe2GrupoList > option").remove();



    //document.getElementById("jefeZonaZId").value="";
    //document.getElementById("jefeZonaP1Name").value="";
    //document.getElementById("jefeZonaP1Id").value="";
    //document.getElementById("jefeZonaP2Name").value="";
    //document.getElementById("jefeZonaP2Id").value="";

    //document.getElementById("jefeRamaRName").value="";
    //document.getElementById("jefeRamaRId").value="";
    //document.getElementById("jefeRamaP1Name").value="";
    //document.getElementById("jefeRamaP1Id").value="";
    //document.getElementById("jefeRamaP2Name").value="";
    //document.getElementById("jefeRamaP2Id").value="";

    //document.getElementById("jefeGrupoGName").value="";
    //document.getElementById("jefeGrupoGId").value="";
    //document.getElementById("jefeGrupoP1Name").value="";
    //document.getElementById("jefeGrupoP1Id").value="";
    //document.getElementById("jefeGrupoP2Name").value="";
    //document.getElementById("jefeGrupoP2Id").value="";

}

//funciones para la administracion de miembros

//Nuevo usuario

function agregarUsuario(){
    var id = document.getElementById("nuevoUserId").value;
    var nombre = document.getElementById("nuevoUserNombre").value;
    var celular = document.getElementById("nuevoUserCelular").value;
    var mail = document.getElementById("nuevoUserMail").value;
    var direccion = document.getElementById("nuevoUserDireccion").value;
    var esMonitor = document.getElementById("esMonitorAgregar").checked;

    if(id!="" & nombre!="" & celular!="" & mail!="" & direccion!=""){
        $.ajax({ 
            url: '/agregarUsuario',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({id:id,name:nombre,celular:celular,mail:mail,direccion:direccion,esMonitor:esMonitor}),
            success: function(data){
                if(data.status==1){
                    alert("Usuario creado");
                    document.getElementById("FormularioGeneral1").style.display = "none";
                    document.getElementById("nuevoUserId").value="";
                    document.getElementById("nuevoUserNombre").value="";
                    document.getElementById("nuevoUserCelular").value="";
                    document.getElementById("nuevoUserMail").value="";
                    document.getElementById("nuevoUserDireccion").value="";
                }else{
                    alert("Usuario no creado");
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
    
    if(id!="" & nombre!="" & celular!="" & mail!="" & direccion!=""){
        $.ajax({ 
            url: '/actualizarUsuario',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({id:id,name:nombre,celular:celular,mail:mail,direccion:direccion,esMonitor:esMonitor}),
            success: function(data){
                if(data.status==1){
                    alert("Usuario modificado");
                    document.getElementById("updateUserId").value= "";
                    document.getElementById("updateUserName").value="";
                    document.getElementById("updateUserCelular").value="";
                    document.getElementById("updateUserMail").value="";
                    document.getElementById("nuevoUserMail").value="";
                    document.getElementById("updateUserDireccion").value="";
                    document.getElementById("esMonitor").checked=false;
                }else{
                    alert("Usuario No modificado");
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
            data : JSON.stringify({id:id,nombre:nombre, isDeleted:true}),
            success: function(data){
                if(data.status==1){
                    alert("Usuario eliminado");
                }else{
                    alert("Usuarion NO eliminado");
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
    var procedenciaZonaName = document.getElementById("procedenciaZonaName").value;
    var procedenciaIdRama = document.getElementById("procedenciaRamaId").value;
    var procedenciaidGrupo = document.getElementById("procedenciaGrupoId").value;
    
    var destinoZonaName = document.getElementById("destinoZonaName").value;
    var destinoIdRama = document.getElementById("destinoRamaId").value;
    var destinoidGrupo = document.getElementById("destinoGrupoId").value;
    
    if(id!="" & nombre!="" & procedenciaZonaName!="" & procedenciaIdRama!="" & procedenciaidGrupo!="" &
    destinoZonaName!="" & destinoIdRama!="" & destinoidGrupo!=""){
        $.ajax({ 
            url: '/moverUsuario',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({id:id,name:nombre,procedenciaZonaName:procedenciaZonaName,
                procedenciaIdRama:procedenciaIdRama,procedenciaidGrupo:procedenciaidGrupo,
                destinoZonaName:destinoZonaName,destinoIdRama:destinoIdRama,destinoidGrupo:destinoidGrupo}),
            success: function(data){
                if(data.status==1){
                    alert("Usuario movido");
                }else{
                    alert("Usuario No movido");
                }
            }
        })
    }else{
        alert("Ingrese todos los campos");
    }
}


//Funciones para consultas varias

//Consultar Posicion Grupo
function consulGrupoFun(){
    var id = document.getElementById("consulGrupoId").value;
    var nombre = document.getElementById("consulGrupoName").value;

    if(id!="" & nombre!=""){
        $.ajax({ 
            url: '/getGrupo',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({id:id,nombre:nombre}),
            success: function(data){
                if(data.status==1){
                    alert("bien");
                    document.getElementById("consulGrupoZonaName").value=data.zona
                    document.getElementById("consulGrupoRamaName").value=data.rama
                }else{
                    alert("Mal");
                }
            }
        })
    }else{
        alert("Ingrese todos los campos");
    }
}

//Participacion de un miembro

function consulMiembroFun(){
    $("#consulGrupoZList > option").remove();
    $("#consulGrupoRList > option").remove();
    $("#consulGrupoGList > option").remove();
    var id = document.getElementById("consulMiembroId").value;

    if(id!=""){
        $.ajax({ 
            url: '/getParticipacion',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({id:id}),
            success: function(data){
                if(data.status==1){
                    for (let index = 0; index < data.zonas.length; index++) {
                        var option = "<option value='"+data.zonas[index]+"' style='border: 0; background: transparent'>" + data.zonas[index] + "</option>"
                        document.getElementById("consulGrupoZList").innerHTML += option;
                    }
                    for (let index = 0; index < data.ramas.length; index++) {
                        var option = "<option value='"+data.ramas[index]+"' style='border: 0; background: transparent'>" + data.ramas[index] + "</option>"
                        document.getElementById("consulGrupoRList").innerHTML += option;
                    }
                    for (let index = 0; index < data.grupos.length; index++) {
                        var option = "<option value='"+data.grupos[index]+"' style='border: 0; background: transparent'>" + data.grupos[index] + "</option>"
                        document.getElementById("consulGrupoGList").innerHTML += option;
                    }
                }else{
                    alert("No se encontro participacion");
                }
            }
        })
    }else{
        alert("Debe ingresar el ID");
    }

}

//Miembro por elemento

function consulPorTipoFun(){
    $("#consulMembersList > option").remove();
    var nivel = document.getElementById("consulnivelList").value;
    var idNivel = document.getElementById("consulNivelMiembroId").value;

    if(nivel!="" & idNivel!=""){
        $.ajax({ 
            url: '/getMiembrosNivel',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({nivel:nivel,idNivel:idNivel}),
            success: function(data){
                if(data.status==1){
                    alert("bien");
                    for (let index = 0; index < data.miembros.length; index++) {
                        var option = "<option value='"+data.miembros[index]+"' style='border: 0; background: transparent'>" + data.miembros[index] + "</option>"
                        document.getElementById("consulMembersList").innerHTML += option;
                    }
                }else{
                    alert("Mal");
                }
            }
        })
    }else{
        alert("Debe ingresar el ID");
    }

}

//Funciones para agregar miembro

function agregarMiembroAGrupo(){
    var idMiembro = document.getElementById("agregarMiembroId").value;
    var zona = document.getElementById("agregarMiembroZonaName").value;
    var rama = document.getElementById("agregarMiembroRamaName").value;
    var grupo = document.getElementById("agregarMiembroGrupoName").value;

    if(idMiembro!="" & zona!="" & rama!="" & grupo!=""){
        $.ajax({ 
            url: '/agregarMiembroAGrupo',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({idMiembro:idMiembro,zona:zona,rama:rama,grupo:grupo}),
            success: function(data){
                if(data.status==1){
                    alert("Agregado!!");
                    document.getElementById("overlayAgregarMiembro").style.display = "none";
                }else{
                    alert("No se pudo agregar al miembro");
                }
            }
        })
    }else{
        alert("Debe ingresar todos los datos");
    }

}

//Funciones para crear el movimiento

function crearMovimiento(){
    
    var cedulaJuridica = document.getElementById("movimientoCedula").value;
    var nombre = document.getElementById("movimientoNombre").value;
    var web = document.getElementById("movimientoWeb").value;
    var pais = document.getElementById("movimientoPais").value;
    var telefono = document.getElementById("movimientoTelefono").value;

    if(cedulaJuridica!="" & nombre!="" & web!="" & pais!="" & telefono!=""){
        $.ajax({ 
            url: '/crearMovimiento',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data : JSON.stringify({cedulaJuridica:cedulaJuridica,nombre:nombre,web:web,pais:pais,telefono:telefono}),
            success: function(data){
                console.log(data);
                if(data.status==1){
                    console.log("Aqui1")
                    alert("Movimiento Creado");
                    document.getElementById("overlayMovimiento").style.display = "none";
                }else{
                    console.log("Aqui2")
                    alert("El movimiento ya fue creado");
                    document.getElementById("overlayMovimiento").style.display = "none";
                }
            }
        })
    }else{
        alert("Debe ingresar todos los datos");
    }
}




