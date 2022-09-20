

export const environment = {
  production: false,
  url: '',
  active_directory: false,
  guards: {
    showInitialAcceptanceRequest: {
      value: true,
      description:
        'Determina si se va a abrir el modal de terminos y condiciones cuando no se hayan aceptado previamente.',
    },
    useActiveDirectory: {
      value: false,
      description: 'Indica si se usará el directorio activo para obtener el token de sesión.',
    },
    enableRoleAndPermissions: {
      value: true,
      description: 'Indica si se usarán los roles dentro del showcase.',
    },
  },
  client_id: 'Esto-es-secreto-id',
  tenant_id: 'Esto-es-secreto-tenant',
  apiBaseUrl: 'http://localhost:3001/feature',
  termsConditionsURL: 'http://localhost:9080',
  componentsCatalogURL: 'http://localhost:9090',
  environmentName : 'local',
};
