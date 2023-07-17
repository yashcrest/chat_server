const express = require('express');
const { prototype } = require('events');
const path = require('path');
const moment = require ('moment')
const members = require('./Members')

//init express
const app = express();

//decalare a port
const PORT = process.env.PORT || 3000;

//middleware
const logger = (req,res,next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()}`);
    next();
}


//Init middleware
app.use(logger);

// this routes gets members array
app.get('/api/members', (req, res) => {
    res.json(members);
})
//Create your endpoints/route handlers
// app.get('/', (req ,res) =>  {
//    res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })
//loading file this way is not ideal as  your have to maually route the files i.e. if you have an about page or contact page you have to write logic for them


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));