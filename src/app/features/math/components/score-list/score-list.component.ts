import { Component, OnInit, Input } from '@angular/core';
import { ScoresModel } from '../../models';
import { MathState } from '../../reducers';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { playAgain } from '../../actions/questions.actions';

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.scss']
})
export class ScoreListComponent implements OnInit {

  @Input() scoresModel: ScoresModel = {
    numberCorrect: 0,
    numberOfQuestions: 0,
    numberWrong: 0,
    scores: []
  };
  constructor(private store: Store<MathState>, private router: Router) { }

  ngOnInit() {
  }

  playAgain() {
    this.store.dispatch(playAgain());
    this.router.navigate(['math', 'game']);
  }
}
