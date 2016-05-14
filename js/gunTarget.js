
$(document).ready(function(){
	$('#container').css('height', ($(document).height() - 20 ) );
	$("td").mouseover(function(){
    if( !$(this).hasClass('miss') && !$(this).hasClass('hit') ) {
		$(this).css('background-image', 'url(images/target.jpg)');
		$(this).mouseout(function(){
			$(this).css('background-image', '');
		});
    }
	});

	var is_focused = false;
		function focus_to_input() {
			if (!is_focused) {
				$('#guessInput').focus();
			}
		}
		$("#guessInput").focusin(function () {
			is_focused = true;
		});
		$("#guessInput").focusout(function () {
			is_focused = false;
			setTimeout(focus_to_input, 1000);
		});
});

$( "td" ).click(function() {
  $( "#board" ).effect( "shake" );
  $(this).delay( 400 ).effect( "pulsate" );
	if( !$(this).hasClass('miss') && !$(this).hasClass('hit') ) {
		$(this).toggle("explode");
		$(this).show("fast");
		$(this).delay()
			.queue(function () {
				$(this).css('background-image', '');
			});
	}
  var interval = setInterval(function(){
	  $("#guessInput").focus();
  	clearInterval(interval); 
  }, 1500);
});



view.startNewGame("Start new game", "Try to beat the GOKU. . . or at least KRILLIN");





