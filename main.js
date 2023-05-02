//Declaración de variables y constantes

let nombre = prompt("Ingrese su nombre: ");
titulo.innerText = "Bienvenid@ " + nombre;
let carrito = [];
const divisa = '$';
const producto1 = document.querySelector('#producto');
const carrito1 = document.querySelector('#carrito');
const total = document.querySelector('#total');
const botonVaciar = document.querySelector('#boton-vaciar');

class Producto {
    constructor(nombre, precio, url, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.url = url;
        this.id =id;
    }
}

const cafe = new Producto("Café", 800, "img/cafe.png", 1);
const te = new Producto("Té", 300, "img/te.png", 2);
const vaso = new Producto("Vaso", 1280, "img/vaso1.webp", 3);

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
    renderizarCarrito();
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
}
function calcularTotal(){

    return carrito.reduce((total, Producto) => {

        const miProducto = arrayProductos.filter((productoArray) => {
            return productoArray.id === parseInt(Producto);
        });
        return total + miProducto[0].precio;
    }, 0).toFixed(2);
}
function vaciarCarrito() {
  
    carrito = [];
   
    renderizarCarrito();
}


botonVaciar.addEventListener('click', vaciarCarrito);

renderizarCarrito();
