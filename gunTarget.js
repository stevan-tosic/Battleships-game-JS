//onmouseover="" onmouseout="this.style.background='none';"
$(document).ready(function(){
	$("td").mouseover(function(){
		$(this).css('background-image', 'url(../images/target)');
		$(this).mouseout(function(){
			$(this).css('background-color', 'inherit');
		});
	});
});