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
            firebase.database().ref('/users/' + s_user).once('value').then(function(snapshot){
                $("#xfirst_name").val(snapshot.val().f_name);
                $("#xlast_name").val(snapshot.val().l_name);
                $("#xemail").val(snapshot.val().email);
                $("#xemail").attr("disabled", true);
                $("#p_user_name").html(snapshot.val().f_name+ " " + snapshot.val().l_name);
                $("#p_correo").html(snapshot.val().email);
                if(snapshot.hasChild("user_t")){
                    $("#p_usert").html(snapshot.val().user_t);
                }//tipo de usuario
                if(snapshot.hasChild("u_school")){
                    $("#p_school").html(snapshot.val().u_school);
                    var queryc = firebase.database().ref("/form/school/").orderByKey();
                    queryc.once("value").then(function(snapshot) {
                        if(snapshot.hasChild($("#p_school").text())){
                            $("#p_clave").html(snapshot.child($("#p_school").text()).val());
                        }
                    });
                }//escuela
                if(snapshot.hasChild("u_mat")){
                    $("#p_matr").html(snapshot.val().u_mat);
                }//matricula
                if(snapshot.hasChild("u_grade")){
                    $("#p_grade").html(snapshot.val().u_grade + " " + snapshot.val().u_grade_sem_year);
                }//number sem o año y numero de sem
                if(snapshot.hasChild("u_grade_t")){
                    $("#p_grade_t").html(snapshot.val().u_grade_t);
                }//prim sec
                if(snapshot.hasChild("u_lic")){
                    $("#p_lic").html(snapshot.val().u_lic);
                }//licenciatura
                if(snapshot.hasChild("u_tel")){
                    $("#p_tel").html(snapshot.val().u_tel);
                }
                if(snapshot.hasChild("u_nat")){
                    $("#p_nat").html(snapshot.val().u_nat);
                }
                Materialize.updateTextFields();
            });            
            var query = firebase.database().ref("/form/event/").orderByKey();
            query.once("value").then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key;
                    var childData = childSnapshot.val();
                    if(childData)$("#x_solicitud").append($('<option>', { value: key, text: key}));
                    $("#x_solicitud").material_select();
                });
            });
            $("#x_tipousuario").material_select();
            var query2 = firebase.database().ref("/form/school/").orderByKey();
            query2.once("value").then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key;
                    var childData = childSnapshot.val();
                    if(childData)$("#x_escuela").append($('<option>', { value: key, text: key}));
                    $("#x_escuela").material_select();
                });
            });
            var query3 = firebase.database().ref("/form/licens/").orderByKey();
            query3.once("value").then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key;
                    var childData = childSnapshot.val();
                    if(childData)$("#x_lic").append($('<option>', { value: key, text: key}));
                    $("#x_lic").material_select();
                });
            });
        }
    });
    $("#x_escuela").change(function(){
        var query = firebase.database().ref("/form/school/");
        query.once("value").then(function(snapshot) {
            if(snapshot.hasChild($("#x_escuela").val())){
                $("#x_clave").val(snapshot.child($("#x_escuela").val()).val());
            }else{
                $("#x_clave").val('');
            }
            Materialize.updateTextFields();
        });
    });    
    function updateperfil(updates) {
        firebase.database().ref().update(updates).then(function(){
            Materialize.toast("Listo!",5000);
            setTimeout(function () {
                //window.location.href = "https://olimpiada-potosina-de-informatica.github.io/Profile";
            }, 3000);              
        }, function(error){
            Materialize.toast("Error!",1700);
            $("#btnsender").show();
            $("#x_btnsender").show();
        });
    }
    $("#x_solicitud").css({
        display: 'inline',
        position: 'absolute',
        float: 'left',
        padding: 0,
        margin: 0,
        border: '1px solid rgba(255,255,255,0)',
        height: 0, 
        width: 0,
        top: '-2em',
        left: '3em',
        color: "#26a69a"
    });
    $("#x_lic").css({
        display: 'inline',
        position: 'absolute',
        float: 'left',
        padding: 0,
        margin: 0,
        border: '1px solid rgba(255,255,255,0)',
        height: 0, 
        width: 0,
        top: '-2em',
        left: '3em',
        color: "#26a69a"
    });
    $("#x_tipousuario").css({
        display: 'inline',
        position: 'absolute',
        float: 'left',
        padding: 0,
        margin: 0,
        border: '1px solid rgba(255,255,255,0)',
        height: 0, 
        width: 0,
        top: '-2em',
        left: '3em',
        color: "#26a69a"
    });
    $("#x_escuela").css({
        display: 'inline',
        position: 'absolute',
        float: 'left',
        padding: 0,
        margin: 0,
        border: '1px solid rgba(255,255,255,0)',
        height: 0, 
        width: 0,
        top: '-2em',
        left: '3em',
        color: "#26a69a"
    });
    $('input[name=group2]:radio').change(function(){
        var value = $( 'input[name=group2]:checked' ).val();
        if(value=="Licenciatura"){
            $("#x_lic").material_select('destroy');
            $("#x_lic").prop('disabled', false);
            $("#x_lic").material_select();
        }else{
            $("#x_lic").material_select('destroy');
            $("#x_lic").prop('disabled', true);
            $("#x_lic").material_select();
        }
    });
    $("#competidor").validate({
        debug: true,
        rules: {
            x_tipousuario: {
                required: true
            },
            x_escuela: {
                required: true
            },
            x_clave: {
                required: true,
                minlength: 10,
                maxlength: 10
            },
            x_matricula:{
                required : true,
                minlength: 5,
                maxlength: 16
            },
            x_lic:{
                required: true,
            },
            x_num_cur:{
                required: true,
                number:true,
                range: [1, 14]
            },
            x_tel:{
                required: true,
                number : true,
                minlength: 7,
                maxlength: 10
            },
            x_nat:{
                required:true,
                minlength:8
            }
        },
        messages: {
            x_tipousuario:{
                required:"Campo Requerido",
                valueNotEquals:"Selecciona una opción valida"
            },
            x_escuela:{
                required:"Campo Requerido",
                valueNotEquals:"Selecciona una opción valida"
            },
            x_clave:{
                required: "Campo Requerido",
                minlength: "Mínimo 10 Caracteres",
                maxlength: "Máximo Superado"
            },
            x_matricula:{
                required: "Campo Requerido",
                minlength: "Mínimo 6 Caracteres",
                maxlength: "Máximo Superado"
            },
            x_lic:{
                required:"Campo Requerido",
                valueNotEquals:"Selecciona una opción valida"
            },
            x_num_cur: {
                required: "Campo Requerido",
            },
            x_tel:{
                required: "Campo Requerido",
                number:"Solo números",
                minlength: "Número no valido",
                maxlength: "Número no valido"
            },
            x_nat:{
                required: "Campo Requerido"
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
            if (errors) {
                $("#Error_info").hide();
                $("#Error_info").html(errors+"Hay Errores");
                $("#Error_info").addClass("card-panel red lighten-2 z-depth-1 white-text");
                $("#Error_info").show();
            }
        },
        submitHandler: function(form){
            $("#Error_info").hide();
            $("#x_btnsender").hide();
            Materialize.toast("Actualizando...",1700);
            var userx = firebase.auth().currentUser;
            var s_user = userx.uid;
            var updates ={};
            updates['/users/' + s_user+'/u_grade_t'] = $( 'input[name=group2]:checked' ).val();
            updates['/users/' + s_user+'/user_t'] = $("#x_tipousuario").val();
            updates['/users/' + s_user+'/u_school'] = $("#x_escuela").val();
            updates['/users/' + s_user+'/u_mat'] = $("#x_matricula").val();
            updates['/users/' + s_user+'/u_lic'] = $("#x_lic").val();
            updates['/users/' + s_user+'/u_grade'] = $("#x_num_cur").val();
            updates['/users/' + s_user+'/u_grade_sem_year'] = $( 'input[name=group1]:checked' ).val();
            updates['/users/' + s_user+'/u_tel'] = $("#x_tel").val();
            updates['/users/' + s_user+'/u_nat'] = $("#x_nat").val();
            updateperfil(updates);
        }
    });
});