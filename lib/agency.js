export { services } from './services.mjs';

export function projectLabel(project) {
  const names = {
    bugtrakr: 'BugTrakr',
    'fpl-frog': 'FPL Frog',
    'tacoma-sound': 'Tacoma Sound',
    'eurocham-myanmar': 'EuroCham Myanmar',
    'conyat-create': 'Conyat Create',
  };
  return names[project.slug] || project.title;
}

export function clientName(client) {
  return client.image.altText || client.image.sourceUrl.split('/').pop().replace(/^brand-/, '').replace(/\.[^.]+$/, '')
    .replace(/-/g, ' ');
}
