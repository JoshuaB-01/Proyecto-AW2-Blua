import { readFile } from 'fs/promises'

const leerJSON = async () => {
    const productos = JSON.parse(await readFile('./productos.json', 'utf-8'))
    const usuarios = JSON.parse(await readFile('./usuarios.json', 'utf-8'))
    const ventas = JSON.parse(await readFile('./ventas.json', 'utf-8'))
    return { productos, usuarios, ventas }
}

const mostrarProductos = (productos) => {
    console.log('Productos Destacados:')
    productos.slice(0, 3).forEach(producto => {
        console.log(`- ${producto.nombre}`)
        console.log(`  Descripción: ${producto.desc}`)
        console.log(`  Precio: $${producto.precio.toFixed(2)}`)
        console.log(`  Stock: ${producto.stock}`)
        console.log()
    })
}

const mostrarUsuarios = (usuarios) => {
    console.log('Usuarios Destacados:')
    usuarios.slice(0, 3).forEach(usuario => {
        console.log(`- ${usuario.nombre} ${usuario.apellido}`)
    })
    console.log()
}

const mostrarVentas = (ventas) => {
    console.log('Últimas Ventas:')
    ventas.slice(0, 5).forEach(venta => {
        console.log(`- Venta #${venta.id} - Total: $${venta.total.toFixed(2)}`)
    })
}


try {
    const { productos, usuarios, ventas } = await leerJSON()

    console.log('Resumen de la Tienda\n')

    mostrarProductos(productos)
    mostrarUsuarios(usuarios)
    mostrarVentas(ventas)
} catch (error) {
    console.error('Error al leer los archivos JSON:', error)
}
