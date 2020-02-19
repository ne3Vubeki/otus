describe('RN1 Test', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have auth screen and inputs and button', async () => {
    await expect(element(by.id('auth'))).toBeVisible();
    await expect(element(by.id('login'))).toBeVisible();
    await expect(element(by.id('password'))).toBeVisible();
    await expect(element(by.id('submit_button'))).toBeVisible();
  });

  it('should write email and password to input then sign in', async () => {
    await element(by.id('login')).typeText('rn1@test.ru');
    await element(by.id('password')).typeText('1234567');
    await expect(element(by.id('login'))).toHaveText('rn1@test.ru');
    await expect(element(by.id('password'))).toHaveText('1234567');
    await element(by.id('submit_button')).tap();
    await waitFor(element(by.id('home'))).toBeVisible().withTimeout(2000);
  });

  it('should have home screen and inputs and buttons', async () => {
    await expect(element(by.id('home'))).toBeVisible();
    await expect(element(by.text('Guest Book'))).toBeVisible();
    await expect(element(by.id('avatar_home'))).toBeVisible();
    await expect(element(by.id('input_new_guest_home'))).toBeVisible();
    await expect(element(by.id('button_new_guest_home'))).toBeVisible();
  });

  it('should have filter on home screen', async () => {
    await expect(element(by.text('All'))).toBeVisible();
    await expect(element(by.text('One guest'))).toBeVisible();
    await expect(element(by.text('Pair guests'))).toBeVisible();
  });

  it('should add new guest Ivan', async () => {
    await element(by.id('input_new_guest_home')).typeText('Ivan');
    await element(by.id('button_new_guest_home')).tap();
    await waitFor(element(by.id('list_item_Ivan'))).toBeVisible().withTimeout(1000);
    await expect(element(by.id('item_name_Ivan'))).toBeVisible();
    await expect(element(by.id('checkbox').withAncestor(by.id('list_item_Ivan')))).toBeVisible();
    await expect(element(by.id('item_button_Ivan'))).toBeVisible();
  });

  it('should change guest Ivan and action filter', async () => {
    const ivan = by.id('list_item_Ivan');
    const checkbox = by.id('checkbox').withAncestor(ivan);
    await element(checkbox).tap();
    await element(by.text('One guest')).tap();
    await expect(element(by.id('list_item_Ivan'))).toBeNotVisible();
    await element(by.text('Pair guests')).tap();
    await expect(element(by.id('list_item_Ivan'))).toBeVisible();
  });

  it('should change name guest Ivan to Ivana', async () => {
    const ivan = by.id('list_item_Ivan');
    await element(ivan).longPress();
    await expect(element(by.id('item_input_Ivan'))).toBeVisible();
    await element(by.id('item_input_Ivan')).typeText('a');
    await element(by.id('input_new_guest_home')).tap();
    await expect(element(by.text('Ivana'))).toBeVisible();
  });

  it('should enter description guest, write and save description', async () => {
    await element(by.id('list_item_Ivana')).tap();
    await expect(element(by.id('header_Ivana'))).toBeVisible();
    await expect(element(by.id('back_Ivana'))).toBeVisible();
    await expect(element(by.id('textinput_desc'))).toBeVisible();
    await expect(element(by.id('text_save'))).toBeVisible();
    await element(by.id('textinput_desc')).typeText('Test');
    await element(by.id('text_save')).tap();
    await waitFor(element(by.id('textinput_desc'))).toHaveValue('Test').withTimeout(2000);
    await element(by.id('back_Ivana')).tap();
  });

  it('should save description', async () => {
    await element(by.id('list_item_Ivana')).tap();
    await expect(element(by.id('textinput_desc'))).toBeVisible();
    await expect(element(by.id('textinput_desc'))).toHaveValue('Test');
    await element(by.id('back_Ivana')).tap();
  });

  it('should delete guest Ivana', async () => {
    await expect(element(by.id('item_button_Ivana'))).toBeVisible();
    await element(by.id('item_button_Ivana')).tap();
    await waitFor(element(by.id('list_item_Ivana'))).toBeNotVisible().withTimeout(1000);
  });

});
