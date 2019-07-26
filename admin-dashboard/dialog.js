//dialog - window with removed close button
$( function() {
    $( "#dialog" ).dialog({
    	autoOpen: true,
    	position: { my: 'left', at: 'left+60 top+180' },
          open: function(event, ui) { $('.ui-dialog-titlebar-close').hide(); }
        });
  } );


//notify
$( function() {
    $( "#dialogNotify" ).dialog({
    	autoOpen: true,
    	position: { my: 'right', at: 'right-60 top+180' },
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

 