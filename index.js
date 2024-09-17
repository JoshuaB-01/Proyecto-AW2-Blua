import express from 'express'
import { readFile, writeFile } from 'fs/promises'

import usuariosRouter from './routes/usuarios.routes.js'
import ventasRouter from './routes/ventas.routes.js'
import productosRouter from './routes/productos.routes.js'

const app = express()
const port = 3001

app.use(express.json())

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor levantado en puerto ${port}`)
})

// Rutas
app.use('/usuarios', usuariosRouter)
app.use('/ventas', ventasRouter)
app.use('/productos', productosRouter)
