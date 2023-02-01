const content = document.getElementById('content');

const routes = {
  '/hashrouter/': () => {
    content.innerHTML = '<h1>Home</h1>';
  },
  '/home': () => {
    content.innerHTML = '<h1>Home</h1>';
  },
  '/about': () => {
    content.innerHTML = '<h1>About</h1>';
  },
  '/contact': () => {
    content.innerHTML = '<h1>Contact</h1>';
  },
  '/404': () => {
    content.innerHTML = '<h1>404 Page Not Found</h1>';
  }
};

const handleNavigation = (path) => {
  const route = routes[path] || routes['/404'];
  route();
};

document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === 'A') {
    event.preventDefault();
    const href = target.getAttribute('href');
    history.pushState({}, '', '/hashrouter' + href);
    handleNavigation(href);
  }
});

window.addEventListener('popstate', (event) => {
  handleNavigation(location.pathname);
});

const splittedURL = location.href.split("#");
switch(splittedURL.length) {
  case 2:
    history.pushState({}, '', '/hashrouter' + splittedURL[1]);
    handleNavigation(splittedURL[1]);
    break;
  default:
    handleNavigation(location.pathname);
    break;
}