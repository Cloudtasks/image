import {
  Component,
  EventEmitter,
  Output,
  AfterViewInit,
  OnDestroy,
  Input,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Renderer2
} from '@angular/core'
import { CloudtasksService } from './app.service'

declare var global: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @Input() src
  @Input() alt

  @Input() options: any
  @Input() placeholder: string
  @Input() size: string
  @Input() forceSize: boolean

  @Output() isVisible = new EventEmitter()

  // Only modify with setState
  state = {
    url: false,
    visible: false,
    loaded: false
  }

  private el: any
  private settings: any
  private width: number
  private height: number
  private optionsString = '/'

  private tries = 0

  private intersectionObserver?: IntersectionObserver

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef,
    private cloudtasks: CloudtasksService
  ) {
    this.el = this.elRef.nativeElement
    this.settings = this.cloudtasks.getSettings()
  }

  ngAfterViewInit() {
    this.parseOptions()

    if (this.isLocal() || typeof window === 'undefined') {
      return this.setState({ url: this.src, visible: true })
    }

    if (this.settings.lazy) {
      this.intersectionObserver = new IntersectionObserver(entries => {
        this.checkForIntersection(entries)
      }, {})
      this.intersectionObserver.observe(<Element>this.el)
    } else if (!this.state.visible) {
      this.setState({ visible: true })
    }

    if (this.size) {
      this.init()
    } else {
      let element = this.el
      let style = (((typeof window !== 'undefined' && window) as any) || (global as any)).getComputedStyle(element)
      this.width = parseInt(style.width, 10) || 0
      this.height = parseInt(style.height, 10) || 0

      while (
        (element = element !== null ? element.parentNode : void 0) instanceof Element &&
        (this.width <= 0 || this.height <= 0)
      ) {
        style = (((typeof window !== 'undefined' && window) as any) || (global as any)).getComputedStyle(element)
        this.width = parseInt(style.width, 10)
        this.height = parseInt(style.height, 10)
      }

      this.init()
    }
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(<Element>this.el)
      this.intersectionObserver.disconnect()
    }
  }

  onLoad() {
    this.setState({ loaded: true })
  }

  onError() {
    if (this.tries === 0) {
      this.tries += 1
      if (this.placeholder || this.settings.placeholderImage) {
        this.setState({ url: this.getDefaultURL() })
      }
    } else if (this.tries === 1) {
      this.tries += 1
      this.setState({ url: this.src })
    } else if (this.tries === 2) {
      this.tries += 1
      this.setState({ url: this.getErrorURL() })
    }
  }

  private init() {
    if (this.placeholder || this.settings.placeholderImage) {
      this.renderer.setStyle(this.el, 'background-image', 'url(//' + this.getDefaultURL() + ')')
    }

    this.setState({ url: this.getURL() })
  }

  private getURL(): string {
    return this.cloudtasks.buildUrl(this.cloudtasks.resolve(this.src), this.getSize(), this.optionsString)
  }

  private getDefaultURL(): string {
    return this.cloudtasks.buildUrl(
      this.cloudtasks.resolve(this.placeholder || this.settings.placeholderImage),
      this.getSize(),
      this.optionsString
    )
  }

  private getErrorURL(): string {
    return this.cloudtasks.buildUrl(
      'https://cloudtasks.ctcdn.co/images/cloudtasks_fill_blue-512x512.png',
      this.getSize(),
      this.optionsString
    )
  }

  private isLocal(): boolean {
    const a = this.renderer.createElement('a')
    a.href = this.src
    return /localhost$|\.local$|:\d{2,4}$/i.test(a.hostname)
  }

  private getSize(): string {
    let calc = ''

    if (this.size) {
      calc = this.size
    } else {
      if (!this.forceSize) {
        if (this.width) {
          for (let x = 0; x < this.settings.photoWidths.length; x++) {
            if (this.settings.photoWidths[x] < this.width) {
              calc += this.settings.photoWidths[x - 1] ? this.settings.photoWidths[x - 1] : this.settings.photoWidths[x]
              break
            }
          }
        }

        if (this.height && (!this.width || this.width / this.height <= 4)) {
          for (let y = 0; y < this.settings.photoHeights.length; y++) {
            if (this.settings.photoHeights[y] < this.height) {
              calc +=
                'x' +
                (this.settings.photoHeights[y - 1] ? this.settings.photoHeights[y - 1] : this.settings.photoHeights[y])
              break
            }
          }
        }
      } else {
        if (this.width) {
          calc = this.width.toString()
        }

        if (this.height) {
          calc = calc + 'x' + this.height
        }
      }

      if (!calc) {
        calc = 'origxorig'
      } else if (calc.toString().indexOf('x') === -1) {
        calc = calc + 'x'
      }
    }

    return calc
  }

  private parseOptions() {
    let options = Object.assign({}, this.settings.options)

    if (this.options) {
      options = Object.assign(options, this.options)
    }

    let optionsString = '/'

    for (const key in options) {
      if (!options.hasOwnProperty(key)) {
        continue
      }

      const value = options[key]

      if (value) {
        if (typeof value === 'string') {
          optionsString = optionsString + key + ':' + value + '/'
        } else {
          optionsString = optionsString + key + '/'
        }
      }
    }

    this.optionsString = optionsString
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIfIntersecting(entry)) {
        this.setState({ visible: true })
        const domEvent = new CustomEvent('isVisible')
        this.el.dispatchEvent(domEvent)
        this.intersectionObserver.unobserve(<Element>this.el)
        this.intersectionObserver.disconnect()
      }
    })
  }

  private checkIfIntersecting(entry: IntersectionObserverEntry) {
    return (<any>entry).isIntersecting && entry.target === this.el
  }

  private setState(stateChange: any) {
    this.state = { ...this.state, ...stateChange }
    this.cd.detectChanges()
  }
}
