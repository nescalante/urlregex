'use strict';
const RE2 = require("re2");


module.exports = function (opts) {
  var exact = (opts && opts.exact !== undefined) ? opts.exact : true;
  var tldvalidation = (opts && opts.tld !== undefined) ? opts.tld : true;
  var punyCodeValidation = (opts && opts.puny !== undefined) ? opts.puny : false;
  var allowWebSockets = (opts && opts.allowWebSockets !== undefined) ? opts.allowWebSockets : false;
  var ip = '(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}';
  var protocol = allowWebSockets ? '(?:(http|ws)(s?)\:\/\/)?' : '(?:http(s?)\:\/\/)?';
  var auth = '(?:(?:[a-z0-9\\u00a1-\\uffff][-_]*:?)+@)?';
  var host = '(?:(?:[a-z0-9\\u00a1-\\uffff][-_]*)?[a-z0-9\\u00a1-\\uffff]+[_]*)';
  var domain = '(?:\\.(?:[a-z0-9\\u00a1-\\uffff][-_]*)?[a-z0-9\\u00a1-\\uffff]+[_]*)*';
  var tld = tldvalidation ? '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?' : '';
  var port = '(?::\\d{2,5})?';
  var path = '(?:([\\/?#]|xn--)[^\\s"]*)?';
  var puny = punyCodeValidation ? '(?:^(?=.{1,64}$).*)' : '';
  var regex = puny + '(?:' + protocol + '|www\\.)' + auth + '(?:localhost|' + ip + '|' + host + domain + tld + ')' + port + path;

  return exact ? new RE2('(?:^' + regex + '$)', 'i') : new RE2(regex, 'ig');
};
