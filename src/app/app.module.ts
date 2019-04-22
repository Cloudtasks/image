import { BrowserModule } from '@angular/platform-browser'
import { NgModule, Injector } from '@angular/core'
import { createCustomElement } from '@angular/elements'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  exports: [AppComponent],
  providers: [],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const elements: any[] = [
      [AppComponent, 'cloudtasks-image'],
      [AppComponent, 'cloudtasks-img'],
      [AppComponent, 'ct-img']
    ]

    for (const [component, name] of elements) {
      if (!customElements.get(name)) {
        const el = createCustomElement(component, { injector: this.injector })
        customElements.define(name, el)
      }
    }
  }
}
