class Button {
  constructor({
    code,
    en,
    ru,
    enShift,
    ruShift,
    classNames,
    isSpecial,
  }) {
    this.code = code;
    this.en = en;
    this.ru = ru || en;
    this.enShift = enShift;
    this.ruShift = ruShift || enShift;
    this.hasShift = !!enShift;
    this.classNames = classNames || [];
    this.element = this.createElement();
    this.isSpecial = !!isSpecial;
  }

  createElement() {
    const button = document.createElement('div');
    button.className = 'btn';
    button.id = this.code;
    button.innerText = this.en;
    this.classNames.forEach((element) => {
      button.classList.add(element);
    });

    return button;
  }

  down() {
    this.element.classList.add('btn-down');
  }

  up() {
    this.element.classList.remove('btn-down');
  }

  setState({ lang, shiftKey, caps }) {
    if (shiftKey && this.hasShift) {
      this.state = this[`${lang}Shift`];
    } else if (shiftKey && !this.hasShift && !this.isSpecial) {
      this.state = this[lang].toUpperCase();
    } else {
      this.state = this[lang];
    }

    if (!this.isSpecial && caps) {
      this.state = this.state.toUpperCase();
    }

    this.element.innerText = this.state;

    if (this.code === 'CapsLock' && caps) {
      this.down();
    }
  }
}

export default Button;
