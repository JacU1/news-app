import * as fromNews from "../actions/news.action";
import { createReducer, on } from "@ngrx/store";
import { NewsState } from "../store.model";

export const initialState : NewsState = {
    data: [],
    loaded: false,
    loading: false,
    error: null
}

export const newsReducers = createReducer(initialState, 
    on(fromNews.LOAD_NEWS,(state) => ({...state, loading: true})),
    on(fromNews.LOAD_NEWS_FAIL, (state, action) => ({ ...state, error: action.error})),
    on(fromNews.LOAD_NEWS_SUCCESS, (state, action) => ({ ...state, data: action.articles, loaded: true, loading: false}))
);
