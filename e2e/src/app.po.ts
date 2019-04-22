import { browser, by, element } from 'protractor'

export class AppPage {
  navigateTo() {
    browser.waitForAngularEnabled(false)
    browser.get(browser.baseUrl) as Promise<any>
    return browser.sleep(1000)
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>
  }
}
