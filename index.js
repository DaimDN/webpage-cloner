
var http = require('http');
var HttpDispatcher = require('httpdispatcher');
var https = require('https');

var dispatcher     = new HttpDispatcher();

var url = "https://www.imdb.com"

const PORT = 3000;
array = [];

function handleRequest(request, response){
    try {
        console.log(request.url);
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

var server = http.createServer(handleRequest);

dispatcher.onGet("/", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    res.end(array);
});


dispatcher.onError(function(req, res) {
    res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'});
    res.end("<img style='width: 40%; text-align: center;' src= 'https://www.flaticon.com/svg/static/icons/svg/868/868753.svg' />");
});

https.get(url, (res) => {
 

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = rawData;
      array += parsedData;
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});

server.listen(PORT, function(){

    console.log("Server listening on: http://localhost:%s", PORT);
});
