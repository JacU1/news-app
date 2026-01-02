import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CsrfService } from '../services/csrf/csrf.service';

@Component({
    template: ''
  })
export abstract class BasePage implements OnDestroy, OnInit {
  protected destroyed$ = new Subject<void>();
  
  constructor(readonly _csrf: CsrfService) {}

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  ngOnInit(): void {
    this._csrf.GetandSetToken().subscribe(() => {});
  }
}