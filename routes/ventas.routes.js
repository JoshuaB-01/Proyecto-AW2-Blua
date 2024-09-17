import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const router = Router()

let fileVentas = await readFile('./data/ventas.json', 'utf-8')
let ventasData = JSON.parse(fileVentas)

let fileUsuarios = await readFile('./data/usuarios.json', 'utf-8')
let usuariosData = JSON.parse(fileUsuarios)

router.get('/byId/:id', (req, res) => {
    const id = parseInt(req.params.id)
    if (ventasData.id === id) {
        res.status(200).json(ventasData)
    } else {
        res.status(400).json(`${id} no se encuentra`)
    }
})

router.get('/byUserId/:id_usuario', (req, res) => {
    const id_usuario = parseInt(req.params.id_usuario)
    if (ventasData.id_usuario === id_usuario) {
        res.status(200).json(ventasData)
    } else {
        res.status(400).json(`No se encontraron ventas para el usuario con ID ${id_usuario}`)
    }
})

router.post('/create', async (req, res) => {
    try {
        const newVenta = req.body
        ventasData = newVenta
        await writeFile('./data/ventas.json', JSON.stringify(ventasData, null, 2))
        res.status(201).json('Venta creada')
    } catch (error) {
        res.status(500).json('Error al crear la venta')
    }
})

router.post('/sensitiveData', (req, res) => {
    const { id } = req.body
    if (ventasData.id === id) {
        const sensitiveInfo = {
            total: ventasData.total,
            dirección: ventasData.dirección
        }
        res.status(200).json(sensitiveInfo)
    } else {
        res.status(400).json('Venta no encontrada')
    }
})

router.put('/update', async (req, res) => {
    try {
        const { id, ...updatedData } = req.body
        if (ventasData.id === id) {
            ventasData = { ...ventasData, ...updatedData }
            await writeFile('./data/ventas.json', JSON.stringify(ventasData, null, 2))
            res.status(200).json('Venta modificada')
        } else {
            res.status(400).json('Venta no encontrada')
        }
    } catch (error) {
        res.status(500).json('Error al actualizar la venta')
    }
})

router.delete('/delete', async (req, res) => {
    try {
        const id = ventasData.id
        const isRelatedToUsers = usuariosData.some(usuario => usuario.ventas && usuario.ventas.includes(id))
        
        if (isRelatedToUsers) {
            return res.status(400).json('No se puede eliminar la venta porque está relacionada con un usuario.')
        }

        ventasData = {}
        await writeFile('./data/ventas.json', JSON.stringify(ventasData, null, 2))
        res.status(200).json('Venta eliminada')
    } catch (error) {
        res.status(500).json('Error al eliminar la venta')
    }
})

export default router