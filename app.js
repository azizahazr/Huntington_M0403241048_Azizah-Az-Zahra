// app.js — tema minimal & helper toggle
document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const stored = localStorage.getItem('theme'); // 'dark' | 'light'
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');

  // set attribute that CSS can use: [data-theme="dark"] / [data-theme="light"]
  html.setAttribute('data-theme', initial);

  // global toggle function
  window.toggleTheme = function () {
    const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  // Add a small toggle button (non-intrusive)
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Toggle theme');
  btn.title = 'Toggle theme';
  btn.textContent = initial === 'dark' ? '🌙' : '☀️';
  Object.assign(btn.style, {
    position: 'fixed',
    right: '14px',
    bottom: '14px',
    padding: '8px 10px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 6px 18px rgba(2,6,23,0.4)',
    zIndex: '9999',
    background: 'linear-gradient(90deg,#7c3aed,#06b6d4)',
    color: '#fff',
    fontSize: '16px',
  });

  btn.addEventListener('click', () => {
    window.toggleTheme();
    btn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '🌙' : '☀️';
  });

  document.body.appendChild(btn);
});
