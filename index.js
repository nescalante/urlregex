'use strict';

module.exports = function () {
  var ip = '(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}';
  var protocol = '(?:http(s?)\:\/\/)?';
  var auth = '(?:\\S+(?::\\S*)?@)?';
  var host = '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)';
  var domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
  var tld = '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?';
  var port = '(?::\\d{2,5})?';
  var path = '(?:[/?#][^\\s"]*)?';
  var regex = '(?:' + protocol + '|www\\.)' + auth + '(?:localhost|' + ip + '|' + host + domain + tld + ')' + port + path;

  return new RegExp('(?:^' + regex + '$)', 'i');
};
