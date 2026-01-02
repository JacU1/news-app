import { ArticleComponent } from './article.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import {CoreModule} from "../../core/core.module";
import {ArticleRoutingModule} from "./article-routing.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    ArticleRoutingModule
  ],
  providers: [],
  bootstrap: [ArticleComponent]
})
export class ArticleModule { }
