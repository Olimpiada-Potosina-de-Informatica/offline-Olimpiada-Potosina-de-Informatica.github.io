$(document).ready(function() {
    $( "#login" ).validate({
        rules: {
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
        success: "valid",
        invalidHandler: function(event, validator){
            var errors = validator.numberOfInvalids();
            if (errors) {
                $("#ErrorMSGL").hide();
                $("#ErrorMSGL").html("Hay Errores");
                $("#ErrorMSGL").addClass("card-panel red lighten-2 z-depth-1 white-text");
                $("#ErrorMSGL").show();
            }
        },
        submitHandler: function(form){
            $("#ErrorMSGL").hide();
            firebase.auth().signInWithEmailAndPassword($("#xemail").val(),$("#xpassword").val()).then(function(user){
                $("#btnsenderl").hide();
                window.location.href = "https://olimpiada-potosina-de-informatica.github.io";
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                switch(errorCode){
                    case 'auth/account-exists-with-different-credential':
                        Materialize.toast("e-mail asociado a otro método de inicio de sesión",3000);
                        break;
                    default:
                        Materialize.toast("Datos Incorrectos",3000);
                        break;
                }
            });
        }
    });
});