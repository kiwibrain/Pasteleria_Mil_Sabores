document.addEventListener('DOMContentLoaded', function () {
    // ==========================================
    // 1. INICIALIZAR COMPONENTES DE MATERIALIZE
    // ==========================================
    var elemsColl = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elemsColl, {});

    var elemsBox = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elemsBox, {});
    
    var elemsSidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elemsSidenav, {});

    var elemsSlider = document.querySelectorAll('.slider');
    M.Slider.init(elemsSlider, {
        indicators: true,
        height: 600,
        duration: 500,
        interval: 6000
    });

    // ==========================================
    // 2. LÓGICA DE LA PÁGINA "DETALLE DE PRODUCTO"
    // ==========================================
    const tituloProducto = document.getElementById('detalle-nombre');
    
    if (tituloProducto) {
        try {
            const productoGuardado = localStorage.getItem('productoActual');
            if (productoGuardado) {
                const producto = JSON.parse(productoGuardado);
                
                tituloProducto.innerText = producto.titulo;
                
                const precioEl = document.getElementById('detalle-precio');
                if (precioEl) precioEl.innerText = producto.precio_formateado;
                
                const imgEl = document.getElementById('detalle-img');
                if (imgEl) imgEl.src = producto.imagen;

                const descEl = document.getElementById('detalle-descripcion');
                if (descEl) descEl.innerText = producto.descripcion;

                const ingrEl = document.getElementById('detalle-ingredientes');
                if (ingrEl) ingrEl.innerText = producto.ingredientes;

            } else {
                tituloProducto.innerText = "Producto no encontrado";
            }
        } catch (error) {
            console.error("Error al cargar producto", error);
        }
    }

    // ==========================================
    // 3. INICIALIZAR PÁGINA DEL CARRITO (Si estamos en carrito.html)
    // ==========================================
    const tablaCarrito = document.getElementById('tabla-carrito');
    if (tablaCarrito) {
        renderizarCarrito();
    }
});


// ==========================================
// FUNCIONES GLOBALES DEL CARRITO
// ==========================================

// Función para el botón "Añadir al carrito" dentro de producto.html
function guardarCarrito() {
    const cantidadInput = document.getElementById('txtCant').value;
    const cantidad = parseInt(cantidadInput);

    if (!cantidad || cantidad <= 0) {
        M.toast({html: "Por favor ingresa una cantidad válida"});
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
    M.toast({html: `¡Se agregaron ${cantidad} ${productoActual.titulo} al carrito!`});
}

// Dibuja los productos en la tabla de carrito.html
function renderizarCarrito() {
    const tabla = document.getElementById('tabla-carrito');
    const totalEl = document.getElementById('total-carrito');
    if (!tabla) return;

    let carrito = JSON.parse(localStorage.getItem('carrito-pasteleria')) || [];
    tabla.innerHTML = ''; // Limpiamos la tabla
    let totalPagar = 0;

    // Si el carrito está vacío
    if (carrito.length === 0) {
        tabla.innerHTML = '<tr><td colspan="3" class="center-align">Tu carrito está vacío 🍰</td></tr>';
        totalEl.innerText = '$0';
        return;
    }

    // Dibujar cada producto
    carrito.forEach((item) => {
        // Multiplicamos el precio por la cantidad
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
            </td>
        `;
        tabla.appendChild(fila);
    });

    // Actualizamos el total (agregando formato de miles para Chile)
    totalEl.innerText = '$' + totalPagar.toLocaleString('es-CL');
}

// Se ejecuta al cambiar el número en el input del carrito
function actualizarCantidad(idProducto, nuevaCantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito-pasteleria')) || [];
    const item = carrito.find(p => p.id === idProducto);
    
    if (item) {
        item.cantidad = parseInt(nuevaCantidad);
        if (item.cantidad < 1) item.cantidad = 1;
    }
    
    localStorage.setItem('carrito-pasteleria', JSON.stringify(carrito));
    renderizarCarrito();
}


function eliminarDelCarrito(idProducto) {
    let carrito = JSON.parse(localStorage.getItem('carrito-pasteleria')) || [];
    
    carrito = carrito.filter(p => p.id !== idProducto);
    
    localStorage.setItem('carrito-pasteleria', JSON.stringify(carrito));
    M.toast({html: 'Producto eliminado del carrito'});
    renderizarCarrito();
}