import { Action } from '@ngrx/store';

export interface UiHintsState {
  hasError: boolean;
  errorMessage: string;
}

const initialState: UiHintsState = {
  hasError: false,
  errorMessage: ''
};

export function reducer(state: UiHintsState, action: Action) {
  switch (action.type) {
    case '[ MATH GAME ] Save score failed.': {
      return {
        hasError: true,
        errorMessage: 'Could not save scores.  Sorry, Jill.  Quit cheating!'
      };
    }
    default: {
      return state;
    }
  }
}
