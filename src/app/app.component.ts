import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameOperationsService } from './services/game-operations.service';
import { GameComponent } from './Components/game/game.component';
import { ScoreBoardComponent } from './Components/score-board/score-board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameComponent, ScoreBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'First-to-30';
}
