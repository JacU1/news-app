import { CoreModule } from '../../core/core.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import {CommonModule} from "@angular/common";
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [PageNotFoundComponent]
})
export class PageNotFoundModule { }
