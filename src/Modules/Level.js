import Vector from './Vector';
import {
	Player,
	Coin,
	Lava,
	Door,
} from './../Players';

const maxStep = 0.08;
const actorchars =  {
	'@': Player,
	'o': Coin,
	'=': Lava,
	'|': Lava,
	'v': Lava,
  'D': Door,
};

class Level {
	constructor(plan) {
		this.width = plan[0].length;
		this.height = plan.length;
		this.grid = [];
		this.actors = [];
		this.doorOpened = false;

		for (var y = 0; y < this.height; y++) {
			var line = plan[y],  gridLine = [];
			for (var x = 0; x < this.width; x++) {
				var ch = line[x], fieldType = null;
				var Actor = actorchars[ch];
				if (Actor)
					this.actors.push(new Actor(new Vector(x, y), ch));
				else if (ch === 'x')
					fieldType = 'wall';
				else if (ch === '!')
					fieldType = 'lava';
				else if (ch === '|')
					fieldType = 'lava';
				else if (ch === '=')
					fieldType = 'lava';
				else if (ch === 'v'){
					fieldType = 'lava';
					console.log(fieldType);
				}
				gridLine.push(fieldType)
			}
			this.grid.push(gridLine);
		}
		this.player = this.actors.filter(function(actor) {
			return actor.type === 'player';
		})[0];
		this.status = this.finishDelay = null;
	}

	isFinished() {
	  return this.status != null && this.finishDelay < 0;
	}

	obstacleAt(pos, size) {
	  var xStart = Math.floor(pos.x);
	  var xEnd = Math.ceil(pos.x + size.x);
	  var yStart = Math.floor(pos.y);
	  var yEnd = Math.ceil(pos.y + size.y);

	  if (xStart < 0 || xEnd > this.width || yStart < 0)
	    return 'wall';
	  if (yEnd > this.height)
	    return 'lava';
	  for (var y = yStart; y < yEnd; y++) {
	    for (var x = xStart; x < xEnd; x++) {
	      var fieldType = this.grid[y][x];
	      if (fieldType) return fieldType;
	    }
	  }
	}

	actorAt(actor) {
	  for (var i = 0; i < this.actors.length; i++) {
	    var other = this.actors[i];
	    if (other != actor &&
	        actor.pos.x + actor.size.x > other.pos.x &&
	        actor.pos.x < other.pos.x + other.size.x &&
	        actor.pos.y + actor.size.y > other.pos.y &&
	        actor.pos.y < other.pos.y + other.size.y)
	      return other;
	  }
	}

	animate(step, keys) {
	  if (this.status != null)
	    this.finishDelay -= step;

	  while (step > 0) {
	    var thisStep = Math.min(step, maxStep);
	    this.actors.forEach(function(actor) {
	      actor.act(thisStep, this, keys);
	    }, this);
	    step -= thisStep;
	  }
	}

	playerTouched(type, actor) {
	  if (type == 'lava' && this.status == null) {
	    this.status = 'lost';
	    this.finishDelay = 1;
	  } else if (type == 'coin') {
	    this.actors = this.actors.filter(function(other) {
	      return other != actor;
	    });
	    // check if exist coins to be collected, else you win!
	    if (!this.actors.some(function(actor) {

	      return actor.type == 'coin';
	    })) {
	      this.status = 'won';
	      this.finishDelay = 1;
	    }
	  } else if (type == 'door') {
	    this.finishDelay = 0;
	    if (!this.doorOpened) {
	      this.doorOpened = true;
	      this.status = 'finished';
	      console.log('LOOOOOL');
	      //runLevel(new Level(LEVELS[1]), DOMDisplay);
	    }
	  }
	}
}

export default Level;
