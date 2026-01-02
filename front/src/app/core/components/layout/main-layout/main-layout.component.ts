import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as homeActions from '../../../store/index';
import { AppStateInterface } from 'src/app/core/models/appState.interface';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass']
})
export class MainLayoutComponent implements OnInit {

  constructor(private readonly _store: Store<AppStateInterface>) {
    this._store.dispatch(homeActions.LOAD_NEWS());
   }

  ngOnInit(): void {}
}
