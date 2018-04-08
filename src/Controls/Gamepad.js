class Gamepad {
  constructor() {
    window.addEventListener("gamepadconnected", this._onConnected);
    window.addEventListener('gamepaddisconnected', this._onDisconnected);

    if(! 'ongamepadconnected') {
      setInterval(this._scan, 500);
    }
  }

  _scan() {
    const devices = navigator.getGamepads ?
      navigator.getGamepads :
      (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    
      for (var i = 0; i < devices.length; i++) {
        if (devices[i]) {
          if (devices[i].index in this.gamepads) {
            this.gamepads[devices[i].index] = devices[i];
          } else {
            this._add(devices[i]);
          }
        }
      }
    }

  _add(device) {
    this.gamepads[device.index] = device;
  }

  _remove(device) {
    delete this.gamepads[device.index];
  }

  _onConnected(event) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    event.gamepad.index, event.gamepad.id,
    event.gamepad.buttons.length, event.gamepad.axes.length);       
  }

  _onDisconnected(event) {
    console.log("Gamepad disconnected from index %d: %s",
    event.gamepad.index, event.gamepad.id);  
  }

  setConfig() {

  }

  getConfig() {

  }

  handle(event) {

  }
}

export default Gamepad;