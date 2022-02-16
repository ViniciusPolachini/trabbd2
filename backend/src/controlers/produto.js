const DB = require('../database/index');

module.exports = {
    create(req, res){
        const {descricao, preco, nome, marca, image_uri, id_Categoria, id_Fornecedor, estoque} = req.body;
        DB.query(`INSERT INTO produto (descricao, quantidade_estoque,preco, nome, marca, image_uri, idCategoria, idFornecedor) VALUES ("${descricao}", ${estoque},${preco},"${nome}","${marca}","${image_uri}",${id_Categoria},"${id_Fornecedor}")`,(err, data)=>{
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    },
    addEstoque(req, res){
        const {remessa, idProduto} = req.body;
        DB.query(`UPDATE produto SET quantidade_estoque = (quantidade_estoque + "${remessa}") WHERE produto.idProduto = "${idProduto}"`,(err, data)=>{
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    },
    read(req, res){
        DB.query('SELECT * FROM produto INNER JOIN categoria ON produto.idCategoria = categoria.idCategoria', (err, data) => {
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    },
    readCat(req, res){
        const {categoria} = req.query;
        DB.query(`CALL filtraProdutosCat("${categoria}")`, (err, data) => {
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    },
    readNome(req, res){
        const {nome} = req.query;
        console.log(nome);
        DB.query(`SELECT * FROM (produto INNER JOIN categoria ON produto.idCategoria = categoria.idCategoria) WHERE produto.nome LIKE "%${nome}%"`, (err, data) => {
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    }

}