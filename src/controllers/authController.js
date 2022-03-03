import bcrypt from 'bcrypt';
import connection from "../db.js";
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
    try {
        const passwordHash = bcrypt.hashSync(req.body.senha, 10);

        await connection.query(`
                INSERT INTO
                usuarios (nome,email,senha)
                values($1,$2,$3)`
            , [req.body.nome, req.body.email, passwordHash]);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function signIn(req, res) {
    try {
        const userExists = await connection.query("SELECT * FROM usuarios WHERE email=$1", [req.body.email]);
        if (userExists.rowCount === 0) {
            return res.sendStatus(401);
        }

        const user = userExists.rows[0];
        if (!bcrypt.compareSync(req.body.senha, user.senha)) {
            return res.sendStatus(401);
        }

        const token = uuid();

        await connection.query(`
            INSERT INTO
                sessoes("idUsuario", token)
                VALUES($1, $2)
        `, [user.id, token]);

        res.status(200).send(token);
    } catch (error) {

        res.status(500).send(error);
    }
}
