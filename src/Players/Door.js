function Door(pos) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  this.basePos = this.pos = pos;
   this.size = new Vector(.6, .6);
};

Door.prototype.type = "door";
Door.prototype.act = function() {};