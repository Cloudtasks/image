import { AppPage } from './app.po'
import { browser, logging, element, by } from 'protractor'

describe('workspace-project App', () => {
  let page: AppPage

  beforeEach(() => {
    page = new AppPage()
  })

  it('should display images', async () => {
    await page.navigateTo()
    const imgs = await element.all(by.css('img'))

    expect(imgs.length).toBe(2)
    expect(imgs[0].getAttribute('src')).toContain(
      'https://cloudtasks.global.ssl.fastly.net/78e8a5ae8293dcd935ac0bf9146bd622f20096fc/'
    )
    expect(imgs[0].getAttribute('src')).toContain(
      'https%3A%2F%2Fimages.pexels.com%2Fphotos%2F52500%2Fhorse-herd-fog-nature-52500.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D2%26h%3D750%26w%3D1260'
    )
    expect(imgs[1].getAttribute('src')).toContain(
      'https://cloudtasks.global.ssl.fastly.net/78e8a5ae8293dcd935ac0bf9146bd622f20096fc/'
    )
    expect(imgs[1].getAttribute('src')).toContain(
      'https%3A%2F%2Fimages.pexels.com%2Fphotos%2F235621%2Fpexels-photo-235621.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D2%26h%3D750%26w%3D1260'
    )
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER)
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    )
  })
})
