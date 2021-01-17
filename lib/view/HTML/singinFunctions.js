function logIn(){
    var userName = document.getElementById("userName").value
    var password = document.getElementById("password").value

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
                
            }else if(data.status==1){
                window.location.href=data.route
            }else if(data.status==2){

            }
            //alert("hola");
            //window.location.href=data.route;
        }
    })
}