import bcrypt from 'bcrypt';
import connection from "../db.js";

export async function signUp(req, res) {

    const passwordHash = bcrypt.hashSync(req.body.senha, 10)

    const users = await connection.query('select * from usuarios');
    // await connection.query('DELETE FROM usuarios');

    // await connection.query(`
    //         INSERT INTO
    //         usuarios (nome,email,senha)
    //         values($1,$2,$3)`
    //     , [req.body.nome, req.body.email, passwordHash]);

    // res.sendStatus(200);
    res.status(200).send(users.rows);
}

export async function signIn(req, res) {





    res.sendStatus(200);
}
