(function () {
    // load css and other js
    var cb = function() {
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = 'css/style.min.css';
        var h = document.getElementsByTagName('head')[0];
        h.appendChild(l, h);

        var s = document.createElement('script');
        s.src = "js/perfmatters.min.js";
        s.async = 1;
        var t = document.getElementsByTagName('head')[0];
        t.appendChild(s, t);
    };
    var raf = requestAnimationFrame || mozRequestAnimationFrame ||
            webkitRequestAnimationFrame || msRequestAnimationFrame;
    if (raf) raf(cb);
    else window.addEventListener('load', cb);

    // load fonts
    WebFontConfig = {
        google: { families: [ 'Open+Sans::latin' ] }
    };
    (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
            '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 1;
        var s = document.getElementsByTagName('body')[0];
        s.appendChild(wf, s);
    })();

    // load analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-56241017-1', 'auto');
    ga('send', 'pageview');
})();