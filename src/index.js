var app = require('express')()
var bodyParser = require('body-parser');
var router = require('./routes/routes')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/',router);

app.listen(8080, () => {console.log('The server is running')})