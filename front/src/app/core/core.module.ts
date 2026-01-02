import { NgModule } from '@angular/core';
import { CanLoadLoggedUserGuard } from './guards/can-activate-logged-user.guard';

@NgModule({
  declarations: [],
  exports: [],
  imports: [],
  providers: [CanLoadLoggedUserGuard],
})
export class CoreModule { }
