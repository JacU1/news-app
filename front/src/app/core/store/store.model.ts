import { IArticle } from "../models/news-api-model";

export interface NewsState {
    data: IArticle[];
    loaded: boolean;
    loading: boolean;
    error: string | null;
}