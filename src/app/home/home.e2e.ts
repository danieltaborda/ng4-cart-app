import { browser, by, element } from 'protractor';
import 'tslib';

describe('App', () => {

  beforeEach(async () => {
    /**
     * Change hash depending on router LocationStrategy.
     */
    await browser.get('/#/home');
  });

  it('should have `Home` x-large', async () => {
    let subject = await element(by.css('[x-large]')).getText();
    let result  = 'Home';
    expect(subject).toEqual(result);
  });

});
