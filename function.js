//Elementos de MATERIALIZE
document.addEventListener('DOMContentLoaded', function () {
    //cuadros colapsables
    var elemsColl = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elemsColl, {});

    //iconos
    var elemsBox = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elemsBox, {});

    //sidenav para mobile
    var elemsSidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elemsSidenav, {});

    //slider pagina principal
    var elemsSlider = document.querySelectorAll('.slider');
    M.Slider.init(elemsSlider, {
        indicators: true,
        height: 600,
        duration: 500,
        interval: 6000
    });

    //==============================================================
    //DETALLE DE PRODUCTO - producto.html
    const tituloProducto = document.getElementById('detalle-nombre');

    if (tituloProducto) {
        try {
            const productoGuardado = localStorage.getItem('productoActual');
            if (productoGuardado) {
                const producto = JSON.parse(productoGuardado);
                tituloProducto.innerText = producto.titulo;

                const precioProd = document.getElementById('detalle-precio');
                if (precioProd) precioProd.innerText = producto.precio_formateado;

                const imgProd = document.getElementById('detalle-img');
                if (imgProd) imgProd.src = producto.imagen;

                const descProd = document.getElementById('detalle-descripcion');
                if (descProd) descProd.innerText = producto.descripcion;

                const ingrProd = document.getElementById('detalle-ingredientes');
                if (ingrProd) ingrProd.innerText = producto.ingredientes;
            } else {
                tituloProducto.innerText = "Producto no encontrado";
            }
        } catch (error) {
            console.error("Error al cargar el producto: ", error);
        }
    }
    //==============================================================
    //TABLA CARRITO - carrito.html
    const tablaCarrito = document.getElementById('tabla-carrito');
    if (tablaCarrito) {
        mostrarCarrito();
    }
});

//FUNCIONES CARRITO
//para boton "añadir carrito" - producto.html
function guardarCarrito() {
    const cantidadInput = document.getElementById('txtCant').value;
    const cantidad = parseInt(cantidadInput);

    if (!cantidad || cantidad <= 0) {
        M.toast({ html: "Por favor ingresa una cantidad válida" });
        return;
    }

    const productoGuardado = localStorage.getItem('productoActual');
    if (!productoGuardado) return;

    const productoActual = JSON.parse(productoGuardado);
    const LLAVE = "carrito-pasteleria";
    let carrito = JSON.parse(localStorage.getItem(LLAVE)) || [];

    const existe = carrito.find(item => item.id === productoActual.id);
    if (existe) {
        existe.cantidad = (existe.cantidad || 1) + cantidad;
    } else {
        productoActual.cantidad = cantidad;
        carrito.push(productoActual);
    }
    localStorage.setItem(LLAVE, JSON.stringify(carrito));
    M.toast({ html: `¡Se agregaron ${cantidad} ${productoActual.titulo} al carrito!` });
}

//MUESTRA PRODUCTOS EN TABLA CARRITO - carrito.html
function mostrarCarrito() {
    const tabla = document.getElementById('tabla-carrito');
    const totalProd = document.getElementById('total-carrito');
    if (!tabla) return;

    let carrito = JSON.parse(localStorage.getItem('carrito-pasteleria')) || [];
    tabla.innerHTML = '';
    let totalPagar = 0;

    //para carrito vacio
    if (carrito.length === 0) {
        tabla.innerHTML = '<tr><td colspan="3" class="center-align">El carrito esta vacío</td></tr>';
        totalProd.innerText = '$0';
        return;
    }

    //para mostrar productos en carrito
    carrito.forEach((item) => {
        const subtotal = item.precio * item.cantidad;
        totalPagar += subtotal;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${item.imagen}" alt="${item.titulo}" width="60" style="border-radius: 5px;">
                    <b>${item.titulo}</b>
                </div>
            </td>
            <td>
                <input type="number" value="${item.cantidad}" min="1" 
                        class="form-control" style="width: 70px; text-align: center;" 
                        onchange="actualizarCantidad('${item.id}', this.value)">
            </td>
            <td>
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <span>$${subtotal.toLocaleString('es-CL')}</span>
                    <a href="#!" onclick="eliminarDelCarrito('${item.id}')" class="red-text" title="Eliminar">
                        <i class="material-icons">delete</i>
                    </a>
                </div>
            </td>`;
        tabla.appendChild(fila);
    });

    //actualizar total carrito
    totalProd.innerText = '$' + totalPagar.toLocaleString('es-CL');
}

//ACTUALIZAR CANTIDAD CARRITO
function actualizarCantidad(idProducto, nuevaCantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito-pasteleria')) || [];
    const item = carrito.find(p => p.id === idProducto);

    if (item) {
        item.cantidad = parseInt(nuevaCantidad);
        if (item.cantidad < 1) item.cantidad = 1;
    }
    localStorage.setItem('carrito-pasteleria', JSON.stringify(carrito));
    mostrarCarrito();
}

//ELIMINAR PRODUCTO DE CARRITO
function eliminarDelCarrito(idProducto) {
    let carrito = JSON.parse(localStorage.getItem('carrito-pasteleria')) || [];
    carrito = carrito.filter(p => p.id !== idProducto);

    localStorage.setItem('carrito-pasteleria', JSON.stringify(carrito));
    M.toast({ html: 'Producto eliminado del carrito' });
    mostrarCarrito();
}
