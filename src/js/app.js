(function () {

	var Component = function (content, minWidth, maxWidth, minHeight, maxHeight) {
		// width and height constraints are in pixels, not grid units
		this.minWidth = minWidth || 100;
		this.minHeight = minHeight || 20;
		this.maxWidth = Math.Infinity;
		this.maxHeight = Math.Infinity;
		this.content = content;
	};

	var components = [];
	components.push(new Component('<h1>Luke</h1>'));
	components.push(new Component('<h2>JavaScript</h2>'));

	var state = {
		components: components,
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
  		    cell_height: 80,
  		    vertical_margin: 10
  		};
  		$('.grid-stack').gridstack(options);
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
  		for (var i = 0; i < state.components.length; i++) {
  			console.log(state.components[i])
  	    d += '<div class="grid-stack-item" data-gs-x="0" data-gs-y="0" data-gs-width="4" data-gs-height="2">';
  	    	d +=  '<div class="grid-stack-item-content">' + state.components[i].content + '</div>';
   	    d += '</div>';
   	  }
  	  return d;
  };

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
