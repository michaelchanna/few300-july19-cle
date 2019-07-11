import { createAction, props } from '@ngrx/store';

export const answerProvided = createAction(
  '[ MATH GAME ] Answer provided',
  props<{ guess: number }>()
);

export const playAgain = createAction(
  '[ MATH GAME ] Play again.'
);
