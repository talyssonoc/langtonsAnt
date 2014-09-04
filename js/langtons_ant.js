var LangtonsAnt = function LangtonsAnt(_height, _width, _delay) {
  var self = this;

  this.elementMatrix = [];
  this.dataMatrix = [];

  this.active = false;
  this.generations = 0;

  this.height = _height;
  this.width = _width;
  this.delay = _delay;

  this.placeElements();

  this.ants = [];
  this.ants[0] = this.getNewAntPosition();

  this.placeAnt();

  return this;

};

LangtonsAnt.prototype = {
  run: function run() {

  	document.getElementById('counter').value = ++this.generations;

    var self = this;

    // Turn 90° left, flip the color of the square, move forward one unit
    if(this.dataMatrix[this.ants[0].row][this.ants[0].column]) {
    	if(this.ants[0].head.row == 0) {
    		if(this.ants[0].head.column == 1) {
    			this.ants[0].head.row = 1;
    		}
    		else {
    			this.ants[0].head.row = -1;
    		}
			this.ants[0].head.column = 0;
    	}
    	else {
    		if(this.ants[0].head.row == 1) {
    			this.ants[0].head.column = -1;
    		}
    		else {
    			this.ants[0].head.column = 1;
    		}
			this.ants[0].head.row = 0;
    	}
    }
    // Turn 90° right, flip the color of the square, move forward one unit
    else {
    	if(this.ants[0].head.row == 0) {
    		if(this.ants[0].head.column == 1) {
    			this.ants[0].head.row = -1;
    		}
    		else {
    			this.ants[0].head.row = 1;
    		}
			this.ants[0].head.column = 0;
    	}
    	else {
    		if(this.ants[0].head.row == 1) {
    			this.ants[0].head.column = 1;
    		}
    		else {
    			this.ants[0].head.column = -1;
    		}
			this.ants[0].head.row = 0;
    	}
    }

    this.dataMatrix[this.ants[0].row][this.ants[0].column] = !this.dataMatrix[this.ants[0].row][this.ants[0].column];
    if(this.elementMatrix[this.ants[0].row][this.ants[0].column].className.contains('dead')) {
    	this.elementMatrix[this.ants[0].row][this.ants[0].column].className = 'alive';
    }
    else {
    	this.elementMatrix[this.ants[0].row][this.ants[0].column].className = 'dead';
    }

    this.ants[0].row += this.ants[0].head.row;
    this.ants[0].column += this.ants[0].head.column;
    this.placeAnt();

    if(this.active) {
      this.timeout = setTimeout(function() {
        self.run();
      }, this.delay);
    }
    else {
    	clearTimeout(this.timeout);
    }
  },

  placeElements: function placeElements() {
    var self = this;
    
    this.domElement = document.createElement('table');
    this.domElement.setAttribute('id', 'langtons_ant');
    
    var newRow,
        newCell;

    for(var i = 0; i < this.height; i++) {
      this.dataMatrix[i] = [];

      newRow = document.createElement('tr');
      this.elementMatrix[i] = [];

      for(var j = 0; j < this.width; j++) {
        newCell = document.createElement('td');

        newCell.className = 'dead';
        newCell.setAttribute('data-i', i);
        newCell.setAttribute('data-j', j);

        newRow.appendChild(newCell);
        this.elementMatrix[i][j] = newCell;
        this.dataMatrix[i][j] = false;
      }
      this.domElement.appendChild(newRow);
    }

    var button = document.createElement('input');
    button.setAttribute('value', 'Start/Stop');
    button.setAttribute('type', 'button');
    button.setAttribute('id', 'start_button');


    button.addEventListener('click', function() {
      self.toggleActive();
    });

    var resetButton = document.createElement('input');
    resetButton.setAttribute('value', 'Reset');
    resetButton.setAttribute('type', 'button');
    resetButton.setAttribute('id', 'reset_button');

    resetButton.addEventListener('click', function() {
      self.reset();
    });

    var counterHolder = document.createElement('span');
    counterHolder.innerHTML = 'Generations ';

    var counter = document.createElement('input');
    counter.setAttribute('id', 'counter');
    counter.setAttribute('value', 0);

    counterHolder.appendChild(counter);


    var body = document.getElementsByTagName('body')[0];

    body.appendChild(this.domElement);
    body.appendChild(button);
    body.appendChild(resetButton);
    body.appendChild(counterHolder);
  },

  placeAnt: function placeAnt() {
  	this.elementMatrix[this.ants[0].row][this.ants[0].column].className += ' ant';
  },

  reset: function reset() {
    this.active = false;
    this.generations = 0;

    for(var i = 0; i < this.height; i++) {
      for(var j = 0; j < this.width; j++) {
        this.dataMatrix[i][j] = false;
        this.elementMatrix[i][j].className = 'dead';
      }
    }

    this.ants = []
    this.ants[0] = this.getNewAntPosition();
    this.placeAnt();
  },

  toggleActive: function toggleActive() {
    this.active = !this.active;
    if(this.active) {
      this.run();
    }
  },

  getActive: function getActive() {
    return this.active;
  },

  getNewAntPosition: function getNewAntPosition() {
  	var self = this;

  	return {
  		row: Math.floor(Math.random() * self.height),
  		column: Math.floor(Math.random() * self.width),
  		head: {
	  		row: 0,
	  		column: -1
  		}
  	}
  }
}