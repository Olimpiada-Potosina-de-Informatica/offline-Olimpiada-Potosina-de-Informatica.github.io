$(document).ready( function () {
    firebase.auth().onAuthStateChanged( function(user){
        $("#d_Reg").hide();
        $("#m_Reg").hide();
        $("#d_Ses_auth_t").hide();
        $("#m_Ses_auth_t").hide();
        $("#d_Ses_out").hide();
        $("#m_Ses_out").hide();     
        $("#d_robotik").click(function(){
            document.location.href = "/Robotik";
        });
        $("#m_robotik").click(function(){
            document.location.href = "/Robotik";
        });
        if (user) {
            $("#d_Ses_auth_t").show();
        $("#m_Ses_auth_t").show();
        $("#d_Ses_out").show();
        $("#m_Ses_out").show();
            var pathname = window.location.pathname;
            if (user.emailVerified) {
                if(pathname=="/Registro" || pathname=="/Login"){
                    window.location.href = "https://olimpiada-potosina-de-informatica.github.io";
                }
                var s_user = user.uid;
                firebase.database().ref('/users/' + s_user).once('value').then(function(snapshot) {
                    $("#d_Ses_auth_t").text(snapshot.val().f_name);
                    $("#m_Ses_auth_t").text(snapshot.val().f_name);
                });
                $("#d_Ses_auth_t").click(function(){
                    document.location.href = "/Profile";
                });
                $("#m_Ses_auth_t").click(function(){
                    document.location.href = "/Profile";
                });
                $("#m_Ses_out").click(function(){
                    firebase.auth().signOut().then(function() {
                        window.location.href = "https://olimpiada-potosina-de-informatica.github.io";
                    }, function(error) {
                        Materialize.toast("Error!",20000);
                    });
                });
                $("#d_Ses_out").click(function(){
                    firebase.auth().signOut().then(function() {
                        window.location.href = "https://olimpiada-potosina-de-informatica.github.io";
                    }, function(error) {
                        Materialize.toast("Error!",20000);
                    });
                });
            }
            else {
                Materialize.toast("Verifica tu email para tener acceso a los recursos",20000);
                if(!(pathname=="/GrandesCorceles" || pathname=="/" || pathname=="/Registro" || pathname=="/Login")){
                    window.location.href = "https://olimpiada-potosina-de-informatica.github.io";
                }
            }
        }
        else {
            $("#d_Reg").show();
            $("#m_Reg").show();
            $("#d_Ses_auth_t").show();
            $("#m_Ses_auth_t").show();
            $("#d_Ses_auth_t").text("Iniciar Sesión");
            $("#m_Ses_auth_t").text("Iniciar Sesión");
            $("#d_Ses_auth_t").click(function(){
                document.location.href = "/Login";
            });
            $("#m_Ses_auth_t").click(function(){
                document.location.href = "/Login";
            });
            var pathname = window.location.pathname;
            if(!(pathname=="/GrandesCorceles" || pathname=="/" || pathname=="/Registro" || pathname=="/Login")){
                window.location.href = "https://olimpiada-potosina-de-informatica.github.io";
            }
        }
    });
});