import { createAction, props } from '@ngrx/store';
import { SavedScoreModel } from '../reducers/saved-scores.reducer';

export const loadSavedScores = createAction(
  '[ MATH GAME ] Load saved scores.'
);

export const loadSavedScoresSucceeded = createAction(
  '[ MATH GAME ] Load saved scores succeeded.',
  props<{ scores: SavedScoreModel[] }>()
);

let currentId = 50000;
export const saveScore = createAction(
  '[ MATH GAME ] Save score.',
  (right: number, wrong: number) => {
    const newScore: SavedScoreModel = {
      right,
      wrong,
      who: 'Jill', // Use "Jill" to get a 404 Bad Request from API
      when: new Date().toISOString(),
      id: currentId++
    };
    return { payload: newScore };
  }
);

export const saveScoreSucceeded = createAction(
  '[ MATH GAME ] Save score succeeded.',
  props<{ oldId: number, newScore: SavedScoreModel }>()
);

export const saveScoreFailed = createAction(
  '[ MATH GAME ] Save score failed.',
  props<{ id: number, reason: string }>()
);
