import style from './main.css';
import Polifills from './Polyfills';
import { LevelTest01, LevelTest02 } from './Levels';
import {
	DOMDisplay,
	Level,
} from './Modules';
import { Dialog } from './UI';
import { Gamepad } from './Controls';

const LEVELS = [LevelTest01, LevelTest02];
const arrowCodes = {37: 'left', 32: 'up', 39: 'right'};
const arrows = trackKeys(arrowCodes);

function trackKeys(codes) {
  const pressed = Object.create(null);
  
  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      var down = event.type == 'keydown';
      pressed[codes[event.keyCode]] = down;
      console.log(pressed[codes[event.keyCode]] = down);
      event.preventDefault();
    }
  }

  addEventListener('keydown', handler);
  addEventListener('keyup', handler);

  return pressed;
}

function runAnimation(frameFunc) {
  var lastTime = null;
  function frame(time) {
    var stop = false;
    if (lastTime != null) {
      var timeStep = Math.min(time - lastTime, 100) / 1000;

      // Check when any control event was stopped or not
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function runLevel(level, Display, andThen) {
  var display = new Display(document.body, level);
  runAnimation(function(step) {
    level.animate(step, arrows);
    display.drawFrame(step);

    if (level.isFinished()) {
      display.clear();

      if (andThen) {
        andThen(level.status);
      }

      return false;
    }
  });
}

function runGame(plans, Display, levelNumber) {
  function startLevel(n) {
    runLevel(new Level(plans[n]), Display, function(status) {
      if (status == 'lost') {
        startLevel(n);
      }
      else if (n < plans.length - 1) {
        startLevel(n + 1);
      }
      else {
        alert('You win!');
      }
    });
  }
  startLevel(levelNumber);
}

function loadUI() {
    const GamepadControl = new Gamepad();
    const GamepadDialog = new Dialog(
      'info',
      null,
      'Gamepad Settings',
      ['200px', '200px'],
      [20, 'calc(100vh - 240px)']
    );

    GamepadDialog.render();
}

runGame(LEVELS, DOMDisplay, 0);
loadUI();