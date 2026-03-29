import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as homeActions from '../../store/index';
import { AppStateInterface } from 'src/app/core/models/appState.interface';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule]
})
export class MainLayoutComponent implements OnInit {

  constructor(private readonly _store: Store<AppStateInterface>) {
    this._store.dispatch(homeActions.LOAD_NEWS());
   }

  ngOnInit(): void {}
}
