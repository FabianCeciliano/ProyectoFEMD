////////////////////////////////////////////////////////////////////
//                           MENSAJES                              //
////////////////////////////////////////////////////////////////////
function msgInfo(pData) {
    document.getElementById("msgText").innerHTML = pData;
    document.getElementById("msg").style.display = "block";
    document.getElementById("msgBG").style.display = "block";
}

////////////////////////////////////////////////////////////////////
//                             ERRORES                            //
////////////////////////////////////////////////////////////////////

function errorInfo(pData) {
    document.getElementById("msgError").innerHTML = pData;
    document.getElementById("error").style.display = "block";
    document.getElementById("errorBG").style.display = "block";
}


function registrarse(){
    var id = document.getElementById("nuevoUserId").value
    var password = document.getElementById("Password").value

    if(id != "" && password!=""){
        $.ajax({
            url: '/registrarse',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({ id:id, password:password }),
            success: function (data) {
                if(data.status==1){
                    msgInfo("Usuario creado exitosamente!");
                }else{
                    errorInfo("Error! Usuario no creado");
                }
            }
        })    
    }
}


function off() {
    document.getElementById("error").style.display = "none";
    document.getElementById("errorBG").style.display = "none";
    document.getElementById("msg").style.display = "none";
    document.getElementById("msgBG").style.display = "none";
}

