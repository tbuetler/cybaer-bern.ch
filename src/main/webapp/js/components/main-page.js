export class MainPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.loadStyles();
        this.loadTemplate();
    }

    async loadStyles() {
        try {
            const response = await fetch('./css/main-page.css');
            if (response.ok) {
                const styles = await response.text();
                const styleElement = document.createElement('style');
                styleElement.textContent = styles;
                this.shadowRoot.appendChild(styleElement);
            } else {
                console.error('Failed to load CSS for main-page');
            }
        } catch (error) {
            console.error('Error loading CSS for main-page:', error);
        }
    }

    async loadTemplate() {
        try {
            const response = await fetch('./templates/main-page.html');
            if (response.ok) {
                const html = await response.text();
                const templateContainer = document.createElement('div');
                templateContainer.innerHTML = html;
                this.shadowRoot.appendChild(templateContainer);
            } else {
                console.error('Failed to load template for main-page');
            }
        } catch (error) {
            console.error('Error loading template for main-page:', error);
        }
    }
}

customElements.define('main-page', MainPage);