const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const app = express();
const port = 3000;

// gerenciamento da seção

// configuracao EJS
app.set('view engine', 'ejs');

// middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // extrair resposta do formulário

// caminho para arquivos

// rotas

app.listen(port, () => {
    console.log(`Servidor inicializado na porta ${port}`);
});