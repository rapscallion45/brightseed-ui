export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export function web3FormsKey(value = '') {
  const key = value.trim();
  return /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i.test(key) ? key : '';
}

// Use the public action URL from a current MailerLite HTML embed, never an API token.
export function mailerLiteAction(value = '') {
  try {
    const url = new URL(value.trim());
    if (url.origin !== 'https://assets.mailerlite.com'
      || !/^\/jsonp\/\d+\/forms\/\d+\/subscribe$/.test(url.pathname)
      || url.username || url.password || url.search || url.hash) return '';
    return url.href;
  } catch {
    return '';
  }
}

export const CONTACT_ACCESS_KEY = web3FormsKey(process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY);
export const NEWSLETTER_ACTION = mailerLiteAction(process.env.NEXT_PUBLIC_MAILERLITE_FORM_ACTION);

export async function sendContact(formData, { fetchImpl = fetch, signal } = {}) {
  const response = await fetchImpl(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(Object.fromEntries(formData)),
    signal,
  });
  const result = await response.json();
  if (!response.ok || result.success !== true) throw new Error('Contact submission failed');
}
