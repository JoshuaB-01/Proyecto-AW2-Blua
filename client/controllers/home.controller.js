import { CardComponent } from '../components/cardComponent.js';
import { NavbarComponent } from '../components/navbarComponent.js';
import { FooterComponent } from '../components/footerComponent.js';
import { getData, setData } from '../utils/localStorage.controller.js';

let productos = [];

async function inicializarHome() {
    renderizarNavbar();
    renderizarFooter();
    await cargarProductos();
}

function renderizarNavbar() {
    const headerElement = document.querySelector('header');
    if (headerElement) {
        headerElement.innerHTML = NavbarComponent();
    }
}

function renderizarFooter() {
    const footerElement = document.querySelector('footer');
    if (footerElement) {
        footerElement.innerHTML = FooterComponent();
    }
}

async function cargarProductos() {
    try {
        const respuesta = await fetch(`http://localhost:3001/products/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        productos = await respuesta.json();

        const contenedorProductos = document.getElementById('contenedor-productos');
        
        let htmlProductos = '';
        productos.forEach(producto => {
            htmlProductos += CardComponent(producto);
        });
        
        contenedorProductos.innerHTML = htmlProductos;
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

window.agregarAlCarrito = function(productId) {
    let cantidad = parseInt(document.getElementById(`cantidad-${productId}`).value);

    if (cantidad > 0) {
        let carrito = getData('carrito') || [];
        const productoExistente = carrito.find(producto => producto.id === productId);
        
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
            productoExistente.total = productoExistente.precio * productoExistente.cantidad;
        } else {
            const producto = productos.find(producto => producto.id === productId);
            carrito.push({
                id: productId,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: cantidad,
                total: producto.precio * cantidad
            });
        }
        
        setData('carrito', carrito);
        alert('Producto agregado al carrito');
    } else {
        alert('Por favor, ingrese una cantidad válida');
    }
}

document.addEventListener('DOMContentLoaded', inicializarHome); 