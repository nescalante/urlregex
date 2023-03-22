const tap = require('tap');
const regex = require('../server.js');

const exactFixtures = [
  'http://foo.com/blah_blah',
  'http://foo.com/blah_blah/',
  'http://foo.com/blah_blah_(wikipedia)',
  'http://foo.com/blah_blah_(wikipedia)_(again)',
  'http://www.example.com/wpstyle/?p=364',
  'https://www.example.com/foo/?bar=baz&inga=42&quux',
  'http://a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.com',
  'http://mw1.google.com/mw-earth-vectordb/kml-samples/gp/seattle/gigapxl/$[level]/r$[y]_c$[x].jpg',
  'http://user:pass@example.com:123/one/two.three?q1=a1&q2=a2#body',
  'http://✪df.ws/123',
  'http://localhost/',
  'http://userid:password@example.com:8080',
  'http://userid:password@example.com:8080/',
  'https://simplecloudwebservice_1_0_6.apps1-fm-int.icloud.intel.com',
  'http://userid@example.com',
  'http://userid@example.com/',
  'http://userid@example.com:8080',
  'http://userid@example.com:8080/',
  'http://userid:password@example.com',
  'http://userid:password@example.com/',
  'http://142.42.1.1/',
  'http://142.42.1.1:8080/',
  'http://➡.ws/䨹',
  'http://⌘.ws',
  'http://⌘.ws/',
  'http://foo.com/blah_(wikipedia)#cite-1',
  'http://foo.com/blah_(wikipedia)_blah#cite-1',
  'http://foo.com/unicode_(✪)_in_parens',
  'http://foo.com/(something)?after=parens',
  'http://☺.damowmow.com/',
  'http://code.google.com/events/#&product=browser',
  'http://j.mp',
  'https://foo.bar/baz',
  'http://foo.bar/?q=Test%20URL-encoded%20stuff',
  'http://مثال.إختبار',
  'http://例子.测试',
  'http://उदाहरण.परीक्षा',
  "http://-.~_!$&'()*+';=:%40:80%2f::::::@example.com",
  'http://1337.net',
  'http://a.b-c.de',
  'http://223.255.255.254',
  'http://example.com?foo=bar',
  'http://example.com#foo',
  'http://localhost:8080',
  'http://foo.ws',
  'http://a.b-c.de',
  'http://223.255.255.254',
  'http://userid:password@example.com',
  'http://➡.ws/䨹',
  'http://localhost:8080',
  'http://foo.ws',
  'http://a.b-c.de',
  'http://223.255.255.254',
  'http://userid:password@example.com',
  'http://➡.ws/䨹',
  'www.google.com/unicorn',
  'https://dev_env.foo.bar',
  'https://dev.env_foo.bar',
  'http://example.com.',
  'http://www.microsoft.xn--comindex-g03d.html.irongeek.com',
  'www.microsoft.xn--comindex-g03d.html.irongeek.com',
  'http://xn--addas-o4a.de/',
  'xn--aerlngus-j80d.com',
  'xn--sngaporeair-zzb.com',
];

const notExactFixtures = [
  'Some text http://example.com some other text',
  "Some text 'http://1337.net' some other text",
  'Some text "http://foo.com/blah_blah/". some other text',
];

const noTldValidationFixtures = [
  'http://foo/blah_blah',
  'https://dc1esbprd01:5042/en/mdm-profitcenterorg-system-api/api/*',
];

const webSocketsFixtures = ['ws://example.com', 'wss://example.com'];

const allowedProtocolFixtures = ['https://something.com', 'amqp://cacho.com', 'about://posta.com', 'ipn://asi.si']
const allowedProtocolWithWebSocketFlagFixtures = ['https://something.com', 'amqp://cacho.com', 'wss://websocke.com', 'ws://professsssiona.com'];
const allowedProtocolWithTldFalseFixtures = ['https://something', 'amqp://cacho', 'loquede://a100meduermo']
const anyProtocolFixtures = ['https://something.com', 'amqp://asd.com', 'newprotocolintheworld://hi.com', 'yes.com'];

for (const x of exactFixtures) {
  tap.ok(regex().test(x), x);
}

for (const x of notExactFixtures) {
  tap.ok(regex({ exact: false }).test(x), x);
}

for (const x of noTldValidationFixtures) {
  tap.ok(regex({ tld: false }).test(x), x);
}

for (const x of webSocketsFixtures) {
  tap.ok(regex({ allowWebSockets: true }).test(x), x);
}

for (const x of allowedProtocolFixtures) {
  tap.ok(regex({ allowedProtocols: ['https', 'amqp', 'about', 'ipn'] }).test(x), x)
}

for (const x of allowedProtocolWithWebSocketFlagFixtures) {
  tap.ok(regex({ allowedProtocols: ['https', 'amqp'], allowWebSockets: true }).test(x), x)
}

for (const x of allowedProtocolWithWebSocketFlagFixtures) {
  tap.ok(regex({ allowedProtocols: ['https', 'amqp'], allowWebSockets: true }).test(x), x)
}

for (const x of allowedProtocolWithTldFalseFixtures) {
  tap.ok(regex({ allowedProtocols: ['https', 'amqp', 'loquede'], tld: false }).test(x), x)
}

for (const x of anyProtocolFixtures) {
  tap.ok(regex({ allowedProtocols: '*' }).test(x), x)
}
