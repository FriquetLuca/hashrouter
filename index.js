const content = document.getElementById('content');

const routes = {
  '/hashrouter/home': () => {
    content.innerHTML = '<h1>Home</h1>';
  },
  '/hashrouter/about': () => {
    content.innerHTML = '<h1>About</h1>';
  },
  '/hashrouter/contact': () => {
    content.innerHTML = '<h1>Contact</h1>';
  },
  '*': () => {
    content.innerHTML = '<h1>404 Page Not Found</h1>';
  }
};

const handleNavigation = (path) => {
  console.log(path)
  const route = routes[path] || routes['/hashrouter/home'];
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

handleNavigation(location.pathname);