/**
 * @desc 获取本机ip
 * @return {String} address，当前环境的局域网地址
 */
module.exports.getIPAddress = function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}
/**
 * @desc 获取主机名
 */
module.exports.getHostname = () => require("os").hostname();
