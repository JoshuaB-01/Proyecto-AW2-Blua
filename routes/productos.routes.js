import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const router = Router()

const fileItems = await readFile('./data/productos.json', 'utf-8')
const itemsData = JSON.parse(fileItems)

const fileVentas = await readFile('./data/ventas.json', 'utf-8')
const ventasData = JSON.parse(fileVentas)


router.get('/byId/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const result = itemsData.find(e => e.id === id)
    if (result) {
        res.status(200).json(result)
    } else {
        res.status(400).json(`${id} no se encuentra`)
    }
})


router.get('/byCategory/:categoria', (req, res) => {
    const categoria = req.params.categoria
    const result = itemsData.filter(e => e.categoria === categoria)
    if (result.length > 0) {
        res.status(200).json(result)
    } else {
        res.status(400).json(`${categoria} no se encuentra, intente con su ID`)
    }
});


router.post('/create', async (req, res) => {
    try {
        const newItem = req.body
        itemsData.push(newItem)
        await writeFile('./data/productos.json', JSON.stringify(itemsData, null, 2))
        res.status(201).json('Item creado')
    } catch (error) {
        res.status(500).json('Error al crear el item')
    }
})


router.post('/sensitiveData', async (req, res) => {
    try {
        const { id } = req.body
        const item = itemsData.find(e => e.id === id)
        if (item) {
        
            const sensitiveInfo = {
                precio: item.precio,
                stock: item.stock
            };
            res.status(200).json(sensitiveInfo)
        } else {
            res.status(400).json('Item no encontrado')
        }
    } catch (error) {
        res.status(500).json('Error al obtener datos sensibles')
    }
})


router.put('/changePrice', async (req, res) => {
    try {
        const { id, nuevo_precio } = req.body
        const index = itemsData.findIndex(e => e.id === id)
        if (index !== -1) {
            itemsData[index].precio = nuevo_precio
            await writeFile('./data/productos.json', JSON.stringify(itemsData, null, 2))
            res.status(200).json('Producto modificado')
        } else {
            res.status(400).json('Producto no encontrado')
        }
    } catch (error) {
        res.status(500).json('Error al actualizar el precio')
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const index = itemsData.findIndex(e => e.id === id)
        
        
        const isRelatedToSales = ventasData.some(venta => venta.productos.includes(id))
        
        if (isRelatedToSales) {
            return res.status(400).json('No se puede eliminar el producto porque está relacionado con una venta.')
        }

        if (index !== -1) {
            itemsData.splice(index, 1)
            await writeFile('./data/productos.json', JSON.stringify(itemsData, null, 2))
            res.status(200).json('Item eliminado')
        } else {
            res.status(400).json('Item no encontrado')
        }
    } catch (error) {
        res.status(500).json('Error al eliminar el item')
    }
})

export default router