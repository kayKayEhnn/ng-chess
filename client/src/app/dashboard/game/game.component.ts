import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from './game.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Game } from '../../models/Game';

@Component({
  selector: 'app-dashboard-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  host: { '[style.flex]': '1' }
})
export class DashboardGameComponent implements OnInit {
  public gameData: Game;
  public makeMoveBound: Function;
  public origin: string;

  constructor (
    private store: Store<AppState>,
    private route: ActivatedRoute,
    public gameService: GameService) { }

  ngOnInit () {
    const gameId = +this.route.snapshot.paramMap.get('gameId');
    this.gameService.startGame(gameId);

    this.store.select(state => state.game.data)
      .subscribe(state => {
        this.gameData = state || {} as Game;

        if (!this.makeMoveBound && this.gameData) {
          this.makeMoveBound = this.gameService.makeMove.bind(this.gameService, gameId);
        }
      });

    // get rootPath
    const href = window.location.href;
    this.origin = href.slice(0, href.indexOf('/dashboard'));
  }
}
