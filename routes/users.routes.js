import { Router } from "express";
import { readFile } from 'fs/promises';

const router = Router();
const fileUsers = await readFile('./data/users.json', 'utf-8');
const userData = JSON.parse(fileUsers);

router.post('/login', (req, res) => {
    const email = req.body.email; 
    const contraseña = req.body.contraseña; 
    const result = userData.find(e => e.email === email && e.contraseña === contraseña); 
    
    if (result) {
        const data = {
            nombre: result.nombre,
            apellido: result.apellido,
            email: result.email,
            status: true
        };
        console.log(data);
        res.status(200).json(data);
    } else {
        console.log('Usuario no encontrado'); 
        res.status(400).json({ status: false });
    }
});

export default router;