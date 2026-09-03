document.addEventListener('DOMContentLoaded', function() {
    console.log("Cargando catálogo e inicializando componentes...");

    // 1. Inicialización de componentes Materialize CSS
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

    // 2. Base de Datos de Productos
    var productos = [
        {
            "id": "TC001",
            "codigo": "TC001",
            "categoria": "Tortas Cuadradas",
            "titulo": "Torta Cuadrada de Chocolate",
            "imagen": "images/torta_chocolate_cuadrada.webp",
            "precio": 45000,
            "precio_formateado": "$45.000 CLP",
            "descripcion": "Deliciosa torta cuadrada de chocolate",
            "ingredientes": ["Harina", "Chocolate", "Huevos", "Azúcar", "Manteca", "Esencia de vainilla", "Crema"],
            "tiempo_preparacion": "60 min",
            "dificultad": "Media",
            "destacado": true
        },
        {
            "id": "TC002",
            "codigo": "TC002",
            "categoria": "Tortas Cuadradas",
            "titulo": "Torta Cuadrada de Frutas",
            "imagen": "images/torta_cuadrada_frutas.jpg",
            "precio": 50000,
            "precio_formateado": "$50.000 CLP",
            "descripcion": "Torta cuadrada con frutas frescas de temporada",
            "ingredientes": ["Harina", "Frutillas", "Arándanos", "Huevos", "Azúcar", "Manteca", "Crema"],
            "tiempo_preparacion": "50 min",
            "dificultad": "Media",
            "destacado": true
        },
        {
            "id": "TT001",
            "codigo": "TT001",
            "categoria": "Tortas Circulares",
            "titulo": "Torta Circular de Vainilla",
            "imagen": "images/torta_circular_vainilla.png",
            "precio": 40000,
            "precio_formateado": "$40.000 CLP",
            "descripcion": "Clásica torta circular de vainilla con frosting de mantequilla",
            "ingredientes": ["Harina", "Vainilla", "Huevos", "Azúcar", "Manteca", "Leche"],
            "tiempo_preparacion": "45 min",
            "dificultad": "Fácil",
            "destacado": false
        },
        {
            "id": "TT002",
            "codigo": "TT002",
            "categoria": "Tortas Circulares",
            "titulo": "Torta Circular de Manjar",
            "imagen": "images/torta_circular_manjar.jpg",
            "precio": 42000,
            "precio_formateado": "$42.000 CLP",
            "descripcion": "Torta circular rellena de manjar y cubierta con merengue",
            "ingredientes": ["Harina", "Manjar", "Huevos", "Azúcar", "Manteca", "Merengue"],
            "tiempo_preparacion": "55 min",
            "dificultad": "Media",
            "destacado": false
        },
        {
            "id": "PI001",
            "codigo": "PI001",
            "categoria": "Postres Individuales",
            "titulo": "Mousse de Chocolate",
            "imagen": "images/Mousse_de_Chocolate.webp",
            "precio": 5000,
            "precio_formateado": "$5.000 CLP",
            "descripcion": "Mousse de chocolate belga en porción individual",
            "ingredientes": ["Chocolate", "Crema", "Huevos", "Azúcar", "Mantequilla"],
            "tiempo_preparacion": "30 min",
            "dificultad": "Fácil",
            "destacado": false
        },
        {
            "id": "PI002",
            "codigo": "PI002",
            "categoria": "Postres Individuales",
            "titulo": "Tiramisú Clásico",
            "imagen": "images/tiramisu_clasico.webp",
            "precio": 5500,
            "precio_formateado": "$5.500 CLP",
            "descripcion": "Tiramisú italiano con café y mascarpone",
            "ingredientes": ["Mascarpone", "Café", "Huevos", "Azúcar", "Bizcochos", "Cacao"],
            "tiempo_preparacion": "40 min",
            "dificultad": "Media",
            "destacado": false
        },
        {
            "id": "PSA001",
            "codigo": "PSA001",
            "categoria": "Productos Sin Azúcar",
            "titulo": "Torta Sin Azúcar de Naranja",
            "imagen": "images/torta_de_naranja.png",
            "precio": 48000,
            "precio_formateado": "$48.000 CLP",
            "descripcion": "Torta de naranja endulzada naturally, sin azúcar añadida",
            "ingredientes": ["Harina integral", "Naranja", "Huevos", "Stevia", "Aceite de coco"],
            "tiempo_preparacion": "50 min",
            "dificultad": "Media",
            "destacado": false
        },
        {
            "id": "PSA002",
            "codigo": "PSA002",
            "categoria": "Productos Sin Azúcar",
            "titulo": "Cheesecake Sin Azúcar",
            "imagen": "images/cheese_cake.webp",
            "precio": 47000,
            "precio_formateado": "$47.000 CLP",
            "descripcion": "Cheesecake cremoso sin azúcar con base de frutos secos",
            "ingredientes": ["Queso crema", "Frutos secos", "Huevos", "Stevia", "Esencia de vainilla"],
            "tiempo_preparacion": "60 min",
            "dificultad": "Media",
            "destacado": false
        },
        {
            "id": "PT001",
            "codigo": "PT001",
            "categoria": "Pastelería Tradicional",
            "titulo": "Empanada de Manzana",
            "imagen": "images/empanada_manzana.jpg",
            "precio": 3000,
            "precio_formateado": "$3.000 CLP",
            "descripcion": "Empanada tradicional rellena de manzana y canela",
            "ingredientes": ["Harina", "Manzana", "Canela", "Azúcar", "Manteca"],
            "tiempo_preparacion": "35 min",
            "dificultad": "Fácil",
            "destacado": false
        },
        {
            "id": "PT002",
            "codigo": "PT002",
            "categoria": "Pastelería Tradicional",
            "titulo": "Tarta de Santiago",
            "imagen": "images/tarta_de_Santiago.jpg",
            "precio": 6000,
            "precio_formateado": "$6.000 CLP",
            "descripcion": "Tarta de Santiago, clásica de la repostería chilena",
            "ingredientes": ["Harina", "Almendras", "Huevos", "Azúcar", "Mermelada"],
            "tiempo_preparacion": "45 min",
            "dificultad": "Fácil",
            "destacado": false
        },
        {
            "id": "PG001",
            "codigo": "PG001",
            "categoria": "Productos Sin Gluten",
            "titulo": "Brownie Sin Gluten",
            "imagen": "images/Brownie_Sin_Gluten.jpg",
            "precio": 4000,
            "precio_formateado": "$4.000 CLP",
            "descripcion": "Brownie de chocolate sin gluten, húmedo y esponjoso",
            "ingredientes": ["Harina de arroz", "Chocolate", "Huevos", "Azúcar", "Manteca"],
            "tiempo_preparacion": "30 min",
            "dificultad": "Fácil",
            "destacado": false
        },
        {
            "id": "PG002",
            "codigo": "PG002",
            "categoria": "Productos Sin Gluten",
            "titulo": "Pan Sin Gluten",
            "imagen": "images/Pan_Sin_Gluten.jpg",
            "precio": 3500,
            "precio_formateado": "$3.500 CLP",
            "descripcion": "Pan artesanal sin gluten, suave y esponjoso",
            "ingredientes": ["Harina de arroz", "Maicena", "Huevos", "Levadura", "Aceite de oliva"],
            "tiempo_preparacion": "50 min",
            "dificultad": "Media",
            "destacado": false
        },
        {
            "id": "PV001",
            "codigo": "PV001",
            "categoria": "Productos Veganos",
            "titulo": "Torta Vegana de Chocolate",
            "imagen": "images/torta_vegana_de_chocolate.jpg",
            "precio": 50000,
            "precio_formateado": "$50.000 CLP",
            "descripcion": "Torta de chocolate 100% vegana, sin ingredientes de origen animal",
            "ingredientes": ["Harina", "Chocolate vegano", "Aceite de coco", "Leche de almendras", "Azúcar"],
            "tiempo_preparacion": "55 min",
            "dificultad": "Media",
            "destacado": true
        },
        {
            "id": "PV002",
            "codigo": "PV002",
            "categoria": "Productos Veganos",
            "titulo": "Galletas Veganas de Avena",
            "imagen": "images/Galletas_Veganas_de_Avena.jpg",
            "precio": 4500,
            "precio_formateado": "$4.500 CLP",
            "descripcion": "Galletas de avena veganas, crujientes y saludables",
            "ingredientes": ["Avena", "Plátano", "Aceite de coco", "Pasas", "Canela"],
            "tiempo_preparacion": "25 min",
            "dificultad": "Fácil",
            "destacado": false
        },
        {
            "id": "TE001",
            "codigo": "TE001",
            "categoria": "Tortas Especiales",
            "titulo": "Torta Especial de Cumpleaños",
            "imagen": "images/Torta_Especial_de_Cumpleaños.jpg",
            "precio": 55000,
            "precio_formateado": "$55.000 CLP",
            "descripcion": "Torta personalizada para cumpleaños, decorada a elección",
            "ingredientes": ["Harina", "Huevos", "Azúcar", "Manteca", "Crema", "Decoraciones"],
            "tiempo_preparacion": "90 min",
            "dificultad": "Alta",
            "destacado": true
        },
        {
            "id": "TE002",
            "codigo": "TE002",
            "categoria": "Tortas Especiales",
            "titulo": "Torta Especial de Boda",
            "imagen": "images/Torta_Especial_de_Boda.png",
            "precio": 60000,
            "precio_formateado": "$60.000 CLP",
            "descripcion": "Torta de boda de tres pisos, elegante y sofisticada",
            "ingredientes": ["Harina", "Huevos", "Azúcar", "Manteca", "Crema", "Flores comestibles"],
            "tiempo_preparacion": "120 min",
            "dificultad": "Alta",
            "destacado": true
        }
    ];

    // 3. Renderizar catálogo si el elemento existe en el HTML
    const section = document.getElementById("productos");
    if (section) {
        generarProductos(productos, section);
    }

    // 4. Lógica para renderizar plantilla de detalles (si estamos en producto.html)
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get('id');
    
    if (productoId) {
        // Buscar en la lista principal por código/ID tipo string
        const productoElegido = productos.find(p => p.id === productoId);
        if (productoElegido) {
            const elNombre = document.getElementById('detalle-nombre');
            const elPrecio = document.getElementById('detalle-precio');
            const elImg = document.getElementById('detalle-img');
            
            if (elNombre) elNombre.innerText = productoElegido.titulo;
            if (elPrecio) elPrecio.innerText = productoElegido.precio_formateado;
            if (elImg) elImg.src = productoElegido.imagen;
        }
    }
});

// Generar Cards Dinámicas
function generarProductos(productos, section) {
    const contenedorCards = document.createElement("div");
    contenedorCards.className = "row";
    section.appendChild(contenedorCards);

    for (const producto of productos) {
        const columna = document.createElement("div");
        columna.className = "col s12 m6 l4";
        contenedorCards.appendChild(columna);

        const card = document.createElement("div");
        card.className = "card hoverable";
        columna.appendChild(card);

        // Imagen
        const cardImage = document.createElement("div");
        cardImage.className = "card-image";
        card.appendChild(cardImage);

        const imagenProducto = document.createElement("img");
        imagenProducto.src = producto.imagen;
        imagenProducto.alt = producto.titulo;
        imagenProducto.loading = "lazy";
        imagenProducto.onerror = function() {
            this.src = 'images/placeholder.webp';
        };
        cardImage.appendChild(imagenProducto);

        // Badge categoría
        const badge = document.createElement("span");
        badge.className = "badge-categoria";
        badge.textContent = producto.categoria;
        cardImage.appendChild(badge);

        // Título
        const spanTitulo = document.createElement("span");
        spanTitulo.className = "card-title";
        spanTitulo.textContent = producto.titulo;
        cardImage.appendChild(spanTitulo);

        // Contenido
        const cardContent = document.createElement("div");
        cardContent.className = "card-content";
        card.appendChild(cardContent);

        const codigo = document.createElement("p");
        codigo.className = "codigo-producto";
        codigo.textContent = `Código: ${producto.codigo}`;
        cardContent.appendChild(codigo);

        const descripcion = document.createElement("p");
        descripcion.className = "descripcion-producto";
        descripcion.textContent = producto.descripcion;
        cardContent.appendChild(descripcion);

        const precioProducto = document.createElement("p");
        precioProducto.className = "precio-producto";
        precioProducto.textContent = producto.precio_formateado;
        cardContent.appendChild(precioProducto);

        // Acciones
        const cardAction = document.createElement("div");
        cardAction.className = "card-action";
        card.appendChild(cardAction);

        const botonDetalles = document.createElement("a");
        botonDetalles.className = "waves-effect waves-light btn pink darken-1";
        botonDetalles.textContent = "Detalles";
        botonDetalles.addEventListener('click', function(e) {
            e.preventDefault();
            verDetalles(producto);
        });
        cardAction.appendChild(botonDetalles);

        const botonAgregar = document.createElement("a");
        botonAgregar.className = "right waves-effect waves-light light-blue lighten-5 black-text btn btn-agregar";
        botonAgregar.textContent = "Agregar";
        botonAgregar.addEventListener("click", function(e) {
            e.preventDefault();
            guardar(producto);
        });
        cardAction.appendChild(botonAgregar);
    }
}

// Redireccionar guardando la información elegida
function verDetalles(producto) {
    localStorage.setItem('productoActual', JSON.stringify(producto));
    // Pasa el ID como parámetro URL para que coincida con la navegación
    window.location.href = `producto.html?id=${producto.id}`;
}

// Lógica de Carrito de Compras
function guardar(producto) {
    const LLAVE = "carrito-pasteleria";
    let carrito = JSON.parse(localStorage.getItem(LLAVE)) || [];

    // Verificar si el producto ya existe en el carrito
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
        existe.cantidad = (existe.cantidad || 1) + 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem(LLAVE, JSON.stringify(carrito));
    if (window.M && M.toast) {
        M.toast({html: `¡${producto.titulo} agregado al carrito!`});
    } else {
        alert(`¡${producto.titulo} agregado al carrito!`);
    }
}