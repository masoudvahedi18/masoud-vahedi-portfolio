const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const careerToggle = document.querySelector('#career-toggle');
const earlierRoles = document.querySelector('#earlier-roles');

document.querySelector('#year').textContent = new Date().getFullYear();

function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  siteNav?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  siteNav.classList.toggle('is-open', !open);
  document.body.classList.toggle('menu-open', !open);
});

siteNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

careerToggle?.addEventListener('click', () => {
  const expanded = careerToggle.getAttribute('aria-expanded') === 'true';
  careerToggle.setAttribute('aria-expanded', String(!expanded));
  earlierRoles.hidden = expanded;
  careerToggle.firstChild.textContent = expanded ? 'Show earlier roles ' : 'Hide earlier roles ';
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const card = document.querySelector('.player-card');
if (card && window.matchMedia('(pointer: fine)').matches) {
  card.addEventListener('pointermove', event => {
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${y * -7}deg) translateY(-4px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
}
