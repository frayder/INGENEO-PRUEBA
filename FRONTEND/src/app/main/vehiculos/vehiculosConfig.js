import i18next from 'i18next';
import Vehiculos from './vehiculos';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const VehiculosConfig = {
   settings:{
       layout:{
           config: {}
       }
   },
   auth: ['configuraciones_Vehiculos'],
   routes:[
      {
          path: '/Vehiculos',
          component: Vehiculos
      }
   ]
};

export default VehiculosConfig;