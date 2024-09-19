import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const router = Router()

let fileUsuarios = await readFile('./data/usuarios.json', 'utf-8')
let usuariosData = JSON.parse(fileUsuarios)

let fileVentas = await readFile('./data/ventas.json', 'utf-8')
let ventasData = JSON.parse(fileVentas)

router.get('/nameAndSurnameById/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const usuario = usuariosData.find(user => user.id === id)
    if (usuario) {
        res.status(200).json({ nombre: usuario.nombre, apellido: usuario.apellido })
    } else {
        res.status(400).json(`${id} no se encuentra`)
    }
})

router.get('/emailById/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const usuario = usuariosData.find(user => user.id === id)
    if (usuario) {
        res.status(200).json({ email: usuario.email })
    } else {
        res.status(400).json(`${id} no se encuentra`)
    }
})

router.post('/create', async (req, res) => {
    try {
        const newUsuario = req.body

        let usuariosData = JSON.parse(await readFile('./data/usuarios.json', 'utf-8'))

        usuariosData.push(newUsuario)

        await writeFile('./data/usuarios.json', JSON.stringify(usuariosData, null, 2))
        res.status(201).json('Usuario creado')
    } catch (error) {
        res.status(500).json('Error al crear el usuario')
    }
})

router.post('/sensitiveData', (req, res) => {
    const { id } = req.body
    const usuario = usuariosData.find(user => user.id === id)
    if (usuario) {
        const sensitiveInfo = {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            contraseña: usuario.contraseña 
        }
        res.status(200).json(sensitiveInfo)
    } else {
        res.status(400).json('Usuario no encontrado')
    }
})

router.put('/update', async (req, res) => {
    try {
        const { id, ...updatedData } = req.body
        let fileUsuarios = await readFile('./data/usuarios.json', 'utf-8')
        let usuariosData = JSON.parse(fileUsuarios)

        const usuarioIndex = usuariosData.findIndex(user => user.id === id)
        if (usuarioIndex !== -1) {
          
            usuariosData[usuarioIndex] = { ...usuariosData[usuarioIndex], ...updatedData }
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
    const id = parseInt(req.params.id)

    try {
        const fileUsuarios = await readFile('./data/usuarios.json', 'utf-8')
        let usuariosData = JSON.parse(fileUsuarios)

        if (ventasData.some(venta => venta.id_usuario === id)) {
            return res.status(400).json('No se puede eliminar el usuario porque tiene ventas asociadas.')
        }

        const usuariosFiltrados = usuariosData.filter(user => user.id !== id)
        if (usuariosFiltrados.length === usuariosData.length) {
            return res.status(404).json('Usuario no encontrado')
        }

        await writeFile('./data/usuarios.json', JSON.stringify(usuariosFiltrados, null, 2))
        res.status(200).json('Usuario eliminado')
    } catch (error) {
        res.status(500).json('Error al eliminar el usuario')
    }
})

export default router