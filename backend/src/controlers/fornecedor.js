const DB = require('../database/index');

module.exports = {
    create(req, res){
        const {nome, CNPJ, telefone, email} = req.body;
        DB.query(`INSERT INTO fornecedor (nome, CNPJ, telefone, email) VALUES ("${nome}", "${CNPJ}", "${telefone}","${email}")`,(err, data)=>{
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    },
    read(req, res){
        DB.query('SELECT nome, CNPJ, telefone, email FROM fornecedor', (err, data) => {
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    }

}