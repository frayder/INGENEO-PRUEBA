import i18next from 'i18next';
import Clientes from './Clientes';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const ClientesConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: ['Seguridad_Clientes'],
	routes: [
		{
			path: '/Clientes',
			component: Clientes
		}
	]
};

export default ClientesConfig;


