var tcp = require('net');
var userArr = new Array();
var User = require('./user.js').User;
var Message = require('./message.js').Message;
var EventEmit = require('events');
var emiter = new EventEmit();
var user = new User(emiter);
var message = new Message(emiter, userArr);
var socks = new Array();
var debug = require('debug')('main');

var server = tcp.createServer(function (socket) {
  debug(message);
  socket.write('请输入用户名密码和邮箱，用&隔开\n');
  socket.on('data', function (data) {
    var msg = data.toString();
    var name = msg.split('&')[0];
    var pwd = msg.split('&')[1];
    var email = msg.split('&')[2].split('\r\n')[0];
    user.register(name, pwd, email);
    var send = Buffer.from(userArr[0]);
    Sends(send, socket);

  });


});
server.listen(process.env.NODE_PORT || 8080);
server.on('connection', function (socket) {
  socks.push(socket);

});

function Sends(send, rinfo) {
  for (var i = 0; i < socks.length; i++) {
    socks[i].write(send + '注册成功,来自用户' + rinfo.remoteAddress + '\n');
  }
}


