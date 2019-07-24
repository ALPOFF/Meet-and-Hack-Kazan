//dialog - window with removed close button
$( function() {
    $( "#dialog" ).dialog({
          open: function(event, ui) { $('.ui-dialog-titlebar-close').hide(); }
        });
  } );

 

 