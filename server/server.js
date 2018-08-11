const fetch = require('node-fetch');
const request = require('request');

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	port = process.env.PORT || 8080;


app.get('/', (request, response) => {
  response.send('Hello from The Weather channel!')
})


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/api/weather/:cityname', (req, res) => {
	const cityname = req.params.cityname;
	const api_url = "https://api.openweathermap.org/data/2.5/forecast?q=";
	const api_key = "&APPID=f875710aea4e02462c8edf532cad97f3";
	const api_query = encodeURIComponent(cityname);

	request(api_url + api_query + api_key, function (err, body) {
		res.json(body);
	});
});



app.listen(port); console.log("Starting Proxy Server"); 
