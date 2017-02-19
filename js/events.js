$(document).ready( function () {
    $(".modal").modal();
    firebase.database().ref('/form/event_details/').once('value').then(function(snapshot){
        var x=0;
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key;
                    $("#panel_eventos").append('<div class="card-panel grey lighten-5 z-depth-1 row"><div class="col s12 m4 l2 center">'+childSnapshot.val().org+'</div><div class="col s12 m5 l7 truncate center">'+childSnapshot.val().cuerpo+'</div><div class="col s12 m3 l3 center"><a class="waves-effect waves-light btn-large red darken-4" href="#modal'+x+'">¡Conoce más!</a></div></div> <div id="modal'+x+'" class="modal modal-fixed-footer"><div class="modal-content"><h4>'+key+'</h4>'+childSnapshot.val().page+'</div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a></div></div>');
                    x++;
                });
        $(".modal").modal();
            });
});
$(window).load(function(){
    $("#preloader div").delay(800).fadeOut();
    $("#preloader").delay(800).fadeOut("slow");
    
});