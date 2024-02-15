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

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Servidor sendo executado na porta: ${port}`);
    });
});