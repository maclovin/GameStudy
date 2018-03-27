import { element } from './';

const scale = 20;

class DOMDisplay {
	constructor(parent, level) {
		this.wrap = parent.appendChild(element('div', 'game'));
		this.level = level;

		this.wrap.appendChild(this.drawBackground());
		this.actorLayer = null;
		this.drawFrame();
	}

	drawBackground() {
		var table = element('table', 'background');
		table.style.width = this.level.width * scale + 'px';
		table.style.height = this.level.height * scale + 'px';
		this.level.grid.forEach(function(row) {
	  var rowElement = table.appendChild(element('tr'));
			rowElement.style.height = scale + 'px';
			row.forEach(function(type) {
				rowElement.appendChild(element('td', type));
			});
		});
		return table;
	}

	drawActors() {
		var wrap = element('div');
		this.level.actors.forEach(function(actor) {
			var rect = wrap.appendChild(element('div', 'actor ' + actor.type));
			rect.style.width = actor.size.x * scale + 'px';
			rect.style.height = actor.size.y * scale + 'px';
			rect.style.left = actor.pos.x * scale + 'px';
			rect.style.top = actor.pos.y * scale + 'px';
		});
		return wrap;
	}

	drawFrame() {
		if (this.actorLayer)
			this.wrap.removeChild(this.actorLayer);
		this.actorLayer = this.wrap.appendChild(this.drawActors());
		this.wrap.className = 'game ' + (this.level.status || '');
		this.scrollPlayerIntoView();
	}

	scrollPlayerIntoView()  {
	  var width = this.wrap.clientWidth;
	  var height = this.wrap.clientHeight;
	  var margin = width / 3;

	  // The viewport
	  var left = this.wrap.scrollLeft, right = left + width;
	  var top = this.wrap.scrollTop, bottom = top + height;
	  var player = this.level.player;
	  var center = player.pos.plus(player.size.times(0.5))
	                 .times(scale);

	  if (center.x < left + margin)
	    this.wrap.scrollLeft = center.x - margin;
	  else if (center.x > right - margin)
	    this.wrap.scrollLeft = center.x + margin - width;
	  if (center.y < top + margin)
	    this.wrap.scrollTop = center.y - margin;
	  else if (center.y > bottom - margin)
	    this.wrap.scrollTop = center.y + margin - height;
	}

	clear() {
		this.wrap.parentNode.removeChild(this.wrap);
	}
};

export default DOMDisplay;
