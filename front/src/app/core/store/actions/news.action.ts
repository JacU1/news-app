import { createAction, props } from "@ngrx/store";
import { IArticle } from "src/app/core/models/news-api-model";
import { StoreActionsEnum } from "../../models/news.enums";

export const LOAD_NEWS = createAction(StoreActionsEnum.Load_News);
export const LOAD_NEWS_FAIL = createAction(StoreActionsEnum.Load_News_Fail, props<{error: string}>());
export const LOAD_NEWS_SUCCESS = createAction(StoreActionsEnum.Load_News_Success, props<{articles: IArticle[]}>());
