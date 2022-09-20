import {loadStyle} from './change-theme-helpers';

describe('Change theme helpers ', () => {
  it('should onChangeCompany()', () => {
    const themeCss ='black.css';
    loadStyle(themeCss);
    const head = document.getElementById('client-theme');
    expect(head.getAttribute('href')).toBe(themeCss);
  });
})
