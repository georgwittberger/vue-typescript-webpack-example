import SimpleComponent from './simple-component';

describe('SimpleComponent', () => {
  it('should have a message right after creation', () => {
    const component = new SimpleComponent();
    expect(component.message).toBeDefined();
  });

  it('should have a different message after change', () => {
    const component = new SimpleComponent();
    const initialMessage = component.message;
    component.changeMessage();
    expect(component.message).toBeDefined();
    expect(component.message).not.toEqual(initialMessage);
  });
});
