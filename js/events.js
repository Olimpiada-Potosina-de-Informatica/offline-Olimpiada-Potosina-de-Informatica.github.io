$(document).ready( function () {
    $(".modal").modal();
    firebase.database().ref('/form/event_details/').once('value').then(function(snapshot){
        var x=0;
        var btncolor;
        var pathname = window.location.pathname;
        (pathname=="/Robotik/Eventos")?btncolor='red darken-4':btncolor='teal';
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            $("#panel_eventos").append('<div class="card-panel grey lighten-5 z-depth-1 row"><div class="col s12 m4 l2 center">'+childSnapshot.val().org+'</div><div class="col s12 m8 l7 center">'+childSnapshot.val().cuerpo+'</div><div class="col s12 m12 l3 center"><a class="waves-effect waves-light btn-large '+btncolor+'" href="#modal'+x+'">¡Saber más!</a></div></div> <div id="modal'+x+'" class="modal grey darken-3 modal-fixed-footer"><div class="modal-content"><h4 class="grey lighten-5 center modex">'+key+'</h4>'+childSnapshot.val().page+'</div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-grey btn-flat">Cerrar</a></div></div>');
            x++;
        });
        $('.modal').modal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .8, // Opacity of modal background
            inDuration: 500, // Transition in duration
            outDuration: 500, // Transition out duration
            startingTop: '100%', // Starting top style attribute
            endingTop: '100%'
        });
    });
});
$(window).load(function(){
    $("#preloader div").delay(800).fadeOut();
    $("#preloader").delay(800).fadeOut("slow");    
});