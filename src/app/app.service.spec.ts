import { CloudtasksService } from './app.service'

describe('CloudtasksService', () => {
  let service: CloudtasksService

  beforeEach(() => {
    service = new CloudtasksService()
  })

  it('is defined', () => {
    expect(CloudtasksService).toBeDefined()
  })

  it('sets the client id', () => {
    service.setKey('Demo')
    expect(service.settings.apiKey).toBe('Demo')
  })

  it('changes service settings', () => {
    service.settings.dev = true
    expect(service.settings.dev).toBe(true)
  })

  it('changes service settings placeholder image', () => {
    service.settings.placeholderImage = 'http://example.com/placeholderImage.jpg'
    expect(service.settings.placeholderImage).toBe('http://example.com/placeholderImage.jpg')
  })
})
