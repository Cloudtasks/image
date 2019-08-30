import { Component } from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import { TestBed, async } from '@angular/core/testing'
import { SpyLocation } from '@angular/common/testing'

import { AppComponent } from './app.component'

import { CloudtasksModule } from './app.module'
import { CloudtasksService } from './app.service'

@Component({
  selector: 'app-test-component',
  template: ``
})
class TestComponent {
  constructor(cloudtasks: CloudtasksService) {
    cloudtasks.setKey('YOUR_CLIENT_ID')
    cloudtasks.settings.lazy = false
  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, CloudtasksModule],
      declarations: [TestComponent],
      providers: [{ provide: Location, useClass: SpyLocation }]
    })
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })

  it('should set app-root src', async(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<app-root src="http://example.com/image.jpg" [options]="{trim: true}" size="origxorig"></app-root>`
      }
    })

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent)

      fixture.detectChanges()
      const compiled = fixture.debugElement.nativeElement.querySelector('img')

      expect(compiled.src).toMatch(/\/\/(cloudtasks-images-dev|cloudtasks).global.ssl.fastly.net\/YOUR_CLIENT_ID/)
    })
  }))

  it('should resolve app-root src', async(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<app-root src="image.jpg" [options]="{trim: true}" size="origxorig"></app-root>`
      }
    })

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent)

      fixture.detectChanges()
      const compiled = fixture.debugElement.nativeElement.querySelector('img')

      expect(compiled.src).toBe('http://localhost:9876/image.jpg')
    })
  }))

  it('should skip local images', async(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<app-root src="image.jpg" [options]="{trim: true}" size="origxorig"></app-root>`
      }
    })

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent)

      fixture.detectChanges()
      const compiled = fixture.debugElement.nativeElement.querySelector('img')

      expect(compiled.src).toBe('http://localhost:9876/image.jpg')
    })
  }))

  it('should detect element size', async(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<app-root src="http://example.com/image.jpg" style="width: 800px; height: 600px"></app-root>`
      }
    })

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent)

      fixture.detectChanges()
      const compiled = fixture.debugElement.nativeElement.querySelector('img')

      expect(compiled.src).toMatch(/800x600/)
    })
  }))

  it('should detect parent element size', async(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<div style="width: 800px; height: 600px"><app-root src="http://example.com/image.jpg"></app-root></div>`
      }
    })

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent)

      fixture.detectChanges()
      const compiled = fixture.debugElement.nativeElement.querySelector('img')

      expect(compiled.src).toMatch(/800x600/)
    })
  }))

  it('should exact size', async(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<app-root src="http://example.com/image.jpg" style="width: 823px; height: 312px" [exact]="true"></app-root>`
      }
    })

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent)

      fixture.detectChanges()
      const compiled = fixture.debugElement.nativeElement.querySelector('img')

      expect(compiled.src).toMatch(/823x312/)
    })
  }))

  it('should pass options', async(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<app-root src="http://example.com/image.jpg" [options]="{trim: true}"></app-root>`
      }
    })

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent)

      fixture.detectChanges()
      const compiled = fixture.debugElement.nativeElement.querySelector('img')

      expect(compiled.src).toMatch(/trim/)
    })
  }))

  it('should set placeholder image', async(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<app-root src="http://example.com/image.jpg" placeholder="http://example.com/placeholderImage.jpg"></app-root>`
      }
    })

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent)

      fixture.detectChanges()
      const compiled = fixture.debugElement.nativeElement.children[0]

      expect(compiled.style['background-image']).toMatch(/placeholderImage/)
    })
  }))
})
