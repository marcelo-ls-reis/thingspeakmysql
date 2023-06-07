const Sequelize = require('sequelize');

// Configuração do Sequelize
const sequelize = new Sequelize('thingSpeak', 'root', '252300', {
    host: 'localhost',
    dialect: 'mysql',
  });

  sequelize.authenticate().then(function(){ // Verifica se a conexão foi bem sucedida
    console.log("Conectado com sucesso!");
}).catch(function(erro){
    console.log("Falha ao se conectar: " + erro);
});         

module.exports = {sequelize}; // Exporta a conexão com o banco de dados
