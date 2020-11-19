const tap = require('tap');
const regex = require('../server.js');

const defaultOptsFixture = [
  'http://',
  'http://.',
  'http://..',
  'http://../',
  'http://?',
  'http://??',
  'http://??/',
  'http://#',
  'http://##',
  'http://##/',
  'http://foo.bar?q=Spaces should be encoded',
  '//',
  '//a',
  '///a',
  '///',
  'http:///a',
  'rdar://1234',
  'h://test',
  'http:// shouldfail.com',
  ':// should fail',
  'http://foo.bar/foo(bar)baz quux',
  'http://-error-.invalid/',
  'http://-a.b.co',
  'http://a.b-.co',
  'http://123.123.123',
  'http://3628126748',
  'http://.www.foo.bar/',
  'http://.www.foo.bar./',
  'http://go/ogle.com',
  'http://foo.bar/ /',
  'http://google\\.com',
  'http://www(google.com',
  'http://www=google.com',
  'https://www.g.com/error\n/bleh/bleh',
  'rdar://1234',
  '/foo.bar/',
  '///www.foo.bar./',
  'http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321http://huntr.devtestvulnerability2312321.testvulnerability23',
  'http://asdf:asdf@huntr.devtestvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321.testvulnerability2312321',
  'http://www.example.xn--overly-long-punycode-test-string-test-tests-123-test-test123/',
];

const allowedProtocolsFixture = [
  'httpsss://carlitos.tevez',
  'http://carlitos.tevez',
  'amp://elsultan.volvio.aladrar',
  'miau://haha.com',
  '://jaja.com'
];

for (const x of defaultOptsFixture) {
  tap.equal(regex().test(x), false, x);
}

for (const x of allowedProtocolsFixture) {
  tap.equal(
    regex({ allowedProtocols: ['https', 'amqp', 'guau'] }).test(x),
    false,
    x
  );
}
