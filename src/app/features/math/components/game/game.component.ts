import { Component, OnInit } from '@angular/core';
import { QuestionModel } from '../../models';
import { MathState, selectQuestionModel, selectAtEndOfQuestions } from '../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { answerProvided } from '../../actions/questions.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  model = {};
  atEnd$: Observable<boolean>;
  model$: Observable<QuestionModel>;
  constructor(private store: Store<MathState>) { }

  ngOnInit() {
    this.model$ = this.store.select(selectQuestionModel);
    this.atEnd$ = this.store.select(selectAtEndOfQuestions);
  }
  next(guessEl: HTMLInputElement) {
    const guess = guessEl.valueAsNumber;
    this.store.dispatch(answerProvided({ guess }));
    guessEl.value = '';
    guessEl.focus();
  }
}
