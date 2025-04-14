import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameOperationsService {
  constructor() {}

  private currentNumberSubject = new BehaviorSubject<number>(1);
  private gameOverSubject = new BehaviorSubject<boolean>(false);
  private movesLogSubject = new BehaviorSubject<string[]>([]);
  // private winnerSubject = new BehaviorSubject<string>('');

  private userScoreSubject = new BehaviorSubject<number>(0);
  private computerScoreSubject = new BehaviorSubject<number>(0);

  userScore$ = this.userScoreSubject.asObservable();
  computerScore$ = this.computerScoreSubject.asObservable();

  currentNumber$ = this.currentNumberSubject.asObservable();
  gameOver$ = this.gameOverSubject.asObservable();
  movesLog$ = this.movesLogSubject.asObservable();
  // winner$ = this.winnerSubject.asObservable();

  resetGame() {
    this.currentNumberSubject.next(1);
    this.movesLogSubject.next([`🎮 Game Restarted!`]);
    this.gameOverSubject.next(false);
    // this.winnerSubject.next('');
  }

  addMove(msg: string, num: number) {
    this.movesLogSubject.next([msg, ...this.movesLogSubject.value]);
    this.currentNumberSubject.next(num);
  }

  endGame(msg: string, winner: string) {
    this.movesLogSubject.next([msg, ...this.movesLogSubject.value]);
    this.gameOverSubject.next(true);
    // this.winnerSubject.next(winner);
  }

  getCurrentNumber(): number {
    return this.currentNumberSubject.value;
  }

  incrementUserScore() {
    this.userScoreSubject.next(this.userScoreSubject.value + 1);
  }

  incrementComputerScore() {
    this.computerScoreSubject.next(this.computerScoreSubject.value + 1);
  }

  resetScores() {
    this.userScoreSubject.next(0);
    this.computerScoreSubject.next(0);
  }
}
