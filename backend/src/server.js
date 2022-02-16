const express = require('express');
const routes = require('./routes');

require('./database/index');
const app = express();

let cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(routes);
app.listen(5001, ()=>{})