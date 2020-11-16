//Importa o express
const express = require('express');
//Importa o path
const path = require('path');

//Cria a aplicação express
const app = express();
//Define a comunicação http para a aplicação
const server = require('http').createServer(app);
//Define a comunicação websocket para a aplicação
const io = require('socket.io')(server);

//Especifica a pasta onde estará o front end da aplicação
app.use(express.static(path.join(__dirname, 'public')));

//Especifica a parte onde estará as views da aplicação
app.set('views', path.join(__dirname, 'public'));

//Importa a engine 'ejs' e seta em html
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');


//Rota base que retorna o index
app.use('/', (req,res)=> {
    res.render('index.html');
});

let messages = []

io.on('connection', socket => {

    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {
        messages.push(data)
        socket.broadcast.emit('receivedMessage', data)
    });
});

//Define a porta local que o servidor vai estar escutando
server.listen(3000)