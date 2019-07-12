import { createAction, props } from '@ngrx/store';
import { SavedScoreModel } from '../reducers/saved-scores.reducer';

export const loadSavedScores = createAction(
  '[ MATH GAME ] Load saved scores.'
);

export const loadSavedScoresSucceeded = createAction(
  '[ MATH GAME ] Load saved scores succeeded.',
  props<{ scores: SavedScoreModel[] }>()
);
