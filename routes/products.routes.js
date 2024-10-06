import { Router } from "express";
import { readFile } from 'fs/promises';

const router = Router();

router.get('/products', async (req, res) => {
    try {
        const fileProducts = await readFile('./data/products.json', 'utf-8');
        const products = JSON.parse(fileProducts);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al leer el archivo de productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;