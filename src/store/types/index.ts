import { AppState } from './app.types';
import { AuthState } from './auth.types';

export interface RootState {
  app: AppState;
  auth: AuthState;
}
