class IosShowKeyboard {
  input: any;
  constructor() {}
  init() {
    this.input = document.querySelector('#dummy-input');
    if (this.input === null) {
      throw new Error('initilization of ios-show-keyboard failed.');
    }
  }
  showKeyboard(callback: any) {
    this.input.focus();
    callback();
  }
}

export const iosShowKeyboard = new IosShowKeyboard();
