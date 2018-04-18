const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/../client/dist'));


app.listen('3000', () => {
	console.log('listening at port 3000');
})