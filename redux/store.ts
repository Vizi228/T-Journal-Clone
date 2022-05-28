import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userReducer } from './slices/user';
import { createWrapper } from 'next-redux-wrapper';
import { commentReducer } from './slices/comment';

export function makeStore() {
    return configureStore({
        reducer: {
            user: userReducer,
            comments: commentReducer,
        },
    })
}

export const store = makeStore()


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export type AppDispatch = typeof store.dispatch;
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
