
//SIMULACION BASE DE DATOS
const inventarioProductos = [
    {id: 1, nombre: "Torta de Chocolate Cuadrada", precio: 15000, img: "images/torta_chocolate_cuadrada.webp", 
            desc: "Deliciosa torta de chocolate", ingredient: "blablablbaldsalkdlasj"},
    {id: 2, nombre: "Torta de Mil Hojas", precio: 20000, img: "images/placeholder.jpg", 
            desc: "MMMM que rico :)", ingredient: "blablablbaldsalkdlasj"}
]

//===============================================================================

//EVENTS
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

    //PLANTILLA PRODUCTO
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get('id');
    if (productoId){
        const productoElegido = inventarioProductos.find(p => p.id == productoId)
        if (productoElegido){
            document.getElementById('detalle-nombre').innerText = productoElegido.nombre;
            document.getElementById('detalle-precio').innerText = productoElegido.precio;
            document.getElementById('detalle-img').src = productoElegido.img;
        }
    }

});


//===============================================================================

//CARRITO

let carrito = JSON.parse(localStorage.getItem('carrito-pasteleria')) || [];

function guardarCarrito(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const cantidad = document.getElementById('txtCant').value;
    if (cantidad == null || cantidad <= 0){
        alert("Por favor ingrese una cantidad");
        return;
    }

    const producto = inventarioProductos.find(p => p.id == id);

    carrito.push({
        idProducto: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: parseInt(cantidad)
    });

    localStorage.setItem('carrito-pasteleria', JSON.stringify(carrito));
    alert("Añadido al carrito")

}