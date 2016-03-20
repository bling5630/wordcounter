'use strict';

var wordcounter = require('./wordcounter');

wordcounter('http://origo.hu', function(error, callback) {
	console.log(callback);
});
