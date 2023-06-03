//Declaración de variables y constantes


titulo.innerText = "Bienvenidos";
let carrito = [];
const divisa = '$';
const producto1 = document.querySelector('#producto');
const carrito1 = document.querySelector('#carrito');
const total = document.querySelector('#total');
const botonVaciar = document.querySelector('#boton-vaciar');
const carritoLocalStorage = window.localStorage;


const botonDark = document.getElementById("botonFondo");
botonDark.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("modo", "dark");
    }
    else {
        localStorage.setItem("modo", "light");
    }
}
)

const modo = localStorage.getItem("modo");

if (modo === "dark") {
    document.body.classList.add("dark");
} else {
    document.body.classList.remove("dark");
}



class Producto {
    constructor(nombre, precio, url, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.url = url;
        this.id = id;
    }
}

const cafe = new Producto("Café", 800, "img/cafe.png", 1);
const te = new Producto("Té", 300, "img/te.png", 2);
const vaso = new Producto("Vaso", 1280, "img/vaso.png", 3);

const arrayProductos = [cafe, te, vaso];


arrayProductos.forEach(producto => {
    const div = document.createElement("div");
    div.className = "caja";
    div.innerHTML = `<p class= producto>Producto: </p> <p class = nombre>${producto.nombre} </p>
                     <p>Precio: $${producto.precio} </p>
                     <img class = "imagen" src= "${producto.url}" alt = "${producto.nombre}">
                     `;
    const boton = document.createElement('button');
    boton.classList.add('btn', 'btn-primary');
    boton.textContent = 'Agregar';
    boton.setAttribute('marcador', producto.id);
    boton.addEventListener('click', agregarProductoAlCarrito);
    div.appendChild(boton);
    contenedor.appendChild(div);

})

//CARRITO

function agregarProductoAlCarrito(evento) {

    carrito.push(evento.target.getAttribute('marcador'))
    Toastify({

        text: "Producto agregado",
        duration: 3000

    }).showToast();
    renderizarCarrito();
    guardaEnLocalStorage();
}

function renderizarCarrito() {
    carrito1.textContent = '';

    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((Producto) => {
        const miProducto = arrayProductos.filter((produtoArray) => {
            return produtoArray.id === parseInt(Producto);
        }
        );
        const numeroProductos = carrito.reduce((total, productoId) => {
            return productoId === Producto ? total += 1 : total;
        }, 0);
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-producto');
        miNodo.textContent = `${numeroProductos} x ${miProducto[0].nombre} - ${miProducto[0].precio}${divisa}`;
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-close', 'mx-5');
        miBoton.style.marginLeft = '0.5rem';
        miBoton.dataset.producto = Producto;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miBoton);
        carrito1.appendChild(miNodo);
    }
    )
    total.textContent = calcularTotal()
}
function borrarItemCarrito(evento) {

    const id = evento.target.dataset.producto;

    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });

    renderizarCarrito();
    guardaEnLocalStorage();
}
function calcularTotal() {

    return carrito.reduce((total, Producto) => {

        const miProducto = arrayProductos.filter((productoArray) => {
            return productoArray.id === parseInt(Producto);
        });
        return total + miProducto[0].precio;
    }, 0).toFixed(2);
}
function vaciarCarrito() {

    carrito = [];
    Swal.fire(
        'Carrito Vacío!',
        'Te esperamos nuevamente',
        'success'
    )
    renderizarCarrito();
    localStorage.clear();
}

function guardaEnLocalStorage() {
    carritoLocalStorage.setItem('carrito', JSON.stringify(carrito));
}
function cargaCarritoDeLocalStorage() {

    if (carritoLocalStorage.getItem('carrito') !== null) {
        carrito = JSON.parse(carritoLocalStorage.getItem('carrito'));
    }
}

botonVaciar.addEventListener('click', vaciarCarrito);
cargaCarritoDeLocalStorage();
renderizarCarrito();

const dolar = "https://criptoya.com/api/dolar";

const divDolar = document.getElementById("divDolar");


setInterval(() => {

    fetch(dolar)
        .then(respuesta => respuesta.json())
        .then(({ oficial }) => {
            divDolar.innerHTML = `
                                <h3>Cotización Dólar</h3>
                                <p class= "cotizacion">Dolar Oficial: $${oficial}</p>
                                `
        })
        .catch(error => console.log(error))
}, 3000)
