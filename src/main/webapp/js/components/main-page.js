import { router } from '../router.js';
import { util } from '../util.js';

export class MainPage extends HTMLElement {

	async connectedCallback() {
		this.innerHTML = await util.loadTemplate('main-page');
		util.bindData(this);
	}
}
