const express = require('express');
const { prototype } = require('events');
const exphbs = require('express-handlebars')
const path = require('path');
const logger = require('./middleware/logger')

//init express
const app = express();
//decalare a port
const PORT = process.env.PORT || 3000;

//Handlebars middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');



//Init middleware
// app.use(logger);

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//Create your endpoints/route handlers
// app.get('/', (req ,res) =>  {
//    res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })
//loading file this way is not ideal as  your have to maually route the files i.e. if you have an about page or contact page you have to write logic for them


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/members' , require('./routes/api/members'));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));