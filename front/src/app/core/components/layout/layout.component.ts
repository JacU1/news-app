import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule],
})
export class MainLayoutComponent {}
