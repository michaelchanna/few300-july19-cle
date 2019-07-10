import { createAction, props } from '@ngrx/store';

export const answerProvided = createAction(
  '[ MATH GAME ] answer provided',
  props<{ guess: number }>()
);
