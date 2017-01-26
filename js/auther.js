$(document).ready( function () {
    firebase.auth().onAuthStateChanged( function(user) {
        if (user) {
            var pathname = window.location.pathname;
            $("#d_Reg").hide();
            $("#m_Reg").hide();
            firebase.auth().onAuthStateChanged(function(user) {
                if (user.emailVerified) {
                    $("#d_Ses_auth").html("holi");
                    $("#m_Ses_auth").html("holi");
                } else {
                    Materialize.toast("Verifica tu email para tener acceso a los recursos",20000);
                    if(!(pathname=="/GrandesCorceles" || pathname=="/" || pathname=="/Registro")){
                        window.location.href = "https://olimpiada-potosina-de-informatica.github.io";
                    }
                }
            });
        } else {
            $("#d_Reg").show();
            $("#m_Reg").show();
            $("#d_Ses_auth").html("Iniciar Sesión");
            $("#m_Ses_auth").html("Iniciar Sesión");
            var pathname = window.location.pathname;
            Materialize.toast(pathname,4000);
            if(!(pathname=="/GrandesCorceles" || pathname=="/" || pathname=="/Registro")){
                window.location.href = "https://olimpiada-potosina-de-informatica.github.io";
            }
        }
    });
});