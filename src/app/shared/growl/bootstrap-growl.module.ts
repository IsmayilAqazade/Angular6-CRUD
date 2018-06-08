import {NgModule, ModuleWithProviders} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BootstrapGrowlComponent} from './bootstrap-growl.component';
import {BootstrapGrowlService} from './bootstrap-growl.service';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
      BrowserModule
    ],
    declarations: [
        BootstrapGrowlComponent
    ],
    exports: [
        BootstrapGrowlComponent
    ]
})
export class BootstrapGrowlModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BootstrapGrowlModule,
      providers: [
        BootstrapGrowlService
      ]
    };
  }
}
