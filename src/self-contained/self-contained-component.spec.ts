import SelfContainedComponent from './self-contained-component';

describe('SelfContainedComponent', () => {
  it('should not have a valid state right after creation', () => {
    const component = new SelfContainedComponent();
    expect(component.valid).toBeFalsy();
  });

  it('should have a valid state once a valid name and email has been set', () => {
    const component = new SelfContainedComponent();
    component.name = 'Georg';
    component.email = 'georg.wittberger@gmail.com';
    expect(component.valid).toBeTruthy();
  });
});
