import { MainPage } from './components/main-page.js';

customElements.define('main-page', MainPage);

export const router = {
	navigate: function(uri) {
		if (uri === location.hash.replace('#', ''))
			navigate(uri);
		else location.hash = uri;
	}
};

window.onhashchange = () => navigate(location.hash.replace('#', ''));

function navigate(uri) {
	console.log(`Navigate to ${uri}`);
    router.navigate('main-page?uri=' + encodeURIComponent(uri));
}
