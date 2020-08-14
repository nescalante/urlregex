'use strict';
const RE2 = require("re2");


module.exports = function (opts) {
  var exact = (opts && opts.exact !== undefined) ? opts.exact : true;
  var tldvalidation = (opts && opts.tld !== undefined) ? opts.tld : true;
  var allowWebSockets = (opts && opts.allowWebSockets !== undefined) ? opts.allowWebSockets : false;
  var ip = '(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}';
  var protocol = allowWebSockets ? '(?:(http|ws)(s?)\:\/\/)?' : '(?:http(s?)\:\/\/)?';
  var auth = '(?:\\S+(?::\\S*)?@)?';
  var host = '(?:(?:[a-z\\u00a1-\\uffff0-9_]-*)*[a-z\\u00a1-\\uffff0-9]+)';
  var domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
  var tld = tldvalidation ? '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?' : '';
  var port = '(?::\\d{2,5})?';
  var path = '(?:[/?#][^\\s"]*)?';
  var regex = '(?:' + protocol + '|www\\.)' + auth + '(?:localhost|' + ip + '|' + host + domain + tld + ')' + port + path;

  return exact ? new RE2('(?:^' + regex + '$)', 'i') : new RE2(regex, 'ig');
};
