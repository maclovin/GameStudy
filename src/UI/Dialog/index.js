import UniqId from 'uniqid';
import { string as Style } from 'to-style';

Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for(var i = this.length - 1; i >= 0; i--) {
      if(this[i] && this[i].parentElement) {
          this[i].parentElement.removeChild(this[i]);
      }
  }
}

class Dialog {
  constructor(type, id, title = '', size = ['100px', '100px'], position = [0, 0]) {
    this.type = type ? ` dialog--${type}` : '';
    this.id = id || UniqId();
    this.size = size;
    this.position = position;
    this.title = title;
    this.content = '';
    this.visible = false;
    this.close = true;

    this.style = {
      position: 'fixed',
      width: this.size[0],
      height: this.size[1],
      left: this.position[0],
      top: this.position[1],
    };

    this.dom = document.createElement('div');
    this.dom.id = this.id;
    document.body.appendChild(this.dom);
  }

  getId() {
    return this.id;
  }

  setContent(content) {
    this.content = content;
    this.render();
  }

  toggleVisibility() {
    this.visible = !this.visible;
    this.render();
  }

  destroy() {
    document.getElementById(this.id).remove();
  }

  render() {
    this.dom.innerHTML = /*html*/`<section 
      style="${Style(this.style)}"
      id="${this.id}" 
      class="dialog${this.type}" 
      data-visible=${this.visible}
    >
      <header class="dialog__top">
        <label class="dialog__top-title">${this.title}</label>
        <button class="dialog__top-close" onClick="document.getElementById('${this.id}').remove();">x</button>
      </header>  
      ${this.content}
    </section>`;
  }
}

export default Dialog;