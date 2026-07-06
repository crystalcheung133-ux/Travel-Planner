
(function(){
  var MIN_SHOW_MS = 3200; // 最少顯示咁耐，確保睇得清楚（加多兩秒）
  var startTime = Date.now();
  function hideSplash(){
    var s = document.getElementById('ccmv-splash');
    if(!s) return;
    var elapsed = Date.now() - startTime;
    var wait = Math.max(0, MIN_SHOW_MS - elapsed);
    setTimeout(function(){
      s.style.opacity = '0';
      setTimeout(function(){ s.remove(); }, 400);
    }, wait);
  }
  var fallback = setTimeout(hideSplash, 4500);
  window.addEventListener('load', function(){
    clearTimeout(fallback);
    hideSplash();
  });
})();
