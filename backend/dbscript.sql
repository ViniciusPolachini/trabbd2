
CREATE TABLE categoria(
idCategoria INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
nomeCat VARCHAR(45) NOT NULL
);

CREATE TABLE fornecedor(
CNPJ VARCHAR(18) NOT NULL PRIMARY KEY,
nome VARCHAR(100),
telefone VARCHAR(14),
email VARCHAR(50)
);

CREATE TABLE usuario(
CPF VARCHAR(11) NOT NULL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
telefone VARCHAR(45) NOT NULL,
senha VARCHAR(100) NOT NULL,
nivel BOOLEAN NOT NULL
);

CREATE TABLE produto( 
idProduto INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
quantidade_estoque INTEGER NOT NULL, 
descricao VARCHAR(500), 
preco FLOAT NOT NULL, 
marca VARCHAR(45) NOT NULL, 
nome VARCHAR(45) NOT NULL, 
image_uri VARCHAR(200), 
idCategoria INTEGER NOT NULL, 
idFornecedor VARCHAR(18) NOT NULL,
FOREIGN KEY (idCategoria) REFERENCES categoria (idCategoria),
FOREIGN KEY (idFornecedor) REFERENCES fornecedor (CNPJ)
);

CREATE TABLE endereco(
ID_endereco INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
logradouro VARCHAR(120) NOT NULL,
CPF_cliente VARCHAR(11) NOT NULL,
total INTEGER,
FOREIGN KEY (CPF_cliente) REFERENCES usuario (CPF)
);

CREATE TABLE carrinho(
idCarrinho INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
CPF_cliente VARCHAR(11) NOT NULL,
FOREIGN KEY (CPF_cliente) REFERENCES usuario (CPF)
);

CREATE TABLE item(
quantidade INTEGER NOT NULL,
idProduto INTEGER NOT NULL,
idCarrinho INTEGER NOT NULL,
FOREIGN KEY (idProduto) REFERENCES produto (idProduto),
FOREIGN KEY (idCarrinho) REFERENCES carrinho (idCarrinho),
CONSTRAINT id PRIMARY KEY (idProduto, idCarrinho)
);

CREATE TABLE compras(
idCompra INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
idCarrinho INTEGER NOT NULL,
dataCompra DATE,
pagamento VARCHAR(20),
FOREIGN KEY (idCarrinho) REFERENCES carrinho (idCarrinho)
);

CREATE PROCEDURE efetuaCompra(dataCompra DATE, idCarrinho INTEGER, statusPagamento INTEGER)
BEGIN
   SET @estado='';
   CASE statusPagamento
        WHEN 0 THEN SET @estado='pendente';
        WHEN 1 THEN SET @estado='pago';
   END CASE;
   INSERT INTO compras (idCarrinho, dataCompra, pagamento) VALUES (idCarrinho, dataCompra, estado);
END;

 
CREATE PROCEDURE filtraProdutosCat(cat VARCHAR(45))
BEGIN
   SELECT * FROM produto INNER JOIN categoria ON produto.idCategoria = categoria.idCategoria WHERE nomeCat=cat;
END;

CREATE PROCEDURE reduzEstoque(baixa INTEGER, id INTEGER) 
BEGIN
   SET @reducao=baixa;
   SET @idProd=id;
   SET @quantidade=(SELECT quantidade_estoque FROM produto WHERE @idProd=idProduto);
   UPDATE produto SET quantidade_estoque=@quantidade-@reducao WHERE @idProd=idProduto;
END;

CREATE PROCEDURE aumentaEstoque(acrescimo INTEGER, id INTEGER)
BEGIN
   SET @aumento=acrescimo;
   SET @idProd=id;
   SET @quantidade=0;
   SELECT @quantidade=quantidade_estoque FROM produto WHERE @idProd=idProduto;
   UPDATE produto SET quantidade_estoque=@quantidade-@aumento WHERE @idProd=idProduto;
END;

CREATE TRIGGER operacaoCompra AFTER INSERT ON compras
FOR EACH ROW
BEGIN
   FOR EACH ROW idProduto, quantidade IN carrinho WHERE compras.idCarrinho=idCarrinho
   BEGIN
      CALL reduzEstoque(idProduto, quantidade);
   END;
END;