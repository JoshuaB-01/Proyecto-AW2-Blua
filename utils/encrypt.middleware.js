import { readFile, writeFile } from 'fs/promises';
import bcrypt from 'bcryptjs';

export const encryptPasswords = async () => {
    try {
        const fileUsers = await readFile('./data/users.json', 'utf-8');
        const usuarios = JSON.parse(fileUsers);

        
        const necesitaEncriptar = usuarios.some(usuario => !usuario.contraseña.startsWith('$2a$'));
        
        if (!necesitaEncriptar) {
            console.log('Las contraseñas ya están encriptadas');
            return;
        }

        const usuariosActualizados = usuarios.map(usuario => {
            if (!usuario.contraseña.startsWith('$2a$')) {
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(usuario.contraseña, salt);
                return { ...usuario, contraseña: hashPassword };
            }
            return usuario;
        });

        await writeFile('./data/users.json', JSON.stringify(usuariosActualizados, null, 2));
        console.log('Contraseñas encriptadas correctamente');
    } catch (error) {
        console.error('Error al encriptar:', error);
    }
};