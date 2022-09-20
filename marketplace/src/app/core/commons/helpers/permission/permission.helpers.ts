import { environment } from 'src/environments/environment';
// import { IRoleModel } from '../../../../features/authorization/domain/models/role/role.model';
export function getAllResourcesByEffect(roles: any[], effect: 'allow' | 'deny') {
  const resources = {};
  roles?.forEach((rol) => {
    return rol.permissions.forEach((permission) => {
      if (permission.actions[effect] != undefined) {
        permission.actions[effect].forEach((resource) => {
          resources[resource.identifier] = null;
        });
      }
    });
  });
  return Object.keys(resources);
}

export function flatPermissions(roles: any[]) {
  const allowedResources = getAllResourcesByEffect(roles, 'allow');
  const deniedResources = getAllResourcesByEffect(roles, 'deny');
  const resources = allowedResources.filter((resource) => {
    return deniedResources.indexOf(resource);
  });
  return resources;
}
export function isPossibleToPerform(identifier: string, permissions: string[]): boolean {
  const guards = environment.guards;
  return guards.enableRoleAndPermissions.value? permissions.indexOf(identifier) >= 0 : true;
}
