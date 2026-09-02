document.addEventListener('DOMContentLoaded', function () {

    var elems = document.querySelectorAll('.materialboxed');
    var instancesBox = M.Materialbox.init(elemsBox, {});

    var elemsSidenav = document.querySelectorAll('.sidenav');
    var instancesSidenav = M.Sidenav.init(elemsSidenav, {});

    var elems = document.querySelectorAll('.slider');
    var options = {
        indicators: true,
        height: 600,
        duration: 500,
        interval: 6000
    }
    var instances = M.Slider.init(elems, options);
});

instances.start();
instancesSidenav.start();
instancesBox.start();
instanceBox.open();