//Loads the express module
const express = require('express');
const ngrok = require('ngrok');


//Creates our express server
const app = express();
const port = process.env.PORT ||3000;

require('dotenv').config();

//parsing middleware
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//Loads the handlebars module
const {engine} = require('express-handlebars');

//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');

//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', engine({
    layoutsDir: __dirname + '/views/layouts',
    //new configuration parameter
    extname: 'hbs',
    // defaultlayout
    defaultLayout:'main',
    partialsDir: __dirname + '/views/partials/'
}));

//Serves static files (we need it to import a css file)
app.use(express.static('public'))

// loading routers
const routes = require('./server/routes/user');
app.use('/', routes);



app.listen(port, () => {
    console.log(`The web server has started on port ${port}`)
                        ngrok.connect(port, function (err, url) {
                            console.log(`Node.js local server is publicly-accessible at ${url}`);
                        });
});
