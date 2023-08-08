import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);


const navigationConfig = [
	{
		id: 'configuraciones',
		title: 'Configuraciones',
		translate: 'CONFIGURACIONES',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'roles-component',
				title: 'Example',
				translate: 'EXAMPLE',
				type: 'item',
				icon: 'whatshot',
				url: '/example'
			},
			{
				id: 'Login-component',
				title: 'Prueba',
				translate: 'prueba',
				type: 'item',
				icon: 'whatshot',
				url: '/login'
			},
			{
				id: 'Roles-component',
				title: 'Roles222',
				translate: 'Roles222',
				type: 'item',
				icon: 'whatshot',
				url: '/Roles'
			}
		]
	}
];

export default navigationConfig;
