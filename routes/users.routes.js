import { Router } from "express";
import { readFile } from 'fs/promises';
import bcrypt from 'bcryptjs'; 

const router = Router();
const fileUsers = await readFile('./data/users.json', 'utf-8');
const userData = JSON.parse(fileUsers);


router.post('/login', (req, res) => {
    const email = req.body.email;
    const contraseña = req.body.contraseña;

    const result = userData.find(e => e.email === email);

    if (!result) {
        return res.status(404).send({ status: false });
    }

    const controlPass = bcrypt.compareSync(contraseña, result.contraseña);
    console.log(controlPass);

    if (!controlPass) {
        return res.status(401).send({ status: false });
    }

    const data = {
        id: result.id,
        nombre: result.nombre,
        apellido: result.apellido,
        email: result.email,
        activo: result.activo,
        status: true
    };

    res.status(200).json(data);
});

export default router;