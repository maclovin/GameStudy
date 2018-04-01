import UniqId from 'uniqid';
import { string as Style } from 'to-style';

class Dialog {
  constructor(id, title = '', size = ['100px', '100px'], position = [0, 0]) {
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

  render() {
    this.dom.innerHTML = /*html*/`<section 
      style="${Style(this.style)}"
      id="${this.id}" 
      class="dialog" 
      data-visible=${this.visible}
    >
      <header class="dialog__top">
        <label class="dialog__top-title">${this.title}</label>
        <button class="dialog__top-close" onClick="${this.id}.toggleVisibility">≈</button>
      </header>  
      ${this.content}
    </section>`;
  }
}

export default Dialog;