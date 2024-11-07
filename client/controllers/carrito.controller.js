import { getData, deleteCollection } from '../utils/localStorage.controller.js';
import { NavbarComponent } from '../components/navbarComponent.js';
import { FooterComponent } from '../components/footerComponent.js';
import { crearOrden } from '../api/api.js';

async function inicializarCarrito() {
    renderizarNavbar();
    renderizarFooter();
    cargarCarrito();
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

function cargarCarrito() {
    const carrito = getData('carrito');
    const tablaCarrito = document.getElementById('tabla-carrito');

    tablaCarrito.innerHTML = '';

    if (carrito.length === 0) {
        tablaCarrito.innerHTML = '<tr><td colspan="3" class="text-center">El carrito está vacío.</td></tr>';
        return;
    }

    carrito.forEach(item => {
        const fila = tablaCarrito.insertRow();
        fila.innerHTML = `
            <td class="py-2 text-center text-black">${item.nombre}</td>
            <td class="py-2 text-center text-black">${item.cantidad}</td>
            <td class="py-2 text-center text-black">$${item.total ? item.total.toFixed(2) : '0.00'}</td>
        `;
    });

    document.getElementById('vaciarCarrito').addEventListener('click', vaciarCarrito);
    document.getElementById('comprar').addEventListener('click', comprar);
}

function vaciarCarrito() {
    deleteCollection('carrito');
    alert('Carrito vaciado');
    location.reload();
}

async function comprar() {
    const carrito = getData('carrito');
    const usuario = JSON.parse(sessionStorage.getItem('user'));

    if (!usuario) {
        alert('Debe iniciar sesión para realizar la compra');
        return;
    }

    try {
        const ordenData = {
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email
            },
            items: carrito.map(item => ({
                id: item.id,
                nombre: item.nombre,
                cantidad: item.cantidad,
                precio: item.precio,
                total: item.total
            }))
        };

        const result = await crearOrden(ordenData);
        console.log('Orden creada:', result.order);
        alert(`Compra realizada con éxito. Número de orden: ${result.order.id}`);
        vaciarCarrito();
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al procesar su compra. Por favor, intente nuevamente.');
    }
}

document.addEventListener('DOMContentLoaded', inicializarCarrito);