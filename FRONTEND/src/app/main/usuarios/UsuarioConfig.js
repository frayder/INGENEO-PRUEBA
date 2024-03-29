import i18next from 'i18next';
import Usuario from './Usuario';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const UsuarioConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: ['Seguridad_Usuarios'],
	routes: [
		{
			path: '/Usuarios',
			component: Usuario
		}
	]
};

export default UsuarioConfig;


