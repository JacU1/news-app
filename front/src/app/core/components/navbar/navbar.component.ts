import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/shared/services/auth/auth-service';
import { AppStateInterface } from '../../models/appState.interface';
import { articlesSelector } from '../../store';
import { Observable, map, of } from 'rxjs';
import { Router } from '@angular/router';

export interface SearchBarDropdown {
  id: number,
  name: string,
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public selectedArticle!: string;
  public dropdownItems$!: Observable<SearchBarDropdown[]>;
  
  constructor(private readonly _authService: AuthService,
              private readonly _store: Store<AppStateInterface>,
              private readonly _router: Router) { }

  ngOnInit(): void {
    this.dropdownItems$ = this._store.select(articlesSelector).pipe(map(articles => {
      const dropdownItems: SearchBarDropdown[] = [];
      articles.map(article => {
        const dropdownItem = {
          id: articles.indexOf(article) + 1,
          name: article.title
        }
        dropdownItems.push(dropdownItem);
      });

      return dropdownItems
    }));
  }

  logoutUser(): void {
    this._authService.logoutUser();
  }

  public onSelectClick(){
    this._router.navigate(['app','articles', this.selectedArticle])
  }

}
