import i18next from 'i18next';
import Envio from './Envio';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const EnvioConfig = {
	settings: {
		layout: {
			config: {}
		}
    },
    auth: ['Operativos_Envios'],
	routes: [
		{
			path: '/Envios',
			component: Envio
		}
	]
};

export default EnvioConfig;





/**
 * Lazy load Example
 */
/*
import React from 'react';

const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};

export default ExampleConfig;

*/
