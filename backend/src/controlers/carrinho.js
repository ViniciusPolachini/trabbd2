const DB = require('../database/index');

module.exports = {
    create(req, res){
        const {CPF} = req.body;
        DB.query(`INSERT INTO carrinho (CPF_cliente) VALUES ("${CPF}")`,(err, data)=>{
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    },
    read(req, res){
        const sql = `SELECT *\
        FROM (( item INNER JOIN produto ON item.idProduto = produto.idProduto)
        INNER JOIN carrinho ON carrinho.idCarrinho = item.idCarrinho)`;
        DB.query(sql, (err, data) => {
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    }
}