'use strict';

module.exports = function (RE) {
  return function (opts) {
    var exact = opts && opts.exact !== undefined ? opts.exact : true;
    var tldvalidation = opts && opts.tld !== undefined ? opts.tld : true;
    var allowWebSockets =
      opts && opts.allowWebSockets !== undefined ? opts.allowWebSockets : false;
    var allowedProtocols =
      opts && opts.allowedProtocols !== undefined ? opts.allowedProtocols : ['http', 'https'];

    if (allowedProtocols  !== '*' && allowWebSockets) {
      allowedProtocols = allowedProtocols.concat('ws', 'wss');
    }

    var ip =
      '(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}';
    var protocol = allowedProtocols === '*' ? '(?:(?:[a-z]+:)?//)?' : '(?:('+ allowedProtocols.join('|') +')://)?';
    var auth = '(?:\\S+(?::\\S*)?@)?';
    var host = '(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)';
    var domain =
      '(?:\\.(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)*';
    var tld = tldvalidation ? '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?' : '';
    var port = '(?::\\d{2,5})?';
    var path = '(?:[/?#][^\\s"]*)?';
    var regex =
      '(?:' +
      protocol +
      '|www\\.)' +
      auth +
      '(?:localhost|' +
      ip +
      '|' +
      host +
      domain +
      tld +
      ')' +
      port +
      path;

    return exact ? new RE('(?:^' + regex + '$)', 'i') : new RE(regex, 'ig');
  };
};
