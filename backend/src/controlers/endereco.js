const DB = require('../database/index');

module.exports = {
    create(req, res){
        const {logradouro, CPF} = req.body;
        DB.query(`INSERT INTO endereco (CPF_cliente,logradouro) VALUES ("${CPF}", "${logradouro}")`,(err, data)=>{
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    },
    read(req, res){
        DB.query('SELECT * FROM endereco', (err, data) => {
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    }

}