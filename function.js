document.addEventListener('DOMContentLoaded', function () {
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

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems, options);
});