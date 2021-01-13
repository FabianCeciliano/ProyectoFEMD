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
            //alert("hola");
            //window.location.href=data.route;
        }
    })
}