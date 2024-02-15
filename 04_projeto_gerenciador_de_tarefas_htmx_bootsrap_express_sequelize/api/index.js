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
    }
    catch (error) {
        res.send(`
            <div class="alert alert-danger" role="alert">
                Erro ao criar tarefa!
            </div>
        `);
    }
});

// resgatar tarefas
app.get('/todos', async (req, res) => {
    try {
        const tasks = await Todo.findAll();

        if (tasks.length === 0) {
            res.send(`
                <p>Não há tarefas cadastradas!</p>
            `);
            return;
        }

        // tarefas resgatadas
        let html = tasks.map((task) => (
            `<div class="card mb-3 ${task.complete ? "bg-light border-success" : ""}">
                <div class="card-body ${task.complete ? "font-talic" : ""}">
                    <h5 class="card-title">
                        ${task.text}
                    </h5>
                    <p class="card-text">
                        Dificuldade: ${task.difficulty}
                    </p>
                    <p class="card-text">
                        Status: ${task.complete ? "Completa" : "Incompleta"}
                    </p>
                    <button
                        class="btn btn-primary"
                        onclick="editTask(${task.id}, '${task.text}', '${task.difficulty}')">
                        Editar
                    </button>
                    <button
                        class="btn btn-danger"
                        onclick="deleteTask(${task.id})">
                        Deletar
                    </button>
                    <button
                        class="btn btn-secondary"
                        onclick="toggleTask(${task.id})">
                        ${task.complete ? "Desmarcar" : "Marcar como completa"}
                    </button>
                </div>
            </div>`
        )).join('');

        res.send(html);
    }
    catch (error) {
        res.send(`
            <div class="alert alert-danger" role="alert">
                Erro ao criar tarefa!
            </div>
        `);
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const task = await Todo.findByPk(req.params.id);

        if (task) {
            await task.destroy();
            res.send(`
                <div class="alert alert-success" role="alert">
                    Tarefa excluída com sucesso!
                </div>
            `);
        }
        else {
            res.send('Tarefa não encontrada!');
        }
    }
    catch (error) {
        res.send('Erro ao excluir tarefa!');
    }
});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Servidor sendo executado na porta: ${port}`);
    });
});