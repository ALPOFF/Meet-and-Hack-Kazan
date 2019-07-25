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


    pool.query('SELECT id, deadline, text, status FROM public.task WHERE "user_id"=($1::int)', [client_user_id], function(err, res) {
    if(err) {
        return console.error('error running query', err);
    }
    webSocket.send(JSON.stringify(res.rows));
});
});
}
else if(coord_arr[0]=="status"){
  pool.query('UPDATE public.task SET "status"=true WHERE "user_id"='+client_user_id, function(err, res) {
    if(err) {
        return console.error('error running query', err);
    }
    console.log('number: "vivelos"');
    pool.query('SELECT * FROM public.imei WHERE "imei"=($1::text)', [user_imei], function(err, res) {
    if(err) {
        return console.error('error running query', err);
    }
    client_user_id = res.rows[0].user_id;
    pool.query('SELECT id, deadline, text, status FROM public.task WHERE "user_id"=($1::int)', [client_user_id], function(err, res) {
    if(err) {
        return console.error('error running query', err);
    }
    webSocket.send(JSON.stringify(res.rows));
});


});
});
}

else {
  let value = 'DO $do$ BEGIN IF (SELECT "user_id" FROM public.user_coord WHERE "user_id" = '+client_user_id+') is NULL THEN INSERT INTO public.user_coord (user_id, latitude,longitude) VALUES ('+client_user_id+', '+coord_arr[0]+', '+coord_arr[1]+'); ELSE UPDATE public.user_coord SET "latitude" = ('+coord_arr[0]+'), "longitude" = ('+coord_arr[1]+') WHERE "user_id" = ('+client_user_id+'); END IF; END $do$';


pool.query(value, function(err, res) {
    if(err) {
        return console.error('error running query', err);
    }
    console.log('number: "vivelos"');
});
}

  });

});



const webSocketServerAdmin = new WebSocket.Server({ port: 3000 });

webSocketServerAdmin.on('connection', (webSocketAdmin) => {
  webSocketAdmin.on('message', (messageAdmin) => {
    console.log('Received:', messageAdmin);
    const msg = messageAdmin;
    const pool = new Pool(config);
    pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
 
});

    if (msg == "hello")  {
      console.log("IFIF");
    pool.query('SELECT * FROM public.user AS u, public.user_coord AS us where us.user_id = u.id ', function(err, res) {
    if(err) {
        return console.error('error running query', err);
    }
    webSocketAdmin.send("USER "+JSON.stringify(res.rows));
    console.log("USER "+JSON.stringify(res.rows));
});
}
    else if (msg.split(":")[0] == 'id_from_admin') {

        pool.query('SELECT * FROM public.task WHERE "user_id" = '+msg.split(":")[1], function(err, res) {
    if(err) {
        return console.error('error running query', err);
    }
    webSocketAdmin.send(JSON.stringify(res.rows));
    console.log("TASK "+JSON.stringify(res.rows))
});
}

else {
  console.log("ERROR");
}



});

});
