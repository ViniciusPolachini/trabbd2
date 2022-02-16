const DB = require('../database/index');

module.exports = {
    create(req, res){
        const {logradouro, CPF, cep} = req.body;
        DB.query(`INSERT INTO endereco (CPF_cliente,logradouro, cep) VALUES ("${CPF}", "${logradouro}", "${cep}")`,(err, data)=>{
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    },
    read(req, res){
        const {CPF} = req.query
        DB.query(`SELECT * FROM endereco WHERE "${CPF}"=endereco.CPF_cliente`, (err, data) => {
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    }

}