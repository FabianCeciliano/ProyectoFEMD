//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
// Bandeja de  Entrada
function myFunctionBEntrada(pAsunto, pMensaje, pTipo, pDate) {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = pAsunto + "\n" + pTipo + "\n" + pDate + "\n";
    btn.style.width = "1040px";
    btn.style.height = "100px";
    btn.style.background = "#3498DB";
    btn.style.color = "white";
    btn.style.font = "16px";
    btn.style.cursor = "pointer";

    var page = document.getElementById("scrollAreaAporte");
    page.appendChild(btn);

    var mybr = document.createElement('br');
    page.appendChild(mybr);

    btn.onclick = function () {
        document.getElementById("msgTextGENE").innerHTML = pMensaje;
        document.getElementById("msgGEN").style.display = "block";
        document.getElementById("msgGENE").style.display = "block";
    }
}


///MIS GRUPOS
function myFunctionMisGrupos(pData, pArray) {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = pData;
    btn.style.width = "1040px";
    btn.style.height = "100px";
    btn.style.background = "#3498DB";
    btn.style.color = "white";
    btn.style.font = "16px";
    //btn.style.border = "none";
    btn.style.cursor = "pointer";

    var page = document.getElementById("scrollAreaMisGrupos");
    page.appendChild(btn);

    btn.onclick = function () {
        let myMessaje = "";

        for (var i = 0; i < pArray.length; i++) {    
            myMessaje = myMessaje + '</br>' + "Nombre: " + pArray[i]._name + '</br>' +"Direccion: " 
            + pArray[i].direction + '</br>' +"Email: " + pArray[i]._email + '</br>' +"Telefono: " + 
            pArray[i]._telephone + '</br>'+ '</br>'+ "--------------------------------------------------"+ "</br>";
        } 
            
        document.getElementById("msgTextGENE").innerHTML = myMessaje;
        document.getElementById("msgGEN").style.display = "block";
        document.getElementById("msgGENE").style.display = "block";
    }
}


///MIS RAMAS ZONAS 
function myFunctionRamaZona(pData, pArray) {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = pData;
    btn.style.width = "1040px";
    btn.style.height = "100px";
    btn.style.background = "#3498DB";
    btn.style.color = "white";
    btn.style.font = "16px";
    //btn.style.border = "none";
    btn.style.cursor = "pointer";

    var page = document.getElementById("scrollZonaRamas");
    page.appendChild(btn);

    btn.onclick = function () {
        let myMessaje = "";

        for (var i = 0; i < pArray.length; i++) {    
            myMessaje = myMessaje + '</br>' + "Nombre: " + pArray[i]._name + '</br>' +"Direccion: " + pArray[i].direction + '</br>' +"Email: " + pArray[i]._email + '</br>' +"Telefono: " + pArray[i]._telephone + '</br>'+ "--------------------------------------------------"+ "</br>";
        } 
             
        document.getElementById("msgTextGENE").innerHTML = myMessaje;
        document.getElementById("msgGEN").style.display = "block";
        document.getElementById("msgGENE").style.display = "block";
    }
}

// APORTE
function myFunctionAporte(pData, PMGS) {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = pData;
    btn.style.width = "1040px";
    btn.style.height = "100px";
    btn.style.background = "#3498DB";
    btn.style.color = "white";
    btn.style.font = "16px";
    //btn.style.border = "none";
    btn.style.cursor = "pointer";

    var page = document.getElementById("scrollAreaAporte");
    page.appendChild(btn);

    var mybr = document.createElement('br');
    page.appendChild(mybr);

    btn.onclick = function () {
        document.getElementById("msgTextGENE").innerHTML = PMGS;
        document.getElementById("msgGEN").style.display = "block";
        document.getElementById("msgGENE").style.display = "block";
    }
}

// INBOX 
function myFunctionInbox(pAsunto, pMensaje, pTipo, pDate,pEstado,idMember) {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = pAsunto + "\n" + pTipo + "\n" + pDate + "\n" + pEstado+ "\n";
    btn.style.width = "1040px";
    btn.style.height = "100px";
    btn.style.background = "#3498DB";
    btn.style.color = "white";
    btn.style.font = "16px";
    //btn.style.border = "none";
    btn.style.cursor = "pointer";

    var page = document.getElementById("scrollAreaINBOX");
    page.appendChild(btn);

    btn.onclick = function () {
        document.getElementById("msgTextGENE").innerHTML = pMensaje;
        document.getElementById("msgGEN").style.display = "block";
        document.getElementById("msgGENE").style.display = "block";
        //ACA asdasas
        // ! llamar funcion que cambia el estado de este mensaje //
        changeStatus(idMember,pDate);
        BVNoticias();
    }
}


// ES PARA LA PARTICIPACION
function myFunctionParticipacion(pData, PMGS) {

    var btn = document.createElement("BUTTON");
    btn.innerHTML = pData;
    btn.style.width = "1040px";
    btn.style.height = "100px";
    btn.style.background = "#3498DB";
    btn.style.color = "white";
    btn.style.font = "16px";
    //btn.style.border = "none";
    btn.style.cursor = "pointer";

    var page = document.getElementById("scrollAreaP");
    page.appendChild(btn);

    var mybr = document.createElement('br');
    page.appendChild(mybr);

    btn.onclick = function () {
        document.getElementById("msgTextGENE").innerHTML = PMGS;
        document.getElementById("msgGEN").style.display = "block";
        document.getElementById("msgGENE").style.display = "block";
    }


}

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
// function  BRamasZonas() {
  
//     var page = document.getElementById("scrollZonaRamas");
//     while (page.childNodes.length > 0) {
//         page.removeChild(page.childNodes[0]);
//     }
    
//     consultarRamasZonas();

//     document.getElementById("overlayAporteCCG").style.display = "none";
//     document.getElementById("overlayMGrups").style.display = "none";
//     document.getElementById("overlayINBOX").style.display = "none";
//     document.getElementById("overlayParticipacion").style.display = "none ";
//     document.getElementById("overlayNN").style.display = "none";
//     document.getElementById("overlayZonasRamas").style.display = "block";
//     document.getElementById("overlayConsultarNodo").style.display = "none";
    
// }


function BConsultarNodo() {    
    document.getElementById("overlayAporteCCG").style.display = "none";
    document.getElementById("overlayMGrups").style.display = "none";
    document.getElementById("overlayINBOX").style.display = "none";
    document.getElementById("overlayParticipacion").style.display = "none ";
    document.getElementById("overlayNN").style.display = "none";
    document.getElementById("overlayZonasRamas").style.display = "none";
    document.getElementById("overlayConsultarNodo").style.display = "block";

    document.getElementById("overlayAgregarMiembro").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "none ";
    document.getElementById("overlayCrearESt").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "none";
    document.getElementById("overlayBandejaAporte").style.display = "none";
    
}


function BJefeMonitor() {
    //scrollAreaMisGrupos
    var page = document.getElementById("scrollAreaMisGrupos");
    while (page.childNodes.length > 0) {
        page.removeChild(page.childNodes[0]);
    }
    consultarMisGruposLiderazgo();
    document.getElementById("overlayAporteCCG").style.display = "none";
    document.getElementById("overlayMGrups").style.display = "block";
    document.getElementById("overlayINBOX").style.display = "none ";
    document.getElementById("overlayParticipacion").style.display = "none ";
    document.getElementById("overlayNN").style.display = "none";
    document.getElementById("overlayZonasRamas").style.display = "none";
    document.getElementById("overlayConsultarNodo").style.display = "none";

    
    document.getElementById("overlayAgregarMiembro").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "none ";
    document.getElementById("overlayCrearESt").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "none";
    document.getElementById("overlayBandejaAporte").style.display = "none";
}

function BMGrupos() {
    //scrollAreaMisGrupos
    var page = document.getElementById("scrollAreaMisGrupos");
    while (page.childNodes.length > 0) {
        page.removeChild(page.childNodes[0]);
    }
    consultarMisGrupos();
    document.getElementById("overlayAporteCCG").style.display = "none";
    document.getElementById("overlayMGrups").style.display = "block";
    document.getElementById("overlayINBOX").style.display = "none ";
    document.getElementById("overlayParticipacion").style.display = "none ";
    document.getElementById("overlayNN").style.display = "none";
    document.getElementById("overlayZonasRamas").style.display = "none";
    document.getElementById("overlayConsultarNodo").style.display = "none";

    
    document.getElementById("overlayAgregarMiembro").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "none ";
    document.getElementById("overlayCrearESt").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "none";
    document.getElementById("overlayBandejaAporte").style.display = "none";
}

function BEAPorte() {
    document.getElementById("overlayAporteCCG").style.display = "block";
    document.getElementById("overlayMGrups").style.display = "none";
    document.getElementById("overlayINBOX").style.display = "none ";
    document.getElementById("overlayParticipacion").style.display = "none ";
    document.getElementById("overlayNN").style.display = "none";
    document.getElementById("overlayZonasRamas").style.display = "none";
    document.getElementById("overlayConsultarNodo").style.display = "none";

    
    document.getElementById("overlayAgregarMiembro").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "none ";
    document.getElementById("overlayCrearESt").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "none";
    document.getElementById("overlayBandejaAporte").style.display = "none";
}

function BVNoticias() {
    var page = document.getElementById("scrollAreaINBOX");
    while (page.childNodes.length > 0) {
        page.removeChild(page.childNodes[0]);
    }
    verNoticias();
    document.getElementById("overlayAporteCCG").style.display = "none";
    document.getElementById("overlayMGrups").style.display = "none";
    document.getElementById("overlayINBOX").style.display = "block";
    document.getElementById("overlayParticipacion").style.display = "none ";
    document.getElementById("overlayNN").style.display = "none";
    document.getElementById("overlayZonasRamas").style.display = "none";
    document.getElementById("overlayConsultarNodo").style.display = "none";

    
    document.getElementById("overlayAgregarMiembro").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "none ";
    document.getElementById("overlayCrearESt").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "none";
    document.getElementById("overlayBandejaAporte").style.display = "none";
}

function BResumen() {
    var page = document.getElementById("scrollAreaP");
    while (page.childNodes.length > 0) {
        page.removeChild(page.childNodes[0]);
    }
    consultarResumenConsolidado();    
    document.getElementById("overlayAporteCCG").style.display = "none";
    document.getElementById("overlayMGrups").style.display = "none";
    document.getElementById("overlayINBOX").style.display = "none ";
    document.getElementById("overlayParticipacion").style.display = "block";
    document.getElementById("overlayNN").style.display = "none";
    document.getElementById("overlayZonasRamas").style.display = "none";
    document.getElementById("overlayConsultarNodo").style.display = "none";

    
    document.getElementById("overlayAgregarMiembro").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "none ";
    document.getElementById("overlayCrearESt").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "none";
    document.getElementById("overlayBandejaAporte").style.display = "none";
}


function BNNoticia() {
    document.getElementById("overlayAporteCCG").style.display = "none";
    document.getElementById("overlayMGrups").style.display = "none";
    document.getElementById("overlayINBOX").style.display = "none ";
    document.getElementById("overlayParticipacion").style.display = "none";
    document.getElementById("overlayNN").style.display = "block";
    document.getElementById("overlayZonasRamas").style.display = "none";
    document.getElementById("overlayConsultarNodo").style.display = "none";

    
    document.getElementById("overlayAgregarMiembro").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "none ";
    document.getElementById("overlayCrearESt").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "none";
    document.getElementById("overlayBandejaAporte").style.display = "none";
}


//BOTON DE CONSULTAR PARA COLSULTAR NODO
// function BConsultar() {
//      BconsultarNodo();
// }

function changeStatus(userID,PId) {
    $.ajax({
        url: '/changeStatus',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({PId: PId , userID: userID})
    })
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////



function  BRamasZonas() {
  
    var page = document.getElementById("scrollZonaRamas");
    while (page.childNodes.length > 0) {
        page.removeChild(page.childNodes[0]);
    }
    
    consultarRamasZonas();

    document.getElementById("overlayAporteCCG").style.display = "none";
    document.getElementById("overlayMGrups").style.display = "none";
    document.getElementById("overlayINBOX").style.display = "none";
    document.getElementById("overlayParticipacion").style.display = "none ";
    document.getElementById("overlayNN").style.display = "none";
    document.getElementById("overlayZonasRamas").style.display = "block";

    document.getElementById("overlayConsultarNodo").style.display = "none";
    document.getElementById("overlayAgregarMiembro").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "none ";
    document.getElementById("overlayCrearESt").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "none";
    document.getElementById("overlayBandejaAporte").style.display = "none";
    
}
















$(document).ready(function () {
    $('#generate').click(function () {

        var values = ["dog", "cat", "parrot", "rabbit"];

        $('#scrollArea')
            .append(
                $(document.createElement('label')).prop({
                    for: 'pets'
                }).html('Choose your pets: ')
            )
            .append(
                $(document.createElement('select')).prop({
                    id: 'pets',
                    name: 'pets'
                })
            )

        for (const val of values) {
            $('#pets').append($(document.createElement('option')).prop({
                value: val,
                text: val.charAt(0).toUpperCase() + val.slice(1)
            }))
        }
    })
});







/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


function myFunctionX() {
    document.getElementById("myDropdownX").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtnX')) {
        var dropdowns = document.getElementsByClassName("dropdownX-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
















//////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////
//                  FUNCIONES CUANDO LA PAGINA CARGA              // 
////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////// 

function disableMenu(boolean) {
    document.getElementById("IdBCreateEstructura").disabled = boolean;
    document.getElementById("IdBCreterup").disabled = boolean;
    document.getElementById("IdBAsignarMonior").disabled = boolean;
    document.getElementById("IdBConformarCoordinacion").disabled = boolean;
    document.getElementById("IdBAdmMiembro").disabled = boolean;
    document.getElementById("IdBConsultas").disabled = boolean;
    document.getElementById("IdBAgregar").disabled = boolean;
}

function powerfulErase() {
    //-------------------------->Crear Estructura
    document.getElementById("structZName").value = "";
    document.getElementById("structRId").value = "";
    document.getElementById("structRName").value = "";
    document.getElementById("structRIdList").value = "";
    document.getElementById("structRList").value = "";
    $("#structRIdList > option").remove();
    $("#structRList > option").remove();

    //-------------------------->Crear Estructura
    document.getElementById("grupoGName").value = "";
    document.getElementById("grupoGId").value = "";

    //-------------------------->Administrar Miembros
    document.getElementById("nuevoUserId").value = "";
    document.getElementById("nuevoUserNombre").value = "";
    document.getElementById("nuevoUserCelular").value = "";
    document.getElementById("nuevoUserMail").value = "";
    document.getElementById("nuevoUserDireccion").value = "";
    document.getElementById("esMonitorAgregar").checked = false;

    //-------------------------->Administrar Miembros
    document.getElementById("updateUserId").value = "";
    document.getElementById("updateUserName").value = "";
    document.getElementById("updateUserCelular").value = "";
    document.getElementById("updateUserMail").value = "";
    document.getElementById("updateUserDireccion").value = "";
    document.getElementById("esMonitor").checked = false;

    //-------------------------->Consultas Varias
    //document.getElementById("consulGrupoId").value="";
    document.getElementById("consulGrupoName").value = "";
    document.getElementById("consulGrupoZonaName").value = "";
    document.getElementById("consulGrupoRamaName").value = "";

    document.getElementById("consulMiembroId").value = "";
    document.getElementById("consulNivelMiembroId").value = "";

    //-------------------------->Movimiento
    document.getElementById("movimientoCedula").value = "";
    document.getElementById("movimientoNombre").value = "";
    document.getElementById("movimientoWeb").value = "";
    document.getElementById("movimientoPais").value = "";
    document.getElementById("movimientoTelefono").value = "";

    //-------------------------->Agregar miembro
    document.getElementById("agregarMiembroId").value = "";


    $("#jefe1GrupoList > option").remove();
    $("#jefe2GrupoList > option").remove();

    $("#jefe1RamaList > option").remove();
    $("#jefe2RamaList > option").remove();

    $("#jefe1ZonaList > option").remove();
    $("#jefe2ZonaList > option").remove();

    document.getElementById("destinoZonaName").value = "";
    document.getElementById("destinoRamaId").value = "";
    document.getElementById("destinoGrupoId").value = "";


    $("#consulGrupoZList > option").remove();
    $("#consulGrupoRList > option").remove();
    $("#consulGrupoGList > option").remove();


}

function loadStructure() {
    //document.getElementById("overlayMovimiento").style.display = "none";
    $.ajax({
        url: '/loadStructure',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({}),
        success: function (data) {
            if (data.status == 0) {//No hay nada en la base, por lo que debe bloquear los botones
                disableMenu(true);
                BMovimiento();
                errorInfo("Debe crear un movimiento");
            }
        }
    })
}

window.onload = loadStructure();

//////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////
//                  FUNCIONES EN ORDEN DE MENU                    // 
////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////// 

//*****************************************************************//

////////////////////////////////////////////////////////////////////
//            FUNCIONES PARA CREAR UNA ESTRUCTURA                 // 
////////////////////////////////////////////////////////////////////

//*****************************************************************//

function structConfirm() {
    var zonaName = document.getElementById("structZName").value;
    var list = []
    var listId = []
    $('#structRList > option').each(function () {
        list.push($(this).val())
    })
    $('#structRIdList > option').each(function () {
        listId.push($(this).val())
    })

    if (zonaName != "" & list.length > 0 & listId.length > 0) {
        $.ajax({
            url: '/crearEstructura',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ 'zonaName': zonaName, 'branches': list, 'ids': listId }),
            success: function (data) {
                console.log(data);
                if (data.status == 1) {
                    //alert("Zona y ramas creadas");
                    msgInfo("Zona y ramas creadas");
                    //document.getElementById("overlayCrearESt").style.display = "none";
                } else if (data.status == 0) {
                    errorInfo("La Zona ya existe")
                } else {
                    var auxmsg = "No se crearon las ramas: \n";
                    for (let index = 0; index < data.notCreated.length; index++) {
                        auxmsg += "\t" + data.notCreated[index] + "\n";
                    }
                    errorInfo(auxmsg)
                }
            }
        })
        document.getElementById("structZName").value = "";
        $("#structRList > option").remove();
        $("#structRIdList > option").remove();
    } else {
        errorInfo('Recuerde ingresar la zona y al menos una rama')
    }

}


function cambiarMovimiento() {
    var idMovement = document.getElementById("changeMovementList").value;
    idMovement = String(idMovement).split("-", 2)[1];

    if (idMovement != "") {
        $.ajax({
            url: '/cambiarMovimiento',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ idMovement: idMovement }),
            success: function (data) {
                if (data.status == 1) {
                    msgInfo("Ha cambiado al movimiento:\n" + document.getElementById("changeMovementList").value);
                } else {
                    errorInfo("Ha habido un problema con el cambio de movimiento");
                }
            }
        })
    } else {
        errorInfo('Error en el id del movimiento');
    }


}

function loadMovements() {
    $("#changeMovementList > option").remove();
    $.ajax({
        url: '/loadMovements',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({}),
        success: function (data) {
            if (data.status == 1) {
                for (let index = 0; index < data.movements.length; index++) {
                    var option = "<option value='" + data.movements[index] + "' style='border: 0; background: transparent'>" + data.movements[index] + "</option>"
                    document.getElementById("changeMovementList").innerHTML += option;
                }
            } else {
                errorInfo("No hay movimientos creados");
            }
        }
    })
}

//*****************************************************************//

////////////////////////////////////////////////////////////////////
//                 FUNCIONES PARA CREAR GRUPO                     // 
////////////////////////////////////////////////////////////////////

//*****************************************************************//

////////////////////////////////////////////////////////////////////
//         MUESTRA LOS DATOS DE LA ZONA, RAMA Y MONITOR           //
//                EN CRAERA GRUPO  AL INICIO                      //
////////////////////////////////////////////////////////////////////
function showDataCreaGrupo() {
    ///////////////////////////////////////
    // OPTIENE LA ZONA 1 Y LA DEJA VACIA // 
    ///////////////////////////////////////
    var mySelect = document.getElementById('grupoZList');
    mySelect.options.length = 0;

    ///////////////////////////////////////
    // OPTIENE LA RAMA 1 Y LA DEJA VACIA // 
    ///////////////////////////////////////
    var mySelect = document.getElementById('grupoRList');
    mySelect.options.length = 0;

    //////////////////////////////////////////
    // OPTIENE EL MONITOR 1 Y LA DEJA VACIA // 
    /////////////////////////////////////////
    var mySelect = document.getElementById('grupoMoniList');
    mySelect.options.length = 0;


    ///////////////////////////////////////
    // SELECIONA EL VALOR DE  LA ZONA 1  // 
    /////////////////////////////////////////// 
    var id = document.getElementById("grupoZList").value;

    $.ajax({
        url: '/getShowDataCrearGrupo',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ id: id }),
        success: function (data) {
            if (data.status == 1) {

                for (let index = 0; index < data.zonas.length; index++) {
                    var option = "<option value='" + data.zonas[index] + "' style='border: 0; background: transparent'>" + data.zonas[index] + "</option>"
                    document.getElementById("grupoZList").innerHTML += option;
                }

                for (let index = 0; index < data.ramas.length; index++) {
                    var option = "<option value='" + data.ramas[index] + "' style='border: 0; background: transparent'>" + data.ramas[index] + "</option>"
                    document.getElementById("grupoRList").innerHTML += option;
                }

                for (let index = 0; index < data.monitores.length; index++) {
                    var option = "<option value='" + data.monitores[index] + "' style='border: 0; background: transparent'>" + data.monitores[index] + "</option>"
                    document.getElementById("grupoMoniList").innerHTML += option;
                }
            }
            else {
                errorInfo('Aun no hay zonas disponibles')
                document.getElementById("overlayCrearGrupo").style.display = "none";
            }
        }
    })
}


////////////////////////////////////////////////////////////////////
//                        CREA EL GRUPO                           //
////////////////////////////////////////////////////////////////////
function grupoCrear() {


    var zona = document.getElementById("grupoZList").value;
    var rama = document.getElementById("grupoRList").value;
    var monitor = document.getElementById("grupoMoniList").value;
    var grupo = document.getElementById("grupoGName").value;
    var idGrupo = document.getElementById("grupoGId").value;

    if (zona != "" & rama != "" & monitor != "" & grupo != "" & idGrupo != "") {
        $.ajax({
            url: '/crearGrupo',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ zona: zona, rama: rama, monitor: monitor, grupo: grupo, idGrupo: idGrupo }),
            success: function (data) {
                if (data.status == 1) {
                    msgInfo("Grupo creado exitosamente");
                    document.getElementById("overlayCrearGrupo").style.display = "none";
                } else {
                    errorInfo('Verifique que el ID de grupo sea distinto');
                }
            }
        })
    } else {
        errorInfo('Ingresar todos los datos')
    }
}





//*****************************************************************//

////////////////////////////////////////////////////////////////////
//              FUNCIONES PARA ASIGNAR MONITORES                  // 
////////////////////////////////////////////////////////////////////

//*****************************************************************//



////////////////////////////////////////////////////////////////////
//                 FUNCION  PARA CARGAR DATOS EN                   //
//                         ASIGNAR MONITOR                        // 
////////////////////////////////////////////////////////////////////
function showDataAsigMonitor() {
    ///////////////////////////////////////
    // OPTIENE LA ZONA 1 Y LA DEJA VACIA // 
    ///////////////////////////////////////
    var mySelect = document.getElementById('asigCoaId');
    mySelect.options.length = 0;

    ///////////////////////////////////////
    // OPTIENE LA ZONA 1 Y LA DEJA VACIA // 
    ///////////////////////////////////////
    var mySelect = document.getElementById('asigGrupoId');
    mySelect.options.length = 0;

    var id = document.getElementById("asigCoaId").value;
    $.ajax({
        url: '/getShowDataAsigMonitor',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ id: id }),
        success: function (data) {
            if (data.status == 1) {
                for (let index = 0; index < data.ramas.length; index++) {
                    var option = "<option value='" + data.ramas[index] + "' style='border: 0; background: transparent'>" + data.ramas[index] + "</option>"
                    document.getElementById("asigGrupoId").innerHTML += option;
                }

                for (let index = 0; index < data.monitor.length; index++) {
                    var option = "<option value='" + data.monitor[index] + "' style='border: 0; background: transparent'>" + data.monitor[index] + "</option>"
                    document.getElementById("asigCoaId").innerHTML += option;
                }
            }
            else {
                errorInfo("No hay suficientes datos");
                document.getElementById("overlayAsignarMonitor").style.display = "none";
            }
        }
    })
}











////////////////////////////////////////////////////////////////////
//                       ASIGNA EL MONITOR                        // 
////////////////////////////////////////////////////////////////////
function asigAsignar() {
    // zona-rama-1
    var varidCoach = String(document.getElementById("asigCoaId").value).split("-", 2);
    var varidBrach = String(document.getElementById("asigGrupoId").value).split("-", 3);

    var idCoach = varidCoach[1];
    var idGrupo = varidBrach[0] + "-" + varidBrach[2];

    if (idCoach != "" & idGrupo != "") {
        $.ajax({
            url: '/asignarCoach',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ coach: idCoach, grupo: idGrupo }),
            success: function (data) {
                if (data.status == 1) {
                    msgInfo("Coach asignado a rama");
                    BAsignarMonior();
                } else {
                    errorInfo('Error al asignar Coach');
                }
            }
        })
    } else {
        errorInfo('Recuerde ingresar el ID del Coach y del Grupo');
    }
}



//*****************************************************************//

////////////////////////////////////////////////////////////////////
//            FUNCIONES PARA CONFORMAR COORDINACION               // 
////////////////////////////////////////////////////////////////////

//*****************************************************************//


////////////////////////////////////////////////////////////////////
//                        FORMULARIO UNO                          // 
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
//                CARGA LA LISTA DE ZONAS EN EL                   //
//           FORMULARIO 1 DE CONFORMAR COORDINACION               // 
////////////////////////////////////////////////////////////////////
function showDataCCF1() {
    ///////////////////////////////////////
    // OPTIENE LA ZONA 1 Y LA DEJA VACIA // 
    ///////////////////////////////////////
    var mySelect = document.getElementById('jefeZonaZName');
    mySelect.options.length = 0;

    ///////////////////////////////////////
    // SELECIONA EL VALOR DE  LA ZONA 1  // 
    /////////////////////////////////////// 
    var id = document.getElementById("jefeZonaZName").value;
    $.ajax({
        url: '/getShowDataCCF1',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ id: id }),
        success: function (data) {
            if (data.status == 1) {

                for (let index = 0; index < data.zonas.length; index++) {
                    var option = "<option value='" + data.zonas[index] + "' style='border: 0; background: transparent'>" + data.zonas[index] + "</option>"
                    document.getElementById("jefeZonaZName").innerHTML += option;
                }
            }
            else {
                errorInfo("No hay zonas definidas");
                document.getElementById("overlayConformarCoordinacion").style.display = "none";
            }
        }
    })
}


////////////////////////////////////////////////////////////////////
//                         CONSULTA ZONA                          //
//                       FUNCION DEL BOTON                        // 
////////////////////////////////////////////////////////////////////
function consulZona() {
    var nombre = document.getElementById("jefeZonaZName").value;
    //var id = document.getElementById("jefeZonaZId").value;
    $("#jefe1ZonaList > option").remove();
    $("#jefe2ZonaList > option").remove();

    if (nombre != "") {
        $.ajax({
            url: '/consultarExistenciaZona',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ nombreZona: nombre }),
            success: function (data) {
                if (data.status == 1) {
                    if (data.listZoneChief.length > 0) {
                        var auxmsg = "Los jefes actuales son:\n";
                        for (let index = 0; index < data.listZoneChief.length; index++) {
                            auxmsg += "\t " + data.listZoneChief[index] + "\n";
                        }
                        msgInfo(auxmsg)
                    }

                    for (let index = 0; index < data.listBranchChief.length; index++) {
                        var option = "<option value='" + data.listBranchChief[index] + "' style='border: 0; background: transparent'>" + data.listBranchChief[index] + "</option>"
                        if (data.listZoneChief.length == 1) {
                            document.getElementById("jefe1ZonaList").innerHTML += option;
                            // disable(){
                            //     this.document.getElementById("jefe1ZonaList").innerHTML = true;
                            //  }
                        } else if (data.listZoneChief.length == 0) {
                            document.getElementById("jefe1ZonaList").innerHTML += option;
                            document.getElementById("jefe2ZonaList").innerHTML += option;
                        }
                    }
                } else {
                    errorInfo("No se pueden asignar jefes en esta zona");
                }
            }
        })
    } else {
        errorInfo("Ingrese el nombre y id de Zona");
    }
}


////////////////////////////////////////////////////////////////////
//                        ACEPTAR LOS JEFES                       //
//                       FUNCION DEL BOTON                        // 
////////////////////////////////////////////////////////////////////
function aceptarAsignacionZona() {

    var nombreZona = document.getElementById("jefeZonaZName").value;
    var jefe1 = document.getElementById("jefe1ZonaList").value
    var jefe2 = document.getElementById("jefe2ZonaList").value

    if (nombreZona != "") {
        $.ajax({
            url: '/asignarJefesZona',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ nombreZona: nombreZona, jefe1: jefe1, jefe2: jefe2 }),
            success: function (data) {
                if (data.status == 2) {
                    errorInfo("No puede asignar jefe!")
                } else if (data.status == 1) {
                    msgInfo("Jefe(s) asignado(s)!")
                } else {
                    errorInfo("No se pudo agregar el jefe!")
                }
            }
        })
    } else {
        errorInfo("Ingrese al menos 1 nombre y un id para asignar");
    }

}


////////////////////////////////////////////////////////////////////
//                        FORMULARIO DOS                          // 
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
//                CARGA LA LISTA DE ZONAS Y RAMAS EN EL           //
//           FORMULARIO 2 DE CONFORMAR COORDINACION               // 
////////////////////////////////////////////////////////////////////
function showDataCCF2() {


    ///////////////////////////////////////
    // SELECIONA EL VALOR DE  LA ZONA 1  // 
    /////////////////////////////////////// 
    var id = document.getElementById("jefeRamaZName").value;

    ///////////////////////////////////////
    // OPTIENE LA ZONA 1 Y LA DEJA VACIA // 
    ///////////////////////////////////////
    var mySelect = document.getElementById('jefeRamaZName');
    mySelect.options.length = 0;

    ///////////////////////////////////////
    // OPTIENE LA RAMA 1 Y LA DEJA VACIA // 
    ///////////////////////////////////////
    var mySelect = document.getElementById('jefeRamaRId');
    mySelect.options.length = 0;


    $.ajax({
        url: '/getShowDataCCF2',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ id: id }),
        success: function (data) {
            if (data.status == 1) {

                for (let index = 0; index < data.zonas.length; index++) {
                    var option = "<option value='" + data.zonas[index] + "' style='border: 0; background: transparent'>" + data.zonas[index] + "</option>"
                    document.getElementById("jefeRamaZName").innerHTML += option;
                }

                for (let index = 0; index < data.ramas.length; index++) {
                    var option = "<option value='" + data.ramas[index] + "' style='border: 0; background: transparent'>" + data.ramas[index] + "</option>"
                    document.getElementById("jefeRamaRId").innerHTML += option;
                }
            }
            else {
                errorInfo("No hay zonas definidas");
            }
        }
    })
}


////////////////////////////////////////////////////////////////////
//    ACTUALIZA LAS LISTAS DE RAMAS DEPUES DE SELECCIONAR         //
//                           UNA ZONA                             //
////////////////////////////////////////////////////////////////////
function showRamasCCF2() {
    //////////////////////////////////////////////
    // OPTIENE LA ZONA 1 Y LA DEJA VACIA LA RAMA // 
    //////////////////////////////////////////////
    var id = document.getElementById("jefeRamaZName").value;
    ///////////////////////////////////////
    // OPTIENE LA RAMA 1 Y LA DEJA VACIA // 
    ///////////////////////////////////////
    var mySelect = document.getElementById('jefeRamaRId');
    mySelect.options.length = 0;

    $.ajax({
        url: '/getShowRamasCCF2',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ id: id }),
        success: function (data) {
            if (data.status == 1) {
                for (let index = 0; index < data.ramas.length; index++) {
                    var option = "<option value='" + data.ramas[index] + "' style='border: 0; background: transparent'>" + data.ramas[index] + "</option>"
                    document.getElementById("jefeRamaRId").innerHTML += option;
                }
            }
            else {
                errorInfo("No hay zonas definidas");
            }
        }
    })
}


////////////////////////////////////////////////////////////////////
//                CONSULTA LA RAMA EN BUSCA DE JEFES              //
//                     FUNCION DEL BOTON                          //
////////////////////////////////////////////////////////////////////
function consulRama() {
    var zonaName = document.getElementById("jefeRamaZName").value;
    var auxIdRama = String(document.getElementById("jefeRamaRId").value).split("-", 2);
    var idRama = auxIdRama[1]

    $("#jefe1RamaList > option").remove();
    $("#jefe2RamaList > option").remove();

    if (zonaName != "" & idRama != "") {
        $.ajax({
            url: '/consultarExistenciaRama',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ zonaName: zonaName, idRama: idRama }),
            success: function (data) {
                if (data.status == 1) { //listBranchChief listGroupChief
                    if (data.listBranchChief.length > 0) {
                        var auxmsg = "Los jefes actuales son:\n";
                        for (let index = 0; index < data.listBranchChief.length; index++) {
                            msg += "\t " + data.listBranchChief[index] + "\n";
                        }
                        msgInfo(auxmsg)
                    }

                    for (let index = 0; index < data.listGroupChief.length; index++) {
                        var option = "<option value='" + data.listGroupChief[index] + "' style='border: 0; background: transparent'>" + data.listGroupChief[index] + "</option>"
                        if (data.listBranchChief.length == 1) {
                            document.getElementById("jefe1RamaList").innerHTML += option;
                        } else if (data.listBranchChief.length == 0) {
                            document.getElementById("jefe1RamaList").innerHTML += option;
                            document.getElementById("jefe2RamaList").innerHTML += option;
                        }
                    }

                } else {
                    errorInfo("No se pueden asignar jefes en esta rama");
                }
            }
        })
    } else {
        errorInfo("Ingrese el nombre de zona y id de Rama");
    }
}

////////////////////////////////////////////////////////////////////
//        ACEPTA LA CONSULTA LA RAMA EN BUSCA DE JEFES            //
//                     FUNCION DEL BOTON                          //
////////////////////////////////////////////////////////////////////
function aceptarAsignacionRama() {

    var nombreZona = document.getElementById("jefeRamaZName").value;
    var idRama = document.getElementById("jefeRamaRId").value;

    var jefe1 = document.getElementById("jefe1RamaList").value
    var jefe2 = document.getElementById("jefe2RamaList").value

    if (nombreZona != "" & idRama != "") {
        $.ajax({
            url: '/asignarJefesRama',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ nombreZona: nombreZona, idRama: idRama, jefe1: jefe1, jefe2: jefe2 }),
            success: function (data) {
                if (data.status == 2) {
                    errorInfo("No puede asignar jefe!")
                } else if (data.status == 1) {
                    msgInfo("Jefe(s) asignado(s)!")
                } else {
                    errorInfo("No se pudo agregar el jefe!")
                }
            }
        })
    } else {
        errorInfo("Ingrese al menos 1 nombre y un id para asignar");
    }
}


////////////////////////////////////////////////////////////////////
//                        FORMULARIO TRES                         // 
////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////
//            MUESTRA LOS DATOS DE LA ZONA, RAMA Y GRUPO          //
//               EN AGREGAR MIEMBRO   AL INICIO                   //
////////////////////////////////////////////////////////////////////
function showDataF3() {
    ///////////////////////////////////////
    // OPTIENE LA ZONA 1 Y LA DEJA VACIA // 
    ///////////////////////////////////////
    var mySelect = document.getElementById('jefeGrupoGName');
    mySelect.options.length = 0;

    ///////////////////////////////////////
    // OPTIENE LA RAMA 1 Y LA DEJA VACIA // 
    ///////////////////////////////////////
    var mySelect = document.getElementById('jefeGrupoRId');
    mySelect.options.length = 0;

    ///////////////////////////////////////
    // OPTIENE LA RAMA 1 Y LA DEJA VACIA // 
    ///////////////////////////////////////
    var mySelect = document.getElementById('jefeGrupoGId');
    mySelect.options.length = 0;

    ////////////////////////////////////////
    // OPTIENE EL GRUPO 1 Y LO DEJA VACIO // 
    ///////////////////////////////////////


    ///////////////////////////////////////
    // SELECIONA EL VALOR DE  LA ZONA 1  // 
    /////////////////////////////////////// 
    var id = document.getElementById("jefeGrupoGName").value;

    $.ajax({
        url: '/getShowDataMember',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ id: id }),
        success: function (data) {
            if (data.status == 1) {

                ///////////////////////////////////////
                //        ACTUALIZA LAS ZONAS        // 
                ///////////////////////////////////////
                for (let index = 0; index < data.zonas.length; index++) {
                    var option = "<option value='" + data.zonas[index] + "' style='border: 0; background: transparent'>" + data.zonas[index] + "</option>"
                    document.getElementById("jefeGrupoGName").innerHTML += option;
                }

                ///////////////////////////////////////
                //        ACTUALIZA LAS RAMAS        // 
                ///////////////////////////////////////
                for (let index = 0; index < data.ramas.length; index++) {
                    var option = "<option value='" + data.ramas[index] + "' style='border: 0; background: transparent'>" + data.ramas[index] + "</option>"
                    document.getElementById("jefeGrupoRId").innerHTML += option;
                }

                ///////////////////////////////////////
                //        ACTUALIZA LOS GRUPOS        // 
                ///////////////////////////////////////
                for (let index = 0; index < data.grupos.length; index++) {
                    var option = "<option value='" + data.grupos[index] + "' style='border: 0; background: transparent'>" + data.grupos[index] + "</option>"
                    document.getElementById("jefeGrupoGId").innerHTML += option;
                }
            }
            else {
                errorInfo("No hay sufucientes datos \n para esta operacion");
                document.getElementById("FormularioGrupo").style.display = "none";
            }
        }
    })
}


////////////////////////////////////////////////////////////////////
//    ACTUALIZA LAS LISTAS DE RAMAS DEPUES DE SELECCIONAR         //
//                           UNA ZONA                             //
////////////////////////////////////////////////////////////////////
function showRamasF3() {

    //////////////////////////////////////////////
    // OPTIENE LA ZONA 1 Y LA DEJA VACIA LA RAMA // 
    //////////////////////////////////////////////
    var id = document.getElementById("jefeGrupoGName").value;

    var mySelect = document.getElementById('jefeGrupoRId');
    mySelect.options.length = 0;

    $.ajax({
        url: '/getShowRamasMember',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ id: id }),
        success: function (data) {
            if (data.status == 1) {
                for (let index = 0; index < data.ramas.length; index++) {
                    var option = "<option value='" + data.ramas[index] + "' style='border: 0; background: transparent'>" + data.ramas[index] + "</option>"
                    document.getElementById("jefeGrupoRId").innerHTML += option;
                }
                showGruposF3();
            }
        }
    })
}


////////////////////////////////////////////////////////////////////
//    ACTUALIZA LAS LISTAS DE GRUPOS DEPUES DE SELECCIONAR        //
//                     UNA ZONA Y UNA RAMA                        //
////////////////////////////////////////////////////////////////////
// aun no existe
function showGruposF3() {
    var idZ = document.getElementById("jefeGrupoGName").value;
    var idR = document.getElementById("jefeGrupoRId").value;


    var mySelect = document.getElementById('jefeGrupoGId');
    mySelect.options.length = 0;

    $.ajax({
        url: '/getShowGruposMember',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ idZ: idZ, idR: idR }),
        success: function (data) {
            if (data.status == 1) {
                ///////////////////////////////////////
                //        ACTUALIZA LOS GRUPOS        // 
                ///////////////////////////////////////
                for (let index = 0; index < data.grupos.length; index++) {
                    var option = "<option value='" + data.grupos[index] + "' style='border: 0; background: transparent'>" + data.grupos[index] + "</option>"
                    document.getElementById("jefeGrupoGId").innerHTML += option;
                }
            }
        }
    })
}



////////////////////////////////////////////////////////////////////
//             CONSULTA EL GRUPO EN BUSCA DE JEFES                //
//                     FUNCION DEL BOTON                          //
////////////////////////////////////////////////////////////////////
function consulGrupo() {

    var dataR = String(document.getElementById("jefeGrupoRId").value).split("-", 2);
    var dataG = String(document.getElementById("jefeGrupoGId").value).split("-", 2);

    var zonaName = document.getElementById("jefeGrupoGName").value;
    var ramaId = dataR[1];
    var grupoId = dataG[1];

    $("#jefe1GrupoList > option").remove();
    $("#jefe2GrupoList > option").remove();

    if (zonaName != "" & ramaId != "" & grupoId != "") {
        $.ajax({
            url: '/consultarExistenciaGrupo',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ zonaName: zonaName, ramaId: ramaId, grupoId: grupoId }),
            success: function (data) {
                if (data.status == 1) { //listGroupChief listMembersChief
                    if (data.listGroupChief.length > 0) {
                        var auxmsg = "Los jefes actuales son:\n";
                        for (let index = 0; index < data.listGroupChief.length; index++) {
                            auxmsg += "\t " + data.listGroupChief[index] + "\n";
                        }
                        msgInfo(auxmsg);
                        //alert(auxmsg);
                    }
                    console.log("seguí -->")
                    for (let index = 0; index < data.listMembersChief.length; index++) {
                        var option = "<option value='" + data.listMembersChief[index] + "' style='border: 0; background: transparent'>" + data.listMembersChief[index] + "</option>"
                        if (data.listGroupChief.length == 1) {
                            document.getElementById("jefe1GrupoList").innerHTML += option;
                        } else if (data.listGroupChief.length == 0) {
                            document.getElementById("jefe1GrupoList").innerHTML += option;
                            document.getElementById("jefe2GrupoList").innerHTML += option;
                        }
                    }

                } else {
                    errorInfo("No se pueden asignar jefes en esta rama");
                }
            }
        })
    } else {
        errorInfo("Ingrese todos los campos");
    }
}

////////////////////////////////////////////////////////////////////
//        ACEPTA LA CONSULTA LOS GRUPOS EN BUSCA DE JEFES         //
//                     FUNCION DEL BOTON                          //
////////////////////////////////////////////////////////////////////
function aceptarAsignacionGrupo() {
    var nombreZona = document.getElementById("jefeGrupoGName").value;
    var idRama = document.getElementById("jefeGrupoRId").value;
    var idGrupo = document.getElementById("jefeGrupoGId").value;

    var jefe1 = document.getElementById("jefe1GrupoList").value
    var jefe2 = document.getElementById("jefe2GrupoList").value

    if (nombreZona != "" && idRama != "" && idGrupo != "") {
        $.ajax({
            url: '/asignarJefesGrupo',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ nombreZona: nombreZona, idRama: idRama, idGrupo: idGrupo, jefe1: jefe1, jefe2: jefe2 }),
            success: function (data) {
                if (data.status == 2) {
                    errorInfo("No puede asignar jefe!")
                } else if (data.status == 1) {
                    msgInfo("Jefe(s) asignado(s)!")
                } else {
                    errorInfo("No se pudo agregar el jefe!")
                }
            }
        })
    } else {
        errorInfo("Ingrese al menos 1 nombre y un id para asignar");
    }

}





//*****************************************************************//

////////////////////////////////////////////////////////////////////
//            FUNCIONES PARA ADMINISTRAR MIEMBROS                 // 
////////////////////////////////////////////////////////////////////

//*****************************************************************//

////////////////////////////////////////////////////////////////////
//                        FORMULARIO UNO                          // 
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
//                      AGREGAR UN NUEVO USUARIO                  // 
////////////////////////////////////////////////////////////////////
function agregarUsuario() {
    var id = document.getElementById("nuevoUserId").value;
    var nombre = document.getElementById("nuevoUserNombre").value;
    var celular = document.getElementById("nuevoUserCelular").value;
    var mail = document.getElementById("nuevoUserMail").value;
    var direccion = document.getElementById("nuevoUserDireccion").value;
    var esMonitor = document.getElementById("esMonitorAgregar").checked;

    if (id != "" & nombre != "" & celular != "" & mail != "" & direccion != "") {
        $.ajax({
            url: '/agregarUsuario',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ id: id, name: nombre, celular: celular, mail: mail, direccion: direccion, esMonitor: esMonitor }),
            success: function (data) {
                if (data.status == 1) {
                    msgInfo("Usuario creado");
                    document.getElementById("nuevoUserId").value = "";
                    document.getElementById("nuevoUserNombre").value = "";
                    document.getElementById("nuevoUserCelular").value = "";
                    document.getElementById("nuevoUserMail").value = "";
                    document.getElementById("nuevoUserDireccion").value = "";
                    document.getElementById("esMonitorAgregar").checked = false;
                } else {
                    errorInfo("Usuario no creado, el id ya existe");
                }
            }
        })
    } else {
        errorInfo("Ingrese todos los campos");
    }

}


////////////////////////////////////////////////////////////////////
//                        FORMULARIO DOS                          // 
////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////e
//                   MOSTRAR TODOS LOS USUARIOS                   // 
////////////////////////////////////////////////////////////////////
function showUser() {
    var id = document.getElementById('borrarUserId');
    id.options.length = 0;

    $.ajax({
        url: '/getShowUser',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ id: id }),
        success: function (data) {
            if (data.status == 1) {
                for (let index = 0; index < data.dataM.length; index++) {
                    var option = "<option value='" + data.dataM[index] + "' style='border: 0; background: transparent'>" + data.dataM[index] + "</option>"
                    document.getElementById("borrarUserId").innerHTML += option;
                }
            }
            else {
                errorInfo("No hay sufucientes datos \n para esta operacion");
                document.getElementById("FormularioInfo").style.display = "none";
            }
        }
    })

}

///////////////////////////////////////////////////////////////////
function dataUserDelete() {
    $("#consulGrupoZListE > option").remove();
    $("#consulGrupoRListE > option").remove();
    $("#consulGrupoGListE > option").remove();
    var id = String(document.getElementById("borrarUserId").value).split("-", 2)[1];

    if (id != "") {
        $.ajax({
            url: '/getParticipacionEliminar',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ id: id }),
            success: function (data) {
                if (data.status == 1) {
                    for (let index = 0; index < data.zonas.length; index++) {
                        var option = "<option value='" + data.zonas[index] + "' style='border: 0; background: transparent'>" + data.zonas[index] + "</option>"
                        document.getElementById("consulGrupoZListE").innerHTML += option;
                    }
                    for (let index = 0; index < data.ramas.length; index++) {
                        var option = "<option value='" + data.ramas[index] + "' style='border: 0; background: transparent'>" + data.ramas[index] + "</option>"
                        document.getElementById("consulGrupoRListE").innerHTML += option;
                    }
                    for (let index = 0; index < data.grupos.length; index++) {
                        var option = "<option value='" + data.grupos[index] + "' style='border: 0; background: transparent'>" + data.grupos[index] + "</option>"
                        document.getElementById("consulGrupoGListE").innerHTML += option;
                    }
                } else {
                    errorInfo("No se encontro participacion");
                }
            }
        })
    } else {
        errorInfo("Debe ingresar el ID");
    }
}





////////////////////////////////////////////////////////////////////
//                    ELIMINAR A CIERTO USUARIO                   // 
////////////////////////////////////////////////////////////////////
function borrarUsuario() {

    var dataId = String(document.getElementById("borrarUserId").value).split("-", 2);
    var id = dataId[1];

    var zona = String(document.getElementById("consulGrupoZListE").value).split("-", 1)[0];
    var rama = String(document.getElementById("consulGrupoRListE").value).split("-", 2)[1];
    var grupo = String(document.getElementById("consulGrupoGListE").value).split("-", 2)[1];

    console.log("ID : ", id);
    console.log("ZONA: ", zona);
    console.log("RAMA: ", rama);
    console.log("GRUPO: ", grupo);
    console.log("////////////////////////////////////");


    //CHECKS
    var zonaCheck = document.getElementById("deleteZona").checked;
    var ramaCheck = document.getElementById("deleteRama").checked;
    var grupoCheck = document.getElementById("deleteGrupo").checked;

    $.ajax({
        url: '/borrarUsuario',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        //, zonaCheck:zonaCheck, ramaCheck:ramaCheck , grupoCheck:grupoCheck
        data: JSON.stringify({ id: id, zona: zona, rama: rama, grupo: grupo, zonaCheck: zonaCheck, ramaCheck: ramaCheck, grupoCheck: grupoCheck }),
        success: function (data) {
            if (data.status == 1) {
                showUser();
                msgInfo("Usuario eliminado");
            } else {
                showUser();
                errorInfo("Seleccione la estructura donde se eliminara el usuario");
            }
        }
    })

}



////////////////////////////////////////////////////////////////////
//                        FORMULARIO TRES                         // 
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
//                   MODIFICAR A CIERTO USUARIO                   // 
////////////////////////////////////////////////////////////////////
function modificarUsuario() {
    var id = document.getElementById("updateUserId").value;
    var nombre = document.getElementById("updateUserName").value;
    var celular = document.getElementById("updateUserCelular").value;
    var mail = document.getElementById("updateUserMail").value;
    var direccion = document.getElementById("updateUserDireccion").value;
    var esMonitor = document.getElementById("esMonitor").checked;



    if (id != "" & nombre != "" & celular != "" & mail != "" & direccion != "") {
        $.ajax({
            url: '/actualizarUsuario',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ id: id, name: nombre, celular: celular, mail: mail, direccion: direccion, esMonitor: esMonitor }),
            success: function (data) {
                if (data.status == 1) {
                    msgInfo("Usuario modificado");
                    document.getElementById("updateUserId").value = "";
                    document.getElementById("updateUserName").value = "";
                    document.getElementById("updateUserCelular").value = "";
                    document.getElementById("updateUserMail").value = "";
                    document.getElementById("nuevoUserMail").value = "";
                    document.getElementById("updateUserDireccion").value = "";
                    document.getElementById("esMonitor").checked = false;
                } else {
                    errorInfo("Usuario No modificado");
                }
            }
        })
    } else {
        errorInfo("Ingrese al menos un campo");
    }

}


////////////////////////////////////////////////////////////////////
//                        FORMULARIO CUATRO                        // 
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
//               MUESTRA LOS USUARIOS PARA MOVER                  // 
////////////////////////////////////////////////////////////////////
function showDataMove() {
    var id = document.getElementById('moverUserId');
    id.options.length = 0;

    var idx = document.getElementById('procedencia');
    idx.options.length = 0;

    $.ajax({
        url: '/getShowDataMove',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ id: id }),
        success: function (data) {
            if (data.status == 1) {
                for (let index = 0; index < data.dataM.length; index++) {
                    var option = "<option value='" + data.dataM[index] + "' style='border: 0; background: transparent'>" + data.dataM[index] + "</option>"
                    document.getElementById("moverUserId").innerHTML += option;
                }

                for (let index = 0; index < data.dataP.length; index++) {
                    var option = "<option value='" + data.dataP[index] + "' style='border: 0; background: transparent'>" + data.dataP[index] + "</option>"
                    document.getElementById("procedencia").innerHTML += option;
                }
            }
            else {
                errorInfo("No hay sufucientes datos \n para esta operacion");
                document.getElementById("FormularioInfoGeneral").style.display = "none";

            }
        }
    })
}



////////////////////////////////////////////////////////////////////
//               MUESTRA LOS DATOS DE PROCEDENCIA                 // 
////////////////////////////////////////////////////////////////////
function showDataProcedence() {
    var id = document.getElementById('moverUserId').value;
    var idx = document.getElementById('procedencia');
    idx.options.length = 0;

    $.ajax({
        url: '/getShowDataProcedence',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ id: id }),
        success: function (data) {
            if (data.status == 1) {
                for (let index = 0; index < data.dataP.length; index++) {
                    var option = "<option value='" + data.dataP[index] + "' style='border: 0; background: transparent'>" + data.dataP[index] + "</option>"
                    document.getElementById("procedencia").innerHTML += option;
                }
            }
            else {
                errorInfo("No hay sufucientes datos /n para esta operacion");
            }
        }
    })



}














////////////////////////////////////////////////////////////////////
//                       AUTORIZAR MOVIMIENTO                     // 
////////////////////////////////////////////////////////////////////
function moverUsuario() {
    //ZONA-RAMA-ID-GRUPO-ID  
    var auxProcedenciaData = String(document.getElementById("procedencia").value).split("-", 5);
    var auxInfoData = String(document.getElementById("moverUserId").value).split("-", 2);

    var id = auxInfoData[1];
    var nombre = auxInfoData[0];

    var procedenciaZonaName = auxProcedenciaData[0];
    var procedenciaIdRama = auxProcedenciaData[2];
    var procedenciaidGrupo = auxProcedenciaData[4];

    var destinoZonaName = document.getElementById("destinoZonaName").value;
    var destinoIdRama = document.getElementById("destinoRamaId").value;
    var destinoidGrupo = document.getElementById("destinoGrupoId").value;

    if (id != "" & nombre != "" & procedenciaZonaName != "" & procedenciaIdRama != "" & procedenciaidGrupo != "" &
        destinoZonaName != "" & destinoIdRama != "" & destinoidGrupo != "") {
        $.ajax({
            url: '/moverUsuario',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({
                id: id, name: nombre, procedenciaZonaName: procedenciaZonaName,
                procedenciaIdRama: procedenciaIdRama, procedenciaidGrupo: procedenciaidGrupo,
                destinoZonaName: destinoZonaName, destinoIdRama: destinoIdRama, destinoidGrupo: destinoidGrupo
            }),
            success: function (data) {
                if (data.status == 1) {
                    msgInfo("Usuario movido");
                } else {
                    errorInfo("Usuario No movido");
                }
            }
        })
    } else {
        errorInfo("Ingrese todos los campos");
    }
}



//*****************************************************************//

////////////////////////////////////////////////////////////////////
//               FUNCIONES PARA CONSULTAS VARIAS                  // 
////////////////////////////////////////////////////////////////////

//*****************************************************************//

////////////////////////////////////////////////////////////////////
//                        FORMULARIO UNO                         // 
////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////
//                           SHOW ALL B                            // 
////////////////////////////////////////////////////////////////////
function showAlBl() {
    var id = document.getElementById("consulGrupoName");
    id.options.length = 0;

    $.ajax({
        url: '/getShowAlBl',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ id: id }),
        success: function (data) {
            if (data.status == 1) {
                for (let index = 0; index < data.dataP.length; index++) {
                    var option = "<option value='" + data.dataP[index] + "' style='border: 0; background: transparent'>" + data.dataP[index] + "</option>"
                    document.getElementById("consulGrupoName").innerHTML += option;
                }

            } else {
                errorInfo("Error los datos son insuficientes");
            }
        }
    })

}

////////////////////////////////////////////////////////////////////
//                       POSICION DE UN GRUPO                     // 
////////////////////////////////////////////////////////////////////
function consulGrupoFun() {
    //HACER SPLIT
    var nombre = document.getElementById("consulGrupoName").value;

    var aux = String(document.getElementById("consulGrupoName").value).split("-", 2);
    var nombre = aux[0];
    var id = aux[1];


    if (id != "" & nombre != "") {
        $.ajax({
            url: '/getGrupo',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ id: id, nombre: nombre }),
            success: function (data) {
                if (data.status == 1) {
                    document.getElementById("consulGrupoZonaName").value = data.zona
                    document.getElementById("consulGrupoRamaName").value = data.rama
                } else {
                    errorInfo("Error al consultar");
                }
            }
        })
    } else {
        errorInfo("Ingrese todos los campos");
    }
}


////////////////////////////////////////////////////////////////////
//                        FORMULARIO DOS                         // 
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
//                    SHOW DATA EN FORMULARIO 2                   // 
////////////////////////////////////////////////////////////////////

function showMemberConsult() {

    var id = document.getElementById('consulMiembroId');
    id.options.length = 0;

    $.ajax({
        url: '/getShowMemberConsult',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ id: id }),
        success: function (data) {
            if (data.status == 1) {
                for (let index = 0; index < data.dataP.length; index++) {
                    var option = "<option value='" + data.dataP[index] + "' style='border: 0; background: transparent'>" + data.dataP[index] + "</option>"
                    document.getElementById("consulMiembroId").innerHTML += option;
                }

            } else {
                errorInfo("Error los datos son insuficinetes.");
            }
        }
    })

}
















////////////////////////////////////////////////////////////////////
//                 PARTICIPACION DE UN MIEMBOR                    // 
////////////////////////////////////////////////////////////////////
function consulMiembroFun() {
    $("#consulGrupoZList > option").remove();
    $("#consulGrupoRList > option").remove();
    $("#consulGrupoGList > option").remove();
    var id = String(document.getElementById("consulMiembroId").value).split("-", 2)[1];

    if (id != "") {
        $.ajax({
            url: '/getParticipacion',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ id: id }),
            success: function (data) {
                if (data.status == 1) {
                    for (let index = 0; index < data.zonas.length; index++) {
                        var option = "<option value='" + data.zonas[index] + "' style='border: 0; background: transparent'>" + data.zonas[index] + "</option>"
                        document.getElementById("consulGrupoZList").innerHTML += option;
                    }
                    for (let index = 0; index < data.ramas.length; index++) {
                        var option = "<option value='" + data.ramas[index] + "' style='border: 0; background: transparent'>" + data.ramas[index] + "</option>"
                        document.getElementById("consulGrupoRList").innerHTML += option;
                    }
                    for (let index = 0; index < data.grupos.length; index++) {
                        var option = "<option value='" + data.grupos[index] + "' style='border: 0; background: transparent'>" + data.grupos[index] + "</option>"
                        document.getElementById("consulGrupoGList").innerHTML += option;
                    }
                } else {
                    errorInfo("No se encontro participacion");
                }
            }
        })
    } else {
        errorInfo("Debe ingresar el ID");
    }

}


////////////////////////////////////////////////////////////////////
//                        FORMULARIO TRES                        // 
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
//                     MIEMBRO POR ELEMENTO                       // 
////////////////////////////////////////////////////////////////////
function consulPorTipoFun() {
    $("#consulMembersList > option").remove();

    var nivel = document.getElementById("consulnivelList").value;
    var idNivel = document.getElementById("consulNivelMiembroId").value;

    if (nivel != "" & idNivel != "") {
        $.ajax({
            url: '/getMiembrosNivel',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ nivel: nivel, idNivel: idNivel }),
            success: function (data) {
                if (data.status == 1) {
                    for (let index = 0; index < data.miembros.length; index++) {
                        var option = "<option value='" + data.miembros[index] + "' style='border: 0; background: transparent'>" + data.miembros[index] + "</option>"
                        document.getElementById("consulMembersList").innerHTML += option;
                    }
                } else {
                    errorInfo("Se requieren mas datos para este proceso");
                }
            }
        })
    } else {
        errorInfo("Debe ingresar el ID");
    }

}





//*****************************************************************//
////////////////////////////////////////////////////////////////////
//              FUNCIONES PARA CREAR MOVIMIENTO                   // 
////////////////////////////////////////////////////////////////////
//*****************************************************************//

////////////////////////////////////////////////////////////////////
//                      CREAR MOVIMIENTO                          //
//                     FUNCION DEL BOTON                          //
////////////////////////////////////////////////////////////////////
function crearMovimiento() {
    var cedulaJuridica = document.getElementById("movimientoCedula").value;
    var nombre = document.getElementById("movimientoNombre").value;
    var web = document.getElementById("movimientoWeb").value;
    var pais = document.getElementById("movimientoPais").value;
    var telefono = document.getElementById("movimientoTelefono").value;

    var idAsesor = document.getElementById("idAsesor").value;
    var nombreAsesor = document.getElementById("nombreAsesor").value;
    var celularAsesor = document.getElementById("celularAsesor").value;
    var correoAsesor = document.getElementById("correoAsesor").value;
    var direccionAsesor = document.getElementById("direccionAsesor").value;


    if (cedulaJuridica != "" & nombre != "" & web != "" & pais != "" & telefono != "" &
        idAsesor != "" & nombreAsesor != "", celularAsesor != "" & correoAsesor != "" & direccionAsesor != "") {
        $.ajax({
            url: '/crearMovimiento',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({
                cedulaJuridica: cedulaJuridica, nombre: nombre, web: web, pais: pais, telefono: telefono,
                idAsesor: idAsesor, nombreAsesor: nombreAsesor, celularAsesor: celularAsesor, correoAsesor: correoAsesor, direccionAsesor: direccionAsesor
            }),
            success: function (data) {
                if (data.status == 1) {
                    msgInfo("Movimiento Creado");
                    document.getElementById("overlayMovimiento").style.display = "none";
                    disableMenu(false);
                } else {
                    document.getElementById("movimientoCedula").value = "";
                    document.getElementById("movimientoNombre").value = "";
                    document.getElementById("movimientoWeb").value = "";
                    document.getElementById("movimientoPais").value = "";
                    document.getElementById("movimientoTelefono").value = "";
                    errorInfo("El movimiento ya fue creado");
                }
            }
        })
    } else {
        document.getElementById("movimientoCedula").value = "";
        document.getElementById("movimientoNombre").value = "";
        document.getElementById("movimientoWeb").value = "";
        document.getElementById("movimientoPais").value = "";
        document.getElementById("movimientoTelefono").value = "";
        errorInfo("Debe ingresar todos los datos")
    }
}





//*****************************************************************//
////////////////////////////////////////////////////////////////////
//               FUNCIONES PARA AGREGAR MIEMBOR                   // 
////////////////////////////////////////////////////////////////////
//*****************************************************************//

////////////////////////////////////////////////////////////////////
//            MUESTRA LOS DATOS DE LA ZONA, RAMA Y GRUPO          //
//               EN AGREGAR MIEMBRO   AL INICIO                   //
////////////////////////////////////////////////////////////////////
function showDataMember() {

    ///////////////////////////////////////
    // OPTIENE LA ZONA 1 Y LA DEJA VACIA // 
    ///////////////////////////////////////
    var mySelect = document.getElementById('agregarMiembroId');
    mySelect.options.length = 0;

    ///////////////////////////////////////
    // OPTIENE LA ZONA 1 Y LA DEJA VACIA // 
    ///////////////////////////////////////
    var mySelect = document.getElementById('zonaMiembro1');
    mySelect.options.length = 0;

    ///////////////////////////////////////
    // OPTIENE LA RAMA 1 Y LA DEJA VACIA // 
    ///////////////////////////////////////
    var mySelect = document.getElementById('ramaMiembro1');
    mySelect.options.length = 0;

    ///////////////////////////////////////
    // OPTIENE LA RAMA 1 Y LA DEJA VACIA // 
    ///////////////////////////////////////
    var mySelect = document.getElementById('grupoMiembro1');
    mySelect.options.length = 0;

    ////////////////////////////////////////
    // OPTIENE EL GRUPO 1 Y LO DEJA VACIO // 
    ///////////////////////////////////////


    ///////////////////////////////////////
    // SELECIONA EL VALOR DE  LA ZONA 1  // 
    /////////////////////////////////////// 
    var id = document.getElementById("zonaMiembro1").value;

    $.ajax({
        url: '/getShowDataMember',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ id: id }),
        success: function (data) {
            if (data.status == 1) {

                ///////////////////////////////////////
                //        ACTUALIZA MIEMBROS         // 
                ///////////////////////////////////////
                for (let index = 0; index < data.dataM.length; index++) {
                    var option = "<option value='" + data.dataM[index] + "' style='border: 0; background: transparent'>" + data.dataM[index] + "</option>"
                    document.getElementById("agregarMiembroId").innerHTML += option;
                }

                ///////////////////////////////////////
                //        ACTUALIZA LAS ZONAS        // 
                ///////////////////////////////////////
                for (let index = 0; index < data.zonas.length; index++) {
                    var option = "<option value='" + data.zonas[index] + "' style='border: 0; background: transparent'>" + data.zonas[index] + "</option>"
                    document.getElementById("zonaMiembro1").innerHTML += option;
                }

                ///////////////////////////////////////
                //        ACTUALIZA LAS RAMAS        // 
                ///////////////////////////////////////
                for (let index = 0; index < data.ramas.length; index++) {
                    var option = "<option value='" + data.ramas[index] + "' style='border: 0; background: transparent'>" + data.ramas[index] + "</option>"
                    document.getElementById("ramaMiembro1").innerHTML += option;
                }

                ///////////////////////////////////////
                //        ACTUALIZA LOS GRUPOS        // 
                ///////////////////////////////////////
                for (let index = 0; index < data.grupos.length; index++) {
                    var option = "<option value='" + data.grupos[index] + "' style='border: 0; background: transparent'>" + data.grupos[index] + "</option>"
                    document.getElementById("grupoMiembro1").innerHTML += option;
                }
            }
            else {
                errorInfo("No hay sufucientes datos para esta operacion");
                document.getElementById("overlayAgregarMiembro").style.display = "none";
            }
        }
    })
}


////////////////////////////////////////////////////////////////////
//    ACTUALIZA LAS LISTAS DE RAMAS DEPUES DE SELECCIONAR         //
//                           UNA ZONA                             //
////////////////////////////////////////////////////////////////////
function showRamasMember() {

    //////////////////////////////////////////////
    // OPTIENE LA ZONA 1 Y LA DEJA VACIA LA RAMA // 
    //////////////////////////////////////////////
    var id = document.getElementById("zonaMiembro1").value;

    var mySelect = document.getElementById('ramaMiembro1');
    mySelect.options.length = 0;

    $.ajax({
        url: '/getShowRamasMember',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ id: id }),
        success: function (data) {
            if (data.status == 1) {
                for (let index = 0; index < data.ramas.length; index++) {
                    var option = "<option value='" + data.ramas[index] + "' style='border: 0; background: transparent'>" + data.ramas[index] + "</option>"
                    document.getElementById("ramaMiembro1").innerHTML += option;
                }
                showGruposMember();
            }
        }
    })
}


////////////////////////////////////////////////////////////////////
//    ACTUALIZA LAS LISTAS DE GRUPOS DEPUES DE SELECCIONAR        //
//                     UNA ZONA Y UNA RAMA                        //
////////////////////////////////////////////////////////////////////
// aun no existe
function showGruposMember() {
    var idZ = document.getElementById("zonaMiembro1").value;
    var idR = document.getElementById("ramaMiembro1").value;

    var mySelect = document.getElementById('grupoMiembro1');
    mySelect.options.length = 0;

    $.ajax({
        url: '/getShowGruposMember',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ idZ: idZ, idR: idR }),
        success: function (data) {
            if (data.status == 1) {
                ///////////////////////////////////////
                //        ACTUALIZA LOS GRUPOS        // 
                ///////////////////////////////////////
                for (let index = 0; index < data.grupos.length; index++) {
                    var option = "<option value='" + data.grupos[index] + "' style='border: 0; background: transparent'>" + data.grupos[index] + "</option>"
                    document.getElementById("grupoMiembro1").innerHTML += option;
                }
            }
        }
    })
}
////////////////////////////////////////////////////////////////////
//                    AGREGAR MIEMBRO A GRUPO                     //
//                     FUNCION DEL BOTON                          //
////////////////////////////////////////////////////////////////////
function agregarMiembroAGrupo() {

    var auxMiembro = String(document.getElementById("agregarMiembroId").value).split("-", 2);
    var idMiembro = auxMiembro[1]
    var zona = document.getElementById("zonaMiembro1").value;
    var dataR = String(document.getElementById("ramaMiembro1").value).split("-", 2);
    var dataG = String(document.getElementById("grupoMiembro1").value).split("-", 2);

    var rama = dataR[1];
    var grupo = dataG[1];

    if (idMiembro != "" & zona != "" & rama != "" & grupo != "") {
        $.ajax({
            url: '/agregarMiembroAGrupo',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ idMiembro: idMiembro, zona: zona, rama: rama, grupo: grupo }),
            success: function (data) {
                if (data.status == 1) {
                    msgInfo("Agregado!!");
                    document.getElementById("overlayAgregarMiembro").style.display = "none";
                } else {
                    errorInfo("No se pudo agregar al miembro");
                }
            }
        })
    } else {
        errorInfo("Debe ingresar todos los datos");
    }

}










//*****************************************************************//

////////////////////////////////////////////////////////////////////
//                      FUNCIONES AUXILIARES                      // 
////////////////////////////////////////////////////////////////////


//*****************************************************************//


////////////////////////////////////////////////////////////////////
//                        FORMULARIOS OFF                         //
////////////////////////////////////////////////////////////////////
function formularioOff() {

    document.getElementById("FormularioRama").style.display = "none ";
    document.getElementById("FormularioGrupo").style.display = "none ";
    document.getElementById("FormularioJefeZone").style.display = "none";

    document.getElementById("FormularioConsultasVariasDos").style.display = "none ";
    document.getElementById("FormularioConsultasVariasUno").style.display = "none";
    document.getElementById("FormularioConsultasVariasTres").style.display = "none";

    document.getElementById("FormularioInfoGeneral").style.display = "none ";
    document.getElementById("FormularioInfo").style.display = "none ";
    document.getElementById("FormularioGeneral2").style.display = "none";
    document.getElementById("FormularioGeneral1").style.display = "none";

}








////////////////////////////////////////////////////////////////////
//****************************************************************//
////////////////////////////////////////////////////////////////////
function agregarRama() {
    if (document.getElementById("structRName").value != "" & document.getElementById("structRId").value != "") {
        var text = document.getElementById("structRName").value;
        var idRama = document.getElementById("structRId").value;

        var option = "<option style='border: 0; background: transparent'>" + text + "</option>"
        document.getElementById("structRList").innerHTML += option;
        document.getElementById("structRName").value = "";

        var optionId = "<option style='border: 0; background: transparent'>" + idRama + "</option>"
        document.getElementById("structRIdList").innerHTML += optionId;
        document.getElementById("structRId").value = "";

    } else {
        errorInfo('Ingrese una rama y su id');
    }
}


////////////////////////////////////////////////////////////////////
//****************************************************************//
////////////////////////////////////////////////////////////////////
function actualizarMonitoresDisponibles(val) {
    $("#grupoMoniList > option").remove();
    var zonaName = document.getElementById("grupoZList").value;
    var data = String(val.value).split("-", 2);

    $.ajax({
        url: '/obtenerMonitoresDisponibles',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ zona: zonaName, ramaId: data[1] }),
        success: function (data) {
            //console.log(data.monitores);
            for (let index = 0; index < data.monitores.length; index++) {
                var option = "<option value='" + data.monitores[index] + "' style='border: 0; background: transparent'>" + data.monitores[index] + "</option>"
                document.getElementById("grupoMoniList").innerHTML += option;
            }
        }
    })
}

////////////////////////////////////////////////////////////////////
//****************************************************************//
////////////////////////////////////////////////////////////////////
function actualizarZonas() {
    $("#grupoZList > option").remove();
    $.ajax({
        url: '/obtenerZonas',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: {},
        success: function (data) {
            if (data.status == 1) {
                //console.log(data.zonas);
                for (let index = 0; index < data.zonas.length; index++) {
                    var option = "<option value='" + data.zonas[index] + "' style='border: 0; background: transparent'>" + data.zonas[index] + "</option>"
                    document.getElementById("grupoZList").innerHTML += option;
                }
            } else {
                errorInfo('Aun no hay zonas disponibles');
                document.getElementById("overlayCrearGrupo").style.display = "none";
            }
        }
    })
}


////////////////////////////////////////////////////////////////////
//****************************************************************//
////////////////////////////////////////////////////////////////////
function actualizarRamas(val) {
    $("#grupoRList > option").remove();
    $("#grupoMoniList > option").remove();
    $.ajax({
        url: '/obtenerRamas',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ zona: val.value }),
        success: function (data) {
            if (data.status == 1) {
                //console.log(data.branches);
                for (let index = 0; index < data.branches.length; index++) {
                    var option = "<option value='" + data.branches[index] + "' style='border: 0; background: transparent'>" + data.branches[index] + "</option>"
                    document.getElementById("grupoRList").innerHTML += option;
                }
            } else {
                errorInfo('No hay ramas en esta zona');
            }
        }
    })
}

////////////////////////////////////////////////////////////////////
//****************************************************************//
////////////////////////////////////////////////////////////////////
function limpiarCoordinacion() {
    document.getElementById("jefeZonaZName").value = "";

    document.getElementById("jefeRamaZName").value = "";
    document.getElementById("jefeRamaRId").value = "";


    document.getElementById("jefeGrupoGName").value = "";
    document.getElementById("jefeGrupoRId").value = "";
    document.getElementById("jefeGrupoGId").value = "";


    $("#jefe1ZonaList > option").remove();
    $("#jefe2ZonaList > option").remove();
    $("#jefe1RamaList > option").remove();
    $("#jefe2RamaList > option").remove();
    $("#jefe1GrupoList > option").remove();
    $("#jefe2GrupoList > option").remove();

}


//****************************************************************//

////////////////////////////////////////////////////////////////////
//         FUNCIONES QUE ANTEs ESTABAN EN EL HTML                // 
////////////////////////////////////////////////////////////////////

//****************************************************************//


////////////////////////////////////////////////////////////////////
//                FUNCIONES DE LOS BOTONES DEL LADO IZQ          //
//////////////////////////////////////////////////////////////////// 
function BCreateEstructura() {
    formularioOff();
    document.getElementById("overlayAporteCCG").style.display = "none";
    document.getElementById("overlayMGrups").style.display = "none";
    document.getElementById("overlayINBOX").style.display = "none";
    document.getElementById("overlayParticipacion").style.display = "none ";
    document.getElementById("overlayNN").style.display = "none";
    document.getElementById("overlayZonasRamas").style.display = "none";
    document.getElementById("overlayConsultarNodo").style.display = "none";





    document.getElementById("overlayAgregarMiembro").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "none ";
    document.getElementById("overlayCrearESt").style.display = "block ";
    document.getElementById("overlayBandejaAporte").style.display = "none";
    powerfulErase();

}

function BCreterup() {
    formularioOff();
    showDataCreaGrupo();



    document.getElementById("overlayAporteCCG").style.display = "none";
    document.getElementById("overlayMGrups").style.display = "none";
    document.getElementById("overlayINBOX").style.display = "none";
    document.getElementById("overlayParticipacion").style.display = "none ";
    document.getElementById("overlayNN").style.display = "none";
    document.getElementById("overlayZonasRamas").style.display = "none";
    document.getElementById("overlayConsultarNodo").style.display = "none";

    document.getElementById("overlayAgregarMiembro").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "none ";
    document.getElementById("overlayCrearESt").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "block ";
    document.getElementById("overlayBandejaAporte").style.display = "none";

    powerfulErase();

    //actualizarMonitoresDisponibles();

}

function BAsignarMonior() {
    formularioOff();
    showDataAsigMonitor();


    document.getElementById("overlayAporteCCG").style.display = "none";
    document.getElementById("overlayMGrups").style.display = "none";
    document.getElementById("overlayINBOX").style.display = "none";
    document.getElementById("overlayParticipacion").style.display = "none ";
    document.getElementById("overlayNN").style.display = "none";
    document.getElementById("overlayZonasRamas").style.display = "none";
    document.getElementById("overlayConsultarNodo").style.display = "none";

    document.getElementById("overlayAgregarMiembro").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "none ";
    document.getElementById("overlayCrearESt").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "block ";
    document.getElementById("overlayBandejaAporte").style.display = "none";

}

function BConformarCoordinacion() {
    formularioOff();
    BFormularioGrupo();


    document.getElementById("overlayAporteCCG").style.display = "none";
    document.getElementById("overlayMGrups").style.display = "none";
    document.getElementById("overlayINBOX").style.display = "none";
    document.getElementById("overlayParticipacion").style.display = "none ";
    document.getElementById("overlayNN").style.display = "none";
    document.getElementById("overlayZonasRamas").style.display = "none";
    document.getElementById("overlayConsultarNodo").style.display = "none";

    document.getElementById("overlayAgregarMiembro").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "none ";
    document.getElementById("overlayCrearESt").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "block ";
    document.getElementById("overlayBandejaAporte").style.display = "none";
    showDataCCF1();
    powerfulErase();
}

function BAdmMiembro() {
    formularioOff();
    BFormularioADm1();


    document.getElementById("overlayAporteCCG").style.display = "none";
    document.getElementById("overlayMGrups").style.display = "none";
    document.getElementById("overlayINBOX").style.display = "none";
    document.getElementById("overlayParticipacion").style.display = "none ";
    document.getElementById("overlayNN").style.display = "none";
    document.getElementById("overlayZonasRamas").style.display = "none";
    document.getElementById("overlayConsultarNodo").style.display = "none";

    document.getElementById("overlayAgregarMiembro").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "none ";
    document.getElementById("overlayCrearESt").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "block ";
    document.getElementById("overlayBandejaAporte").style.display = "none";
    powerfulErase();
}

function BConsultas() {
    formularioOff();
    BFormularioConsultaUNo();


    document.getElementById("overlayAporteCCG").style.display = "none";
    document.getElementById("overlayMGrups").style.display = "none";
    document.getElementById("overlayINBOX").style.display = "none";
    document.getElementById("overlayParticipacion").style.display = "none ";
    document.getElementById("overlayNN").style.display = "none";
    document.getElementById("overlayZonasRamas").style.display = "none";
    document.getElementById("overlayConsultarNodo").style.display = "none";


    document.getElementById("overlayAgregarMiembro").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "none";
    document.getElementById("overlayCrearESt").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "block";
    document.getElementById("overlayBandejaAporte").style.display = "none";
    powerfulErase();
}

function BAporte() {

    var page = document.getElementById("scrollAreaAporte");
    while (page.childNodes.length > 0) {
        page.removeChild(page.childNodes[0]);
    }
    verAportesRecibidos();

    formularioOff();

    document.getElementById("overlayAporteCCG").style.display = "none";
    document.getElementById("overlayMGrups").style.display = "none";
    document.getElementById("overlayINBOX").style.display = "none";
    document.getElementById("overlayParticipacion").style.display = "none ";
    document.getElementById("overlayNN").style.display = "none";
    document.getElementById("overlayZonasRamas").style.display = "none";
    document.getElementById("overlayConsultarNodo").style.display = "none";

    document.getElementById("overlayAgregarMiembro").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "none";
    document.getElementById("overlayCrearESt").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "none";
    document.getElementById("overlayBandejaAporte").style.display = "block";
    powerfulErase();
}

function BFormularioAA() {
    document.getElementById("FormularioConsultasVariasDos").style.display = "none ";
    document.getElementById("FormularioConsultasVariasUno").style.display = "none";
    document.getElementById("FormularioConsultasVariasTres").style.display = "none ";
    document.getElementById("FormularioRA").style.display = "block";
    powerfulErase();
    $("#consulMembersList > option").remove();
}




function BMovimiento() {
    formularioOff();

    document.getElementById("overlayAporteCCG").style.display = "none";
    document.getElementById("overlayMGrups").style.display = "none";
    document.getElementById("overlayINBOX").style.display = "none";
    document.getElementById("overlayParticipacion").style.display = "none ";
    document.getElementById("overlayNN").style.display = "none";
    document.getElementById("overlayZonasRamas").style.display = "none";
    document.getElementById("overlayConsultarNodo").style.display = "none";

    document.getElementById("overlayAgregarMiembro").style.display = "none";
    document.getElementById("overlayCrearESt").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "block";
    document.getElementById("overlayBandejaAporte").style.display = "none";
    //Limpiar casillas
    powerfulErase();
    loadMovements();
    //document.getElementById("movimientoCedula").value = "";
    //document.getElementById("movimientoNombre").value = "";
    //document.getElementById("movimientoWeb").value = "";
    //document.getElementById("movimientoPais").value = "";
    //document.getElementById("movimientoTelefono").value = "";
}

function BAgregar() {
    formularioOff();
    // muestra datos para agregar al miembro
    showDataMember();


    document.getElementById("overlayAporteCCG").style.display = "none";
    document.getElementById("overlayMGrups").style.display = "none";
    document.getElementById("overlayINBOX").style.display = "none";
    document.getElementById("overlayParticipacion").style.display = "none ";
    document.getElementById("overlayNN").style.display = "none";
    document.getElementById("overlayZonasRamas").style.display = "none";
    document.getElementById("overlayConsultarNodo").style.display = "none";
    
    document.getElementById("overlayCrearESt").style.display = "none ";
    document.getElementById("overlayCrearGrupo").style.display = "none ";
    document.getElementById("overlayAsignarMonitor").style.display = "none ";
    document.getElementById("overlayConformarCoordinacion").style.display = "none ";
    document.getElementById("overlayAdmMiembros").style.display = "none";
    document.getElementById("overlayConsultasVarias").style.display = "none";
    document.getElementById("overlayMovimiento").style.display = "none";
    document.getElementById("overlayAgregarMiembro").style.display = "block";
    powerfulErase();
}

////////////////////////////////////////////////////////////////////
//          FUNCIONES DE LOS FORMULARIOS PARA COORDINACION        //
//////////////////////////////////////////////////////////////////// 
function BFormularioJefeZone() {
    document.getElementById("FormularioRama").style.display = "none ";
    document.getElementById("FormularioGrupo").style.display = "none ";
    document.getElementById("FormularioJefeZone").style.display = "block ";
    showDataCCF1();//////////////////////////////////////////////////////////////////// 
    powerfulErase();
}

function BFormularioRama() {
    document.getElementById("FormularioJefeZone").style.display = "none ";
    document.getElementById("FormularioGrupo").style.display = "none ";
    document.getElementById("FormularioRama").style.display = "block ";
    showDataCCF2();
    powerfulErase();
}

function BFormularioGrupo() {
    showDataF3();
    document.getElementById("FormularioJefeZone").style.display = "none ";
    document.getElementById("FormularioRama").style.display = "none ";
    document.getElementById("FormularioGrupo").style.display = "block ";
    powerfulErase();
}



////////////////////////////////////////////////////////////////////
//          FUNCIONES DE LOS FORMULARIOS PARA ADM MIEMBRO         //
////////////////////////////////////////////////////////////////////
function BFormularioADm1() {
    document.getElementById("FormularioInfoGeneral").style.display = "none ";
    document.getElementById("FormularioInfo").style.display = "none ";
    document.getElementById("FormularioGeneral2").style.display = "none ";
    document.getElementById("FormularioGeneral1").style.display = "block ";
    powerfulErase();

}

function BFormularioADm2() {
    document.getElementById("FormularioInfoGeneral").style.display = "none ";
    document.getElementById("FormularioInfo").style.display = "none ";
    document.getElementById("FormularioGeneral1").style.display = "none ";
    document.getElementById("FormularioGeneral2").style.display = "block ";
    powerfulErase();
}

function BFormularioInfo() {
    document.getElementById("FormularioInfoGeneral").style.display = "none ";
    document.getElementById("FormularioGeneral1").style.display = "none ";
    document.getElementById("FormularioGeneral2").style.display = "none ";
    document.getElementById("FormularioInfo").style.display = "block ";
    showUser();
}

function BFormularioInfG() {
    document.getElementById("FormularioInfo").style.display = "none ";
    document.getElementById("FormularioGeneral1").style.display = "none ";
    document.getElementById("FormularioGeneral2").style.display = "none ";
    document.getElementById("FormularioInfoGeneral").style.display = "block ";
    showDataMove();

}

////////////////////////////////////////////////////////////////////
//       FUNCIONES DE LOS FORMULARIOS PARA CONSULTAS VARIAS       //
////////////////////////////////////////////////////////////////////
function BFormularioConsultaUNo() {
    showAlBl();
    document.getElementById("FormularioConsultasVariasDos").style.display = "none ";
    document.getElementById("FormularioConsultasVariasTres").style.display = "none ";
    document.getElementById("FormularioConsultasVariasUno").style.display = "block ";
    powerfulErase();
}

function BFormularioConsultaDos() {
    showMemberConsult();
    document.getElementById("FormularioConsultasVariasTres").style.display = "none ";
    document.getElementById("FormularioConsultasVariasUno").style.display = "none ";
    document.getElementById("FormularioConsultasVariasDos").style.display = "block ";
    powerfulErase();
}

function BFormularioConsultaTres() {
    ////////////////////


    megaShow();
    document.getElementById("FormularioConsultasVariasDos").style.display = "none ";
    document.getElementById("FormularioConsultasVariasUno").style.display = "none";
    document.getElementById("FormularioConsultasVariasTres").style.display = "block ";
    powerfulErase();
    $("#consulMembersList > option").remove();
}

////////////////////////////////////////////////////////////////////
//                             ERRORES                            //
////////////////////////////////////////////////////////////////////

function errorInfo(pData) {
    document.getElementById("msgError").innerHTML = pData;
    document.getElementById("error").style.display = "block";
    document.getElementById("errorBG").style.display = "block";
}



////////////////////////////////////////////////////////////////////
//                           MENSAJES                              //
////////////////////////////////////////////////////////////////////
function msgInfo(pData) {
    document.getElementById("msgText").innerHTML = pData;
    document.getElementById("msg").style.display = "block";
    document.getElementById("msgBG").style.display = "block";
}

////////////////////////////////////////////////////////////////////
//                           CORRREO                              //
////////////////////////////////////////////////////////////////////
function msgInfoCorreo(pData) {
    document.getElementById("msgText").innerHTML = pData;
    document.getElementById("msg").style.display = "block";
    document.getElementById("msgBG").style.display = "block";
}








function showEst() {
    $.ajax({
        url: '/getshowEst',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({}),
        success: function (data) {
            if (data.status == 1) {
                var colorAux;
                document.getElementById("msgData").innerHTML = "";
                for (let index = 0; index < data.dataE.length; index++) {
                    console.log("--------------->", data.dataE.length);
                    var str = data.dataE[index];
                    if (str == "ZONA:") {
                        colorAux = "orange";
                        document.getElementById("msgData").innerHTML = document.getElementById("msgData").innerHTML + str.fontcolor(colorAux);
                    }
                    else if (str == "RAMA:") {
                        colorAux = "purple";
                        document.getElementById("msgData").innerHTML = document.getElementById("msgData").innerHTML + str.fontcolor(colorAux);
                    }
                    else if (str == "GRUPO:") {
                        colorAux = "green";
                        document.getElementById("msgData").innerHTML = document.getElementById("msgData").innerHTML + str.fontcolor(colorAux);
                    }
                    else if (str == "MIEMBRO:") {
                        colorAux = "blue";
                        document.getElementById("msgData").innerHTML = document.getElementById("msgData").innerHTML + str.fontcolor(colorAux);
                    } else {
                        document.getElementById("msgData").innerHTML = document.getElementById("msgData").innerHTML + str.fontcolor(colorAux);
                    }
                    document.getElementById("showEst").style.display = "block";
                    document.getElementById("showEstBG").style.display = "block";
                }
            }
            else {
                errorInfo('Aun no hay zonas disponibles')
            }
        }
    })

}


function off() {
    document.getElementById("error").style.display = "none";
    document.getElementById("errorBG").style.display = "none";
    document.getElementById("msg").style.display = "none";
    document.getElementById("msgBG").style.display = "none";
    document.getElementById("showEst").style.display = "none";
    document.getElementById("showEstBG").style.display = "none";
    document.getElementById("msgGEN").style.display = "none";
    document.getElementById("msgGENE").style.display = "none";
}


////////////////////////////////////////////////////////////////////
//                             NOMBRE                             //
////////////////////////////////////////////////////////////////////


function megaShow() {

    var id = document.getElementById("consulnivelList").value;

    var mySelect = document.getElementById('consulNivelMiembroId');
    mySelect.options.length = 0;

    if (id == "zona") {
        $.ajax({
            url: '/getMegaShowZones',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ id: id }),
            success: function (data) {
                if (data.status == 1) {
                    ///////////////////////////////////////
                    //        ACTUALIZA LOS GRUPOS        // 
                    ///////////////////////////////////////
                    for (let index = 0; index < data.grupos.length; index++) {
                        var option = "<option value='" + data.grupos[index] + "' style='border: 0; background: transparent'>" + data.grupos[index] + "</option>"
                        document.getElementById("consulNivelMiembroId").innerHTML += option;
                    }
                }
                else {
                    msgInfo("No esisten miembros para este puesto")
                    // error("No hay sufucientes datos /n para esta operacion");
                }

            }
        })
    }

    else if (id == "rama") {
        $.ajax({
            url: '/getMegaShowRamas',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({}),
            success: function (data) {
                if (data.status == 1) {
                    ///////////////////////////////////////
                    //        ACTUALIZA LOS GRUPOS        // 
                    ///////////////////////////////////////
                    for (let index = 0; index < data.grupos.length; index++) {
                        var option = "<option value='" + data.grupos[index] + "' style='border: 0; background: transparent'>" + data.grupos[index] + "</option>"
                        document.getElementById("consulNivelMiembroId").innerHTML += option;
                    }
                }
                else {
                    msgInfo("No esisten miembros para este puesto")
                    // errorInfo("No hay sufucientes datos /n para esta operacion");
                }
            }
        })
    }

    else {
        $.ajax({
            url: '/getMegaShowGrupos',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({}),
            success: function (data) {
                if (data.status == 1) {
                    ///////////////////////////////////////
                    //        ACTUALIZA LOS GRUPOS        // 
                    ///////////////////////////////////////
                    for (let index = 0; index < data.grupos.length; index++) {
                        var option = "<option value='" + data.grupos[index] + "' style='border: 0; background: transparent'>" + data.grupos[index] + "</option>"
                        document.getElementById("consulNivelMiembroId").innerHTML += option;
                    }
                }
                else {
                    msgInfo("No esisten miembros para este puesto")
                    // errorInfo("No hay sufucientes datos /n para esta operacion");
                }
            }
        })
    }

}


////////////////////////////////////////////////////////////////////
//                        ENVIAR APORTE                           // 
////////////////////////////////////////////////////////////////////

function enviarNuevoAporte() {
    var emissor = document.getElementById("emisorAporte").value;
    var tipo = document.getElementById("tipoAporte").value;
    var descripcion = document.getElementById("descripcionAporte").value;

    if (emissor != "" & tipo != "" & descripcion != "") {
        $.ajax({
            url: '/enviarAporte',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ emissor: emissor, tipo: tipo, descripcion: descripcion }),
            success: function (data) {
                if (data.status == 1) {
                    msgInfo("Aporte enviado exitosamente!");
                    document.getElementById("updateUserId").value = "";
                    document.getElementById("updateUserName").value = "";
                    document.getElementById("updateUserCelular").value = "";
                } else {
                    errorInfo("Aporte no enviado");
                }
            }
        })
    } else {
        errorInfo("Ingrese al menos un campo");
    }
}


////////////////////////////////////////////////////////////////////
//                        VISUALIZAR APORTES RECIBIDOS            // 
////////////////////////////////////////////////////////////////////

function getStringType(cont) {
    if (cont == 0) {
        return "Petitoria";
    } else if (cont == 1) {
        return "Agradecimiento";
    } else {
        return "Ofrecimiento";
    }
}

function verAportesRecibidos() {

    $.ajax({
        url: '/consultarAportes',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({}),
        success: function (data) {
            if (data.status == 1) {
                console.log("IMPRIMIENTO CONTRIBUCIONES");
                console.log(data.listContributions);
                data.listContributions.forEach(aporte => {

                    myFunctionBEntrada(aporte.emissor, aporte.description, getStringType(aporte.type), aporte.date.slice(0, 10)); //:D

                });

            } else {
                //errorInfo("Aporte no enviado");
            }
        }
    })
}



function generarReporte() {
    console.log("------------------------------------");
    var month = document.getElementById("formularioMes").value;
    var reportType = document.getElementById("formularioReporte").value;
    console.log("------------------------------------");
    console.log(month);
    console.log(reportType);
    console.log("------------------------------------");

    $.ajax({
        url: '/generarReporte',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        // var x = document.getElementById("mySelect").value;
        data: JSON.stringify({ month: month, reportType: reportType }),
        success: function (data) {
            if (data.status == 1) {
                document.getElementById("reporte").value = data.message;
                msgInfo("Reporte generado exitosamente!");

            } else {
                errorInfo("Reporte no generado");
            }
        }
    })
}


// Envio de noticias
function BenviarNoticia() {
    enviarNoticia();
}

function enviarNoticia() {
    var cuerpoNoticia = document.getElementById("cuerpoNoticia").value;
    var asuntoNoticia = document.getElementById("asuntoNoticia").value;
    var rutaNoticia = document.getElementById("rutaNoticia").value;
    var nivelNoticia = document.getElementById("nivelNoticia").value;

    if (cuerpoNoticia != "" && asuntoNoticia != "" && rutaNoticia != "" && nivelNoticia != "") {
        $.ajax({
            url: '/nuevaNoticia',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ cuerpoNoticia: cuerpoNoticia, asuntoNoticia: asuntoNoticia, rutaNoticia: rutaNoticia, nivelNoticia: nivelNoticia }),
            success: function (data) {
                if (data.status == 1) {
                    msgInfo("Noticia enviada exitosamente!");
                } else {
                    errorInfo("Noticia no enviada");
                }
            }
        })
    } else {
        errorInfo("Debe llenar todos los campos");
    }

}

function verNoticias() {
    $.ajax({
        url: '/getNoticias',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify(),
        success: function (data) {
            if (data.status == 1) {
                for (let index = 0; index < data.noticias.length; index++) {

                    myFunctionInbox(data.noticias[index].nombre, data.noticias[index].mensaje, 
                        data.noticias[index].nombreEmisor, data.noticias[index].currentDate, 
                        data.noticias[index].estado,data.idMember);
                }
            } else {
                errorInfo("Aun no tiene noticias");
            }
        }
    })
}

// ! ==============================================================================//
//////////         FUNCIONALIDADES DE LOS JEFES                       ///////////////
// ! ==============================================================================///

function consultarMisGrupos() {
    $.ajax({
        url: '/consultarGrupos',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify(),
        success: function (data) {
            if (data.status == 1) {
                console.log("Grupos", data.nombresGrupos);
                console.log("Miembros", data.miembros);
                for (let index = 0; index < data.nombresGrupos.length; index++) {
                    myFunctionMisGrupos(data.nombresGrupos[index], data.miembros[index]);
                }
            } else {
                errorInfo("Aun no esta en ningun grupo");
            }
        }
    })
}


function consultarMisGruposLiderazgo() {
    $.ajax({
        url: '/consultarGruposLiderazgo',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify(),
        success: function (data) {
            if (data.status == 1) {
                for (let index = 0; index < data.nombresGrupos.length; index++) {
                    myFunctionMisGrupos(data.nombresGrupos[index], data.miembros[index]);
                }
            } else {
                errorInfo("Usted no es monitor ni jefe de ningún grupo. ");
            }
        }
    })
}


function consultarResumenConsolidado() {
    $.ajax({
        url: '/resumenConsolidado',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify(),
        success: function (data) {
            if (data.status == 1) {
                for (let index = 0; index < data.resumenConsolidado.length; index++) {
                    var textoBoton;
                    var textoFormateado;
                    if (data.resumenConsolidado[index].nivel == "Zona") {
                        textoBoton = data.resumenConsolidado[index].nivel + "-" + data.resumenConsolidado[index].nombre;
                        textoFormateado = "Nivel: " + data.resumenConsolidado[index].nivel + '</br>'+"Nombre:" + data.resumenConsolidado[index].nombre + '</br>'+ "--------------------------------------------------"+ "</br>"
                    } else {
                        textoBoton = data.resumenConsolidado[index].nivel + "-" + data.resumenConsolidado[index].nombre + "-" + data.resumenConsolidado[index].id
                        textoFormateado = "Nivel: " + data.resumenConsolidado[index].nivel + '</br>'+"Nombre: " + data.resumenConsolidado[index].nombre + '</br>'+"Id: " + data.resumenConsolidado[index].id + "</br>"+"--------------------------------------------------"+ "</br>"

                    }
                    myFunctionParticipacion(textoBoton,textoFormateado)
                }
            }else{
                errorInfo("Usted no es monitor ni jefe de ningún grupo. ");
            }
        }
    })
}

function consultarRamasZonas() {
    $.ajax({
        url: '/consultarRamasZonas',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify(),
        success: function (data) {
            if (data.status == 1) {
                for (let index = 0; index < data.nombresNivel.length; index++) {
                    myFunctionRamaZona(data.nombresNivel[index], data.miembros[index])
                }
            } else {
                errorInfo("Usted no es jefe de ninguna rama o zona.");
            }
        }
    })
}

function consultarNodo() {
    var ruta = document.getElementById("rutaNodo").value;
    
    $.ajax({
        url: '/consultarNodo',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ruta:ruta}),
        success: function (data) {
            if (data.status == 1) {
                var info="";
                for (let index = 0; index < data.members.length; index++) {
                    info+=" Nombre: " + data.members[index]._name + "\n" +" Direccion: " + data.members[index].direction +"\n" +" Email: " + data.members[index]._email + "\n" +" Telefono: " + data.members[index]._telephone + "\n" + " ---------------------------------------------------------------------"+ '\n';
                }
                document.getElementById("infoNodo").value=info;
            } else {
                errorInfo("Usted no es jefe de ninguna rama o zona.");
            }
        }
    })
}



/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
/////////////       GET LOGIN NAME              /////////////////
/////////////////////////////////////////////////////////////////
function getName(pId) {
    //document.getElementById("nombreM").innerHTML = "pepito";
    $.ajax({
        url: '/getName',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({pId:pId}),
        success: function (data) {
            console.log("---->" +  data.members);
            document.getElementById("nombreM").innerHTML = data.members;
        }
    })
}



function logIn(){
    var userName = document.getElementById("userName").value
    var password = document.getElementById("password").value
    var myname = "";
    ///////////
    $.ajax({
        url: '/login',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({ userName:userName, password:password }),
        success: function (data) {
            console.log(data);
            if(data.status==0){
                errorInfo("No existe una cuenta con esos credenciales")
                window.location.href=data.route
                document.getElementById("nombreM").innerHTML = "xxx";
            }else if(data.status==1){
                window.location.href=data.route;
                getName(Number(userName));
            }else if(data.status==2){
                errorInfo("Rol no encontrado")
            }
        }
    })
}

function limpiarRepositorio(){
    document.getElementById('reporte').value = " ";
    document.getElementById('reporte').innerHTML = " ";
    $.ajax({
        url: '/limpiarRepositorio',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        data: JSON.stringify({}),
        success: function (data) {
            console.log(data);
            if(data.status==0){
                errorInfo("Error al descargar bandeja de aportes");
               
            }else if(data.status==1){
                msgInfo("Bandeja de Aportes Descargada con éxito")
            }
        }
    })
}