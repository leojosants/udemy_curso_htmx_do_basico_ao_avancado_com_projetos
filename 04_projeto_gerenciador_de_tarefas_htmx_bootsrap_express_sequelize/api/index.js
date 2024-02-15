const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const port = 3000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// conexao com sqlite
const sequelize = new Sequelize(
    {
        dialect: 'sqlite',
        storage: 'db/database.sqlite',
    }
);

//  model
const Todo = sequelize.define('Todo',
    {
        text: DataTypes.STRING,
        difficulty: DataTypes.STRING,
        complete: DataTypes.BOOLEAN,
    }
);

// rota para criacao de tarefa
app.post('/todos', async (req, res) => {
    const { text, difficulty } = req.body;

    if (!text || !difficulty) {
        res.send(`
            <div class="alert alert-danger" role="alert">
                Tarefa e dificuldade são obrigatórios!
            </div>
        `);
        return;
    }

    try {
        const newTask = await Todo.create(
            {
                text,
                difficulty,
                complete: false,
            }
        );

        res.send(`
            <div class="alert alert-success" role="alert">
                Tarefa '${newTask.text}' criada com sucesso!
            </div>
        `);
    } catch (error) {
        res.send(`
            <div class="alert alert-danger" role="alert">
                Erro ao criar tarefa!
            </div>
        `);

    }
});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Servidor sendo executado na porta: ${port}`);
    });
});