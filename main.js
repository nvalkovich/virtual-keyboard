import Keyboard from './modules/keyboard.js';
import Textarea from './modules/textarea.js';

document.addEventListener('DOMContentLoaded', () => {
  const keyboardWrapper = document.createElement('div');
  keyboardWrapper.className = 'keyboard-wrapper';
  document.body.append(keyboardWrapper);

  const title = document.createElement('h1');
  title.className = 'keyboard-wrapper__title';
  title.innerHTML = 'RSS Виртуальная клавиатура';
  keyboardWrapper.append(title);

  const textarea = new Textarea();
  const keyboard = new Keyboard();

  keyboard.onButtonClick(textarea.handleButtonClick.bind(textarea));

  keyboardWrapper.append(textarea.element);
  keyboardWrapper.append(keyboard.element);

  const description = document.createElement('p');
  description.className = 'keyboard-wrapper__description';
  description.innerHTML = 'Клавиатура создана в операционной системе Windows. Для переключения языка комбинация: левые ctrl + alt';
  keyboardWrapper.append(description);
});
