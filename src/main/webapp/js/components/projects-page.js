export class ProjectsPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.projects = [
            {
                id: 'web-app',
                title: 'Web App',
                description: 'A simple self hosted website build without frameworks..',
                technologies: ['HTML', 'CSS', 'JavaScript'],
                image: 'img/projects/web-app.jpg',
            },
            {
                id: 'nas-server',
                title: 'NAS Home Server',
                description: 'Home hosted NAS server to store personal files, operate a web server and a mail server',
                technologies: ['Docker', 'Nextcloud', 'Linux'],
                image: 'img/projects/nas-server.jpg',
            },
            {
                id: 'SKWorb',
                title: 'Schwimmklub Worb',
                description: 'Operate and manage a web application for a schwimmklub.',
                technologies: ['clubdesk', 'css'],
                image: 'img/projects/web-app.jpg',
            }
        ];
    }

    connectedCallback() {
        this.loadStyles();
        this.loadTemplate();
    }

    async loadStyles() {
        try {
            const response = await fetch('./css/projects-page.css');
            if (response.ok) {
                const styles = await response.text();
                const styleElement = document.createElement('style');
                styleElement.textContent = styles;
                this.shadowRoot.appendChild(styleElement);
            } else {
                console.error('Failed to load CSS for projects-page');
            }
        } catch (error) {
            console.error('Error loading CSS for projects-page:', error);
        }
    }

    async loadTemplate() {
        try {
            const response = await fetch('./templates/projects-page.html');
            if (response.ok) {
                const html = await response.text();
                const templateContainer = document.createElement('div');
                templateContainer.innerHTML = html;
                this.shadowRoot.appendChild(templateContainer);

                // After template is loaded, render the content
                this.renderProjectsList();
            } else {
                console.error('Failed to load template for projects-page');
            }
        } catch (error) {
            console.error('Error loading template for projects-page:', error);
        }
    }

    renderProjectsList() {
        const projectsContainer = this.shadowRoot.querySelector('#projects-container');
        if (!projectsContainer) return;

        const projectsHTML = this.projects.map(project => `
            <div class="project-card">
                <div class="project-image" style="background-image: url('${project.image || ''}')"></div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.technologies.map(tech => `
                            <span class="project-tag">${tech}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        projectsContainer.innerHTML = projectsHTML;
    }
}

customElements.define('projects-page', ProjectsPage);