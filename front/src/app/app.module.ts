import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import {LayoutModule} from "./core/components/layout/layout.module";
import {HttpClientModule} from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() { 
  return localStorage.getItem("access_token"); 
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    LayoutModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({        // tylko do debugowania 
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:9002"],
        disallowedRoutes: ["localhost:9002/api/Auth/login", "[::1]:9002/api/Auth"]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
