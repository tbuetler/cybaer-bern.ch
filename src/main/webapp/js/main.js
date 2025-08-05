import './components/main-page.js';
import './components/about-page.js';
import './components/contact-page.js';
import './components/projects-page.js';

window.onerror = window.onunhandledrejection = event => {
    let error = event.reason || event;
    let message = error instanceof Response ? `Request failed (status ${error.status})` : error;
    document.querySelector('main').innerHTML = `<h1>Unexpected Error</h1><p>${message}</p>`;
};

// Handle navigation on hash change
window.addEventListener('hashchange', handleNavigation);

// Handle initial page load
document.addEventListener('DOMContentLoaded', () => {
    handleNavigation();
});

function handleNavigation() {
    const hash = location.hash.replace('#', '') || 'main-page';
    console.log(`Navigate to ${hash}`);

    // Handle nested routes like 'projects/project-id'
    const [componentName, ...params] = hash.split('/');

    let component = document.createElement(componentName);

    // For projects with specific project ID
    if (hash.startsWith('projects/') && params[0]) {
        component.setAttribute('project', params[0]);
    }

    document.querySelector('main').replaceChildren(component);
}