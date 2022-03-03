import connection from "../db.js";

export async function validateTokenMiddleware(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        return res.sendStatus(401);
    }

    const sessionExists = await connection.query('SELECT * FROM sessoes WHERE token=$1', [token]);
    if (sessionExists.rowCount === 0) {
        return res.sendStatus(401);
    }

    const session = sessionExists.rows[0];
    const user = await connection.query('SELECT * FROM usuarios WHERE id=$1', [session.idUsuario]);
    if (user.rowCount === 0) {
        return res.sendStatus(401);
    }

    res.locals.user = user.rows[0];
    next();
}