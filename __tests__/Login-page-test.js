describe('Login flow', () => {
    
    it('should login successfully', async () => {
      await device.reloadReactNative();
      await expect(element(by.id('username'))).toBeVisible();
        
      await element(by.id('username')).typeText('username');
      await element(by.id('password')).typeText('password');
      await element(by.text('Submit')).tap();
        
      await expect(element(by.text('Welcome'))).toBeVisible();
      await expect(element(by.id('username'))).toNotExist();
    });
    
  });