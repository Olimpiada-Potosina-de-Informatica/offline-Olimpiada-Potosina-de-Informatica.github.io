$(document).ready(function() {
var intents = 4;
    $("#RecoPas").click(function(){
        $("#RecoPas").hide();
       $("#xpassword").hide();
        var auth = firebase.auth();
        var emailAddress = $("#xemail").val();
        auth.sendPasswordResetEmail(emailAddress).then(function() {
            Materialize.toast("¡Perfecto!, Revisa Tu Correo",3000);
            setTimeout(function () {
                window.location.href = "https://olimpiada-potosina-de-informatica.github.io";
            }, 3000);
        }, function(error) {
            $("#RecoPas").show();
            Materialize.toast("Datos Incorrectos",3000);
        });
    });
    $("#RecoPas").hide();
    $( "#login" ).validate({
        rules: {
            xemail: {
                required: true,
                email: true,
                minlength:5,
                maxlength: 40
            },
            xpassword: {
                required: true,
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
            if(intents==0){
                $("#RecoPas").show();
            }
            else{
                intents-=1;
                $("#RecoPas").hide();
            }
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
            $("#btnsenderl").hide();
            firebase.auth().signInWithEmailAndPassword($("#xemail").val(),$("#xpassword").val()).then(function(user){
                window.location.href = "https://olimpiada-potosina-de-informatica.github.io";
            }).catch(function(error) {
                $("#btnsenderl").show();
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