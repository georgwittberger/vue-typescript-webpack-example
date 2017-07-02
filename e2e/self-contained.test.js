import { Selector } from 'testcafe';

fixture('Test page')
  .page('http://localhost:5000');

test('Self-contained component shows success message', async testController => {
  const nameInput = Selector('input[name="name"]');
  const emailInput = Selector('input[name="email"]');
  const successMessage = Selector('.success');
  await testController
    .typeText(nameInput, 'Georg')
    .typeText(emailInput, 'georg.wittberger@gmail.com')
    .expect(successMessage.innerText).contains('Georg')
    .expect(successMessage.innerText).contains('georg.wittberger@gmail.com');
});
