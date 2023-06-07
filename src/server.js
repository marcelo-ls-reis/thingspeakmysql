const express = require('express');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
const port = 3001;

// Configuração do Sequelize
const sequelize = new Sequelize('dashboard', 'root', '252300', {
  host: 'localhost',
  dialect: 'mysql',
});

// Definição do modelo
class Data extends Model {}
Data.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    entry_id: {
       type: DataTypes.INTEGER,
       allowNull: false
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    humidity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'data',
  }
);

// Sincroniza o modelo com o banco de dados
sequelize.sync().then(() => {
  console.log('Modelo sincronizado com o banco de dados');
});

app.use(express.json());

// Rota para inserir dados
app.post('/data', async (req, res) => {
  const { entry_id, temperature, humidity } = req.body;

  try {
    const data = await Data.create({ entry_id, temperature, humidity });
    console.log('Dados inseridos:', data);
    res.status(200).json({ message: 'Dados inseridos com sucesso' });
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
    res.status(500).json({ error: 'Erro ao inserir dados' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
