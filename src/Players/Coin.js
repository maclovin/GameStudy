function Coin(pos) {
  this.basePos = this.pos = pos;
  this.size = new Vector(.6, .6);
  // take a look back
  this.wobble = Math.random() * Math.PI * 2;
}

Coin.prototype.type = "coin";

Coin.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};