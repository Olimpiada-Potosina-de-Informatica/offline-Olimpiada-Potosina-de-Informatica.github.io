$(document).ready(function() {
    $( "#registro" ).validate({
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
            xemail: {
                required: true,
                email: true,
                minlength:5,
                maxlength: 25
            },
            xpassword: {
                required: true,
                minlength: 5,
                maxlength: 15
            },
            xxpassword: {
                required: true,
                minlength: 5,
                equalTo: "#xpassword",
                maxlength: 15
            }
        },
        messages: {
            xfirst_name:{
                required: "Campo Requerido",
                minlength: "Mínimo 3 Caracteres",
                maxlength: "Máximo Superado"
            },
            xlast_name:{
                required: "Campo Requerido",
                minlength: "Mínimo 5 Caracteres",
                maxlength: "Máximo Superado"
            },
            xemail: {
                required: "Campo Requerido",
                email: "Correo no Valido",
                minlength: "Mínimo 5 Caracteres",
                maxlength: "Máximo Superado"
            },
            xpassword:{
                required: "Campo Requerido",
                minlength: "Mínimo 5 Caracteres",
                maxlength: "Máximo Superado"
            },
            xxpassword:{
                required: "Campo Requerido",
                equalTo: "La Contraseña no coincide",
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
        success: "valid",
        invalidHandler: function(event, validator){
            var errors = validator.numberOfInvalids();
            if (errors) {
                $("#ErrorMSG").hide();
                $("#ErrorMSG").html("Hay Errores");
                $("#ErrorMSG").addClass("card-panel red lighten-2 z-depth-1 white-text");
                $("#ErrorMSG").show();
            }
        },
        submitHandler: function(form){
            $("#ErrorMSG").hide();
            firebase.auth().createUserWithEmailAndPassword($("#xemail").val(),$("#xpassword").val()).then(function(user){
                $("#btnsender").hide();
                $("#SuccesMSG").hide();
                $("#SuccesMSG").html("En unos momentos te redireccionamos al inicio, revisa tu correo y da clic en la liga para verificar tu correo e iniciar sesión");
                $("#SuccesMSG").addClass("card-panel green lighten-2 z-depth-1 white-text");
                $("#SuccesMSG").show();
                Materialize.toast("¡Perfecto!, Revisa Tu Correo",4000);
                user.sendEmailVerification();
                user.updateProfile({
                    displayName: $("#xfirst_name").val()+" "+$("#xlast_name").val()
                }).then(function() {}, function(error) {});
                setTimeout(function () {
                    window.location.href = "https://olimpiada-potosina-de-informatica.github.io";
                }, 8000);
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                switch(errorCode){
                    case 'auth/email-already-in-use':
                        Materialize.toast("e-mail En Uso",3000);
                        break;
                    case 'auth/invalid-email':
                        Materialize.toast("e-mail Invalido",3000);
                        break;
                    case 'auth/operation-not-allowed':
                        Materialize.toast("Operación Invalida",3000);
                        break;
                    case 'auth/weak-password':
                        Materialize.toast("La Contraseña Débil",3000);
                        break;
                }
            });
        }
    });
});