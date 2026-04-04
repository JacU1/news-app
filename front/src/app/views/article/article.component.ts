import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IArticle } from '../../core/models/news-api-model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class ArticleComponent implements OnInit {
  public selectedArticle$!: Observable<IArticle>;

  constructor(private readonly _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}
}
