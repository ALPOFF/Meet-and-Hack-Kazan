//connection to db
const { Pool } = require('pg');
var config = {
    user: 'postgres', 
    database: 'Geo', 
    password: '12345zxcv', 
    host: 'localhost', 
    port: 5432, 
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000
};






//websocket part
const WebSocket = require('ws');

const webSocketServer = new WebSocket.Server({ port: 7777 });

webSocketServer.on('connection', (webSocket) => {
  webSocket.on('message', (message) => {
    console.log('Received:', message);
    broadcast(message);


coord_arr = message.split(" ");
console.log(coord_arr);

const pool = new Pool(config);
pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});
pool.query('INSERT INTO public."GeoTest"(latitude, longitude) VALUES ($1::text, $2::text)', [coord_arr[0], coord_arr[1]], function(err, res) {
    if(err) {
        return console.error('error running query', err);
    }
    console.log('number: "vivelos"'/*, res.rows[1].latitude*/);
});


  });
});

function broadcast(data) {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}



//queries


