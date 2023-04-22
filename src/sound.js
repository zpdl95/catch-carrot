'use strict';

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const gameWinSound = new Audio('./sound/game_win.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

export function playCarrot() {
  playSound(carrotSound);
}
export function playBug() {
  playSound(bugSound);
}
export function playWin() {
  playSound(gameWinSound);
}
export function playBg() {
  playSound(bgSound);
}
export function playAlert() {
  playSound(alertSound);
}

export function stopCarrot() {
  stopSound(carrotSound);
}
export function stopBug() {
  stopSound(bugSound);
}
export function stopWin() {
  stopSound(gameWinSound);
}
export function stopBg() {
  stopSound(bgSound);
}
export function stopAlert() {
  stopSound(alertSound);
}
