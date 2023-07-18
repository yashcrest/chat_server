const express = require('express');
const {engine} = require('express-handlebars');
const { prototype } = require('events');
const path = require('path');
const logger = require('./middleware/logger');

//init express
const app = express();
//decalare a port where server will run
const PORT = process.env.PORT || 3001;

//Handlebars middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views')

//Init middleware
// app.use(logger);

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));


//Homepage route
app.get('/', (req, res) => {
    res.render('index')
})

//Create your endpoints/route handlers
// app.get('/', (req ,res) =>  {
//    res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })
//loading file this way is not ideal as  your have to maually route the files i.e. if you have an about page or contact page you have to write logic for them


//Set static folder --> now the public folder will server static files. 
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/members' , require('./routes/api/members'));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));