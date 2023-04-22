'use strict';

import Field, { ItemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

// Builder Pattern ⭐⭐⭐
export default class GameBuilder {
  withGameDurationSec(duration) {
    this.gameDurationSec = duration;
    return this;
  }

  withCarrotCount(count) {
    this.carrotCount = count;
    return this;
  }

  withBugCount(count) {
    this.bugCount = count;
    return this;
  }

  build() {
    return new Game(
      this.gameDurationSec, //
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
  constructor(carrotCount, bugCount, gameDurationSec) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameDurationSec = gameDurationSec;

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button');
    this.gameBtn.onclick = () => {
      if (!this.started) {
        this.start();
      } else {
        this.stop(Reason.cancel);
      }
    };

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start = () => {
    this.started = true;
    this.init();
    this.showButton();
    this.showStopButton();
    this.showTimer();
    this.showScore();
    sound.playBg();
  };

  stop(reason) {
    this.started = false;
    this.stopTimer();
    this.hideButton();
    sound.stopBg();
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = (item) => {
    if (!this.started) return;

    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();

      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  };

  updateScoreBoard() {
    this.gameScore.textContent = this.carrotCount - this.score;
  }

  init() {
    this.score = 0;
    this.gameScore.textContent = this.carrotCount;
    this.gameField.init();
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    this.gameTimer.textContent = `${minutes}:${seconds}`;
  }

  startTimer() {
    let remainingTimeSec = this.gameDurationSec;

    this.updateTimerText(remainingTimeSec);

    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.score < this.carrotCount ? Reason.lose : Reason.win);
        return;
      }

      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  showScore() {
    this.gameScore.style.visibility = 'visible';
  }

  showTimer() {
    this.gameTimer.style.visibility = 'visible';
    this.startTimer();
  }

  showButton() {
    this.gameBtn.style.visibility = 'visible';
  }

  hideButton() {
    this.gameBtn.style.visibility = 'hidden';
  }

  showStopButton() {
    this.gameBtn.innerHTML = `<span class="material-symbols-rounded">
      stop
      </span>`;
  }
}
