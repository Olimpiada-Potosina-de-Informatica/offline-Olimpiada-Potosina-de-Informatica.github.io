$(document).ready(function() {
    /*var query = firebase.database().ref("/form/event/").orderByKey();
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            $("#r_consulta").append($('<option>', { value: key, text: key}));
            $("#r_consulta").material_select();
        });
    });*/
    $("#r_sender").click(function(){
        $("#r_tab1").empty();
        firebase.database().ref('/users/').once('value').then(function(snapshot){
            var x=0;
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                var tex='';
                var con=true;
                firebase.database().ref('/users/'+key+'/').once('value').then(function(snapshot){
                    if(!$("#f_name").val().length==0 && !childSnapshot.val().f_name.toString().includes($("#f_name").val().toString()))con=false;
                    if(!$("#l_name").val().length==0 && !childSnapshot.val().l_name.toString().includes($("#l_name").val().toString()))con=false;
                    if(!$("#email").val().length==0 && !childSnapshot.val().email.toString().includes($("#email").val().toString()))con=false;
                    if(!$("#u_aprovat").val().length==0 && !childSnapshot.val().u_aprovat.toString().includes($("#u_aprovat").val().toString()))con=false;
                    if(!$("#u_grade").val().length==0 && !childSnapshot.val().u_grade.toString().includes($("#u_grade").val().toString())){
                        con=false;
                    }
                    if(con){
                        snapshot.forEach(function(childSnapshot2) {
                            var childData = childSnapshot2.val();
                            var ey=childSnapshot2.key;
                            tex=tex+('<div class="divider col s12 z-depth-3"></div><div class="col s4">'+ey+'</div><div id="p_usert" class="col s8"><h6>'+childData+'</h6></div><div class="divider col s12 z-depth-3"></div>');
                        });
                        $("#r_tab1").append('<div class="card-panel grey lighten-5 z-depth-1 row"><div class="col s12 m8 l9 center">'+key+'</div><div class="col s12 m4 l3 center"><a class="waves-effect waves-light btn-large teal" href="#modal'+x+'">Detalles</a></div></div><div id="modal'+x+'" class="modal modal-fixed-footer"><div class="modal-content modex"><div class="row">'+tex+'</div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-grey btn-flat">Cerrar</a></div></div>');
                        x++;
                        $('.modal').modal({
                            dismissible: true,
                            opacity: .8,
                            inDuration: 500,
                            outDuration: 500,
                            startingTop: '100%',
                            endingTop: '100%'
                        });
                    }
                    $("#r_Resultados1").html("Resultados: "+x);
                });
            });
        });
    });
    $("#r_consulta").css({
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
});
$(window).load(function(){    
    $("#r_sender1").click(function(){
        
    });
});