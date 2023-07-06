//import {Sequelize} from 'sequelize';
const Sequelize = require('sequelize');
const sequelize = new Sequelize('userDB','root','Naveen@1',{
    dialect:'mysql',
    host: 'localhost'
});

module.exports = {sequelize};