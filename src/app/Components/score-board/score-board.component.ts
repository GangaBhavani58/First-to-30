import { Component, Input } from '@angular/core';
import { GameOperationsService } from '../../services/game-operations.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-board',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.scss',
})
export class ScoreBoardComponent {
  userScore = 0;
  computerScore = 0;
  @Input() darkMode: boolean = false;

  constructor(public gameService: GameOperationsService) {
    this.gameService.userScore$.subscribe((score) => (this.userScore = score));
    this.gameService.computerScore$.subscribe(
      (score) => (this.computerScore = score)
    );
  }

  ngOnChanges() {
    // console.log('val>>', this.darkMode);
  }
}
