import { Identifier } from './identifier';
const IDENTIFIER = 'holi';
@Identifier(IDENTIFIER)
class Fake {}
xdescribe('Identifier Decorator', () => {
  it('Should add the identifier property to class', () => {
    const obj = new Fake();
    expect((obj as any).identifier).toBeTruthy();
    expect((obj as any).identifier).toBe(IDENTIFIER);
  });
});
