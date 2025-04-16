import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { GameOperationsService } from '../../services/game-operations.service';
import { CommonModule } from '@angular/common';
import { ScoreBoardComponent } from '../score-board/score-board.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, ScoreBoardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class GameComponent {
  currentNumber = 1;
  gameOver = false;
  movesLog: string[] = [];
  winnerMessage = '';
  isDarkMode = false;

  constructor(public gameService: GameOperationsService) {
    this.gameService.currentNumber$.subscribe(
      (num) => (this.currentNumber = num)
    );
    this.gameService.gameOver$.subscribe((over) => (this.gameOver = over));
    this.gameService.movesLog$.subscribe((logs) => (this.movesLog = logs));
    // this.gameService.winner$.subscribe((msg) => (this.winnerMessage = msg));
    this.startGame();
  }

  startGame() {
    this.winnerMessage = '';
    this.gameService.resetGame();
    this.gameService.addMove(`🤖 Computer begins with 1`, 1);
  }

  userPlay(add: number) {
    if (this.gameOver) return;

    const newNum = this.currentNumber + add;
    this.gameService.addMove(
      `🧑 You added ${add} → Current: ${newNum}`,
      newNum
    );

    if (newNum >= 30) {
      this.winnerMessage = '🎉 You reached 30 and won!';
      this.gameService.incrementUserScore();
      return this.gameService.endGame(this.winnerMessage, 'You');
    }

    setTimeout(() => this.computerPlay(), 1000);
  }

  computerPlay() {
    if (this.gameOver) return;

    const num = this.gameService.getCurrentNumber();
    let compAdd = 1;

    if (num === 25) {
      compAdd = 2;
    } else if (num === 26) {
      compAdd = 1;
    } else if (num >= 28) {
      compAdd = 30 - num;
    } else if (num + 2 <= 27) {
      compAdd = 2;
    } else {
      compAdd = 1;
    }

    const newNum = num + compAdd;
    this.gameService.addMove(
      `🤖 Computer added ${compAdd} → Current: ${newNum}`,
      newNum
    );

    if (newNum >= 30) {
      this.winnerMessage = '💻 Computer reached 30 and won!';
      this.gameService.incrementComputerScore();
      return this.gameService.endGame(this.winnerMessage, 'Computer');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }
}
