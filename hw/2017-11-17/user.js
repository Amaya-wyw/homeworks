var debug = require('debug')('xxx');
let states = require('../states').states;

function User(socket) {
  socket.on(states.USER_NOT_LOGIN, (state, socket, data) => {
    this.notLogin(state, socket, data);
  });
}

User.prototype.notLoginHome = function (state, socket, data) {
  debug('log:' + 'inside user not login');
  socket.write('欢迎来到XXX邮件系统！请选择\n\t1.用户注册\n\t2.用户登录\n');
  state.action = 'wait';
  debug('log:' + data);
};

User.prototype.notLoginWait = function (state, socket, data) {
  let input = state.getCleanedString(socket, data);
  debug('log:' + 'input = ' + input);
  switch (input) {
  case '1':
    debug('log:' + 'inside not login wait 1');
    socket.write('\n请输入注册邮箱和密码，格式： 邮箱 密码\n');
    state.action = 'register';
    break;
  case '2':
    debug('log:' + 'inside not login wait 2');
    socket.write('\n请输入登录邮箱和密码，格式： 邮箱 密码\n');
    state.action = 'login';
    break;
  default:
    debug('log:' + 'inside not login wait default');
    break;
  }
};


User.prototype.notLogin = function (state, socket, data) {
  debug('log:' + 'inside not login');
  if (!state.action) {
    debug('log:' + 'inside not login home');
    this.notLoginHome(state, socket, data);
  } else {
    debug('log:' + 'inside not login else');
    switch (state.action) {
    case 'wait':
      debug('log:' + 'inside not login wait');
      this.notLoginWait(state, socket, data);
      break;
    }
  }
};

exports.User = User;
