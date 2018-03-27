import { Vector } from './../Modules';

const wobbleSpeed = 8;
const wobbleDist = 0.07;

class Coin {
  constructor(pos) {
    this.basePos = this.pos = pos;
    this.size = new Vector(.6, .6);
    this.wobble = Math.random() * Math.PI * 2;
    this.type = 'coin';
  }

  act(step) {
    this.wobble += step * wobbleSpeed;
    var wobblePos = Math.sin(this.wobble) * wobbleDist;
    this.pos = this.basePos.plus(new Vector(0, wobblePos));
  }
};

export default Coin;
