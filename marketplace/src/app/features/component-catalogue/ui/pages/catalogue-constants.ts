import { ApiBackComponent } from "../components/api-back/api-back.component";
import { DemoImplementationComponent } from "../components/demo-implementation-component/demo-implementation.component";
import { DesignInformationComponent } from "../components/design-information-component/design-information.component";
import { DevelopInformationComponent } from "../components/develop-information-component/develop-information.component";
import { WidgetFlowComponent } from "../components/widget-flow/widget-flow.component";


export const FOURTEEN = 14;
export const FIFTY = 50;
export const ZERO = 0;
export const ONE = 1;
export const TWO = 2;
export const THREE = 3;
export const FOUR = 4;

export const ITEMS_PER_PAGE = 14;

export const WIDGET_TABS = {
  title: 'Flujos Transversales',
  description:
    'Estos flujos nos permiten construir experiencias unificadas para todos los canales digitales. Úsalos como punto de partida para la creación de experiencias transversales a cualquier segmento.',
  mainTabs: [
    {
      tag: 'Web',
      category: 'Web',
      idParent: '',
      id: '',
    },
    {
      tag: 'App',
      category: 'Mobile',
      idParent: '',
      id: '',
    },
  ],
  exclusionTags: ['Átomo', 'Molécula', 'Organismo', 'Plantilla', 'Página'],
  features: {
    Flujo: {
      components: [
        {
          id: '',
          component: WidgetFlowComponent,
        },
      ],
    },
    Desarrollo: {
      components: [
        {
          component: DevelopInformationComponent,
        },
      ],
    },
    Ejemplo: {
      components: [
        {
          component: DemoImplementationComponent,
        },
      ],
    },
  },
};
export const BACKEND_TABS = {
  title: 'Componentes Backend',
  description:
    'En este sitio podrá ver de forma centralizada los componentes disponibles backend',
  mainTabs: [
    {
      tag: 'Security Service',
      category: 'Security Service',
      idParent: '',
      id: '',
    },
    {
      tag: 'Engagement Service',
      category: 'Engagement Service',
      idParent: '',
      id: '',
    },
    {
      tag: 'Adapter',
      category: 'Adapter',
      idParent: '',
      id: '',
    },
    {
      tag: 'Chanel Management',
      category: 'Chanel Management',
      idParent: '',
      id: '',
    },
  ],
  features: {
    Api: {
      components: [
        {
          id: 'use-section',
          component: ApiBackComponent,
        },
      ],
    },
    'Información Funcional': {
      components: [
        {
          id: 'use-section',
          component: DesignInformationComponent,
          data: {
            infoType: 'funtional',
          },
        },
      ],
    },
    'Información Técnica': {
      components: [
        {  
          id: 'use-section',
          component:DesignInformationComponent ,
          data: {
            infoType: 'develop',
          },
        },
      ],
    },
  },
};

export const COMPONENT_TABS = {
  title: 'Componentes',
  description:
    'Los componentes engloban todos aquellos elementos que conforman un producto digital. Las piezas más pequeñas como botones, tooltips y alertas se categorizan en átomos. Aquellas más grandes como header, menu o footer se encuentran en moléculas',

  mainTabs: [
    {
      tag: 'Átomos',
      category: 'Átomo',
      idParent: 'tabAtomos',
      id: '',
    },
    {
      tag: 'Moléculas',
      category: 'Molécula',

      idParent: 'tabMoleculas',
      id: 'tabM',
    },
    {
      tag: 'Organismos',
      category: 'Organismo',
      idParent: 'tabOrganismos',
      id: '',
    },
    {
      tag: 'Plantillas',
      category: 'Plantilla',
      idParent: 'tabPlantillas',
      id: '',
    },
    {
      tag: 'Páginas',
      category: 'Página',
      idParent: 'tabPaginas',
      id: '',
    },
  ],
  features: {
    Uso: {
      components: [
        {
          id: 'use-section',
          component: DesignInformationComponent,
          data: {
            infoType: 'usability',
          },
        },
      ],
    },
    Desarrollo: {
      components: [
        {
          component: DevelopInformationComponent,
        },
      ],
    },
    Accesibilidad: {
      components: [
        {
          id: 'use-section',
          component: DesignInformationComponent,
          data: {
            infoType: 'accessibility',
          },
        },
      ],
    },
    Ejemplos: {
      components: [
        {
          id: 'use-section',
          component: DemoImplementationComponent,
        },
      ],
    },
  },
};

export const CONFIGURATION_TABS = {
  widgets: WIDGET_TABS,
  components: COMPONENT_TABS,
  backend: BACKEND_TABS,
};
