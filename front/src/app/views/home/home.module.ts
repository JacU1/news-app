import { CoreModule } from '../../core/core.module';
import { MainNewsComponent } from './components/dumb_components/main-news/main-news.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';
import { PageCarouselComponent } from './components/dumb_components/page-carousel/page-carousel.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {CommonModule} from "@angular/common";
import {HomeRoutingModule} from "./home-routing.module";
import {NewsApiService} from "../../shared/services/news-API/news-api.service";
import { StoreModule } from '@ngrx/store';
import { newsReducers } from 'src/app/core/store';
import { EffectsModule } from '@ngrx/effects';
import { NewsEffects } from 'src/app/core/store/effects/news.effects';
import { ContentListComponent } from './components/dumb_components/content-list/content-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    MainNewsComponent,
    PageCarouselComponent,
    ContentListComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    SharedModule,
    CoreModule
  ],
  exports: [],
  providers: [NewsApiService],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
