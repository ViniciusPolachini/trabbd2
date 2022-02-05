const DB = require('../database/index');

module.exports = {
    create(req, res){
        const {nome} = req.body;
        DB.query(`INSERT INTO categoria (nomeCat) VALUES ("${nome}")`,(err, data)=>{
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    },
    read(req, res){
        DB.query('SELECT * FROM categoria', (err, data) => {
            if(err) throw res.status(500).json({msg: err.message});
            return res.status(200).json(data);
        });
    }

}