const DB = require('../database/index');
const carrinho = require('./carrinho');
const item = require('./item');

module.exports = {
    create(req, res){
        const {listaProdutos,CPF,statusPagamento} = req.body;
        DB.query(`INSERT INTO carrinho (CPF_cliente) VALUES ("${CPF}")`,(err, data)=>{
            if(err) throw res.status(500).json({msg: err.message});
            listaProdutos.forEach((produto)=>{
                DB.query(`INSERT INTO item (quantidade, idCarrinho, idProduto) VALUES (${produto.quantidade}, ${data.insertId}, ${produto.idProduto})`,(err, data)=>{
                    if(err) throw res.status(500).json({msg: err.message});
                });
                DB.query(`CALL reduzEstoque(${produto.quantidade},${produto.idProduto})`,(err, data)=>{
                    if(err) throw res.status(500).json({msg: err.message});
                });
            });
            DB.query(`CALL efetuaCompra(${data.insertId}, ${statusPagamento})`,(err, data)=>{
            if(err) throw res.status(500).json({msg: err.message});
                return res.status(200).json(data);
            });
        });
    },
    read(req, res){
        const sql = `SELECT *\
        FROM (( compras INNER JOIN carrinho ON compras.idCarrinho = carrinho.idCarrinho)
        INNER JOIN usuario ON carrinho.CPF_cliente = usuario.CPF)`;
        DB.query(sql, (err, data) => {
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    }
}