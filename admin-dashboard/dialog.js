//dialog - window
$( function() {
    $( "#dialog" ).dialog({
          open: function(event, ui) { $('.ui-dialog-titlebar-close').hide(); }
        });
  } );

//remove close button in div with id dialog
 