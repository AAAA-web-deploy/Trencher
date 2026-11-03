(() => {
  'use strict';
  const config = window.TRENCHER_CONFIG || {};
  const message = document.createElement('div');
  message.className = 'site-notice';
  message.setAttribute('role', 'status');
  message.setAttribute('aria-live', 'polite');
  document.body.appendChild(message);
  let timer;
  function notify(text) {
    message.textContent = text;
    message.classList.add('is-visible');
    clearTimeout(timer);
    timer = setTimeout(() => message.classList.remove('is-visible'), 2800);
  }
  function linkGroup(selector, value, label) {
    let url = null;
    try {
      const parsed = new URL(value);
      if (parsed.protocol === 'https:' || parsed.protocol === 'http:') url = parsed.href;
    } catch (_) {}
    document.querySelectorAll(selector).forEach(link => {
      link.setAttribute('aria-label', label);
      if (url) link.href = url;
      else {
        link.href = '#';
        link.setAttribute('aria-disabled', 'true');
        link.addEventListener('click', event => {
          event.preventDefault();
          notify(label + ' will be available when the project link is configured.');
        });
      }
    });
  }
  linkGroup('.menu__link--buy, .hero__buy, .about__button, .join__button', config.buyUrl, 'Buy $TRENCHER');
  linkGroup('.hero__social-item:nth-child(1), .join__social-item:nth-child(1), .footer__top-item-social:nth-of-type(5)', config.xUrl, 'X community');
  linkGroup('.hero__social-item:nth-child(2), .join__social-item:nth-child(2), .footer__top-item-social:nth-of-type(6)', config.telegramUrl, 'Telegram community');
  const address = /^0x[0-9a-fA-F]{40}$/.test(config.contractAddress || '') ? config.contractAddress : '';
  document.querySelectorAll('[data-ca]').forEach(button => {
    button.dataset.ca = address;
    button.disabled = !address;
    if (!address) button.setAttribute('aria-label', 'Contract address coming soon');
  });
  document.querySelectorAll('.ca-copy__addr').forEach(el => el.textContent = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Coming soon');
  const fullAddress = document.querySelector('.tokenomics__ca span:nth-child(2)');
  if (fullAddress) fullAddress.textContent = address || 'Coming soon';
  for (const key of ['totalSupply', 'buySellTax', 'rewards']) {
    const target = document.querySelector(`[data-config="${key}"]`);
    if (target && typeof config[key] === 'string' && config[key].trim()) {
      target.textContent = config[key].trim();
      if (target.nextElementSibling?.tagName === 'P') target.nextElementSibling.hidden = true;
    }
  }
})();
