$(document).ready(function() {
    var query = firebase.database().ref("/form/event/").orderByKey();
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            $("#r_consulta").append($('<option>', { value: key, text: key}));
            $("#r_consulta").material_select();
        });
    });
});
$(window).load(function(){
    $("#r_sender").click(function(){
        //pendiente
    });
    $("#r_sender1").click(function(){
        
    });
});