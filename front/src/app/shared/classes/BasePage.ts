import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: '',
  standalone: false,
})
export abstract class BasePage implements OnDestroy, OnInit {
  protected destroyed$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  ngOnInit(): void {
    console.log('BasePage initialized');
  }
}
