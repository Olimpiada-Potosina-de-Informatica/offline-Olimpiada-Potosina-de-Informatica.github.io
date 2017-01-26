$(document).ready( function () {
    firebase.auth().onAuthStateChanged( function(user) {
        if (user) {
            var pathname = window.location.pathname;
            $("#d_Reg").hide();
            $("#m_Reg").hide();
            firebase.auth().onAuthStateChanged(function(user) {
                if (user.emailVerified) {
                    $("#d_Ses_auth_t").text(user.displayName);
                    $("#m_Ses_auth_t").text(user.displayName);
                    $("#d_Ses_auth_t").click(function(){
                        document.location.href = "/Profile";
                    });
                    $("#m_Ses_auth_t").click(function(){
                        document.location.href = "/Profile";
                    });
                } else {
                    Materialize.toast("Verifica tu email para tener acceso a los recursos",20000);
                    if(!(pathname=="/GrandesCorceles" || pathname=="/" || pathname=="/Registro" || pathname=="/Login")){
                        window.location.href = "https://olimpiada-potosina-de-informatica.github.io";
                    }
                }
            });
        } else {
            $("#d_Reg").show();
            $("#m_Reg").show();
            $("#d_Ses_auth_t").text("Iniciar Sesión");
            $("#m_Ses_auth_t").text("Iniciar Sesión");
            $("#d_Ses_auth_t").click(function(){
                document.location.href = "/Login";
            });
            $("#m_Ses_auth_t").click(function(){
                document.location.href = "/Login";
            });
            var pathname = window.location.pathname;
            if(!(pathname=="/GrandesCorceles" || pathname=="/" || pathname=="/Registro")){
                window.location.href = "https://olimpiada-potosina-de-informatica.github.io";
            }
        }
    });
});