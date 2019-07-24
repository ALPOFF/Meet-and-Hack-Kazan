//dialog - window with removed close button
$( function() {
    $( "#dialog" ).dialog({
    	autoOpen: true,
          open: function(event, ui) { $('.ui-dialog-titlebar-close').hide(); }
        });
  } );


/*
$( function() {
$('#wrapper').dialog({
    autoOpen: false,
    title: 'Basic Dialog'
});
$('#q0').click(function() {
    $('#wrapper').dialog('open');
    return false;
});

} );

*/

 