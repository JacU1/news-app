import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { LoadingSpinnerService } from './app/shared/services/loading-spinner/loading-spinner.service';
import { LoadingSpinnerInterceptor } from './app/shared/interceptors/loading-spinner.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './app/shared/services/auth/auth-service';
import { NewsApiService } from './app/shared/services/news-API/news-api.service';

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
    LoadingSpinnerService,
    AuthService,
    NewsApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingSpinnerInterceptor,
      multi: true
    },
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
