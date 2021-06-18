'use strict';

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
    elem.className = string.slice(1);
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

let block = new DomElement('#block', 'Привет мир!', { width: '100%', height: '50px', bg: 'aquamarine', fontSize: '20px' });

document.body.prepend(block.createsElement());
