import { Component, OnInit } from '@angular/core';
import { QuestionModel } from '../../models';
import { MathState, selectQuestionModel, selectAtEndOfQuestions, selectGameOverMan } from '../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { answerProvided, playAgain } from '../../actions/questions.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  model = {};
  atEnd$: Observable<boolean>;
  model$: Observable<QuestionModel>;
  gameOver$: Observable<boolean>;
  constructor(private store: Store<MathState>, private router: Router) { }

  ngOnInit() {
    this.model$ = this.store.select(selectQuestionModel);
    this.atEnd$ = this.store.select(selectAtEndOfQuestions);
    this.gameOver$ = this.store.select(selectGameOverMan);
  }
  next(guessEl: HTMLInputElement) {
    const guess = guessEl.valueAsNumber;
    this.store.dispatch(answerProvided({ guess }));
    guessEl.value = '';
    guessEl.focus();
  }

  playAgain() {
    this.store.dispatch(playAgain());
  }

  finish(guessEl: HTMLInputElement) {
    const guess = guessEl.valueAsNumber;
    this.store.dispatch(answerProvided({ guess }));
    // TODO: Goto the route "math/scores"
    this.router.navigate(['math', 'scores']);
  }
}
