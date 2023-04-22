'use strict';

import GameBuilder, { Reason } from './game.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

const game = new GameBuilder()
  .withGameDurationSec(3)
  .withCarrotCount(3)
  .withBugCount(3)
  .build();

const gameFinishBanner = new PopUp();

game.setGameStopListener((reason) => {
  let message;

  switch (reason) {
    case Reason.cancel:
      sound.playAlert();
      message = 'Replay ❓';
      break;
    case Reason.win:
      sound.playWin();
      message = 'YOU WON 🤩';
      break;
    case Reason.lose:
      sound.playBug();
      message = 'YOU LOST 😭';
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});
gameFinishBanner.setClickListener(game.start);
