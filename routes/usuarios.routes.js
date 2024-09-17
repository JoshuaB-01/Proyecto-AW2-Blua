import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const router = Router()

let fileUsuarios = await readFile('./data/usuarios.json', 'utf-8')
let usuariosData = JSON.parse(fileUsuarios)

let fileVentas = await readFile('./data/ventas.json', 'utf-8')
let ventasData = JSON.parse(fileVentas)

router.get('/byId/:id', (req, res) => {
    const id = parseInt(req.params.id)
    if (usuariosData.id === id) {
        res.status(200).json(usuariosData)
    } else {
        res.status(400).json(`${id} no se encuentra`)
    }
})

router.get('/', (req, res) => {
    res.status(200).json(usuariosData)
})

router.post('/create', async (req, res) => {
    try {
        const newUsuario = req.body
        usuariosData = newUsuario
        await writeFile('./data/usuarios.json', JSON.stringify(usuariosData, null, 2))
        res.status(201).json('Usuario creado')
    } catch (error) {
        res.status(500).json('Error al crear el usuario')
    }
})

router.post('/sensitiveData', (req, res) => {
    const { id } = req.body
    if (usuariosData.id === id) {
        const sensitiveInfo = {
            nombre: usuariosData.nombre,
            apellido: usuariosData.apellido
        }
        res.status(200).json(sensitiveInfo)
    } else {
        res.status(400).json('Usuario no encontrado')
    }
})

router.put('/update', async (req, res) => {
    try {
        const { id, ...updatedData } = req.body
        if (usuariosData.id === id) {
            usuariosData = { ...usuariosData, ...updatedData }
            await writeFile('./data/usuarios.json', JSON.stringify(usuariosData, null, 2))
            res.status(200).json('Usuario modificado')
        } else {
            res.status(400).json('Usuario no encontrado')
        }
    } catch (error) {
        res.status(500).json('Error al actualizar el usuario')
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const isRelatedToSales = ventasData.some(venta => venta.id_usuario === id)
        
        if (isRelatedToSales) {
            return res.status(400).json('No se puede eliminar el usuario porque tiene ventas asociadas.')
        }

        usuariosData = {}
        await writeFile('./data/usuarios.json', JSON.stringify(usuariosData, null, 2))
        res.status(200).json('Usuario eliminado')
    } catch (error) {
        res.status(500).json('Error al eliminar el usuario')
    }
})

export default router