'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpMessage = document.querySelector('.pop-up__message');
    this.popUpReplay = document.querySelector('.pop-up__replay');
    this.popUpReplay.onclick = () => {
      this.hide();
      this.onClick && this.onClick();
    };
  }

  setClickListener(listener) {
    this.onClick = listener;
  }

  showWithText(text) {
    this.popUpMessage.textContent = text;
    this.popUp.classList.remove('pop-up--hide');
  }

  hide = () => {
    this.popUp.classList.add('pop-up--hide');
  };
}
