import { IRoleModel } from 'src/app/features/authorization/domain/models/role/role.model';
import { environment } from 'src/environments/environment';
import { getAllResourcesByEffect, flatPermissions, isPossibleToPerform } from './permission.helpers';

describe('Change theme helpers ', () => {
  it('should return false', () => {
    const fakePermissions = ['i come to see you again'];
    const fakeIdentifier = 'hello darknes my old friend';
    environment.guards.enableRoleAndPermissions.value = true;
    let result = isPossibleToPerform(fakeIdentifier, fakePermissions);
    expect(result).toBeFalse();
  });

  it('should return fakeroles', () => {
    const fakeRoles = {
      id: 'weincode',
      name: 'its',
      display: 'amazing',
      description: 'chanel',
      permissions: [
        {
          name: 'string',
          description: 'string',
          actions: {
            ['allow']: [
              {
                id: 'rest;',
                identifier: 'i can rest',
                name: 'You earn your rest',
                description: 'you deserve it',
              },
            ],
            ['deny']: [
              {
                id: 'eat',
                identifier: '🍔',
                name: 'a lot of food',
                description: 'a lot of food',
              },
            ],
          },
        },
      ],
    } as IRoleModel;
    const fakeIdentifier = ['i can rest'];
    let result = flatPermissions([fakeRoles]);
    expect(result).toEqual(fakeIdentifier);
  });
});
