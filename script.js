'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const STEP = 10;

  function DomElement(selector, text, style) {
    this.selector = selector;
    style = style || {};
    this.width = style.width;
    this.height = style.height;
    this.bg = style.bg;
    this.fontSize = style.fontSize;
    this.text = text;
  }

  DomElement.prototype.createsElement = function () {
    const string = this.selector.trim();
    let elem
    if (string[0] === '.') {
      elem = document.createElement('div');
      elem.className = string.slice(1);
    }

    if (string[0] === '#') {
      elem = document.createElement('p');
      elem.id = string.slice(1);
    }

    elem.style.cssText = `
      width: ${this.width};
      height: ${this.height};
      background-color: ${this.bg};
      font-size: ${this.fontSize};
      `;

    elem.textContent = this.text;
    return elem;
  }

  let block = new DomElement('#block', 'Привет мир!', {
    width: '100%',
    height: '50px',
    bg: 'aquamarine',
    fontSize: '20px'
  });

  document.body.prepend(block.createsElement());

  // Создаём на основе класса DomElement новый класс BlockSquare с дополнительным
  // параметром position
  function BlockSquare(selector, text, style, position) {
    DomElement.apply(this, arguments);
    this.position = position;
  }

  // Привязываю прототип DomElement к прототипу BlockSquare

  BlockSquare.prototype = Object.create(DomElement.prototype);
  BlockSquare.prototype.constructor = BlockSquare;

  // Добавляю к прототипу BlockSquare метод createsElementSquare который 
  // добавляет к созданному элементу методом createsElement стиль позиции.

  BlockSquare.prototype.createsElementSquare = function () {
    let elem = this.createsElement();
    elem.style.position = this.position;
    return elem;
  }

  let square = new BlockSquare('.square', '', {
    width: '100px',
    height: '100px',
    bg: 'navy'
  }, 'absolute');

  console.log(square);
  console.log(square instanceof BlockSquare);
  console.log(square instanceof DomElement);

  const elemSquare = square.createsElementSquare();
  document.body.append(elemSquare);

  document.body.addEventListener('keydown', (e) => {
    const positionStyle = getComputedStyle(elemSquare);
    const styleTop = parseInt(positionStyle.top);
    const styleLeft = parseInt(positionStyle.left);
    switch (e.key) {
      case 'ArrowUp':
        elemSquare.style.top = `${styleTop - STEP}px`;
        break;

      case 'ArrowDown':
        elemSquare.style.top = `${styleTop + STEP}px`;
        break;

      case 'ArrowLeft':
        elemSquare.style.left = `${styleLeft - STEP}px`;
        break;

      case 'ArrowRight':
        elemSquare.style.left = `${styleLeft + STEP}px`;
        break;
    }
  });
});