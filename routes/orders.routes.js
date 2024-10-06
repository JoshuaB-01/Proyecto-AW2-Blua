import { Router } from "express";
import { readFile, writeFile } from 'fs/promises';

const router = Router();

router.post('/create', async (req, res) => {
    try {
        const { usuario, items } = req.body;

        let orders = [];
        try {
            const fileOrders = await readFile('./data/orders.json', 'utf-8');
            orders = JSON.parse(fileOrders);
        } catch (error) {
            
        }

        const total = items.reduce((sum, item) => sum + item.total, 0);
       
        const newOrder = {
            id: orders.length + 1,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email
            },
            items: items.map(item => ({
                id: item.id,
                nombre: item.nombre,
                cantidad: item.cantidad,
                precio: item.precio,
                total: item.total
            })),
            total: total,
            fecha: new Date().toISOString(),
            estado: 'finalizado'
        };

        orders.push(newOrder);

        await writeFile('./data/orders.json', JSON.stringify(orders, null, 2));

        res.status(201).json({ message: 'Orden creada con éxito', order: newOrder });
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;