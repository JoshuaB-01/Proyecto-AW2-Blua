import { CardComponent } from '../components/cardComponent.js';
import { NavbarComponent, initMobileMenu } from '../components/navbarComponent.js';
import { FooterComponent } from '../components/footerComponent.js';
import { getData, setData } from '../utils/localStorage.controller.js';

let productos = [];

async function inicializarCategorias() {
    renderizarNavbar();
    renderizarFooter();
    await cargarCategorias();
    initMobileMenu();
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

async function cargarCategorias() {
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
       
        const categorias = [...new Set(productos.map(producto => producto.categoria))];
        
        const contenedorCategorias = document.getElementById('contenedor-categorias');
        
        let htmlCategorias = '<button class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mr-2" onclick="cargarProductosPorCategoria(\'todas\')">Todas</button>';
        categorias.forEach(categoria => {
            htmlCategorias += `
                <button class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mr-2"
                        onclick="cargarProductosPorCategoria('${categoria}')">
                    ${categoria}
                </button>
            `;
        });
        
        contenedorCategorias.innerHTML = htmlCategorias;

        cargarProductosPorCategoria('todas');
    } catch (error) {
        console.error('Error al cargar las categorías:', error);
       
    }
}

async function cargarProductosPorCategoria(categoria) {
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

        const productosFiltrados = categoria === 'todas' ? productos : productos.filter(producto => producto.categoria === categoria);
        
        const contenedorProductos = document.getElementById('contenedor-productos');
        
        let htmlProductos = '';
        productosFiltrados.forEach(producto => {
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

document.addEventListener('DOMContentLoaded', inicializarCategorias);


window.cargarProductosPorCategoria = cargarProductosPorCategoria;