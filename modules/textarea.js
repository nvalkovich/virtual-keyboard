class Textarea {
  constructor() {
    this.element = Textarea.createElement();
    this.element.addEventListener('click', this.setPosition.bind(this));
    this.position = 0;
  }

  setPosition() {
    this.position = this.element.selectionStart;
  }

  handleButtonClick({ value, removePrev, removeNext }) {
    this.element.focus();
    if (value) {
      this.addSymbol(value);
    } else if (removePrev) {
      this.removePrevSymbol();
    } else if (removeNext) {
      this.removeNextSymbol();
    }
  }

  addSymbol(symbol) {
    const { value } = this.element;
    this.element.value = value.slice(0, this.position) + symbol + value.slice(this.position);
    this.position += symbol.length;
    this.element.selectionStart = this.position;
    this.element.selectionEnd = this.position;
  }

  removePrevSymbol() {
    const { value } = this.element;
    if (this.position === 0) return;
    this.element.value = value.slice(0, this.position - 1) + value.slice(this.position);
    this.position -= 1;
    this.element.selectionStart = this.position;
    this.element.selectionEnd = this.position;
  }

  removeNextSymbol() {
    const { value } = this.element;
    this.element.value = value.slice(0, this.position) + value.slice(this.position + 1);
    this.element.selectionStart = this.position;
    this.element.selectionEnd = this.position;
  }

  static createElement() {
    const textarea = document.createElement('textarea');
    textarea.className = 'textarea';

    return textarea;
  }
}

export default Textarea;
