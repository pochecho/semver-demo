
export const environment = {
  production: true,
  url: 'https://galatea-dev.apps.ambientesbc.com',
  active_directory: true,
  client_id: 'Esto-es-secreto-id',
  tenant_id: 'Esto-es-secreto-tenant',
  apiBaseUrl: 'http://localhost:3001/feature',
  termsConditionsURL: 'Esto-es-secreto-terms-url',
  componentsCatalogURL: 'Esto-es-secreto-componentsCatalogue-url',
  environmentName : 'PDN',
  guards: {
    showInitialAcceptanceRequest: {
      value: true,
      description:
        'Determina si se va a abrir el modal de terminos y condiciones cuando no se hayan aceptado previamente.',
    },
    useActiveDirectory: {
      value: true,
      description: 'Indica si se usará el directorio activo para obtener el token de sesión.',
    },
    enableRoleAndPermissions: {
      value: true,
      description: 'Indica si se usarán los roles dentro del showcase.',
    },
  },

};
