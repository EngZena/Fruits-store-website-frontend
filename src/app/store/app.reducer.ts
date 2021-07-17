import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../containers/auth/store/auth.reducer';

export interface AppState {
    auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer
}
