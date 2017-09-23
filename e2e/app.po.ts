import { browser, by, element } from 'protractor';

export class PortalVenuPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('vn-root h1')).getText();
  }
}
