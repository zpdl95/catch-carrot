'use strict';

import * as sound from './sound.js';

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

//  * 클래스 내부에서 eventListener함수를 사용할때,
//  * this바인딩 문제로 인해 ()=>{}을 사용해야 한다
//  * 사용하지 않으면 event가 발생한 element의 this를 사용하게 된다

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.onclick = this.onClick;
  }

  init() {
    this.field.innerHTML = ``;
    this._addItem(ItemType.carrot, this.carrotCount, 'img/carrot.png');
    this._addItem(ItemType.bug, this.bugCount, 'img/bug.png');
  }

  setClickListener(listener) {
    this.onItemClick = listener;
  }

  // * 자바스크립트에서 private method를 만드는 오래된 방법
  // * _이름
  // * 이렇게 작성하므로써 실제론 사용 가능하나 사용하지 마라고 하는 것
  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.className = className;
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = x + 'px';
      item.style.top = y + 'px';
      this.field.appendChild(item);
    }
  }

  onClick = (e) => {
    const { target } = e;

    if (target.matches('.carrot')) {
      this.onItemClick && this.onItemClick(ItemType.carrot);
      sound.playCarrot();
      target.remove();
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
      target.remove();
    }
  };
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * max - min) + min;
}
