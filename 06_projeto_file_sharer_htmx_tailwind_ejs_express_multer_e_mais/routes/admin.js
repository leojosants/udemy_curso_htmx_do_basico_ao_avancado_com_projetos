
const express = require('express');
const upload = require('../config/multerConfig');
const { User } = require('../models');
const { File } = require('../models');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
    res.render('layout', { title: 'Admin', template: 'admin' }
    );
});

router.get('/all-files', isAuthenticated, (req, res) => {
    res.render('layout', {
        title: 'Biblioteca de arquivos',
        template: 'allfiles',
        userId: req.session.userId,
        files: [],
    });
});

router.post('/upload', isAuthenticated, upload.single('arquivo'), async (req, res) => {
    const { nome, descricao } = req.body;
    const userId = req.session.userId;

    if (!nome || !req.file) {
        res.status(422).send('Preencha todos os campos!');
        return;
    }

    const caminho = req.file.path;

    try {
        await File.create({ nome, descricao, caminho, userId });

        // buscar e enviar lista de arquivos
        res.send('Deu certo!');

    }
    catch (error) {
        res.send('Erro ao criar arquivo!');
    }
});

module.exports = router;