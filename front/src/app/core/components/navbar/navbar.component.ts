import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth-service';

export interface SearchBarDropdown {
  id: number;
  name: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterModule, NgSelectModule, CommonModule, FormsModule],
})
export class NavbarComponent {
  public selectedArticle!: string;
  public dropdownItems$!: Observable<SearchBarDropdown[]>;

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  logoutUser(): void {
    this._authService.logoutUser();
  }

  public onSelectClick() {
    this._router.navigate(['app', 'articles', this.selectedArticle]);
  }
}
