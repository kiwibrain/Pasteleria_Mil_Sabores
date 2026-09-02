document.addEventListener('DOMContentLoaded', function () {
    //COLLAPSIBLE PARA DETALLE PRODUCTO
    var elemsColl = document.querySelectorAll('.collapsible');
    var instancesColl = M.Collapsible.init(elemsColl, {});


    //MATERIALBOXED PARA PRODUCTOS
    var elemsBox = document.querySelectorAll('.materialboxed');
    var instancesBox = M.Materialbox.init(elemsBox, {});
    
    //SIDENAV PARA MOVILES
    var elemsSidenav = document.querySelectorAll('.sidenav');
    var instancesSidenav = M.Sidenav.init(elemsSidenav, {});

    //SLIDER PAG PRINCIPAL
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