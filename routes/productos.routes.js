import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const router = Router()

let fileProductos = await readFile('./data/productos.json', 'utf-8')
let productosData = JSON.parse(fileProductos)

router.get('/categoriaById/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productosData.find(prod => prod.id === id)
    if (producto) {
        res.status(200).json({ categoria: producto.categoria })
    } else {
        res.status(400).json(`${id} no se encuentra`)
    }
})

router.get('/nombreById/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productosData.find(prod => prod.id === id)
    if (producto) {
        res.status(200).json({ nombre: producto.nombre })
    } else {
        res.status(400).json(`${id} no se encuentra`)
    }
})

router.post('/create', async (req, res) => {
    try {
        const newProducto = req.body
        let productosData = JSON.parse(await readFile('./data/productos.json', 'utf-8'))
        productosData.push(newProducto)
        await writeFile('./data/productos.json', JSON.stringify(productosData, null, 2))
        res.status(201).json('Producto creado')
    } catch (error) {
        res.status(500).json('Error al crear el producto')
    }
});

router.post('/sensitiveData', (req, res) => {
    const { id } = req.body
    const producto = productosData.find(prod => prod.id === id)
    if (producto) {
        const sensitiveInfo = {
            precio: producto.precio,
            stock: producto.stock 
        }
        res.status(200).json(sensitiveInfo)
    } else {
        res.status(400).json('Producto no encontrado')
    }
})

router.put('/update', async (req, res) => {
    try {
        const { id, ...updatedData } = req.body
        let fileProductos = await readFile('./data/productos.json', 'utf-8')
        let productosData = JSON.parse(fileProductos)
        const productoIndex = productosData.findIndex(prod => prod.id === id)
        if (productoIndex !== -1) {
            productosData[productoIndex] = { ...productosData[productoIndex], ...updatedData }
            await writeFile('./data/productos.json', JSON.stringify(productosData, null, 2))
            res.status(200).json('Producto modificado')
        } else {
            res.status(400).json('Producto no encontrado')
        }
    } catch (error) {
        res.status(500).json('Error al actualizar el producto')
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const fileProductos = await readFile('./data/productos.json', 'utf-8')
        let productosData = JSON.parse(fileProductos)
        const fileVentas = await readFile('./data/ventas.json', 'utf-8')
        let ventasData = JSON.parse(fileVentas)
        if (ventasData.some(venta => venta.productos.includes(id))) {
            return res.status(400).json('No se puede eliminar el producto porque tiene ventas asociadas.')
        }

        const productosFiltrados = productosData.filter(prod => prod.id !== id)
        if (productosFiltrados.length === productosData.length) {
            return res.status(404).json('Producto no encontrado')
        }

        await writeFile('./data/productos.json', JSON.stringify(productosFiltrados, null, 2))
        res.status(200).json('Producto eliminado')
    } catch (error) {
        console.error('Error al eliminar el producto:', error)
        res.status(500).json('Error al eliminar el producto')
    }
});

export default router