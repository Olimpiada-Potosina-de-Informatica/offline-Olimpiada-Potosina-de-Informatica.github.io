(function($){
    $(function(){
        $('.button-collapse').sideNav();
        $('.parallax').parallax();
        Materialize.updateTextFields();
        $('.datepicker').pickadate({
            container: 'body',
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 50 // Creates a dropdown of 15 years to control year
        });
  }); // end of document ready
})(jQuery); // end of jQuery name space