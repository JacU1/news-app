import { SharedModule } from 'src/app/shared/shared.module';
import { LoginModule } from './../../../views/login/login.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { LayoutRoutingModule } from "./layout-routing.module";
import { PageNotFoundModule } from 'src/app/views/page-not-found/page-not-found.module';
import { SignUpModule } from 'src/app/views/sign-up/sign-up.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { newsReducers } from '../../store';
import { NewsEffects } from '../../store/effects/news.effects';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    LoginModule,
    PageNotFoundModule,
    SignUpModule,
    FormsModule,
    NgSelectModule,
    StoreModule.forFeature('homePage', newsReducers),
    EffectsModule.forFeature([NewsEffects])
  ],
  exports: [],
  declarations: [
    MainLayoutComponent,
    FooterComponent,
    NavbarComponent
  ]
})
export class LayoutModule { }
