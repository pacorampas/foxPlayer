window.onload = function(){
  var browser = document.getElementById('browser');
  browser.mozRequestFullScreen();

  browser.addNextPaintListener(function(){
  	if(browser.src.indexOf('player.vimeo.com') > 0){
  		clickBrowser(browser);
  	}
  });
}

function clickBrowser(element){
	element.sendMouseEvent('mousedown', 70, 50, 0, 1);
	setTimeout(function(){
		element.sendMouseEvent('mouseup', 70, 50, 0, 1)
	},50);
}
