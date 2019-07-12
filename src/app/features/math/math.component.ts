import { Component, OnInit } from '@angular/core';
import { MathState, selectHideScores, selectHideGame } from './reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadSavedScores } from './actions/saved-scores.actions';

@Component({
  selector: 'app-math',
  templateUrl: './math.component.html',
  styleUrls: ['./math.component.scss']
})
export class MathComponent implements OnInit {

  hidesScores$: Observable<boolean>;
  hidesGame$: Observable<boolean>;
  constructor(private store: Store<MathState>) { }

  ngOnInit() {
    this.hidesScores$ = this.store.select(selectHideScores);
    this.hidesGame$ = this.store.select(selectHideGame);
    this.store.dispatch(loadSavedScores());
  }

}
