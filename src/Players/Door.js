import { Vector } from './../Modules';

class Door {
  constructor(pos) {
    this.pos = pos;
    this.size = new Vector(1, 1);
    this.basePos = this.pos = pos;
    this.size = new Vector(.6, .6);
    this.type = "door";
  }

  act() {}
};

export default Door;
