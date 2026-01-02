import { CoreModule } from '../../core/core.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {CommonModule} from "@angular/common";
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth-service';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CarouselModule,
    SharedModule,
    CoreModule,
  ],
  exports: [],
  providers: [AuthService],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
