const express = require('express');
const routes = express.Router();

const categoria = require('./controlers/categoria');
const produto = require('./controlers/produto');
const usuario = require('./controlers/usuario');
const endereco = require('./controlers/endereco');
const item = require('./controlers/item');
const carrinho = require('./controlers/carrinho');
const fornecedor = require('./controlers/fornecedor');
const compras = require('./controlers/compras');

//categoria
routes.get('/categoria', (req, res) => categoria.read(req, res));
routes.post('/categoria', (req, res) => categoria.create(req, res));

//categoria
routes.get('/compras', (req, res) => compras.read(req, res));
routes.post('/compras', (req, res) => compras.create(req, res));

//fornecedor
routes.get('/fornecedor', (req, res) => fornecedor.read(req, res));
routes.get('/fornecedor/nome', (req, res) => fornecedor.readNome(req, res));
routes.post('/fornecedor', (req, res) => fornecedor.create(req, res));

//produto
routes.get('/produto', (req, res) => produto.read(req, res));
routes.get('/produto/categoria', (req, res) => produto.readCat(req, res));
routes.get('/produto/nome', (req, res) => produto.readNome(req, res));
routes.post('/produto', (req, res) => produto.create(req, res));
routes.post('/produto/addEstoque', (req, res) => produto.addEstoque(req, res));

//usuario
routes.get('/usuario', (req, res) => usuario.read(req, res));
routes.post('/usuario', (req, res) => usuario.create(req, res));

//carrinho
routes.post('/carrinho', (req, res) => carrinho.create(req, res));
routes.get('/carrinho', (req, res) => carrinho.read(req, res));

//item
routes.get('/item', (req, res) => item.read(req, res));
routes.post('/item', (req, res) => item.create(req, res));

//endereco
routes.get('/endereco', (req, res) => endereco.read(req, res));
routes.post('/endereco', (req, res) => endereco.create(req, res));


module.exports = routes;