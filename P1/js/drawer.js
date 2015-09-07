function init(targets) {

    "use strict";

    // the targets from the html
    var menu = targets.menu,
        close = targets.close,
        drawer = targets.drawer;

    // open the drawer
    menu.addEventListener('click', function (e) {
        drawer.classList.toggle('open');
        e.stopPropagation();
    });

    // close the drawer
    close.addEventListener('click', function () {
        drawer.classList.remove('open');
    });
}