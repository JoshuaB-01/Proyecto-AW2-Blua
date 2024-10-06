import express from 'express'
import cors from 'cors';
import { readFile, writeFile } from 'fs/promises'

import usersRouter from './routes/users.routes.js'
import productsRouter from './routes/products.routes.js'
import ordersRouter from './routes/orders.routes.js'
const app = express()
const port = 3001


app.use(cors());
app.use(express.json())

app.use(express.static('./client'))

app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/orders', ordersRouter)

app.listen(port, () => {
    console.log(`Servidor levantado en puerto ${port}`)
})

