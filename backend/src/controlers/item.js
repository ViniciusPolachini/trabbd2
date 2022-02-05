const DB = require('../database/index');

module.exports = {
    create(req, res){
        const {quantidade, idProduto, idCarrinho} = req.body;
        DB.query(`INSERT INTO item (quantidade, idCarrinho, idProduto) VALUES (${quantidade}, ${idCarrinho}, ${idProduto})`,(err, data)=>{
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    },
}