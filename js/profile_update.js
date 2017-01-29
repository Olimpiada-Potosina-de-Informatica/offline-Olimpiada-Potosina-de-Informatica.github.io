$(document).ready(function() {
    $( "#update" ).validate({
        rules: {
            xfirst_name: {
                required: true,
                minlength: 3,
                maxlength: 25
            },
            xlast_name: {
                required: true,
                minlength: 5,
                maxlength: 25
            },
            xpassword: {
                required: false,
                minlength: 6,
                maxlength: 15
            },
            xxpassword: {
                required: false,
                minlength: 6,
                maxlength: 15,
                equalTo: "#xpassword"
            },
            currentpassword:{
                required: false,
                minlength: 6,
                maxlength: 15
            }
        },
        messages: {
            xemail: {
                required: "Campo Requerido",
                email: "Correo no Valido",
                minlength: "Mínimo 5 Caracteres",
                maxlength: "Máximo Superado"
            },
            xpassword:{
                required: "Campo Requerido",
                minlength: "Mínimo 6 Caracteres",
                maxlength: "Máximo Superado"
            },
            xxpassword:{
                required: "Campo Requerido",
                minlength: "Mínimo 6 Caracteres",
                equalTo: "La Contraseña no coincide",
                maxlength: "Máximo Superado"
            },
            currentpassword:{
                required: "Campo Requerido",
                minlength: "Mínimo 6 Caracteres",
                maxlength: "Máximo Superado"
            },
            xfirst_name:{
                required: "Campo Requerido",
                minlength: "Mínimo 3 Caracteres",
                maxlength: "Máximo Superado"
            },
            xlast_name:{
                required: "Campo Requerido",
                minlength: "Mínimo 5 Caracteres",
                maxlength: "Máximo Superado"
            }
        },
        errorElement : 'div',
        errorPlacement: function(error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
        },
        invalidHandler: function(event, validator){
            var errors = validator.numberOfInvalids();
            if (errors && $("#perfil_options").hasClass("active")) {
                $("#ErrorMSGu").hide();
                $("#ErrorMSGu").html("Hay Errores");
                $("#ErrorMSGu").addClass("card-panel red lighten-2 z-depth-1 white-text");
                $("#ErrorMSGu").show();
            }
        },
        submitHandler: function(form){
            $("#ErrorMSGu").hide();
            $("#btnsender").hide();
            Materialize.toast("Actualizando...",1700);
            var userx = firebase.auth().currentUser;
            var s_user = userx.uid;
            var pslen = $("#xpassword").val();
            var updates ={};
            if(pslen){
                userx.updatePassword($("#xpassword").val()).then(function() {
                        updates['/users/' + s_user+'/f_name'] = $("#xfirst_name").val();
                        updates['/users/' + s_user+'/l_name'] = $("#xlast_name").val();
                        updateperfil(updates);
                    },function(error) {
                        Materialize.toast("Debes de haber iniciado sesión recientemente!",3000);
                    });
            }else{
                updates['/users/' + s_user+'/f_name'] = $("#xfirst_name").val();
                updates['/users/' + s_user+'/l_name'] = $("#xlast_name").val();
                updateperfil(updates);
            }
        }
    });
    firebase.auth().onAuthStateChanged(function(codeuser) {
        if (codeuser) {
            var s_user = codeuser.uid;
            var data=[];
            firebase.database().ref('/users/' + s_user).once('value').then(function(snapshot) {
                data[0] = snapshot.val().email;
                data[1] = snapshot.val().l_name;
                data[2] = snapshot.val().f_name;
                $("#xfirst_name").val(data[2]);
                $("#xlast_name").val(data[1]);
                $("#xemail").val(data[0]);
                $("#xemail").attr("disabled", true);
                Materialize.updateTextFields();
            });
        }
    });
    function updateperfil(updates) {
        firebase.database().ref().update(updates).then(function(){
            Materialize.toast("Listo!",5000);
            setTimeout(function () {
                window.location.href = "https://olimpiada-potosina-de-informatica.github.io/Profile";
            }, 3000);              
        }, function(error){
            Materialize.toast("Error!",1700);
            $("#btnsender").show();
        });
    }
});