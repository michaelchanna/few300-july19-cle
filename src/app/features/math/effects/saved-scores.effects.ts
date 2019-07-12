import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as savedScoreActions from '../actions/saved-scores.actions';
import { tap, switchMap, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SavedScoreModel } from '../reducers/saved-scores.reducer';

@Injectable()
export class SavedScoresEffects {

  url: string;

  // loadData action -> goto API, get data, turn that into -> loadDataSucceeded
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(savedScoreActions.loadSavedScores),
      switchMap(() => this.http.get<ScoresDataFromServer>(this.url)
        .pipe(
          map(serverData => serverData.scores),
          map(scores => savedScoreActions.loadSavedScoresSucceeded({ scores }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {
    this.url = environment.savedScoresUrl;
  }

}

interface ScoresDataFromServer {
  scores: SavedScoreModel[];
}
