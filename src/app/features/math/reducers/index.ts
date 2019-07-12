
export const featureName = 'mathFeature';
import * as fromQuestions from './questions.reducer';
import * as fromSavedScores from './saved-scores.reducer';
import * as fromUiHints from './ui-hints.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestionModel, ScoresModel } from '../models';


export interface MathState {
  questions: fromQuestions.MathQuestionsState;
  savedScores: fromSavedScores.SavedScoresState;
  ui: fromUiHints.UiHintsState;
}

export const reducers = {
  questions: fromQuestions.reducer,
  savedScores: fromSavedScores.savedScoresReducer,
  ui: fromUiHints.reducer
};

// 1. Create a feature selector (that knows how to find the feature in the state)
const selectMathFeature = createFeatureSelector<MathState>(featureName);

// 2. Create a selector for each "branch" of the MathState (e.g. questions)
const selectQuestionsBranch = createSelector(selectMathFeature, m => m.questions);
const selectSavedScoresBranch = createSelector(selectMathFeature, m => m.savedScores);

// 3. Selectors that are "helpers" to get the data you need for step 4.
const selectCurrentQuestionId = createSelector(selectQuestionsBranch, q => q.currentQuestionId);

// Object Destructuring (GOOGLE: mdn object destructuring)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const {
  selectTotal: selectTotalNumberofQuestions,
  selectAll: selectAllQuestions,
  selectEntities: selectQuestionEntities } = fromQuestions.adapter.getSelectors(selectQuestionsBranch);

const { selectAll: selectAllSavedScores } = fromSavedScores.adapter.getSelectors(selectSavedScoresBranch);

const selectSelectedQuestion = createSelector(
  selectQuestionEntities,
  selectCurrentQuestionId,
  (entities, current) => entities[current]
);
// 4. Create a selector for each component model

export const selectSavedScoresModel = createSelector(selectAllSavedScores, s => s);

// TODO Create a selector that returns QuestionModel
// current id, how many total, question for current question

export const selectQuestionModel = createSelector(
  selectTotalNumberofQuestions,
  selectSelectedQuestion,
  selectCurrentQuestionId,
  (total, selected, currentId) => {
    if (currentId > total) { return null; }
    return {
      num: selected.id,
      of: total,
      question: selected.question
    } as QuestionModel;
  }
);

export const selectAtEndOfQuestions = createSelector(
  selectTotalNumberofQuestions,
  selectCurrentQuestionId,
  (total, current) => current >= total
);

export const selectGameOverMan = createSelector(
  selectQuestionsBranch,
  q => q.missedQuestions.length === 3
);

const selectScores = createSelector(
  selectQuestionsBranch,
  b => b.missedQuestions
);
const selectNunmberCorrect = createSelector(
  selectTotalNumberofQuestions,
  selectScores,
  (total, wrong) => total - wrong.length
);
export const selectScoresModel = createSelector(
  selectTotalNumberofQuestions,
  selectNunmberCorrect,
  selectScores,
  selectAllQuestions,
  (numberOfQuestions, numberCorrect, scores, questions) => {
    const result: ScoresModel = {
      numberOfQuestions,
      numberCorrect,
      numberWrong: numberOfQuestions - numberCorrect,
      scores: questions.map(q => {
        const incorrect = scores.some(s => s.id === q.id);
        const providedAnswer = incorrect ? scores.filter(s => s.id === q.id)[0].providedAnswer : null;
        const questionResponse = {
          num: q.id,
          question: q.question,
          answer: q.answer,
          incorrect,
          providedAnswer
        };
        return questionResponse;
      })
    };
    return result;
  }
);

export const selectHideScores = createSelector(
  selectTotalNumberofQuestions,
  selectCurrentQuestionId,
  (total, current) => (total + 1) !== current
);

export const selectHideGame = createSelector(
  selectHideScores,
  (x) => !x
);
