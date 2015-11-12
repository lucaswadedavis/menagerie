(function () {

	function nameTitle() {
		return '<h1 class="v-mid">Luke</h1>';
	};

	function interests() {
		var allInterests = [
			'javascript',
			'space',
			'evolution',
			'elixir',
			'genetic algorithms'
		];

		var d = '';
		d += '<h2>Interests</h2>';
		d += '<ul>';
			for (var i = 0; i < allInterests.length; i++) {
				d += '<li>' + allInterests[i] + '</li>';
			}
		d += '</ul>';
		return d;
	};

	function quote() {
		var quotes = [
			'Action is a virtue.',
			'Technology is Biology by other means.',
			'Where there is life, there is hope.'
		];

		return '<p class="text-center">' + _.sample(quotes) + '</p>';
	};

	function empty() {
		return '<div class="empty"></div>';
	};

	function generateRowPattern(n) {
		n = n || 1;
		var rowPatterns = [
			[3,3,3,3],
			[4,4,4],
			[12],
			[6,6],
			[9,3],
			[3,9]
		];

		var x = [];

		for (var i = 0; i < n; i++) {
			x.push(_.sample(rowPatterns));
		}

		return x;
	};

	////////////////////////////////////////////////

	var Component = function (content, minWidth, minHeight, maxWidth, maxHeight) {
		// width and height constraints are in pixels, not grid units
		this.minWidth = minWidth || 100;
		this.minHeight = minHeight || 50;
		this.maxWidth = Infinity;
		this.maxHeight = Infinity;
		this.content = content;
	};

	var components = [];
	components.push(new Component(nameTitle(), null, 70));
	components.push(new Component(interests(), 200, 140));
	components.push(new Component(quote()));
	components.push(new Component(empty()));

	var genome = {
		borderWidth: darwa.int(5),
		cellHeight: darwa.int(15),
		verticalMargin: darwa.int(15),
		colorPalette: [
			darwa('rgb(234,10,30)'),
			darwa('rgb(23,23,23)'),
			darwa('rgb(200,34,120)')
		],
		padding: darwa.int(10),
		rowPatterns: generateRowPattern(3)
	}

	var state = {
		components: _.shuffle(components),
		genome: genome,
		route: 'single-page'
	}

  	// the actual application
  var app = function (state) {
  	// takes some state to generate a program from  	
  	var d = '';
  	d += app.singlePage(state);
  	return d;
  };
  // I'll need some bits to show the pages one-by-one
  app.singlePage = function (state) {
  	var id = magog.id();

  	magog.after(id, function () {
  		var options = {
  		    cell_height: state.genome.cellHeight,
  		    vertical_margin: state.genome.verticalMargin
  		};
  		$('.grid-stack').gridstack(options);
  	});

  	var g = state.genome;

  	magog.style({
  		body: {
  			background: g.colorPalette[2]
  		},

  		'.grid-stack-item-content': {
  			background: g.colorPalette[0],
  			border: g.borderWidth + 'px solid ' + g.colorPalette[1],
  			padding: g.padding + 'px',
  			
  			h1: {
  				'text-align': 'center'
  			},

  			'.text-center': {
  				'text-align': 'center'
  			}
  		}
  	});

  	return app.singlePage.container(state);
  };

  app.singlePage.container = function (state) {
  	var d = '';
  	d += '<div class="grid-stack">';
  	d += app.singlePage.container.row(state);
  	d += '</div>';

  	return d;
  };

  	app.singlePage.container.row = function (state) {
  		var d = '';
  		var n = 0;
  		var x;
  		for (var i = 0; i < state.genome.rowPatterns.length; i++) {
  				x = 0;
  	    	for (var j = 0; j < state.genome.rowPatterns[i].length; j++) {
  	    		console.log(i, j, n, state.components.length);
  	    		if (n >= state.components.length) {
  	    			break;
  	    		}  	   
  	    		d += '<div class="grid-stack-item" data-gs-x="' + x + '" data-gs-y="' + i + '" data-gs-width="' + state.genome.rowPatterns[i][j] + '" data-gs-height="' + state.genome.cellHeight + '">';
  	    		d +=  app.singlePage.container.row.cell(state.components[n].content);
   	    		d += '</div>';
  	    		n++;
  	    		x += state.genome.rowPatterns[i][j];
  	    	}
   	  }
  	  return d;
  };

  app.singlePage.container.row.cell = function (componentContent, state) {
  	return '<div class="grid-stack-item-content">' + componentContent + '</div>';
  }

  // Keyboard interface to bring up other screens

  // a collection of widgets to include in pages

  // saved collections
  	// and ways to actually get the code they produced.

  // features that are allowed to evolve
  	// like color scheme
  	// number of cells in a row
  	// border width
  	// margins
  	// layout width

  	$(function () {
  		magog(app(state));
  	});
})();
