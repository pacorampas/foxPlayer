var FoxPlayer = (function(){
  var browser = null;

  function createBrowserIframe(url){
    if(browser){
      return false;
    }
    browser = document.createElement('iframe');
    browser.id = 'browser';
    browser.setAttribute('mozbrowser', '');
    browser.setAttribute('remote', '');
    browser.setAttribute('frameborder', 0);
    browser.setAttribute('allowfullscreen', '');
    browser.mozRequestFullScreen();
    document.body.appendChild(browser);
  }

  function changeSrc(url){
    var video = getVideoId(url);
    console.log(video);
    if(!video){
      return false;
    }
    if(video.is === 'youtube'){
      browser.src = 'https://www.youtube.com/embed/'+video.id+'?autoplay=1';
    }
    else if(video.is === 'vimeo' ){
      browser.src = 'http://player.vimeo.com/video/'+video.id+'?autoplay=1';
      browser.addNextPaintListener(function(){
        if(browser.src.indexOf('player.vimeo.com') > 0){
          setTimeout(function(){
            clickBrowser();
          }, 2000);
        }
      })
    }
    else {
      return false;
    }
  }

  function getVideoId(url){
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match) {
      console.log(match[2]);
      return { is: 'youtube', id: match[2]};
    } 

    regExp = /(videos|video|channels|\.com)\/([\d]+)/;
    match = url.match(regExp);
    if (match) {
      return { is: 'vimeo', id: match[2] };
    }

    return false;
  }

  function clickBrowser(){
    browser.sendMouseEvent('mousedown', 70, 50, 0, 1);
    setTimeout(function(){
      browser.sendMouseEvent('mouseup', 70, 50, 0, 1)
    },50);
  }

  function newUrl(url){
    createBrowserIframe(url);
    changeSrc(url);
  }

  return {
    newUrl: newUrl,
    togglePlay: clickBrowser
  }
})();