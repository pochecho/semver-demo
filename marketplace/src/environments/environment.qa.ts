export const environment = {
  production: true,
  url: 'https://galatea-dev.apps.ambientesbc.com',
  active_directory: false,
  client_id: 'Esto-es-secreto-id',
  tenant_id: 'Esto-es-secreto-tenant',
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
};
