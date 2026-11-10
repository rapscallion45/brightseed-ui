import assert from 'node:assert/strict';
import test from 'node:test';
import { mailerLiteAction, sendContact, web3FormsKey } from '../lib/forms.mjs';

test('public form configuration rejects placeholders and unexpected destinations', () => {
  assert.equal(web3FormsKey(), '');
  assert.equal(web3FormsKey('YOUR_ACCESS_KEY'), '');
  assert.equal(web3FormsKey(' 00000000-0000-0000-0000-000000000001 '), '00000000-0000-0000-0000-000000000001');
  const action = 'https://assets.mailerlite.com/jsonp/123/forms/456/subscribe';
  assert.equal(mailerLiteAction(` ${action} `), action);
  // Deliberately malicious input: verify that the form destination validator rejects it.
  // eslint-disable-next-line no-script-url
  [undefined, '', 'YOUR_FORM_URL', 'javascript:alert(1)',
    'https://assets.mailerlite.com.evil.example/jsonp/123/forms/456/subscribe',
    action.replace('https:', 'http:'), `${action}?redirect=evil`,
    action.replace('assets.', 'user:password@assets.'),
    'https://connect.mailerlite.com/api/subscribers',
  ].forEach((value) => assert.equal(mailerLiteAction(value), ''));
});

test('contact request preserves the message and sends the reply-to email to Web3Forms', async () => {
  const data = new FormData();
  data.set('access_key', 'test-key');
  data.set('name', 'A visitor');
  data.set('email', 'visitor@example.com');
  data.set('message', 'A project with a new website.\nBudget: £2,000.');
  const controller = new AbortController();
  await sendContact(data, {
    signal: controller.signal,
    fetchImpl: async (url, options) => {
      assert.equal(url, 'https://api.web3forms.com/submit');
      assert.equal(options.method, 'POST');
      assert.equal(options.headers['Content-Type'], 'application/json');
      assert.equal(options.signal, controller.signal);
      assert.deepEqual(JSON.parse(options.body), Object.fromEntries(data));
      return { ok: true, json: async () => ({ success: true }) };
    },
  });
});

test('contact submission only succeeds on an explicit provider success', async () => {
  const cases = [
    { ok: false, json: async () => ({ success: true }) },
    { ok: false, json: async () => ({ success: false }) },
    { ok: true, json: async () => ({ success: false }) },
    { ok: true, json: async () => ({}) },
    { ok: true, json: async () => { throw new SyntaxError('Invalid JSON'); } },
  ];
  await Promise.all(cases.map((response) => assert.rejects(sendContact(new FormData(), {
    fetchImpl: async () => response,
  }))));
  await assert.rejects(sendContact(new FormData(), {
    fetchImpl: async () => { throw new TypeError('Network unavailable'); },
  }));
  await assert.rejects(sendContact(new FormData(), {
    fetchImpl: async () => { throw new DOMException('Timed out', 'AbortError'); },
  }));
});
