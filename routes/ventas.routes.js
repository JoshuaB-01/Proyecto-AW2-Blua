import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const router = Router()

let fileVentas = await readFile('./data/ventas.json', 'utf-8')
let ventasData = JSON.parse(fileVentas)

router.get('/byId/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const venta = ventasData.find(venta => venta.id === id)
    if (venta) {
        res.status(200).json(venta)
    } else {
        res.status(400).json(`${id} no se encuentra`)
    }
})

router.get('/byUserId/:id_usuario', (req, res) => {
    const id_usuario = parseInt(req.params.id_usuario)
    const ventasUsuario = ventasData.filter(venta => venta.id_usuario === id_usuario)
    if (ventasUsuario.length > 0) {
        res.status(200).json(ventasUsuario)
    } else {
        res.status(400).json(`No se encontraron ventas para el usuario con ID ${id_usuario}`)
    }
})

router.post('/create', async (req, res) => {
    try {
        const newVenta = req.body
        ventasData.push(newVenta)
        await writeFile('./data/ventas.json', JSON.stringify(ventasData, null, 2))
        res.status(201).json('Venta creada')
    } catch (error) {
        res.status(500).json('Error al crear la venta')
    }
})

router.put('/update', async (req, res) => {
    try {
        const { id, ...updatedData } = req.body
        const ventaIndex = ventasData.findIndex(venta => venta.id === id)
        if (ventaIndex !== -1) {
            ventasData[ventaIndex] = { ...ventasData[ventaIndex], ...updatedData }
            await writeFile('./data/ventas.json', JSON.stringify(ventasData, null, 2))
            res.status(200).json('Venta modificada')
        } else {
            res.status(400).json('Venta no encontrada')
        }
    } catch (error) {
        res.status(500).json('Error al actualizar la venta')
    }
})

router.delete('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const fileVentas = await readFile('./data/ventas.json', 'utf-8')
        let ventasData = JSON.parse(fileVentas)

        const fileUsuarios = await readFile('./data/usuarios.json', 'utf-8')
        let usuariosData = JSON.parse(fileUsuarios)

        if (ventasData.some(venta => venta.id === id)) {
            const id_usuario = ventasData.find(venta => venta.id === id).id_usuario
            if (usuariosData.some(user => user.id === id_usuario)) {
                return res.status(400).json('No se puede eliminar la venta porque está asociada a un usuario existente.')
            }
        }

        const ventaIndex = ventasData.findIndex(venta => venta.id === id)
        if (ventaIndex !== -1) {
            ventasData.splice(ventaIndex, 1)
            await writeFile('./data/ventas.json', JSON.stringify(ventasData, null, 2))
            res.status(200).json('Venta eliminada')
        } else {
            res.status(400).json('Venta no encontrada')
        }
    } catch (error) {
        res.status(500).json('Error al eliminar la venta')
    }
})

export default router