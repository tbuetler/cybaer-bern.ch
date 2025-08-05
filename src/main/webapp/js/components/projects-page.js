export class ProjectsPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.projects = [
            {
                id: 'nas-server',
                title: 'NAS Home Server',
                description: 'Ein selbstgebauter NAS-Server für die sichere Speicherung und das Teilen von Daten im Heimnetzwerk.',
                technologies: ['Docker', 'Nextcloud', 'Plex', 'Linux'],
                image: 'img/projects/nas-server.jpg'
            },
            {
                id: 'web-app',
                title: 'Progressive Web App',
                description: 'Eine moderne Web-Anwendung mit Offline-Funktionalität und Push-Benachrichtigungen.',
                technologies: ['JavaScript', 'Service Workers', 'IndexedDB', 'PWA'],
                image: 'img/projects/web-app.jpg'
            }
        ];
    }

    connectedCallback() {
        this.loadStyles();
        this.loadTemplate();
    }

    static get observedAttributes() {
        return ['project'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot.querySelector('#projects-container')) {
            this.renderContent();
        }
    }

    async loadStyles() {
        try {
            const response = await fetch('/css/projects-page.css');
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
            const response = await fetch('/templates/projects-page.html');
            if (response.ok) {
                const html = await response.text();
                const templateContainer = document.createElement('div');
                templateContainer.innerHTML = html;
                this.shadowRoot.appendChild(templateContainer);

                // After template is loaded, render the content
                this.renderContent();
            } else {
                console.error('Failed to load template for projects-page');
            }
        } catch (error) {
            console.error('Error loading template for projects-page:', error);
        }
    }

    renderContent() {
        const projectId = this.getAttribute('project');

        if (projectId) {
            this.renderProjectDetail(projectId);
        } else {
            this.renderProjectsList();
        }
    }

    renderProjectsList() {
        const projectsContainer = this.shadowRoot.querySelector('#projects-container');
        if (!projectsContainer) return;

        const projectsHTML = this.projects.map(project => `
            <div class="project-card" data-id="${project.id}">
                <div class="project-image" style="background-image: url('${project.image || '#'}')"></div>
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

        projectsContainer.innerHTML = `
            ${projectsHTML}
            <div class="project-card add-project">
                <div class="add-icon">+</div>
                <h3>Neues Projekt hinzufügen</h3>
            </div>
        `;

        // Add event listeners
        this.shadowRoot.querySelectorAll('.project-card[data-id]').forEach(card => {
            const projectId = card.dataset.id;
            if (projectId) {
                card.addEventListener('click', () => {
                    window.location.hash = `projects/${projectId}`;
                });
            }
        });

        this.shadowRoot.querySelector('.add-project').addEventListener('click', () => {
            alert('Hier könntest du ein Formular zum Hinzufügen neuer Projekte implementieren!');
        });
    }

    renderProjectDetail(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) {
            window.location.hash = 'projects-page';
            return;
        }

        const projectsContainer = this.shadowRoot.querySelector('#projects-container');
        if (!projectsContainer) return;

        projectsContainer.innerHTML = `
        <button class="back-button" id="back-button">← Zurück zur Projektübersicht</button>

        <div class="project-header">
            <h2 class="project-title">${project.title}</h2>
        </div>

        <div class="project-image" style="background-image: url('${project.image || '#'}')"></div>

        <div class="project-content">
            <div class="project-main">
                <h3>Beschreibung</h3>
                <div class="project-description">
                    <p>${project.description}</p>
                    <p>Dieses Projekt wurde entwickelt, um praktische Probleme mit modernen Technologielösungen zu bewältigen.
                    Die Implementierung berücksichtigt Aspekte wie Skalierbarkeit, Benutzerfreundlichkeit und Sicherheit.</p>
                    <p>Die verwendeten Technologien wurden sorgfältig ausgewählt, um eine optimale Balance zwischen Leistung und Wartbarkeit zu gewährleisten.</p>
                </div>

                <h3>Funktionen</h3>
                <ul>
                    <li>Responsive Design für alle Geräte</li>
                    <li>Benutzerfreundliche Oberfläche</li>
                    <li>Sichere Datenspeicherung</li>
                    <li>Optimierte Performance</li>
                </ul>

                <h3>Herausforderungen und Lösungen</h3>
                <p>Während der Entwicklung dieses Projekts wurden verschiedene Herausforderungen gemeistert,
                darunter Leistungsoptimierung, nahtlose Integration verschiedener Technologien.</p>
            </div>
        </div>
    `;

        // Add back button event listener - this was missing!
        const backButton = this.shadowRoot.querySelector('#back-button');
        if (backButton) {
            backButton.addEventListener('click', () => {
                window.location.hash = 'projects-page';
            });
        }
    }
}

customElements.define('projects-page', ProjectsPage);
