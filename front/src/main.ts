import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { newsReducers } from './app/core/store/reducers/news.reducer';
import { NewsEffects } from './app/core/store/effects/news.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({ homePage: newsReducers }),
    provideEffects([NewsEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    {
      provide: JWT_OPTIONS,
      useValue: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:9002"],
        disallowedRoutes: ["localhost:9002/api/Auth/login", "[::1]:9002/api/Auth"]
      }
    },
    provideRouter([
      {
        path: '',
        loadComponent: () => import('./app/views/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'login',
        loadComponent: () => import('./app/views/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'signup',
        loadComponent: () => import('./app/views/sign-up/sign-up.component').then(m => m.SignUpComponent)
      },
      {
        path: 'app',
        loadComponent: () => import('./app/core/components/layout/layout.component').then(m => m.MainLayoutComponent),
        children: [
          { 
            path: 'home', 
            loadComponent: () => import('./app/views/home/home.component').then(m => m.HomeComponent),
            // canLoad: [CanLoadLoggedUserGuard] // Dodaj jeśli standalone
          },
          { 
            path: 'articles/:title', 
            loadComponent: () => import('./app/views/article/article.component').then(m => m.ArticleComponent),
            // canLoad: [CanLoadLoggedUserGuard] // Dodaj jeśli standalone
          },
        ]
      },
      {
        path: '**',
        pathMatch: 'full',
        loadComponent: () => import('./app/views/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
      },
    ])
  ]
}).catch(err => console.error(err));
