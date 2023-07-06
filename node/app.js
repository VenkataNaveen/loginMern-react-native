const express = require('express');
const app =  express();
const {sequelize}=require("./util/database");

const user = require('./routes/auth');

app.use(express.json());

require('dotenv').config();


sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 
 sequelize.sync().then(() => {
    console.log('Book table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 app.use('/user',user);
 

app.listen(3000,(err)=>{
    if(err) {
        console.error("something is wrong");
    } 
    console.log("successfully running ")
})
