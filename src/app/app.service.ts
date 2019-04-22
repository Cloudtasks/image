import { Injectable } from '@angular/core'

export interface Settings {
  apiKey: string
  dev?: boolean
  lazy?: boolean
  options?: any
  placeholderImage?: string
  photoWidths: number[]
  photoHeights: number[]
}

@Injectable({
  providedIn: 'root'
})
export class CloudtasksService {
  public settings: Settings = {
    apiKey: '',
    dev: false,
    lazy: 'IntersectionObserver' in window,
    options: {},
    placeholderImage: '',
    photoWidths: [
      7680,
      4096,
      3840,
      3600,
      3072,
      2560,
      2500,
      2048,
      2000,
      1920,
      1856,
      1824,
      1792,
      1600,
      1536,
      1520,
      1440,
      1400,
      1366,
      1365,
      1360,
      1280,
      1152,
      1080,
      1024,
      960,
      896,
      856,
      832,
      800,
      768,
      729,
      720,
      704,
      640,
      544,
      512,
      480,
      468,
      460,
      400,
      392,
      384,
      352,
      320,
      256,
      234,
      192,
      180,
      176,
      160,
      128,
      88,
      64,
      32,
      16,
      8
    ],
    photoHeights: [
      4320,
      4096,
      3600,
      3072,
      2613,
      2400,
      2252,
      2048,
      1600,
      1536,
      1440,
      1392,
      1368,
      1344,
      1340,
      1280,
      1200,
      1152,
      1128,
      1120,
      1080,
      1050,
      1024,
      992,
      960,
      900,
      870,
      864,
      856,
      854,
      800,
      788,
      768,
      766,
      720,
      624,
      600,
      576,
      540,
      486,
      484,
      483,
      480,
      400,
      384,
      372,
      350,
      348,
      342,
      320,
      300,
      288,
      256,
      240,
      200,
      192,
      144,
      135,
      132,
      120,
      96,
      72,
      64,
      60,
      55,
      32,
      31,
      16,
      8
    ]
  }

  constructor() {
    if (typeof window !== 'undefined' && this.canUseWebP()) {
      this.settings.options.convert = 'webp'
    }

    if (typeof window !== 'undefined' && (window as any).cloudtasks) {
      this.settings = { ...this.settings, ...(window as any).cloudtasks }
    }
  }

  /**
   * Gets the service base url
   * @returns
   */
  public serviceUrl(): string {
    return this.settings.dev ? 'cloudtasks-images-dev.global.ssl.fastly.net' : 'cloudtasks.global.ssl.fastly.net'
  }

  /**
   * Sets the client id
   * @param id
   */
  public setKey(id: string): void {
    this.settings.apiKey = id
  }

  /**
   * Gets the settings
   * @returns
   */
  public getSettings(): Settings {
    return this.settings
  }

  /**
   * Invalidate cache for given url
   * @param url
   */
  public invalidateCache(url: string): void {
    fetch('//' + this.serviceUrl() + '/' + this.settings.apiKey + '/invalidate/' + url, {
      mode: 'no-cors'
    })
  }

  /**
   * Build url
   * @param url
   * @param [size= ] - Calculated size string.
   * @param [options= ] - Options string.
   *
   * @returns
   */
  public buildUrl(url: string, size: string = '', options: string = ''): string {
    if (!this.settings.apiKey) {
      console.error('Cloudtasks: missing api key!')
      return url
    }

    return (
      '//' +
      this.serviceUrl() +
      '/' +
      this.settings.apiKey +
      options +
      size +
      '/' +
      encodeURIComponent(decodeURIComponent(url))
    )
  }

  /**
   * Resolve image url
   * @param url
   *
   * @returns
   */
  public resolve(url: any): string {
    if (typeof window === 'undefined') {
      return url
    }

    const loc = document.location.pathname.split('/')
    loc.pop()
    let base: any = document.location.origin + loc.join('/') + '/'

    let a: any

    if ('string' !== typeof url || !url) {
      // wrong or empty url
      return null
    } else if (url.match(/^[a-z]+\:\/\//i)) {
      // url is absolute already
      return url
    } else if (url.match(/^\/\//)) {
      // url is absolute already
      return 'http:' + url
    } else if ('string' !== typeof base) {
      a = document.createElement('a')
      // try to resolve url without base
      a.href = url

      if (!a.hostname || !a.protocol || !a.pathname) {
        // url not valid
        return null
      }

      return 'http://' + url
    } else {
      // check base
      base = this.resolve(base)

      if (base === null) {
        // wrong base
        return null
      }
    }

    a = document.createElement('a')
    a.href = base

    if (url[0] === '/') {
      // rooted path
      base = []
    } else {
      // relative path
      base = a.pathname.split('/')
      base.pop()
    }
    url = url.split('/')

    for (let i = 0; i < url.length; ++i) {
      // current directory
      if (url[i] === '.') {
        continue
      }
      // parent directory
      if (url[i] === '..') {
        if ('undefined' === typeof base.pop() || base.length === 0) {
          // wrong url accessing non-existing parent directories
          return null
        }
      } else {
        // child directory
        base.push(url[i])
      }
    }

    return a.protocol + '//' + a.hostname + base.join('/')
  }

  /**
   * Checks if browser supports webp format
   * @returns
   */
  private canUseWebP(): boolean {
    const elem = document.createElement('canvas')
    return elem.getContext && elem.getContext('2d') && elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
  }
}
