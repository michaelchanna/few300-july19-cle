import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScoresModel } from '../../models';
import { MathState, selectScoresModel } from '../../reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {

  scoresModel$: Observable<ScoresModel>;
  constructor(private store: Store<MathState>) { }

  ngOnInit() {
    this.scoresModel$ = this.store.select(selectScoresModel);
  }

}
