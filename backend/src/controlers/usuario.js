const DB = require('../database/index');

module.exports = {
    create(req, res){
        const {nome, CPF, telefone, email, senha, nivel} = req.body;
        DB.query(`INSERT INTO usuario (nome, CPF, telefone, email, senha, nivel) VALUES ("${nome}", "${CPF}", "${telefone}","${email}", "${senha}", ${nivel})`,(err, data)=>{
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    },
    read(req, res){
        DB.query('SELECT nome, telefone, email, CPF, nivel FROM usuario', (err, data) => {
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    }

}