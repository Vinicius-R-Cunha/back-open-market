import connection from "../db.js";

export async function getProducts(req, res) {
    const { user } = res.locals;

    try {
        const products = await connection.query(`
            SELECT 
                produtos.*,
                usuarios.nome AS "nomeUsuario",
                categorias.nome AS "nomeCategoria"
            FROM produtos
                JOIN usuarios ON usuarios.id=produtos."idUsuario"
                JOIN "produtosCategorias" ON "produtosCategorias"."idProduto"=produtos.id
                JOIN categorias ON categorias.id="produtosCategorias"."idCategoria"
            WHERE "idUsuario"=$1`, [user.id]);

        res.send(products.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}