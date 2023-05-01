import Button from './button.js';
import config from './config.js';

class Keyboard {
  constructor() {
    this.lang = localStorage.getItem('lang');
    if (!this.lang) {
      this.toggleLang();
    }
    this.caps = false;
    this.buttons = config.map((c) => new Button(c));
    this.buttons.forEach((b) => b.setState({ lang: this.lang }));
    document.addEventListener('mousedown', this.mousedownHandler.bind(this));
    document.addEventListener('mouseup', this.mouseupHandler.bind(this));
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    document.addEventListener('keyup', this.keyupHandler.bind(this));
    this.element = this.createElement();
  }

  toggleLang() {
    this.lang = this.lang === 'en' ? 'ru' : 'en';
    localStorage.setItem('lang', this.lang);
  }

  mousedownHandler(e) {
    if (!e.target.classList.contains('btn')) return;
    this.handleDown(e.target.id, e.ctrlKey);
  }

  mouseupHandler(e) {
    this.buttons.forEach((b) => {
      if (e.shiftKey && (b.code === 'ShiftLeft' || b.code === 'ShiftLeft')) {
        return;
      }
      b.up();
    });
    this.buttons.forEach((b) => b.setState({
      lang: this.lang,
      shiftKey: e.shiftKey,
      caps: this.caps,
    }));
  }

  keydownHandler(e) {
    e.preventDefault();
    this.handleDown(e.code, e.ctrlKey);
  }

  keyupHandler(e) {
    e.preventDefault();
    const button = this.buttons.find((b) => b.code === e.code);
    if (!button) return;
    button.up();
    this.buttons.forEach((b) => b.setState({
      lang: this.lang, shiftKey: e.shiftKey, caps: this.caps,
    }));
  }

  handleDown(code, ctrlKey) {
    const button = this.buttons.find((b) => b.code === code);
    if (!button) return;
    button.down();
    switch (code) {
      case 'AltLeft':
        (() => { if (ctrlKey) { this.toggleLang(); } })();
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.buttons.forEach((b) => b.setState({
          lang: this.lang,
          shiftKey: true,
          caps: this.caps,
        }));
        break;
      case 'Enter':
        this.callback({ value: '\n' });
        break;
      case 'Backspace':
        this.callback({ removePrev: true });
        break;
      case 'Delete':
        this.callback({ removeNext: true });
        break;
      case 'ControlLeft':
      case 'ControlRight':
      case 'AltRight':
      case 'MetaLeft':
        break;
      case 'Tab':
        this.callback({ value: '    ' });
        break;
      case 'CapsLock':
        this.caps = !this.caps;
        this.buttons.forEach((b) => b.setState({ lang: this.lang, caps: this.caps }));
        break;
      default:
        this.callback({ value: button.state });
    }
  }

  createElement() {
    const keyboard = document.createElement('div');
    keyboard.className = 'keyboard';
    this.buttons.forEach((b) => keyboard.append(b.element));

    return keyboard;
  }

  onButtonClick(callback) {
    this.callback = callback;
  }
}

export default Keyboard;
