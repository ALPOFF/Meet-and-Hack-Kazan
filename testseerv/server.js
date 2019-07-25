//connection to db
const { Pool } = require('pg');
var config = {
    user: 'postgres', 
    database: 'KGBDB', 
    password: '12345zxcv', 
    host: 'localhost', 
    port: 5432, 
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000
};



//websocket part
const WebSocket = require('ws');
var clientArray = {};
var imeiArray = {};
var client_user_id;
 

const webSocketServer = new WebSocket.Server({ port: 7777 });

webSocketServer.on('connection', (webSocket) => {
  webSocket.on('message', (message) => {
    console.log('Received:', message);
    //broadcast(message);


coord_arr = message.split(" ");
clientArray[webSocket._socket.remoteAddress] = webSocket;
console.log(coord_arr);

if (coord_arr[0] == "IMEI") {
  imeiArray[webSocket._socket.remoteAddress] = coord_arr[1];
}


var user_imei = imeiArray[webSocket._socket.remoteAddress]

const pool = new Pool(config);
pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});

if (coord_arr[0] == "IMEI") {

pool.query('SELECT * FROM public.imei WHERE "imei"=($1::text)', [user_imei], function(err, res) {
    if(err) {
        return console.error('error running query', err);
    }
    client_user_id = res.rows[0].user_id;
    console.log("YYY"+client_user_id)
    console.log(1)
});
console.log("ZZZ"+client_user_id);


pool.query('SELECT * FROM public.task WHERE "user_id"=($1::int)', [client_user_id], function(err, res) {
    if(err) {
        return console.error('error running query', err);
    }
    console.log("TUT POOL"+JSON.stringify(res));
    console.log("USER_ID: "+res.rows[0]);
  console.log(2)
});


}


else {
pool.query('INSERT INTO public.user_coord (user_id, latitude, longitude) VALUES ($1::int, $2::text, $3::text)', [client_user_id, coord_arr[0], coord_arr[1]], function(err, res) {
    if(err) {
        return console.error('error running query', err);
    }
    console.log('number: "vivelos"');
});
}






  });
});

/*function broadcast(data) {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}*/



//queries


