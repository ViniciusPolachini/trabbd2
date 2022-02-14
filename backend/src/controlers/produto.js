const DB = require('../database/index');

module.exports = {
    create(req, res){
        const {descricao, preco, nome, marca, image_uri, id_Categoria, id_Fornecedor, estoque} = req.body;
        DB.query(`INSERT INTO produto (descricao, quantidade_estoque,preco, nome, marca, image_uri, idCategoria, idFornecedor) VALUES ("${descricao}", ${estoque},${preco},"${nome}","${marca}","${image_uri}",${id_Categoria},"${id_Fornecedor}")`,(err, data)=>{
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
        const {categoria} = req.body;
        DB.query(`CALL filtraProdutosCat("${categoria}")`, (err, data) => {
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    },
    readNome(req, res){
        const {nome} = req.body;
        console.log(nome);
        DB.query(`SELECT * FROM produto INNER JOIN categoria ON produto.idCategoria = categoria.idCategoria WHERE "${nome}"=produto.nome`, (err, data) => {
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    }

}