import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as questionActions from '../actions/questions.actions';
import { tassign } from 'tassign';

export interface QuestionEntity {
  id: number;
  question: string;
  answer: number;
}

interface MissedQustion { id: number; providedAnswer: number; }
export interface MathQuestionsState extends EntityState<QuestionEntity> {
  currentQuestionId: number;
  missedQuestions: MissedQustion[];
}

const initialState: MathQuestionsState = {
  currentQuestionId: 1,
  missedQuestions: [],
  ids: [1, 2, 3, 4, 5],
  entities: {
    1: {
      id: 1,
      question: '1 + 1',
      answer: 2
    },
    2: {
      id: 2,
      question: '3 * 3',
      answer: 9
    },
    3: {
      id: 3,
      question: '18 - 2',
      answer: 16
    },
    4: {
      id: 4,
      question: '32 / 2',
      answer: 16
    },
    5: {
      id: 5,
      question: '20 - 5',
      answer: 15
    }
  }
};

export const adapter = createEntityAdapter<QuestionEntity>();

// Whatever comes from the 'on' statements, is what the next application state will be.
const mathReducer = createReducer(
  initialState,
  on(questionActions.playAgain, () => initialState),
  on(questionActions.answerProvided, (state, action) => {
    let tempState = { ...state };
    // we need to know if the guess is the answer to the current question
    const currentQuestion = state.entities[state.currentQuestionId];
    if (action.guess !== state.entities[state.currentQuestionId].answer) {
      // add the questionId and their guess to the array of missedQuestions
      tempState = { ...tempState, missedQuestions: [...state.missedQuestions, { id: currentQuestion.id, providedAnswer: action.guess }] };
    }
    // const newState = ({ ...tempState, currentQuestionId: state.currentQuestionId + 1 });
    const newState = tassign(tempState, { currentQuestionId: state.currentQuestionId + 1 });
    return newState;
  })
);

// Note: We have to do this because the ng AOT compiler cannot import from the result of a function call
// so we export instead a function that calls our function.
export function reducer(state: MathQuestionsState | undefined, action: Action) {
  return mathReducer(state, action);
}

