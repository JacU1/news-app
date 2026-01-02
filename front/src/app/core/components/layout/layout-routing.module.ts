import { LoginComponent } from './../../../views/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PageNotFoundComponent } from 'src/app/views/page-not-found/page-not-found.component';
import { CanLoadLoggedUserGuard } from '../../guards/can-activate-logged-user.guard';
import { SignUpComponent } from 'src/app/views/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    children: [
      { 
        path: 'home', 
        loadChildren: () => import('../../../views/home/home.module').then(m => m.HomeModule),
        canLoad: [CanLoadLoggedUserGuard]
      },
      { 
        path: 'articles/:title', 
        loadChildren: () => import('../../../views/article/article.module').then(m => m.ArticleModule),
        canLoad: [CanLoadLoggedUserGuard]
      },
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
