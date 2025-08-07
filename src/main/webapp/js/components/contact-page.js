export class ContactPage extends HTMLElement {
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
            const response = await fetch('./css/contact-page.css');
            if (response.ok) {
                const styles = await response.text();
                const styleElement = document.createElement('style');
                styleElement.textContent = styles;
                this.shadowRoot.appendChild(styleElement);
            } else {
                console.error('Failed to load CSS for contact-page');
            }
        } catch (error) {
            console.error('Error loading CSS for contact-page:', error);
        }
    }

    async loadTemplate() {
        try {
            const response = await fetch('./templates/contact-page.html');
            if (response.ok) {
                const html = await response.text();
                const templateContainer = document.createElement('div');
                templateContainer.innerHTML = html;
                this.shadowRoot.appendChild(templateContainer);

                // Add form submission handler
                const form = this.shadowRoot.querySelector('#contact-form');
                if (form) {
                    form.addEventListener('submit', this.handleSubmit.bind(this));
                }
            } else {
                console.error('Failed to load template for contact-page');
            }
        } catch (error) {
            console.error('Error loading template for contact-page:', error);
        }
    }
}

customElements.define('contact-page', ContactPage);